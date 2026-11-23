---
name: ACUP
description: Asesoría de prevención de riesgos presentada como producto tech, azul noche con paneles de interfaz y un solo acento coral.
colors:
  night: "#05070D"
  night-2: "#090C15"
  panel: "#0C1019"
  panel-raised: "#172056"
  navy: "#30408E"
  line: "rgba(170, 182, 255, .11)"
  line-strong: "rgba(170, 182, 255, .2)"
  text: "#E9ECFB"
  white: "#FFFFFF"
  muted: "#A3ABD3"
  dim: "#8C92AE"
  coral: "#F85A7A"
  coral-hi: "#FF7792"
  coral-ink: "#FF8FA5"
  coral-wash: "rgba(248, 90, 122, .12)"
  on-coral: "#12081A"
  paper: "#FFFFFF"
  paper-ink: "#161D45"
  paper-muted: "#555D86"
  paper-line: "#E3E6EE"
  paper-alert: "#BF2A4C"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, .9rem + 5.2vw, 5.4rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.048em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 1.1rem + 2.8vw, 3.4rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 1.15rem + 1.5vw, 2.3rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title-sm:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  numeral:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(3rem, 2rem + 4vw, 5.6rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.05em"
    fontFeature: "tnum"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.3
    fontFeature: "tnum"
  wordmark:
    fontFamily: "Montserrat, Geist, sans-serif"
    fontSize: "1.55rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
rounded:
  xs: "6px"
  sm: "8px"
  md: "12px"
  visual: "14px"
  lg: "18px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  page: "1200px"
  grid-gap: "12px"
  cell: "clamp(22px, 2.6vw, 30px)"
  section: "clamp(80px, 11vw, 140px)"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.on-coral}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: ".7em 1.2em"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.coral-hi}"
    textColor: "{colors.on-coral}"
  button-ghost:
    backgroundColor: "rgba(255, 255, 255, .03)"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: ".7em 1.2em"
    height: "46px"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
  cell:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.muted}"
    rounded: "{rounded.lg}"
    padding: "{spacing.cell}"
  cell-count:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "{spacing.cell}"
  answer:
    backgroundColor: "rgba(255, 255, 255, .03)"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
    height: "54px"
  answer-selected:
    backgroundColor: "{colors.coral-wash}"
    textColor: "{colors.text}"
  input:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "46px"
  paper-window:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.md}"
---

# Design System: ACUP

## Overview

**Creative North Star: "El producto tech"**

ACUP se presenta como software serio, no como folleto de consultora: suelo azul noche teñido del marino de marca, paneles de interfaz con borde fino y radio generoso, tipografía Geist grande y apretada. La página demuestra en vez de describir: el autodiagnóstico es una interfaz real que se usa en el primer pantallazo, y las vistas de ACUP Brain son ventanas de producto.

El color trabaja por escasez. Todo es azul noche, blanco y grises lavanda; el coral aparece solo donde hay una decisión o una brecha. El marino de marca sale del fondo una sola vez, como relleno sólido de la celda de cuenta regresiva. El blanco "papel" queda reservado para mostrar la plataforma por dentro.

La profundidad viene del tono (suelo, panel, panel elevado) y del hairline, no de sombras visibles; la única sombra larga y difusa ancla los paneles y ventanas de producto sobre el suelo oscuro.

**Key Characteristics:**
- Suelo oscuro único (#05070D) con paneles #0C1019 y bordes de 1px translúcidos.
- Geist para todo el texto, con tracking negativo que crece con el tamaño.
- Geist Mono solo para datos: contadores, fechas, metadatos, teclas.
- Coral como único acento: botón primario, brecha, estado activo, foco.
- Interfaz de producto real como imagen principal.

## Colors

Una noche azul monocromática con un solo acento cálido.

### Primary
- **Coral señal** (coral): botón primario, `aria-pressed`, marcador de brecha, segmento actual de la regla de progreso, número de paso activo, foco (`outline` 2px), selección de texto, borde spotlight bajo el puntero. Siempre con texto oscuro encima (on-coral), nunca blanco.
- **Coral vivo** (coral-hi): solo hover del botón primario.
- **Coral legible** (coral-ink): coral aclarado para texto pequeño sobre el suelo oscuro (errores, "pendiente", vencimientos cercanos).
- **Lavado coral** (coral-wash): fondo de la respuesta elegida y de avisos pendientes.

### Secondary
- **Marino de marca** (navy): relleno sólido de la celda de cuenta regresiva; en las ventanas papel, color de "al día" (puntos, puntaje, fechas). Es la raíz del tinte del suelo.

### Neutral
- **Noche** (night): suelo de toda la página y tinte de la cabecera translúcida.
- **Noche profunda** (night-2): banda de "Cómo funciona", fondo de inputs y del collage "hoy".
- **Panel** (panel): superficie de paneles, celdas, planes y comparador.
- **Panel elevado** (panel-raised): solo el plan recomendado.
- **Hairline / Hairline fuerte** (line, line-strong): bordes y divisores; el fuerte para controles y paneles de producto.
- **Texto / Blanco / Atenuado / Tenue** (text, white, muted, dim): blanco para titulares, text para cuerpo, muted para bajadas, dim para metadatos.
- **Papel** (paper, paper-ink, paper-muted, paper-line, paper-alert): exclusivos de las ventanas ilustrativas de ACUP Brain.

### Named Rules
**The One Signal Rule.** El coral marca lo que pide acción o lo que falta. Si un elemento coral no es un botón, una brecha, un estado activo o el foco, sobra.

**The Paper Is The Product Rule.** Las superficies blancas existen solo como ventanas de la plataforma. Ninguna sección ni tarjeta de marketing usa fondo claro.

**The Navy Once Rule.** El marino sólido rellena una sola superficie por vista (la cuenta regresiva); el resto del tiempo vive como tinte del suelo.

## Typography

**Display Font:** Geist (con system-ui)
**Body Font:** Geist (con system-ui)
**Label/Mono Font:** Geist Mono (con ui-monospace)
**Wordmark:** Montserrat Bold, solo para "acup"

**Character:** Una sola familia sans técnica, peso 600 en titulares y tracking negativo agresivo; la mono hace de lectura de instrumento.

### Hierarchy
- **Display** (600, hasta 5.4rem, 0.98): titular de portada y cierre, máx. 12 a 14ch.
- **Headline** (600, hasta 3.4rem, 1.04): titulares de sección; la segunda mitad en tono tenue (dim) para dar contrapunto.
- **Title** (600, hasta 2.3rem): titular dentro del panel de diagnóstico.
- **Title-sm** (600, 1.3rem): títulos de celdas y planes.
- **Numeral** (600, hasta 5.6rem, 0.9, tabular): cuenta regresiva y puntaje.
- **Body** (400, 1.0625rem, 1.55): texto corrido, bajadas a 34 a 46ch, respuestas largas a 58 a 62ch.
- **Label** (Geist Mono 500, ~0.8rem, tabular): fechas, contadores "3/10", estado de inscripción, chips de temas, teclas.

### Named Rules
**The Tightening Rule.** El tracking baja con el tamaño: -0.048em en display, -0.04em en headline, -0.02em en títulos chicos, neutro en cuerpo.

**The Mono Means Data Rule.** Geist Mono solo para valores medibles (fechas, cuentas, metadatos, teclas). Nunca para titulares ni frases.

**The Wordmark Only Rule.** Montserrat se usa únicamente en el logotipo "acup" con su punto coral.

## Layout

Columna de 1200px con gutter fluido (16 a 40px). Secciones separadas por mucho aire (80 a 140px) y encabezados de sección en fila: titular a la izquierda, bajada corta alineada abajo a la derecha. La portada es dos columnas desde 1000px (texto 1.08fr, panel 1fr) sobre una retícula de 64px enmascarada en elipse; bajo 1000px el panel de diagnóstico sube justo después de la bajada. Las fechas usan un bento (1.3fr 1fr 1fr) con la celda marina ocupando dos filas; planes en tres columnas desde 900px. Gap estándar entre tarjetas: 12px. En celular aparece una barra de acción coral fija abajo.

## Elevation & Depth

Sistema tonal: profundidad por capas de azul (noche, noche profunda, panel, panel elevado) y bordes hairline. Las tarjetas de contenido (celdas, planes) no tienen sombra. Solo los paneles de producto y las ventanas papel llevan una sombra larga y difusa que los separa del suelo.

### Shadow Vocabulary
- **Panel** (`box-shadow: 0 1px 0 rgba(255,255,255,.04) inset, 0 30px 70px -30px rgba(0,0,0,.75)`): panel de diagnóstico.
- **Ventana papel** (`box-shadow: 0 40px 80px -30px rgba(0,0,0,.8)`): ventanas de ACUP Brain.
- **Barra flotante** (`box-shadow: 0 18px 32px -12px rgba(0,0,0,.7)`): barra de acción móvil.

### Named Rules
**The Hairline Over Shadow Rule.** Una tarjeta se separa del suelo con tono y un borde de 1px; la sombra se reserva para lo que es interfaz.

## Shapes

Esquinas suaves y consistentes: 18px para todo contenedor grande (panel, celda, plan, comparador), 14px para visuales internos, 12px para ventanas, respuestas y bloques de formulario, 6 a 9px para chips, marcas e íconos enmarcados. Todo lo accionable de primer nivel es píldora (botones, input, interruptor, sello "Recomendado"). Íconos de trazo 1.6 a 1.8px en sprite SVG, a menudo dentro de un cuadro de 28 a 34px con borde hairline.

## Components

### Buttons
- **Shape:** píldora (999px), altura 46px (40 chico, 54 grande).
- **Primary:** fondo coral, texto on-coral, peso 600.
- **Hover / Focus:** sube 1px (2px el grande), la flecha final avanza 3px, coral vivo; al presionar baja 1px y escala .985 en 90ms. Foco: anillo coral 2px.
- **Ghost / Line:** fondo blanco 3% o transparente con borde hairline fuerte; en hover el borde se aclara.
- **Text:** sin caja, muted que pasa a blanco.

### Chips
- **Style:** chips de temas en mono .78rem, radio 6px, borde hairline, fondo blanco 2.5%. Badge de estado en píldora con punto coral pulsante.

### Cards / Containers
- **Corner Style:** 18px.
- **Background:** panel; celda de cuenta regresiva en marino; plan recomendado en panel elevado con borde coral al 50%.
- **Shadow Strategy:** ninguna (ver Elevation & Depth).
- **Border:** 1px hairline.
- **Internal Padding:** 22 a 32px fluido.

### Inputs / Fields
- **Style:** píldora de 46px, fondo noche profunda, borde hairline fuerte, cursor coral.
- **Focus:** borde coral más halo coral de 3px al 22%.
- **Error:** borde coral y mensaje en coral legible.

### Navigation
- **Style:** cabecera fija con noche al 74% y blur de 14px, borde inferior hairline; logotipo a la izquierda y botones chicos a la derecha. En celular se ocultan los secundarios y aparece la barra de acción inferior.

### Panel de producto (autodiagnóstico)
Panel con barra superior (logotipo, título, metadato mono), regla de 10 segmentos (blanco hecho, coral actual), respuestas en botones de 54px con marca cuadrada y tecla de atajo. Al responder, un sello mono en mayúsculas ("Acreditado" en blanco o "Brecha" en coral) aparece escalando desde 1.5 en 200ms y se desvanece; el panel acusa el golpe con un desplazamiento de 2px. El borde se ilumina en coral siguiendo al puntero (spotlight).

### Comparador
Interruptor en píldora con pulgar que se desliza (450ms, ease de entrada) y cambia de blanco a coral. "Hoy" es un collage de papeles sueltos inclinados sobre fondo punteado; "Con ACUP" es una ventana papel cuyas filas entran escalonadas cada 70ms tras la salida del collage.

### Ventana papel (ACUP Brain)
Ventana blanca de 12 a 14px con barra gris #F6F7FB, tabla o lista con divisores paper-line, estados con punto marino (al día) o coral (vence), avisos en lavado rosa con ícono paper-alert.

### Movimiento
Entrada del titular por palabras en máscara (700ms, escalonado por línea), subrayado coral que se dibuja después y seguidores que suben 12px. Dos momentos del kit: enunciado con resaltado de palabras y "Cómo funciona" con capítulos fijados cuyo número activo se rellena de coral. Ease base `cubic-bezier(.2,.8,.2,1)`, entrada `cubic-bezier(.22,1,.36,1)`; estados en 150ms. Con movimiento reducido todo queda instantáneo.

## Do's and Don'ts

### Do:
- **Do** mantener el suelo noche (#05070D) en toda página; separar secciones con aire y hairlines, no con bandas de color.
- **Do** mostrar la plataforma como interfaz real (panel oscuro o ventana papel) en vez de ilustraciones o íconos grandes.
- **Do** poner texto oscuro (#12081A) sobre todo relleno coral.
- **Do** usar Geist Mono con cifras tabulares para fechas, cuentas y metadatos.
- **Do** dar a los titulares de sección una segunda mitad en tono tenue.

### Don't:
- **Don't** usar el coral para decorar: ni fondos de sección, ni gradientes, ni texto de cuerpo.
- **Don't** usar fondos blancos fuera de las ventanas de ACUP Brain.
- **Don't** usar Montserrat fuera del logotipo ni Geist Mono en titulares.
- **Don't** agregar sombras a tarjetas de contenido; la sombra es solo para paneles de producto.
- **Don't** poner etiquetas o antetítulos sobre los titulares de sección.

## Versión clara y fotografía (actualización 23-11-2026)

- Dos temas con el mismo sistema: oscuro (por defecto, `#05070D`) y claro (`#F5F6F9`, paneles blancos, texto `#0E1330`). El visitante cambia con el botón sol/luna; se recuerda en el navegador y también se elige por enlace con `?tema=claro` u `?tema=oscuro`.
- La portada con foto y la escena de terreno son siempre oscuras; ambas fotos se funden con el fondo de la página (máscara degradada), sin cortes duros.
- Fotografías generadas con IA en Google Flow (`assets/img/hero.jpg`, `assets/img/terreno.jpg`), marcadas en el HTML como escenas ilustrativas. Reemplazar por fotos reales cuando existan.
- Escena de terreno: la foto queda fija al hacer scroll y aparecen registros de ejemplo en tarjetas de vidrio unidas por líneas punteadas a puntos de la foto.
