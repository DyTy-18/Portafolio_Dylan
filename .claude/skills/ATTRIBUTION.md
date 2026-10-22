# Atribución de skills

Las skills de esta carpeta vienen de terceros. Se tomaron de
[claude-webkit](https://github.com/Hainrixz/claude-webkit) (MIT, Copyright (c) 2026
Enrique Rocha / Tododeia; texto completo en `CLAUDE-WEBKIT-LICENSE.txt`), que a su vez
las vendorizó de sus autores originales. Abajo: origen, licencia y todo lo que cambiamos.

Los documentos `docs/performance-checklist.md` y `docs/accessibility-checklist.md`
también vienen de claude-webkit (MIT).

## Emil Kowalski (MIT)

- **Upstream:** https://github.com/emilkowalski/skills
- **Commit fijado:** `e879241fab3cdb22e8d95587cdbf40b57a88d7da` (2026-08-18)
- **Licencia:** MIT, Copyright (c) 2026 Emil Kowalski. Texto en el `LICENSE.txt` de cada skill.

| Skill | Cambios locales |
|---|---|
| `animate` | **Sí, 1 línea (M2).** Ya no manda a instalar componentes con shadcn: pide permiso antes de agregar Radix o Base UI. Ver `animate/NOTICE.md`. |
| `emil-design-eng` | **Sí, 1 bloque (M1, heredado de claude-webkit).** Se quitó el "saluda y espera" ante una invocación sin contexto, para que la skill no pause el trabajo. Se conserva el crédito y el enlace a animations.dev. |
| `review-animations` | Ninguno. |
| `find-animation-opportunities` | Ninguno. |

## Anthropic — `frontend-design` (Apache 2.0)

Ver `frontend-design/NOTICE.md`. Sin cambios. En movimiento, la autoridad es
`animate` → `emil-design-eng`, no `frontend-design/reference/motion-design.md`.

## Vercel

| Skill | Licencia | Cambios |
|---|---|---|
| `vercel-react-best-practices` | MIT (frontmatter) | Ninguno. |
| `web-design-guidelines` | Autor Vercel según su frontmatter; licencia no registrada en claude-webkit | Ninguno. Descarga sus reglas de GitHub cada vez que se usa. |

## Otras

| Skill | Procedencia | Cambios |
|---|---|---|
| `humanizer` | No registrada en claude-webkit (v2.2.0, basada en la guía "Signs of AI writing" de Wikipedia) | Ninguno. |
| `seo-audit` | No registrada en claude-webkit (v1.1.0) | Ninguno. |

Pendiente: confirmar el repo y la licencia de `humanizer`, `seo-audit` y
`web-design-guidelines` antes de publicar este repositorio.

## Descartadas de claude-webkit

`vercel-deploy` (desplegamos con Docker en Dokploy), `shadcn-ui` y `building-components`
(no usamos shadcn), `apple-design` (recomienda fuentes del sistema), `ui-ux-pro-max` (ya
está instalada global), `playwright-cli`, `chrome-bridge-automation`, `web-reader`,
`deep-research`, `prototype`, `improve-animations` y `animation-vocabulary` (no aportan a
este proyecto). Tampoco se copió su `settings.local.json`, que dejaba correr `rm`, `curl`
y `git` sin preguntar.
