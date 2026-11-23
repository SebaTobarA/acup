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
| `--navy` | `#30408E` | Color principal |
| `--navy-900` | `#1A2358` | Tapa y contratapa de la carpeta |
| `--coral` | `#F85A7A` | Acento: banderitas, brechas, timbre. Nunca fondo grande |
| `--stock` | `#E2E5EC` | Cartulina de fondo |

Tipografías: Archivo en titulares y texto, Montserrat Bold solo en el wordmark `acup`.

## Pendiente antes de publicar

En pantalla se ven en coral con subrayado punteado (clase `.todo`) para que no se publiquen por descuido.

- Precios en UF de los tres planes: `[PRECIO]`
- Visita en terreno del plan Crecimiento: `[SEGÚN ZONA]`
- Plazo de la puesta al día: `[PLAZO]`
- Condiciones de permanencia: `[CONDICIONES DE CONTRATO]`
- Número de WhatsApp: `[NÚMERO PENDIENTE]` (el botón hoy muestra un aviso y no abre nada)
- Foto real en terreno: `[FOTO PENDIENTE]`
- Servicio que recibe el correo del autodiagnóstico: poner su URL en `REPORT_ENDPOINT` dentro de `app.js`. Mientras esté vacío, el formulario no envía nada y lo dice.
- Dominio: para servir en `acup.cl` hay que configurar el dominio personalizado en GitHub Pages (archivo `CNAME` y DNS). Los metadatos ya apuntan a `https://acup.cl/`.
