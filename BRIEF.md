# Brief: rediseño de la landing de acup.cl

Fecha: 23-11-2026. Leer junto con `PRODUCT.md`, que manda en todo lo que es verdad del producto.

## Objetivo de la página

Una sola página con un solo objetivo: que la persona haga el **autodiagnóstico**. La segunda acción, para quien prefiere conversar, es **hablar con un asesor** (WhatsApp o agendar una reunión).

Nada de menú corporativo con "Nosotros / Servicios / Blog". Pocas secciones, cada una con un propósito, sin marear con información.

## Problemas de la versión anterior (lo que NO hay que repetir)

- Se veía plana, sencilla y "hecha con IA".
- La primera maqueta tenía textos innecesarios, como "Prevención de riesgos para contratistas · Región de Valparaíso". ACUP atiende en línea a todo Chile.
- El diseño de agosto (cinta de peligro amarilla y negra, tipografía de letrero de obra) se percibía poco serio.
- Referencia de la versión 2, solo como estructura y no como estética: https://claude.ai/artifact/VgJpMmV5N5tsZu3anqdR4Y

## Dirección visual

- Seria y elaborada al mismo tiempo: una consultora técnica de alto nivel, no una plantilla.
- Colores de marca: azul marino #30408E y coral #F85A7A. El coral es acento, no fondo.
- Wordmark "acup" en minúsculas con el punto coral (Montserrat Bold en el logo actual).
- Interacción con propósito: el autodiagnóstico, el comparador y las preguntas frecuentes son interactivos. Las animaciones acompañan la lectura; no decoran.
- Prohibido: degradados genéricos, emojis, tarjetas con borde de color a la izquierda, fotos de stock de gente sonriendo en oficina, cintas de peligro, tono alarmista.
- Debe funcionar bien en celular: muchos dueños de empresa van a entrar desde el teléfono.

## Lenguaje

- Al cliente se le dice **"tu empresa"**. Nunca "contratista" ni "pyme".
- El cumplimiento se presenta como lo que permite crecer, no como un trámite para evitar una multa.
- Cercano pero riguroso. Desafiante pero no acusatorio. Técnico pero entendible.
- Sin cifras de resultados, clientes ni testimonios inventados.

## Estructura y textos

### 1. Portada

- Titular: "Una empresa en regla puede ir por clientes más grandes."
- Bajada: "Ponemos al día tu prevención de riesgos y la mantenemos así, con todo ordenado en una plataforma que puedes mostrar a cualquier cliente o fiscalizador."
- Tres apoyos breves: "8 años del lado de una empresa grande, revisando a sus proveedores" · "Asesoría y plataforma en un solo servicio" · "En línea para todo Chile".
- El **autodiagnóstico vive en la portada**, como protagonista.
- Botón secundario arriba a la derecha: "Hablar con un asesor".

### 2. Autodiagnóstico (interactivo, funcional)

Pantalla inicial: "¿Tu empresa puede demostrar que cumple?" · 10 preguntas · 2 minutos · sin registrarte · botón "Comenzar".

Cada pregunta tiene tres respuestas: "Sí, y tengo el registro" · "No" · "No estoy seguro". Solo la primera cuenta como cumplida. Barra de avance, número de pregunta y opción de volver atrás.

| N° | Tema | Pregunta | Brecha si no cumple |
| --- | --- | --- | --- |
| 1 | Matriz IPER | ¿Tu matriz de riesgos fue revisada en los últimos 12 meses? | Matriz IPER vencida o sin revisar |
| 2 | Matriz IPER | ¿Tu matriz considera la perspectiva de género en cada peligro? | Matriz sin perspectiva de género |
| 3 | Matriz IPER | ¿Tienes constancia firmada de que tus trabajadores conocen la matriz? | Matriz sin constancia de difusión |
| 4 | Información de riesgos | ¿Cada trabajador firmó su IRL antes de empezar a trabajar? | IRL sin firma de cada trabajador |
| 5 | Capacitación | ¿Todo tu equipo completó las 8 horas de capacitación del art. 16, con evaluación? | Capacitación del art. 16 incompleta |
| 6 | Ley Karin | ¿Tu empresa tiene un protocolo de prevención de Ley Karin? | Sin protocolo de prevención Ley Karin |
| 7 | Ley Karin | ¿Hay registro de que tus trabajadores conocen ese protocolo? | Protocolo Ley Karin sin difusión registrada |
| 8 | EPP | ¿Tienes registro firmado de cada entrega de elementos de protección personal? | Entregas de EPP sin registro firmado |
| 9 | Reglamento interno | Si tienes 10 o más trabajadores: ¿tu Reglamento Interno está actualizado y entregado a cada uno? | Reglamento Interno desactualizado o sin entrega |
| 10 | Emergencias | ¿Tienes plan de emergencia y hiciste al menos un simulacro este año? | Plan de emergencia o simulacro pendiente |

Resultado: "X de 10 obligaciones acreditadas", barra de puntaje y mensaje según el puntaje:

- 9 o 10: "Estás muy cerca. Te ayudamos a mantenerlo así todos los meses."
- 5 a 8: "Tienes brechas que un cliente o un fiscalizador puede detectar en la próxima revisión."
- 0 a 4: "Hoy tu empresa no puede demostrar la mayoría de sus obligaciones. Se puede ordenar, y rápido."

Debajo, la lista "Lo que hoy no podrías demostrar" con las brechas, y un campo de correo: "Recibe tu informe y un plan para cerrar las brechas". **Pendiente**: definir a dónde llega ese correo (servicio de formularios compatible con un sitio estático). Mientras no esté definido, dejar el envío preparado y marcado como pendiente; no simular que se envió.

### 3. Fechas de la norma

Título: "La norma cambió. Estas fechas ya corren."

- 01.08.2024 · Ley Karin · Protocolo de prevención del acoso, obligatorio en todas las empresas.
- 01.02.2025 · DS 44 · Reemplaza al DS 40 y al DS 54: la gestión preventiva se tiene que poder demostrar.
- 01.11.2026 · Capacitación art. 16 · 8 horas por trabajador, con evaluación, renovables cada 2 años.
- 01.12.2026 · Ley 21.719 · Nuevas exigencias para los datos personales de tus trabajadores.

### 4. Comparador "Hoy / Con ACUP" (interactivo)

Título: "Tener los papeles no es lo mismo que poder demostrarlo."

- Hoy: documentos repartidos entre correos, carpetas y pendrives · te enteras de un vencimiento cuando ya pasó · cada trabajador nuevo es una carrera para reunir firmas · cuando cambia la norma, nadie te avisa qué actualizar.
- Con ACUP: una carpeta digital por trabajador, con cada documento firmado · un aviso antes de cada vencimiento · trabajadores nuevos incorporados con un proceso, no con urgencias · cuando cambia la norma, actualizamos tu documentación.

### 5. Cómo funciona

Título: "Te ponemos al día una vez y te mantenemos al día siempre."

1. Diagnóstico: partimos por tu autodiagnóstico y revisamos juntos tu documentación.
2. Puesta al día: elaboramos lo que falta (matriz, protocolos, registros y capacitaciones), adaptado a tu operación.
3. Mantención mensual: controlamos vencimientos, incorporamos a los trabajadores nuevos y actualizamos todo cuando cambia la norma.

### 6. Planes

Título: "Un plan mensual, con la plataforma incluida." Todos incluyen la puesta al día inicial y la plataforma.

- **Esencial** · para empresas de hasta 25 trabajadores · [PRECIO] UF al mes · DS 44 y Ley Karin al día · matriz IPER con perspectiva de género · registros por trabajador en la plataforma · aviso de cada vencimiento.
- **Crecimiento** (recomendado) · para empresas de 25 a 100 trabajadores · [PRECIO] UF al mes · todo lo de Esencial · capacitación del art. 16 · apoyo al Comité Paritario · carpeta lista para clientes y licitaciones · visita mensual en terreno [SEGÚN ZONA].
- **Empresa** · para más de 100 trabajadores o varias faenas · [PRECIO] UF al mes · todo lo de Crecimiento · una carpeta por cliente o faena · acompañamiento ante fiscalizaciones · asesor asignado.

### 7. Quién está detrás

Título: "Sé lo que busca una empresa grande en un proveedor serio, porque estuve de ese lado."

Texto: "Soy Sebastián Tobar, Ingeniero en Prevención de Riesgos. Durante 8 años fui asesor de prevención en una empresa sanitaria regional: revisé la documentación de sus proveedores y asesoré a cinco Comités Paritarios. Hoy pongo esa experiencia de tu lado, para que tu empresa esté en regla y lista para crecer."

No nombrar a la ex empleadora. Espacio para foto real en terreno: [FOTO PENDIENTE].

### 8. Preguntas frecuentes (acordeón)

- ¿Atienden fuera de la Región de Valparaíso? Sí. El diagnóstico, la puesta al día y la plataforma funcionan en línea en todo Chile. Las visitas en terreno se coordinan según la zona.
- ¿Sirve si mi empresa recién está creciendo? Sí. La Ley Karin y el DS 44 aplican a todas las empresas, sin importar su tamaño.
- Mi cliente usa su propia plataforma de acreditación. ¿Igual me sirve? Sí. No reemplazamos esa plataforma: preparamos y mantenemos al día lo que te exige.
- ¿Cuánto demora la puesta al día? [PLAZO], según el tamaño de tu empresa y lo que ya tengas hecho.
- ¿Hay permanencia mínima? [CONDICIONES DE CONTRATO]

### 9. Cierre

"¿Prefieres conversarlo directamente?" · botones "Escribir por WhatsApp" [NÚMERO PENDIENTE] y "Agendar una reunión" · pie: ACUP SpA · somos@acup.cl · Atendemos en todo Chile.

## Restricciones técnicas

- El sitio se publica en GitHub Pages: debe seguir siendo un sitio estático.
- Conservar el favicon, los metadatos sociales, el JSON-LD, `sitemap.xml` y `robots.txt` actuales, actualizando sus textos al nuevo mensaje.
- `sobre-acup.html` se puede eliminar o fusionar: la nueva landing es de una sola página.
- Accesible: contraste suficiente, navegación con teclado, botones reales, etiquetas en los campos.

## Pendientes que debe definir Seba

Precios en UF de los 3 planes · plazo de la puesta al día · condiciones de permanencia · número de WhatsApp · servicio que recibirá el correo del autodiagnóstico · foto en terreno.
