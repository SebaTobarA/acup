---
name: ACUP
description: Asesoría de prevención de riesgos presentada como la carpeta de acreditación que una empresa entrega a un cliente grande.
colors:
  navy: "#30408E"
  navy-700: "#283679"
  navy-900: "#1A2358"
  navy-950: "#141B47"
  ink: "#161D45"
  text: "#2B3259"
  muted: "#555D86"
  stock: "#E2E5EC"
  stock-deep: "#D5D9E3"
  sheet: "#FFFFFF"
  rule: "#DDE1EA"
  rule-strong: "#C2C8D7"
  coral: "#F85A7A"
  coral-ink: "#BF2A4C"
  coral-wash: "#FEEBEF"
  cover-text: "#EEF0FA"
  cover-muted: "#BCC4EA"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.15rem, 1.2rem + 3.9vw, 4.25rem)"
    fontWeight: 640
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.15rem + 2.3vw, 3rem)"
    fontWeight: 640
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.55rem, 1.1rem + 1.6vw, 2.3rem)"
    fontWeight: 620
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title-sm:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 650
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "lnum"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.04em"
    fontFeature: "tnum"
  numeral:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3.6rem, 2.6rem + 4vw, 5.6rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.05em"
    fontFeature: "tnum"
  wordmark:
    fontFamily: "Montserrat, Archivo, sans-serif"
    fontSize: "1.7rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
rounded:
  xs: "3px"
  sm: "4px"
  sheet: "6px"
  control: "8px"
  tab: "10px"
  folder: "12px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  page: "1240px"
  section: "clamp(64px, 9vw, 120px)"
  sheet-pad: "clamp(20px, 5vw, 72px)"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.sheet}"
    padding: "0.7em 1.25em"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.navy-900}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.sheet}"
    padding: "0.7em 1.25em"
    height: "46px"
  button-quiet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.navy}"
    rounded: "{rounded.sheet}"
    padding: "0.55em 1em"
    height: "42px"
  button-coral:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.navy-950}"
    rounded: "{rounded.sheet}"
    padding: "0.7em 1.25em"
    height: "46px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.sheet}"
    rounded: "{rounded.sheet}"
    padding: "0.7em 1.25em"
    height: "46px"
  sheet:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.sheet}"
    padding: "clamp(40px, 5vw, 68px) clamp(20px, 5vw, 72px)"
  folder:
    backgroundColor: "{colors.navy-900}"
    textColor: "{colors.cover-text}"
    rounded: "{rounded.folder}"
  answer:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "12px 16px"
    height: "56px"
  input:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "0 14px"
    height: "48px"
  edge-tab:
    backgroundColor: "{colors.navy-900}"
    textColor: "{colors.cover-muted}"
    padding: "14px 8px 14px 9px"
  edge-tab-active:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.sheet}"
---

# Design System: ACUP

## Overview

**Creative North Star: "La carpeta de acreditación"**

La página es la carpeta que una empresa ordenada entrega a un cliente grande: cartulina gris fría con fibra como fondo, una tapa marino profundo que abre el documento y lo cierra (contratapa), hojas blancas foliadas ("Hoja 01", "Hoja 02"…) con canto y sombra corta, pestañas marino en el canto derecho como índice. El coral es tinta de marcado: aparece solo donde falta algo o donde se marca algo.

El tono es cercano pero riguroso: tipografía Archivo de peso medio, titulares apretados, registros con líneas finas en lugar de cajas. La densidad es la de un documento bien diagramado, no la de un tablero. Se rechaza el hero de consultora con titular y fila de tarjetas con iconos.

**Key Characteristics:**
- Tres materiales: cartulina (fondo), hoja (contenido), tapa marino (apertura y cierre).
- Cada sección es una hoja foliada; dentro de la hoja, filas separadas por reglas, nunca cajas anidadas.
- Coral reservado para banderitas, brechas, timbre, el paso actual y el foco.
- Movimiento de papel: la hoja se archiva hacia la izquierda y la siguiente entra desde la derecha.

## Colors

Marino y gris frío casi monocromos, con un solo acento coral que funciona como marcador.

### Primary
- **Marino ACUP** (#30408E): color del logo. Botón primario, enlaces, íconos de "cumple", pestaña activa, cifras y fechas del registro.
- **Marino tapa** (#1A2358): cuerpo de la carpeta, tapa interior, pestaña de cabecera, pestañas del canto y contratapa, siempre con la fibra clara encima. Hover del botón primario.
- **Marino hover** (#283679) y **Marino noche** (#141B47): hover de pestañas del canto; texto sobre coral.

### Secondary
- **Coral marcador** (#F85A7A): banderitas, segmentos de brecha en la barra de resultado, íconos de brecha y de "hoy", el paso actual de la regla, punto del wordmark, anillo de los apoyos, borde del timbre, anillo de foco.
- **Coral tinta** (#BF2A4C): coral legible como texto: fechas próximas, estados de vencimiento, errores, texto del timbre.
- **Coral lavado** (#FEEBEF): fondo de avisos pendientes y de la alerta de la plataforma.

### Neutral
- **Tinta** (#161D45): titulares y texto fuerte.
- **Texto** (#2B3259): texto corrido.
- **Apagado** (#555D86): bajadas, notas, metadatos.
- **Cartulina** (#E2E5EC) y **Cartulina honda** (#D5D9E3): fondo de página con fibra.
- **Hoja** (#FFFFFF): superficies de contenido.
- **Regla** (#DDE1EA) y **Regla fuerte** (#C2C8D7): divisores de filas, bordes de controles.
- **Texto de tapa** (#EEF0FA) y **Texto de tapa apagado** (#BCC4EA): texto sobre marino.

### Named Rules
**The Marker Ink Rule.** El coral marca lo que falta o lo que se señala ahora. Nunca es fondo de sección ni decoración; como texto se usa siempre Coral tinta (#BF2A4C).

**The Three Materials Rule.** Toda superficie es cartulina, hoja o tapa marino. No hay un cuarto material.

## Typography

**Display Font:** Archivo (variable 100–900, autoalojada, con system-ui)
**Body Font:** Archivo
**Wordmark:** Montserrat Bold, solo para "acup"

**Character:** Una sola familia sans de pesos intermedios (520–660) con tracking negativo en los titulares; se lee como un documento técnico bien compuesto, no como publicidad.

### Hierarchy
- **Display** (640, clamp(2.15rem → 4.25rem), 1.02, -0.035em): titular de la tapa y de la contratapa (3.8rem máx.). Máx. 14–16ch.
- **Headline** (640, clamp(1.75rem → 3rem), 1.06, -0.03em): título de cada hoja. Máx. 22ch.
- **Title** (620, clamp(1.55rem → 2.3rem), 1.1): título y preguntas de la hoja del diagnóstico (preguntas: 580, hasta 1.75rem).
- **Title small** (650, 1.05–1.6rem, -0.01 a -0.025em): títulos de filas, pasos y planes.
- **Body** (400, 1.0625rem, 1.55, cifras lining): texto corrido, 40–62ch.
- **Label** (600, 0.72–0.76rem, +0.02 a +0.04em, tnum): folios de hoja, pestañas del canto.
- **Numeral** (700, clamp(3.6rem → 5.6rem), 0.9, -0.05em, tnum): puntaje del resultado.

### Named Rules
**The One Family Rule.** Todo el texto es Archivo. Montserrat existe solo para el wordmark "acup" con su punto coral.

## Layout

Página de 1240px máx. con gutter `clamp(16px, 4vw, 40px)`. La primera pieza es la carpeta abierta: en escritorio (≥980px) dos paneles 5fr / 6fr con un pliegue de lomo; la tapa a la izquierda, la bandeja con la pila de hojas a la derecha. En celular la tapa se desarma (`display: contents`) para subir la hoja del diagnóstico al primer pantallazo, y los apoyos bajan debajo.

Cada sección siguiente es una hoja ancha (`padding` lateral `clamp(20px, 5vw, 72px)`) separada por `clamp(64px, 9vw, 120px)`. Dentro de la hoja, el contenido son registros: una regla superior de 2px tinta y filas con regla de 1px. Las pestañas del canto aparecen fijas a la derecha solo desde 1180px. Quiebres usados: 520, 560, 760, 860, 900, 980, 1180px.

## Elevation & Depth

La profundidad es física y baja: las hojas tienen una sombra corta y suave que las separa de la cartulina, la carpeta levanta un poco más. Bajo la hoja del diagnóstico, los cantos apilados (hasta nueve, cada uno 1–2px desplazado y un tono más gris) dicen cuántas hojas quedan. Las superficies marino llevan una fibra clara; la cartulina, una fibra oscura.

### Shadow Vocabulary
- **Hoja** (`0 1px 1px rgba(22,29,69,.06), 0 12px 30px -16px rgba(22,29,69,.38)`): toda hoja sobre cartulina.
- **Levantado** (`0 2px 3px rgba(22,29,69,.08), 0 22px 44px -18px rgba(22,29,69,.45)`): la carpeta y la vista de la plataforma.
- **Botón** (`0 1px 1px rgba(22,29,69,.15), 0 8px 18px -10px rgba(22,29,69,.55)`): botón primario.

### Named Rules
**The Short Shadow Rule.** Las sombras son de papel: offset vertical, blur con spread negativo, tinte marino. Nunca sombras duras desplazadas ni resplandores.

## Shapes

Esquinas apenas redondeadas: 6px en hojas, botones, respuestas y campos; 12px en la carpeta (con la esquina superior izquierda recta donde nace la pestaña); 10px arriba en la pestaña de cabecera, que se une al cuerpo con una curva cóncava; 7px solo del lado izquierdo en las pestañas del canto. La banderita es un rectángulo con muesca en V (`clip-path`), vertical en la hoja del diagnóstico y horizontal asomando por el canto izquierdo en las fechas próximas. Círculos solo para marcas de respuesta, números de paso y el ícono del acordeón.

## Components

### Buttons
- **Shape:** 6px, borde 1.5px, alto mínimo 46px (54px en `btn-lg`), peso 600.
- **Primary:** fondo Marino ACUP, texto blanco, sombra de botón. Hover: Marino tapa y sube 1px.
- **Line / Quiet:** borde Regla fuerte, texto marino; Quiet sobre hoja blanca, 42px. Hover: borde marino.
- **Coral:** fondo coral, texto Marino noche; solo para la acción de contacto sobre la contratapa.
- **Ghost:** sobre marino, borde blanco al 45%.
- **Focus:** anillo coral de 2px con offset 3px (global).

### Cards / Containers
- **Hoja:** fondo blanco, 6px, sombra Hoja, folio "Hoja NN" arriba a la derecha. Es el único contenedor; dentro no hay tarjetas.

### Inputs / Fields
- **Style:** fondo blanco, borde 1.5px Regla fuerte, 6px, 48px de alto, caret coral.
- **Focus:** borde y anillo marino. **Error:** borde Coral tinta, mensaje en Coral tinta.

### Navigation
- **Pestaña de cabecera:** el wordmark sobre Marino tapa con fibra, como la pestaña de la carpeta.
- **Pestañas del canto:** texto vertical, Marino tapa, número tnum; asoman 4px y entran al hover; la activa pasa a Marino ACUP con número coral.

### Respuesta del diagnóstico
Fila de 56px con marca circular de 30px; seleccionada: borde marino, marca rellena marino. Atajo de teclado en `kbd` a la derecha.

### Banderita y timbre
La banderita coral señala la hoja activa y cada fecha próxima; el timbre ("Recomendado") es un borde coral de 2px, texto Coral tinta en mayúsculas, rotado -4°.

### Comparador
Interruptor de dos segmentos con un pulgar deslizante (tinta → marino); cambia el estado de la misma hoja, no navega.

## Do's and Don'ts

### Do:
- **Do** poner cada sección en una hoja blanca foliada sobre la cartulina.
- **Do** separar contenido con reglas de 1px y abrir registros con una regla de 2px tinta.
- **Do** usar coral solo para lo que falta o se marca, y Coral tinta (#BF2A4C) cuando es texto.
- **Do** mover las hojas con `cubic-bezier(.16, 1, .3, 1)`: salida 170ms, entrada 420ms, respetando `prefers-reduced-motion`.
- **Do** usar cifras tabulares en fechas, folios, contadores y tablas.

### Don't:
- **Don't** usar tarjetas de icono ni cajas anidadas dentro de una hoja.
- **Don't** usar Montserrat fuera del wordmark.
- **Don't** usar coral como fondo de sección o decoración.
- **Don't** usar sombras duras desplazadas ni resplandores.
- **Don't** construir un hero de titular con fila de tarjetas.
