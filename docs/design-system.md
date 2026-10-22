# Sistema de diseño

Basado en el lenguaje visual de Resend (negro, bordes finos, un acento violeta, mono para lo
técnico), sin sus elementos de firma (cubo 3D, Domaine, wordmark). Este documento manda
sobre cualquier skill. Los tokens viven en `src/app/globals.css`.

## Principios

- Lienzo negro plano. Sin gradientes, glows ni lavados de color en fondos.
- Las capas se separan con bordes de 1px, no con sombras.
- Monocromo con un solo violeta. El violeta es para identificadores (email, handles,
  strings de código), nunca para títulos grandes ni para botones.
- Todo en mono, con convenciones de terminal (rutas, comentarios, prompt). Ver Tipografía.

## Color

| Token | Valor | Uso | Contraste sobre negro |
|---|---|---|---|
| `canvas` | `#000000` | Fondo de toda la página | — |
| `line` | `#292d30` | Divisores y bordes decorativos | 1.51 (solo decorativo) |
| `line-strong` | `#5f6368` | Bordes de botones, inputs y chips | 3.47 (AA para UI) |
| `fg` | `#ffffff` | Títulos, labels de botón | 21 |
| `fg-body` | `#f0f0f0` | Texto de lectura | 18.4 |
| `fg-muted` | `#a1a4a5` | Metadatos, texto secundario | 8.4 |
| `accent` | `#9281f7` | Identificadores en mono (email, handles, strings) | 6.7 |
| `accent-soft` | `#baa7ff` | Hover de `accent` y anillo de foco | 10.1 |
| `ok` | `#3ad389` | Solo el punto de "disponible" | 10.9 |

Descartados de la guía original: Charcoal `#464a4d` (2.35:1, no sirve para texto),
Iron `#6e727a` (4.35:1), Smoke Gray (jerarquía invertida respecto a Ash), azul de acción
`#3b9eff` (botones rellenos van contra el estilo), y los acentos rojo, ámbar y azul.

## Tipografía

Todo el sitio va en **JetBrains Mono** (estética de terminal). Una sola familia, cargada con
`next/font/google`.

| Rol | Tamaño | Peso | Interlineado | Tracking |
|---|---|---|---|---|
| Display (nombre del hero) | `clamp(2.25rem, 1rem + 5.5vw, 5rem)` | 500 | 1 | -0.05em |
| Título de sección | `clamp(1.75rem, 1.2rem + 2vw, 2.75rem)` | 500 | 1.1 | -0.04em |
| Título de contacto | `clamp(1.75rem, 1rem + 3vw, 3.5rem)` | 500 | 1.05 | -0.05em |
| Título de ítem | 18–24px | 500 | 1.25 | -0.02 / -0.03em |
| Cuerpo | 15px (16–18px en "sobre mí") | 400 | 1.6 | 0 |
| Etiqueta / metadato | 12–14px | 400 | 1.4 | 0 |

Convenciones de terminal: títulos de sección como ruta (`~/proyectos`, prefijo en
`fg-muted` y `aria-hidden`), etiquetas como comentario (`// problema`), prompt `>` en
`accent` delante del rol y del "Escríbeme". El mono es más ancho: el texto largo se limita a
~68ch.

## Forma y espacio

- Radios: 6px (`rounded-md`) para botones, chips y badges; 16px (`rounded-2xl`) para la
  ventana de terminal. Uno por componente.
- Ancho máximo 1200px. Gutter lateral 16 / 24 / 32px (móvil / tablet / escritorio).
- Separación entre secciones: 96px en móvil, 144px en escritorio.
- Se usa la escala de espaciado por defecto de Tailwind. **No** se redefine `--spacing-*`
  (el bloque de la guía original cambiaba el valor de `p-4`, `p-16`, etc.).

## Componentes

- **Botón**: fantasma. Fondo transparente, borde `line-strong`, texto `fg`, radio 6px,
  alto 44px. Hover: el borde pasa a `fg/60`. El secundario es un link de texto con flecha.
- **Ventana de terminal** (hero): borde `line`, radio 16px, tres puntos grises (sin colores
  de semáforo), contenido en mono 13–14px. Strings en `accent`, booleanos en `ok`.
- **Proyecto**: tarjeta del carrusel, borde `line` (hover `line-strong`), radio 16px.
- **Demo de proyecto**: póster 16:9 arriba de la tarjeta (lazy, borde `line`, radio 6px) con
  botón fantasma "ver demo". Abre un `<dialog>` nativo con el video en loop, sin audio y sin
  controles (ni pantalla completa, PiP ni menú contextual). Se cierra con "cerrar", Escape o
  clic fuera; al cerrar se pausa y vuelve al inicio. En mobile (< `sm`) usa la versión
  vertical (9:16); el archivo se elige al abrir. Solo MP4 (H.264): el WebM VP9 fallaba al
  decodificar en Chrome. Los videos salen de `videos/` (Remotion): `npm run render` y
  `npm run export-web`.
- **Fila de experiencia / stack**: sin tarjetas, separadas por un borde superior `line`.
- **Chip de tecnología**: logo de Simple Icons en `fg-muted` (blanco al hover), nombre en
  14px, borde `line`. Las marcas que Simple Icons no trae van solo con el nombre.
- **Logos de empresas**: nombres en texto hasta tener SVG con permiso de uso.

## Movimiento

Curvas (de la skill `animate`, reemplazan las de Tailwind): `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`
y `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`. Todo tiene variante para
`prefers-reduced-motion`.

| Pieza | Herramienta | Detalle |
|---|---|---|
| Hover de color/borde | CSS transition | 150ms, curva por defecto (≈ ease) |
| Botones del carrusel | CSS transition | `scale(0.97)` al presionar, 150ms ease-out |
| Entrada del hero | CSS animation | opacity + translateY(8px), 280ms, escalonado 60ms. El `h1` no se anima (LCP) |
| Terminal del hero | CSS animation | `cat dylan.ts` se tipea con `steps()` a 55ms/carácter; la salida aparece línea a línea cada 45ms; cursor parpadea al final |
| Marquee de tecnologías | CSS animation | 70s linear infinito. Pausa al hover (puntero fino) y con botón "pausar" (WCAG 2.2.2) |
| Carrusel de proyectos | scroll-snap nativo + JS mínimo | Flechas desplazan una tarjeta con `scrollBy` smooth; swipe y teclado los da el navegador |
| Menú del stack | CSS transition + @starting-style | Indicador se desliza con `translateY` 250ms ease-in-out; las tecnologías entran con opacity + translateY(6px), 200ms ease-out, escalonadas 30ms. Cambia con hover (mouse), clic, flechas o toque |
| Ventana de código del stack | CSS transition + @starting-style | Al elegir una tecnología (hover con mouse, foco o toque) sus líneas entran con opacity + translateX(-4px), 200ms ease-out, escalonadas 20ms. Snippets en `src/content/snippets.ts` |
| Modal de demo | CSS transition + @starting-style | `<dialog>` entra y sale con opacity + scale(0.95), 200ms ease-out; el fondo con opacity |
| Reveal al scroll | IntersectionObserver + CSS | `clip-path` 600ms ease-in-out, una sola vez. Solo con JS (clase `.js`) |

Excepciones a "UI < 300ms" (terminal, marquee, reveal): son movimiento de marketing o
explicativo que se ve una vez, no respuesta a una acción del usuario.

Con movimiento reducido: la terminal se muestra completa, el marquee se vuelve una lista
estática, los reveals no ocultan nada y el carrusel desplaza sin animación.
