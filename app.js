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

  function render() {
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
        window.setTimeout(function () { go(step + 1, 1); }, reduced ? 0 : 140);
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
  var rows = document.querySelectorAll('.reg-row[data-date]');
  for (var r = 0; r < rows.length; r++) {
    var parts = rows[r].getAttribute('data-date').split('-');
    var date = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    var diff = Math.round((date - today) / DAY);
    var status = rows[r].querySelector('.reg-status');
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
})();
