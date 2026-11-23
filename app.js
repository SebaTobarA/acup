/* ACUP · interacción de la landing: autodiagnóstico, fechas, comparador,
   preguntas frecuentes e índice lateral. Sin dependencias. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.16, 1, .3, 1)';

  /* ------------------------------------------------------------------
     Autodiagnóstico
     ------------------------------------------------------------------ */

  var QUESTIONS = [
    { tema: 'Matriz IPER', q: '¿Tu matriz de riesgos fue revisada en los últimos 12 meses?', gap: 'Matriz IPER vencida o sin revisar' },
    { tema: 'Matriz IPER', q: '¿Tu matriz considera la perspectiva de género en cada peligro?', gap: 'Matriz sin perspectiva de género' },
    { tema: 'Matriz IPER', q: '¿Tienes constancia firmada de que tus trabajadores conocen la matriz?', gap: 'Matriz sin constancia de difusión' },
    { tema: 'Información de riesgos', q: '¿Cada trabajador firmó su IRL antes de empezar a trabajar?', gap: 'IRL sin firma de cada trabajador' },
    { tema: 'Capacitación', q: '¿Todo tu equipo completó las 8 horas de capacitación del art. 16, con evaluación?', gap: 'Capacitación del art. 16 incompleta' },
    { tema: 'Ley Karin', q: '¿Tu empresa tiene un protocolo de prevención de Ley Karin?', gap: 'Sin protocolo de prevención Ley Karin' },
    { tema: 'Ley Karin', q: '¿Hay registro de que tus trabajadores conocen ese protocolo?', gap: 'Protocolo Ley Karin sin difusión registrada' },
    { tema: 'EPP', q: '¿Tienes registro firmado de cada entrega de elementos de protección personal?', gap: 'Entregas de EPP sin registro firmado' },
    { tema: 'Reglamento interno', q: 'Si tienes 10 o más trabajadores: ¿tu Reglamento Interno está actualizado y entregado a cada uno?', gap: 'Reglamento Interno desactualizado o sin entrega' },
    { tema: 'Emergencias', q: '¿Tienes plan de emergencia y hiciste al menos un simulacro este año?', gap: 'Plan de emergencia o simulacro pendiente' }
  ];

  var OPTIONS = [
    { v: 'si', label: 'Sí, y tengo el registro', icon: 'i-check' },
    { v: 'no', label: 'No', icon: 'i-x' },
    { v: 'ns', label: 'No estoy seguro', icon: 'i-q' }
  ];

  /* PENDIENTE: URL del servicio de formularios que recibirá el informe
     (por ejemplo, un endpoint de Formspree o similar compatible con un sitio
     estático). Mientras esté vacío, el formulario NO envía nada y lo dice. */
  var REPORT_ENDPOINT = '';

  var sheet = document.querySelector('.diag');
  var body = document.getElementById('diag-body');
  var live = document.getElementById('diag-live');
  var stack = document.querySelector('.stack');
  var edges = stack ? stack.querySelectorAll('.edges span') : [];
  var introHTML = body ? body.innerHTML : '';

  var step = -1; // -1 intro, 0..9 preguntas, 10 resultado
  var answers = new Array(QUESTIONS.length);
  var busy = false;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function icon(id, cls) {
    return '<svg class="ico' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#' + id + '"/></svg>';
  }

  function updateEdges() {
    var remaining = step < 0 ? QUESTIONS.length : Math.max(0, QUESTIONS.length - step - 1);
    if (step >= QUESTIONS.length) remaining = 0;
    for (var i = 0; i < edges.length; i++) {
      edges[i].classList.toggle('is-gone', i >= remaining);
    }
  }

  function renderIntro() {
    body.innerHTML = introHTML;
    sheet.setAttribute('data-step', 'intro');
  }

  function renderQuestion() {
    var item = QUESTIONS[step];
    var ruler = '';
    for (var i = 0; i < QUESTIONS.length; i++) {
      var c = i < step ? ' class="is-done"' : (i === step ? ' class="is-now"' : '');
      ruler += '<span' + c + '></span>';
    }
    var opts = OPTIONS.map(function (o, idx) {
      var pressed = answers[step] === o.v ? 'true' : 'false';
      return '<button type="button" class="answer" data-v="' + o.v + '" aria-pressed="' + pressed + '">' +
        '<span class="mark">' + icon(o.icon) + '</span>' + esc(o.label) +
        '<kbd aria-hidden="true">' + (idx + 1) + '</kbd></button>';
    }).join('');

    body.innerHTML =
      '<div class="diag-q">' +
        '<div class="q-meta"><span class="q-count">Pregunta ' + (step + 1) + ' de ' + QUESTIONS.length + '</span>' +
        '<span class="q-topic">' + esc(item.tema) + '</span></div>' +
        '<div class="ruler" aria-hidden="true">' + ruler + '</div>' +
        '<h2 class="q-text" id="diag-title" tabindex="-1">' + esc(item.q) + '</h2>' +
        '<div class="answers" role="group" aria-labelledby="diag-title">' + opts + '</div>' +
        '<div class="q-foot">' +
          '<button type="button" class="btn-text" data-action="back">' + icon('i-left') + 'Volver</button>' +
          '<span class="q-note">Solo cuenta lo que puedes demostrar con un registro.</span>' +
        '</div>' +
      '</div>';
    sheet.setAttribute('data-step', 'q');
  }

  function scoreMessage(n) {
    if (n >= 9) return 'Estás muy cerca. Te ayudamos a mantenerlo así todos los meses.';
    if (n >= 5) return 'Tienes brechas que un cliente o un fiscalizador puede detectar en la próxima revisión.';
    return 'Hoy tu empresa no puede demostrar la mayoría de sus obligaciones. Se puede ordenar, y rápido.';
  }

  function gapsList() {
    var out = [];
    for (var i = 0; i < QUESTIONS.length; i++) {
      if (answers[i] !== 'si') out.push({ q: QUESTIONS[i], ns: answers[i] === 'ns' });
    }
    return out;
  }

  function mailtoHref(score, gaps) {
    var lines = ['Hola, hice el autodiagnóstico en acup.cl.', '', 'Resultado: ' + score + ' de 10 obligaciones acreditadas.'];
    if (gaps.length) {
      lines.push('', 'Lo que hoy no podría demostrar:');
      gaps.forEach(function (g) { lines.push('- ' + g.q.gap); });
    }
    lines.push('', 'Me gustaría recibir un plan para cerrar las brechas.');
    return 'mailto:somos@acup.cl?subject=' + encodeURIComponent('Mi autodiagnóstico ACUP: ' + score + ' de 10') +
      '&body=' + encodeURIComponent(lines.join('\n'));
  }

  function renderResult() {
    var gaps = gapsList();
    var score = QUESTIONS.length - gaps.length;
    var bar = '';
    for (var i = 0; i < QUESTIONS.length; i++) bar += '<span' + (i < score ? ' class="is-ok"' : '') + '></span>';

    var gapHTML = gaps.length
      ? '<ul class="gap-list">' + gaps.map(function (g) {
          return '<li>' + icon('i-flag') + '<div><strong>' + esc(g.q.gap) + '</strong><span>' +
            esc(g.q.tema) + (g.ns ? ' · respondiste «No estoy seguro»' : '') + '</span></div></li>';
        }).join('') + '</ul>'
      : '<p class="gaps-none">No marcaste brechas. El trabajo ahora es sostenerlo mes a mes y tener la evidencia a mano.</p>';

    body.innerHTML =
      '<div class="diag-r">' +
        '<div class="r-score"><span class="r-num">' + score + '</span>' +
        '<h2 class="r-of" id="diag-title" tabindex="-1">de 10 obligaciones acreditadas</h2></div>' +
        '<div class="r-bar" aria-hidden="true">' + bar + '</div>' +
        '<p class="r-msg">' + esc(scoreMessage(score)) + '</p>' +
        '<div class="gaps"><h3>Lo que hoy no podrías demostrar</h3>' + gapHTML + '</div>' +
        '<form class="report" novalidate>' +
          '<label for="report-email">Recibe tu informe y un plan para cerrar las brechas</label>' +
          '<div class="report-row">' +
            '<input id="report-email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="nombre@tuempresa.cl" required aria-describedby="report-msg">' +
            '<button class="btn btn-primary" type="submit">Recibir informe</button>' +
          '</div>' +
          '<p class="report-msg" id="report-msg" aria-live="polite"></p>' +
        '</form>' +
        '<div class="r-foot">' +
          '<button type="button" class="btn-text" data-action="restart">' + icon('i-redo') + 'Repetir el autodiagnóstico</button>' +
          '<a href="#contacto">Prefiero conversarlo con un asesor</a>' +
        '</div>' +
      '</div>';
    sheet.setAttribute('data-step', 'result');
    body.setAttribute('data-mailto', mailtoHref(score, gaps));

    if (!reduced) {
      var segs = body.querySelectorAll('.r-bar span');
      for (var j = 0; j < segs.length; j++) {
        segs[j].animate([{ transform: 'scaleX(0)', opacity: 0 }, { transform: 'scaleX(1)', opacity: 1 }],
          { duration: 420, delay: 120 + j * 45, easing: EASE, fill: 'backwards' });
      }
      var flags = body.querySelectorAll('.gap-list li');
      for (var k = 0; k < flags.length; k++) {
        flags[k].animate([{ transform: 'translateX(-10px)', opacity: 0 }, { transform: 'none', opacity: 1 }],
          { duration: 480, delay: 500 + k * 60, easing: EASE, fill: 'backwards' });
      }
    }
  }

  var meta = document.getElementById('diag-meta');
  function render() {
    if (meta) meta.textContent = step < 0 ? '10 preguntas' : (step >= QUESTIONS.length ? 'Resultado' : String(step + 1).padStart(2, '0') + ' / 10');
    if (step < 0) renderIntro();
    else if (step >= QUESTIONS.length) renderResult();
    else renderQuestion();
    updateEdges();
  }

  function announce(text) {
    live.textContent = '';
    window.setTimeout(function () { live.textContent = text; }, 30);
  }

  function focusTitle() {
    var t = body.querySelector('#diag-title');
    if (t) t.focus({ preventScroll: true });
  }

  /* La hoja se archiva hacia la izquierda y entra la siguiente. */
  function go(next, dir) {
    if (busy) return;
    var apply = function () {
      step = next;
      render();
      focusTitle();
      if (step >= 0 && step < QUESTIONS.length) announce('Pregunta ' + (step + 1) + ' de ' + QUESTIONS.length);
      else if (step >= QUESTIONS.length) announce('Resultado listo');
    };
    if (reduced || !body.animate) { apply(); keepInView(); return; }
    busy = true;
    var out = body.animate(
      [{ transform: 'none', opacity: 1 }, { transform: 'translateX(' + (-28 * dir) + 'px) rotate(' + (-0.6 * dir) + 'deg)', opacity: 0 }],
      { duration: 170, easing: 'cubic-bezier(.4, 0, 1, 1)', fill: 'forwards' }
    );
    /* Temporizadores en vez de onfinish: si la pestaña está en segundo plano
       las animaciones se pausan y el diagnóstico no debe quedarse trabado. */
    window.setTimeout(function () {
      apply();
      out.cancel();
      body.animate(
        [{ transform: 'translateX(' + (34 * dir) + 'px)', opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: 420, easing: EASE }
      );
      busy = false;
      keepInView();
    }, 180);
  }

  /* En celular, si la hoja creció (resultado), que su inicio quede a la vista. */
  function keepInView() {
    var r = sheet.getBoundingClientRect();
    if (r.top < 0 || r.top > window.innerHeight * 0.6) {
      sheet.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  }

  function handleSubmit(form) {
    var input = form.querySelector('input[type="email"]');
    var msg = form.querySelector('.report-msg');
    var value = input.value.trim();
    msg.className = 'report-msg';
    if (!value || !input.checkValidity()) {
      input.setAttribute('aria-invalid', 'true');
      msg.classList.add('is-error');
      msg.textContent = value ? 'Revisa el correo: parece incompleto (ejemplo: nombre@tuempresa.cl).' : 'Escribe tu correo para recibir el informe.';
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');

    if (!REPORT_ENDPOINT) {
      /* Envío pendiente: no se simula. */
      msg.classList.add('is-pending');
      msg.innerHTML = '<strong>Envío pendiente de configurar.</strong> Tu correo no se envió todavía: el servicio que recibirá los informes aún no está conectado <span class="todo">[PENDIENTE]</span>. ' +
        'Mientras tanto puedes <a href="' + esc(body.getAttribute('data-mailto')) + '">enviarnos tu resultado por correo</a> a somos@acup.cl.';
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando…';
    var data = new FormData();
    data.append('email', value);
    data.append('resultado', (QUESTIONS.length - gapsList().length) + ' de 10');
    data.append('brechas', gapsList().map(function (g) { return g.q.gap; }).join('; '));
    fetch(REPORT_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('http');
        msg.textContent = 'Listo. Te enviaremos tu informe a ' + value + '.';
        btn.textContent = 'Enviado';
      })
      .catch(function () {
        msg.classList.add('is-error');
        msg.innerHTML = 'No pudimos enviar tu correo. Inténtalo otra vez o escríbenos a <a href="mailto:somos@acup.cl">somos@acup.cl</a>.';
        btn.disabled = false;
        btn.textContent = 'Recibir informe';
      });
  }

  /* Cada respuesta se timbra en la hoja antes de archivarla. */
  function stamp(ok) {
    var el = document.createElement('span');
    el.className = 'hit ' + (ok ? 'hit-ok' : 'hit-gap');
    el.setAttribute('aria-hidden', 'true');
    el.textContent = ok ? 'Acreditado' : 'Brecha';
    sheet.appendChild(el);
    el.animate(
      [{ transform: 'scale(1.5)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }],
      { duration: 200, easing: 'cubic-bezier(.3, 0, .2, 1)', fill: 'forwards' }
    );
    sheet.animate([{ transform: 'none' }, { transform: 'translateY(2px)' }, { transform: 'none' }], { duration: 220, delay: 150 });
    window.setTimeout(function () {
      el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: 'forwards' });
    }, 520);
    window.setTimeout(function () { el.remove(); }, 820);
  }

  if (sheet && body) {
    body.addEventListener('click', function (e) {
      var t = e.target.closest('button');
      if (!t || busy) return;
      var action = t.getAttribute('data-action');
      if (action === 'start') { go(0, 1); return; }
      if (action === 'back') { go(step - 1, -1); return; }
      if (action === 'restart') { answers = new Array(QUESTIONS.length); go(-1, -1); return; }
      if (t.classList.contains('answer')) {
        answers[step] = t.getAttribute('data-v');
        var all = body.querySelectorAll('.answer');
        for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-pressed', all[i] === t ? 'true' : 'false');
        if (reduced) { go(step + 1, 1); return; }
        busy = true;
        stamp(answers[step] === 'si');
        window.setTimeout(function () { busy = false; go(step + 1, 1); }, 430);
      }
    });

    body.addEventListener('submit', function (e) {
      e.preventDefault();
      handleSubmit(e.target);
    });

    sheet.addEventListener('keydown', function (e) {
      if (step < 0 || step >= QUESTIONS.length || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.target.tagName === 'INPUT') return;
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= 3) {
        var b = body.querySelectorAll('.answer')[n - 1];
        if (b) { e.preventDefault(); b.click(); }
      }
    });

    updateEdges();
  }

  /* ------------------------------------------------------------------
     Fechas de la norma: estado calculado respecto de hoy
     ------------------------------------------------------------------ */

  var DAY = 86400000;
  function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  function sinceText(from, to) {
    var months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
    if (to.getDate() < from.getDate()) months--;
    if (months < 1) {
      var d = Math.round((to - from) / DAY);
      return d === 0 ? 'Rige desde hoy' : 'Exigible hace ' + plural(d, 'día', 'días');
    }
    var y = Math.floor(months / 12), m = months % 12;
    var parts = [];
    if (y) parts.push(plural(y, 'año', 'años'));
    if (m) parts.push(plural(m, 'mes', 'meses'));
    return 'Vigente hace ' + parts.join(' y ');
  }

  var today = startOfDay(new Date());
  var rows = document.querySelectorAll('.cell[data-date]');
  for (var r = 0; r < rows.length; r++) {
    var parts = rows[r].getAttribute('data-date').split('-');
    var date = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    var diff = Math.round((date - today) / DAY);
    var status = rows[r].querySelector('.reg-status');
    if (!status) continue;
    if (diff > 0) {
      status.textContent = diff === 1 ? 'Rige mañana' : 'Rige en ' + plural(diff, 'día', 'días');
      if (diff <= 90) rows[r].classList.add('is-soon');
    } else {
      status.textContent = sinceText(date, today);
      if (diff > -60) rows[r].classList.add('is-soon');
    }
  }

  /* ------------------------------------------------------------------
     Comparador Hoy / Con ACUP
     ------------------------------------------------------------------ */

  var compare = document.querySelector('.compare');
  if (compare) {
    var btns = compare.querySelectorAll('.switch-btn');
    var setState = function (s) {
      compare.setAttribute('data-state', s);
      for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-set') === s ? 'true' : 'false');
      compare.querySelector('.clist-hoy').setAttribute('aria-hidden', s === 'hoy' ? 'false' : 'true');
      compare.querySelector('.clist-acup').setAttribute('aria-hidden', s === 'acup' ? 'false' : 'true');
      compare.querySelector('.mess').setAttribute('aria-hidden', s === 'hoy' ? 'false' : 'true');
      compare.querySelector('.brain').setAttribute('aria-hidden', s === 'acup' ? 'false' : 'true');
    };
    for (var b = 0; b < btns.length; b++) {
      btns[b].addEventListener('click', function () { setState(this.getAttribute('data-set')); });
    }
    compare.querySelector('.switch').addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        var s = e.key === 'ArrowRight' ? 'acup' : 'hoy';
        setState(s);
        compare.querySelector('[data-set="' + s + '"]').focus();
      }
    });
    setState('hoy');
  }

  /* ------------------------------------------------------------------
     Preguntas frecuentes
     ------------------------------------------------------------------ */

  var qs = document.querySelectorAll('.faq-q');
  for (var f = 0; f < qs.length; f++) {
    qs[f].addEventListener('click', function () {
      var open = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }

  /* ------------------------------------------------------------------
     WhatsApp pendiente
     ------------------------------------------------------------------ */

  var wa = document.querySelector('[data-pending="WhatsApp"]');
  var waNote = document.getElementById('wa-note');
  if (wa && waNote) {
    var showNote = function (e) { e.preventDefault(); waNote.hidden = false; };
    wa.addEventListener('click', showNote);
    wa.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') showNote(e); });
  }

  /* ------------------------------------------------------------------
     Índice lateral
     ------------------------------------------------------------------ */

  if ('IntersectionObserver' in window) {
    var links = document.querySelectorAll('.tabs a[data-spy]');
    var map = {};
    for (var l = 0; l < links.length; l++) map[links[l].getAttribute('data-spy')] = links[l];
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          for (var k in map) map[k].classList.remove('is-active');
          map[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* Cuenta regresiva real hasta la próxima fecha legal (se actualiza cada 30 s). */
  var countCell = document.querySelector('.cell-count[data-date]');
  if (countCell) {
    var cp = countCell.getAttribute('data-date').split('-');
    var target = new Date(+cp[0], +cp[1] - 1, +cp[2]);
    var put = function (u, v) { var n = countCell.querySelector('[data-unit="' + u + '"]'); if (n) n.textContent = String(v); };
    var tick = function () {
      var ms = Math.max(0, target - new Date());
      put('d', Math.floor(ms / 86400000));
      put('h', Math.floor(ms / 3600000) % 24);
      put('m', Math.floor(ms / 60000) % 60);
    };
    tick();
    window.setInterval(tick, 30000);
  }

  /* Borde que se ilumina donde está el puntero (solo con mouse). */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var spots = document.querySelectorAll('.panel, .cell, .plan, .compare-body');
    Array.prototype.forEach.call(spots, function (el) {
      el.classList.add('spot');
      el.addEventListener('pointermove', function (e) {
        var b = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - b.left) + 'px');
        el.style.setProperty('--my', (e.clientY - b.top) + 'px');
      });
    });
  }

  /* ------------------------------------------------------------------
     Entrada de la portada: el titular sube línea por línea, luego la
     bajada y los apoyos; la hoja se asienta y la pila se abre en abanico.
     ------------------------------------------------------------------ */

  (function enter() {
    var root = document.documentElement;
    var h1 = document.querySelector('.hero h1[data-enter]');
    if (!h1 || reduced || !h1.animate) { root.classList.add('m-enter-done', 'is-entered'); return; }
    if (root.classList.contains('m-enter-done')) { root.classList.add('is-entered'); return; }

    // cada palabra en su máscara (los nodos se conservan, solo se envuelven)
    var words = [];
    (function wrap(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var parts = n.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(t)); return; }
            var m = document.createElement('span'); m.className = 'mask';
            var w = document.createElement('span'); w.className = 'mw'; w.textContent = t;
            m.appendChild(w); frag.appendChild(m); words.push(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) { wrap(n); }
      });
    })(h1);

    // agrupar por línea según su posición
    var lines = [], last = null;
    words.forEach(function (w) {
      var top = Math.round(w.parentNode.offsetTop);
      if (last === null || Math.abs(top - last) > 4) { lines.push([]); last = top; }
      lines[lines.length - 1].push(w);
    });
    var gap = Math.min(80, 240 / Math.max(1, lines.length - 1));

    root.classList.add('m-enter-done');
    lines.forEach(function (line, i) {
      line.forEach(function (w) {
        w.animate([{ transform: 'translateY(108%)' }, { transform: 'none' }],
          { duration: 700, delay: i * gap, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' });
      });
    });
    var after = (lines.length - 1) * gap + 350;

    // subrayado coral que se dibuja
    var hl = h1.querySelector('.hl');
    if (hl) hl.animate([{ backgroundSize: '0% .11em' }, { backgroundSize: '100% .11em' }],
      { duration: 650, delay: after + 260, easing: 'cubic-bezier(.65, 0, .35, 1)', fill: 'backwards' });

    var followers = [document.querySelector('.hero-badge'), document.querySelector('.lede')].concat(Array.prototype.slice.call(document.querySelectorAll('.supports li')));
    followers.forEach(function (el, i) {
      if (!el) return;
      el.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
        { duration: 520, delay: after + i * 60, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' });
    });

    // el panel del diagnóstico se asienta
    if (sheet) sheet.animate([{ opacity: 0, transform: 'translateY(18px) scale(.98)' }, { opacity: 1, transform: 'none' }],
      { duration: 900, delay: 160, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' });
    window.setTimeout(function () { root.classList.add('is-entered'); }, after + 1000);
  })();

  /* ------------------------------------------------------------------
     Barra fija en celular: aparece cuando el diagnóstico salió de la
     pantalla y se esconde sobre la contratapa.
     ------------------------------------------------------------------ */

  var bar = document.querySelector('.actionbar');
  var diagEl = document.getElementById('diagnostico');
  var backEl = document.querySelector('.back');
  if (bar && diagEl && backEl) {
    var ticking = false;
    var upd = function () {
      ticking = false;
      var past = diagEl.getBoundingClientRect().bottom < 0;
      var atBack = backEl.getBoundingClientRect().top < window.innerHeight;
      bar.classList.toggle('is-up', past && !atBack);
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  }

  /* ------------------------------------------------------------------
     Tema oscuro / claro (se recuerda en este navegador)
     ------------------------------------------------------------------ */
  var themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    var label = function () {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      themeBtn.setAttribute('aria-label', light ? 'Cambiar a versión oscura' : 'Cambiar a versión clara');
      var mc = document.querySelector('meta[name="theme-color"]');
      if (mc) mc.setAttribute('content', light ? '#F5F6F9' : '#05070D');
    };
    themeBtn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('acup-theme', next); } catch (e) {}
      label();
    });
    label();
  }

  /* El botón de la portada abre directamente el diagnóstico. */
  var heroCta = document.querySelector('[data-scroll-diag]');
  if (heroCta) heroCta.addEventListener('click', function (e) {
    var startBtn = document.querySelector('[data-action="start"]');
    var panelEl = document.getElementById('diagnostico');
    if (!startBtn || !panelEl) return;
    e.preventDefault();
    startBtn.click();
    panelEl.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  });

  /* ------------------------------------------------------------------
     Terreno: la escena queda fija y los registros aparecen uno a uno,
     cada uno unido por una línea a su punto en la foto.
     ------------------------------------------------------------------ */
  var field = document.querySelector('.field');
  if (field) {
    var stage = field.querySelector('.field-stage');
    var cards = Array.prototype.slice.call(field.querySelectorAll('.fcard'));
    var countEl = field.querySelector('[data-field-n]');
    var NS = 'http://www.w3.org/2000/svg';
    var wires = null, hots = [], lines = [], fLive = false, shown = -1;
    var fits = function () { return !reduced && window.matchMedia('(min-width: 1024px)').matches && window.innerHeight >= 640; };

    var layout = function () {
      if (!fLive) return;
      var sr = stage.getBoundingClientRect();
      cards.forEach(function (c, i) {
        var cs = getComputedStyle(c);
        var hx = parseFloat(cs.getPropertyValue('--x')) / 100 * sr.width;
        var hy = parseFloat(cs.getPropertyValue('--y')) / 100 * sr.height;
        hots[i].style.left = hx + 'px'; hots[i].style.top = hy + 'px';
        var cr = c.getBoundingClientRect();
        var cx = cr.left - sr.left, cy = cr.top - sr.top;
        var tx = hx < cx ? cx : (hx > cx + cr.width ? cx + cr.width : hx);
        var ty = hy < cy ? cy : (hy > cy + cr.height ? cy + cr.height : cy + cr.height / 2);
        lines[i].setAttribute('x1', hx); lines[i].setAttribute('y1', hy);
        lines[i].setAttribute('x2', tx); lines[i].setAttribute('y2', ty);
      });
    };
    var showN = function (n) {
      if (n === shown) return;
      shown = n;
      cards.forEach(function (c, i) {
        var on = i < n;
        c.classList.toggle('is-on', on); hots[i].classList.toggle('is-on', on); lines[i].classList.toggle('is-on', on);
      });
      if (countEl) countEl.textContent = String(n);
    };
    var onScroll = function () {
      if (!fLive) return;
      var r = field.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      showN(Math.max(1, Math.min(cards.length, Math.floor(p * (cards.length + 0.6)) + 1)));
    };
    var goLive = function () {
      if (fLive) return;
      fLive = true;
      field.classList.add('is-live');
      wires = document.createElementNS(NS, 'svg'); wires.setAttribute('class', 'wires'); wires.setAttribute('aria-hidden', 'true');
      stage.appendChild(wires);
      cards.forEach(function () {
        var h = document.createElement('span'); h.className = 'hot'; h.setAttribute('aria-hidden', 'true'); stage.appendChild(h); hots.push(h);
        var l = document.createElementNS(NS, 'line'); wires.appendChild(l); lines.push(l);
      });
      shown = -1; layout(); onScroll();
    };
    var goRest = function () {
      if (!fLive) return;
      fLive = false;
      field.classList.remove('is-live');
      if (wires) wires.remove();
      hots.forEach(function (h) { h.remove(); });
      hots = []; lines = []; wires = null;
      cards.forEach(function (c) { c.classList.remove('is-on'); });
      if (countEl) countEl.textContent = String(cards.length);
    };
    var syncField = function () { if (fits()) goLive(); else goRest(); layout(); };
    syncField();
    var ft = 0;
    window.addEventListener('resize', function () { clearTimeout(ft); ft = setTimeout(syncField, 120); });
    var fTick = false;
    window.addEventListener('scroll', function () { if (!fTick) { fTick = true; requestAnimationFrame(function () { fTick = false; onScroll(); }); } }, { passive: true });
  }
})();
