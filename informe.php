<?php
/* ACUP · recibe el autodiagnóstico y envía el informe por correo a la persona,
   con copia a ACUP. Las respuestas llegan como "si|no|ns" separadas por coma,
   en el mismo orden que QUESTIONS en app.js: el texto del informe sale de aquí,
   nunca del navegador. */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');
header('Cache-Control: no-store');

const COPIA = 'somos@acup.cl';

/* Credenciales SMTP fuera de la carpeta pública: domains/acup.cl/informe-config.php
   devuelve ['usuario' => 'buzon@acup.cl', 'clave' => '...']. Se envía autenticado como
   ese buzón para que el correo salga firmado (DKIM) y no caiga en spam. */
$SMTP = is_file(dirname(__DIR__) . '/informe-config.php') ? include dirname(__DIR__) . '/informe-config.php' : null;

// BORRADOR: textos por revisar y aprobar por Sebastián antes de activar el envío.
const PREGUNTAS = [
  ['tema' => 'Matriz IPER', 'brecha' => 'Matriz IPER vencida o sin revisar',
   'por' => 'Si la matriz no se revisa, deja de reflejar los riesgos reales de tu operación y es lo primero que pide un cliente o un fiscalizador.',
   'hacer' => 'Revisarla con tus procesos actuales y dejar registro de la fecha y de quién la revisó.'],
  ['tema' => 'Matriz IPER', 'brecha' => 'Matriz sin perspectiva de género',
   'por' => 'El DS 44 pide que la evaluación de riesgos considere las diferencias entre hombres y mujeres en cada peligro.',
   'hacer' => 'Incorporar ese análisis en cada peligro de la matriz y en las medidas de control.'],
  ['tema' => 'Matriz IPER', 'brecha' => 'Matriz sin constancia de difusión',
   'por' => 'Una matriz que los trabajadores no conocen no se puede demostrar como gestión preventiva.',
   'hacer' => 'Difundirla a cada trabajador y guardar la constancia firmada.'],
  ['tema' => 'Información de riesgos', 'brecha' => 'IRL sin firma de cada trabajador',
   'por' => 'Cada trabajador debe ser informado de los riesgos de su puesto antes de empezar a trabajar, y eso se demuestra con su firma.',
   'hacer' => 'Completar la IRL de cada puesto y obtener la firma de quienes no la tienen, empezando por los ingresos recientes.'],
  ['tema' => 'Capacitación', 'brecha' => 'Capacitación del art. 16 incompleta',
   'por' => 'Desde el 01.11.2026 es exigible la capacitación de 8 horas por trabajador, con evaluación, renovable cada 2 años.',
   'hacer' => 'Planificar las horas que faltan por trabajador y guardar asistencia y evaluación de cada uno.'],
  ['tema' => 'Ley Karin', 'brecha' => 'Sin protocolo de prevención Ley Karin',
   'por' => 'Desde el 01.08.2024 todas las empresas deben tener un protocolo de prevención del acoso laboral, sexual y la violencia en el trabajo.',
   'hacer' => 'Elaborar el protocolo a partir de una evaluación de riesgos psicosociales de tu empresa.'],
  ['tema' => 'Ley Karin', 'brecha' => 'Protocolo Ley Karin sin difusión registrada',
   'por' => 'El protocolo tiene que ser conocido por todos los trabajadores, y eso se demuestra con un registro.',
   'hacer' => 'Difundirlo a cada trabajador y guardar la constancia.'],
  ['tema' => 'EPP', 'brecha' => 'Entregas de EPP sin registro firmado',
   'por' => 'Sin registro firmado no puedes demostrar que entregaste los elementos de protección personal ni cuándo corresponde reponerlos.',
   'hacer' => 'Registrar cada entrega con firma del trabajador, fecha y elementos entregados.'],
  ['tema' => 'Reglamento interno', 'brecha' => 'Reglamento Interno desactualizado o sin entrega',
   'por' => 'Las empresas con 10 o más trabajadores deben tener un Reglamento Interno de Orden, Higiene y Seguridad vigente y entregado a cada trabajador.',
   'hacer' => 'Actualizarlo con la normativa vigente y registrar su entrega a cada trabajador.'],
  ['tema' => 'Emergencias', 'brecha' => 'Plan de emergencia o simulacro pendiente',
   'por' => 'Un plan de emergencia que nunca se ha practicado no se puede demostrar como preparado.',
   'hacer' => 'Actualizar el plan, practicarlo con simulacros periódicos y registrar cada uno.'],
];

function responder(int $code, array $data): never {
  http_response_code($code);
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit;
}

/* Cuenta los envíos dentro de la ventana; false si ya se alcanzó el máximo. */
function dentroDelLimite(string $archivo, int $max, int $ventana): bool {
  $fh = fopen($archivo, 'c+');
  if (!$fh) return false;
  flock($fh, LOCK_EX);
  $ahora = time();
  $marcas = array_filter(json_decode(stream_get_contents($fh) ?: '[]', true) ?: [], fn($t) => is_int($t) && $t > $ahora - $ventana);
  $ok = count($marcas) < $max;
  if ($ok) $marcas[] = $ahora;
  ftruncate($fh, 0); rewind($fh);
  fwrite($fh, json_encode(array_values($marcas)));
  flock($fh, LOCK_UN); fclose($fh);
  return $ok;
}

/* Envío por SMTP autenticado (smtp.hostinger.com:465), todos los correos en una sola conexión.
   Cada correo es [para, asunto, html, responderA], con direcciones ya validadas. Devuelve un bool por correo. */
function enviar(array $smtp, array $correos): array {
  $desde = $smtp['usuario'];
  $res = array_fill(0, count($correos), false);
  $s = @stream_socket_client('ssl://smtp.hostinger.com:465', $errno, $errstr, 15);
  if (!$s) { error_log("informe.php: SMTP sin conexión ($errno $errstr)"); return $res; }
  stream_set_timeout($s, 20);
  $paso = function (?string $linea, string $esperado) use ($s): bool {
    if ($linea !== null) fwrite($s, $linea . "\r\n");
    $resp = '';
    while (($l = fgets($s, 1024)) !== false) { $resp .= $l; if (($l[3] ?? ' ') === ' ') break; }
    if (strncmp($resp, $esperado, 3) === 0) return true;
    error_log('informe.php: SMTP respondió ' . trim($resp));
    return false;
  };
  if ($paso(null, '220') && $paso('EHLO acup.cl', '250')
      && $paso('AUTH LOGIN', '334') && $paso(base64_encode($desde), '334') && $paso(base64_encode($smtp['clave']), '235')) {
    foreach ($correos as $i => [$para, $asunto, $html, $responderA]) {
      $mensaje = implode("\r\n", [
        'Date: ' . date('r'),
        'From: ACUP <' . $desde . '>',
        'To: <' . $para . '>',
        'Reply-To: ' . $responderA,
        'Subject: ' . mb_encode_mimeheader($asunto, 'UTF-8'),
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@acup.cl>',
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        rtrim(chunk_split(base64_encode($html))),
      ]);
      $res[$i] = $paso('MAIL FROM:<' . $desde . '>', '250') && $paso('RCPT TO:<' . $para . '>', '250')
        && $paso('DATA', '354') && $paso($mensaje . "\r\n.", '250');
      if (!$res[$i]) $paso('RSET', '250');
    }
  }
  $paso('QUIT', '221');
  fclose($s);
  return $res;
}

function e(string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }

function mensajePuntaje(int $n): string {
  if ($n >= 9) return 'Estás muy cerca. Te ayudamos a mantenerlo así todos los meses.';
  if ($n >= 5) return 'Tienes brechas que un cliente o un fiscalizador puede detectar en la próxima revisión.';
  return 'Hoy tu empresa no puede demostrar la mayoría de sus obligaciones. Se puede ordenar, y rápido.';
}

/* ---------------- Validación (todo lo que llega es del navegador) ---------------- */

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') responder(405, ['ok' => false, 'error' => 'metodo']);

// Campo trampa: una persona no lo ve ni lo llena. Al bot se le responde "ok" y no se envía nada.
if (($_POST['empresa_web'] ?? '') !== '') responder(200, ['ok' => true]);

$email = trim((string)($_POST['email'] ?? ''));
if (strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) responder(400, ['ok' => false, 'error' => 'email']);
if (($_POST['consentimiento'] ?? '') !== 'si') responder(400, ['ok' => false, 'error' => 'consentimiento']);

$n = count(PREGUNTAS);
$crudo = (string)($_POST['respuestas'] ?? '');
if (!preg_match('/^(si|no|ns)(,(si|no|ns)){' . ($n - 1) . '}$/', $crudo)) responder(400, ['ok' => false, 'error' => 'respuestas']);
$respuestas = explode(',', $crudo);

if (!is_array($SMTP) || empty($SMTP['usuario']) || empty($SMTP['clave']) || $SMTP['clave'] === 'PEGAR_AQUI_LA_CLAVE') {
  error_log('informe.php: falta configurar informe-config.php');
  responder(503, ['ok' => false, 'error' => 'config']);
}

/* Límites: por IP y en total, para que el formulario no sirva para mandar correos masivos. */
$dir = dirname(__DIR__) . '/informe-data';
if (!is_dir($dir) && !mkdir($dir, 0700, true)) responder(500, ['ok' => false, 'error' => 'servidor']);
// shortcut: la IP sale de cabeceras del CDN, que se pueden falsear; el tope diario total cubre ese caso.
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '')[0] ?: ($_SERVER['REMOTE_ADDR'] ?? '');
if (!dentroDelLimite($dir . '/total.json', 200, 86400)) responder(429, ['ok' => false, 'error' => 'limite']);
if (!dentroDelLimite($dir . '/ip-' . hash('sha256', trim($ip)) . '.json', 5, 3600)) responder(429, ['ok' => false, 'error' => 'limite']);

/* ---------------- Informe ---------------- */

$puntaje = 0;
$brechas = [];
foreach ($respuestas as $i => $r) {
  if ($r === 'si') { $puntaje++; continue; }
  $brechas[] = PREGUNTAS[$i] + ['ns' => $r === 'ns'];
}

$filas = '';
foreach ($brechas as $b) {
  $filas .= '<div style="margin:0 0 18px;padding:14px 16px;border-left:3px solid #F85A7A;background:#F5F6F9">'
    . '<p style="margin:0 0 4px;font-size:12px;color:#6B7280;text-transform:uppercase;letter-spacing:.04em">' . e($b['tema']) . ($b['ns'] ? ' · respondiste «No estoy seguro»' : '') . '</p>'
    . '<p style="margin:0 0 8px;font-size:16px;font-weight:600;color:#141C42">' . e($b['brecha']) . '</p>'
    . '<p style="margin:0 0 6px;font-size:14px;color:#374151"><strong>Por qué importa:</strong> ' . e($b['por']) . '</p>'
    . '<p style="margin:0;font-size:14px;color:#374151"><strong>Qué hacer:</strong> ' . e($b['hacer']) . '</p></div>';
}
if (!$brechas) $filas = '<p style="font-size:15px;color:#374151">No marcaste brechas. El trabajo ahora es sostenerlo mes a mes y tener la evidencia a mano.</p>';

$informe = '<!DOCTYPE html><html lang="es"><body style="margin:0;padding:24px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#141C42">'
  . '<div style="max-width:600px;margin:0 auto">'
  . '<p style="font-size:22px;font-weight:700;margin:0 0 24px">acup<span style="color:#F85A7A">.</span></p>'
  . '<h1 style="font-size:24px;margin:0 0 6px">Tu autodiagnóstico: ' . $puntaje . ' de ' . $n . ' obligaciones acreditadas</h1>'
  . '<p style="font-size:15px;color:#374151;margin:0 0 24px">' . e(mensajePuntaje($puntaje)) . '</p>'
  . '<h2 style="font-size:18px;margin:0 0 14px">Lo que hoy no podrías demostrar</h2>' . $filas
  . '<p style="font-size:15px;color:#374151;margin:24px 0">Si quieres, revisamos juntos estas brechas y armamos un plan para cerrarlas. Responde este correo y te contactamos.</p>'
  . '<p style="font-size:12px;color:#6B7280;margin:32px 0 0">Recibes este correo porque hiciste el autodiagnóstico en acup.cl y lo pediste. ACUP SpA · somos@acup.cl · <a href="https://acup.cl/privacidad.html" style="color:#6B7280">Privacidad</a></p>'
  . '</div></body></html>';

$aviso = '<p style="font-family:Arial,sans-serif">Nuevo autodiagnóstico en acup.cl. Contacto: <a href="mailto:' . e($email) . '">' . e($email) . '</a> (responde este correo para escribirle).</p>' . $informe;
[$okInforme, $okCopia] = enviar($SMTP, [
  [$email, 'Tu autodiagnóstico ACUP: ' . $puntaje . ' de ' . $n, $informe, COPIA],
  [COPIA, 'Nuevo autodiagnóstico: ' . $email . ' · ' . $puntaje . ' de ' . $n, $aviso, $email],
]);
if (!$okCopia) error_log('informe.php: no se pudo enviar la copia a ACUP para ' . $email);
if (!$okInforme) responder(502, ['ok' => false, 'error' => 'envio']);

responder(200, ['ok' => true]);
