# ACUP — Landing page

Sitio de ACUP: asesoría en prevención de riesgos laborales, auditoría de Sistema Integrado de Gestión (SIG) y software propio de inspecciones y observación de conducta.

## Estructura

Sitio estático, sin build ni dependencias que instalar. La única carga externa son las tipografías de Google Fonts (Barlow Condensed, Inter, IBM Plex Mono, Montserrat).

| Archivo | Contenido |
|---|---|
| `index.html` | Landing: hero, servicios, cómo trabajamos, filosofía, precios, CTA y footer |
| `sobre-acup.html` | Quiénes somos: constitución de la empresa y palabras del gerente general |
| `styles.css` | Todos los estilos, compartidos por ambas páginas |

Para verlo en local basta con abrir `index.html` en el navegador.

## Marca

| Token | Valor | Uso |
|---|---|---|
| `--navy` | `#30408E` | Color principal, de las letras del logo |
| `--navy-900` | `#141C42` | Base de las secciones y tarjetas oscuras |
| `--coral` | `#F85A7A` | Acento puntual: CTA, palabra destacada del titular, estados |
| `--paper` | `#F2F4F8` | Fondo claro (blanco frío, no crema) |

El coral funciona como el punto del logo: acento contenido, nunca fondo grande.

Tipografías: Barlow Condensed en titulares, Inter en cuerpo, IBM Plex Mono en datos y tags, Montserrat en el wordmark `acup.`

## Pendiente antes de publicar

Contenido a completar con dato real. En el código va marcado con comentarios `REEMPLAZAR`; en `sobre-acup.html` además se ve en pantalla, en coral con subrayado punteado (clase `.todo`), para que no se publique por descuido.

**`sobre-acup.html`**

- Año de constitución y ciudad
- Razón social
- Rubros principales con los que se trabaja
- La cita del gerente general es un **borrador** redactado en el tono del sitio, no una declaración real de Sebastián Tobar. Hay que aprobarla o reescribirla.

**`index.html`**

- La bitácora de terreno del hero es un ejemplo ilustrativo de una jornada, así rotulado en pantalla
- Contacto: correo de contacto definitivo
