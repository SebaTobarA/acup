# ACUP · Landing

Landing de una sola página de ACUP SpA: asesoría de prevención de riesgos que pone al día a tu empresa y la mantiene al día, con la plataforma ACUP Brain incluida. `PRODUCT.md` manda en todo lo que es verdad del producto y `BRIEF.md` define la estructura y los textos.

## Estructura

Sitio estático para GitHub Pages, sin build ni dependencias. Las tipografías se sirven desde el propio sitio (`assets/fonts/`).

| Archivo | Contenido |
|---|---|
| `index.html` | La página completa: portada con autodiagnóstico, fechas de la norma, comparador, cómo funciona, planes, quién está detrás, preguntas frecuentes y cierre |
| `styles.css` | Todos los estilos |
| `app.js` | Autodiagnóstico, estado de las fechas respecto de hoy, comparador, acordeón e índice lateral |
| `favicon.svg`, `robots.txt`, `sitemap.xml` | Metadatos del sitio (dominio canónico `https://acup.cl/`) |

Para verlo en local:

```bash
python3 -m http.server 8765
```

y abrir http://127.0.0.1:8765/.

## Marca

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#05070D` | Fondo azul noche, teñido del marino de marca |
| `--panel` | `#0C1019` | Paneles y bloques, con borde fino |
| `--navy` | `#30408E` | Marino de marca: bloque de la cuenta regresiva y ventanas de ejemplo |
| `--coral` | `#F85A7A` | Único acento: botones principales, brechas, estados activos |

Tipografías: Geist en titulares y texto, Geist Mono solo para datos, Montserrat Bold solo en el wordmark `acup`. El sistema completo está en `DESIGN.md`.

Momentos con scroll (`assets/moments/`, de la skill design-taste-frontend): el enunciado que se ilumina (`word-highlight`) y «Cómo funciona» fijo en pantalla (`pinned-chapters`).

## Pendiente antes de publicar

En pantalla se ven en coral con subrayado punteado (clase `.todo`) para que no se publiquen por descuido.

- Precios en UF de los tres planes: `[PRECIO]`
- Visita en terreno del plan Crecimiento: `[SEGÚN ZONA]`
- Plazo de la puesta al día: `[PLAZO]`
- Condiciones de permanencia: `[CONDICIONES DE CONTRATO]`
- Número de WhatsApp: `[NÚMERO PENDIENTE]` (el botón hoy muestra un aviso y no abre nada)
- Año de fundación en «Quiénes somos»: `[AÑO]` (el texto de esa sección es provisorio y está por afinar)
- Fotos de portada y terreno: hoy son escenas generadas con IA en Google Flow; reemplazar por fotos reales cuando existan
- Servicio que recibe el correo del autodiagnóstico: poner su URL en `REPORT_ENDPOINT` dentro de `app.js`. Mientras esté vacío, el formulario no envía nada y lo dice.
- Dominio: para servir en `acup.cl` hay que configurar el dominio personalizado en GitHub Pages (archivo `CNAME` y DNS). Los metadatos ya apuntan a `https://acup.cl/`.
