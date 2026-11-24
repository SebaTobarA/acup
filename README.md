# ACUP · Landing

Landing de una sola página de ACUP SpA: asesoría de prevención de riesgos que pone al día a tu empresa y la mantiene al día, con la plataforma ACUP Brain incluida. `PRODUCT.md` manda en todo lo que es verdad del producto y `BRIEF.md` define la estructura y los textos.

## Estructura

Sitio estático en Hostinger (`domains/acup.cl/public_html`), sin build ni dependencias, detrás del DNS de Cloudflare. Las tipografías se sirven desde el propio sitio (`assets/fonts/`).

| Archivo | Contenido |
|---|---|
| `index.html` | La página completa: portada con autodiagnóstico, fechas de la norma, comparador, cómo funciona, planes, quién está detrás, preguntas frecuentes y cierre |
| `styles.css` | Todos los estilos |
| `app.js` | Autodiagnóstico, estado de las fechas respecto de hoy, comparador y acordeón |
| `informe.php` | Recibe el autodiagnóstico y envía el informe por SMTP (Hostinger) a la persona, con copia a `somos@acup.cl`. Los textos de cada brecha viven aquí |
| `privacidad.html`, `aviso-legal.html`, `404.html` | Páginas legales y de error |
| `.htaccess` | Página 404, HSTS y caché del navegador |
| `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `robots.txt`, `sitemap.xml` | Metadatos del sitio (dominio canónico `https://acup.cl/`) |

Fuera de `public_html`, en el servidor: `informe-config.php` con el buzón y la contraseña SMTP (`hola@acup.cl`, no se versiona) e `informe-data/` con los contadores del límite de envíos.

Para publicar, se suben por SSH los archivos de la tabla y `assets/` (nunca `BRIEF.md`, `PRODUCT.md`, `DESIGN.md`, `README.md` ni `.impeccable/`). Al cambiar `styles.css`, `app.js` o `assets/moments/`, subir el `?v=` en las páginas (y en el `import` de `lib.js` dentro de `moments.js`).

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

- Fotos de portada y terreno: hoy son escenas generadas con IA en Google Flow; reemplazar por fotos reales cuando existan
- WhatsApp Business: configurar el número +56 9 6517 7551 que usa el botón del cierre
- Textos de cada brecha en `informe.php` y política de privacidad: borradores por aprobar
