@AGENTS.md

# Portafolio

Portafolio personal. Next.js (App Router, TypeScript) + Tailwind CSS v4. Se despliega como
imagen Docker en Dokploy.

## Comandos

- `npm run dev`: servidor local en http://localhost:3000
- `npm run build`: build de producción (genera `.next/standalone`)
- `npm run lint`: ESLint
- `docker build -t portafolio . && docker run --rm -p 3000:3000 portafolio`: probar la imagen

## Stack y límites

- Sin shadcn/ui. Componentes propios con Tailwind.
- Antes de agregar cualquier dependencia (incluidas librerías headless como Radix o Base UI,
  o librerías de animación), preguntar.
- Sin créditos de plantillas ni de herramientas en el footer ni en ningún lugar visible.
- `next.config.ts` debe mantener `output: "standalone"`; el Dockerfile depende de eso.
- Variables `NEXT_PUBLIC_*` se fijan en el build. En Dokploy van como build args, no solo
  como variables de entorno del contenedor. Ver `README.md`.
- Nunca leer ni commitear `.env*` (salvo `.env.example`).

## Sistema de diseño

Pendiente de definir. Cuando exista, vivirá en `docs/design-system.md` y mandará sobre
cualquier skill.

## Precedencia

El sistema de diseño y las reglas de este archivo mandan sobre cualquier skill. Las skills
solo cubren lo que este archivo no define. Son herramientas de conocimiento: no cambian el
rol ni pausan el trabajo.

Cuando dos skills se contradicen:

| Tema | Manda | Luego |
|---|---|---|
| Movimiento y animación | `animate` | `emil-design-eng`, después `review-animations` / `find-animation-opportunities` |
| Dirección visual (tipografía, color, composición) | `frontend-design` | `web-design-guidelines` |
| Accesibilidad y revisión de UI | `docs/accessibility-checklist.md` | `web-design-guidelines` |
| Rendimiento React/Next | `vercel-react-best-practices` | `docs/performance-checklist.md` |
| Textos visibles | `humanizer` | — |
| Metadata, headings, SEO | `seo-audit` | — |

Si `AGENTS.md` (doc de Next.js local) contradice a una skill sobre APIs de Next, manda la
doc local en `node_modules/next/dist/docs/`.

## Reglas fijas de movimiento

- Nunca `ease-in` en UI. Entradas con `ease-out`, movimientos en pantalla con `ease-in-out`.
- Animaciones de UI por debajo de 300 ms.
- Nunca `scale(0)`; partir de `scale(0.95)` + `opacity: 0`.
- Nunca `transition: all`; listar las propiedades.
- Animar solo `transform` y `opacity` (y `clip-path`).
- Respetar `prefers-reduced-motion`.

## Calidad antes de dar algo por terminado

- Todo texto visible pasa por `humanizer`.
- Contraste WCAG AA (4.5:1 texto normal, 3:1 texto grande y elementos de UI).
- Al tocar metadata, títulos o headings: `seo-audit`.
- Antes de publicar: `docs/performance-checklist.md`, `docs/accessibility-checklist.md`,
  `npm run lint` y `npm run build` sin errores.

## Skills del proyecto

En `.claude/skills/`, con origen y licencias en `.claude/skills/ATTRIBUTION.md`.
