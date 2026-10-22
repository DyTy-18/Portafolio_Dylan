import { projects, type Project } from "../../src/content/site";

// Guion de cada video: el slug (también elige la demo en ./demos) y, si el proyecto lo
// tiene, el problema en una frase. Las palabras entre *asteriscos* van en el color de
// acento y `|` fuerza un salto de línea. La clave es el título en src/content/site.ts.
type Script = { slug: string; problem?: string };

const scripts: Record<string, Script> = {
  "CRM a medida": {
    slug: "crm-a-medida",
    problem: "Cada sucursal llevaba todo *por su cuenta*.",
  },
  "Bot de confirmación de citas por WhatsApp": {
    slug: "bot-citas-whatsapp",
    problem: "Cada consulta se respondía *a mano*.",
  },
  "Dashboard de seguimiento de estudiantes": {
    slug: "dashboard-estudiantes",
    problem: "Nadie veía *cómo avanzaban* los alumnos.",
  },
  "Sistema de admisión de pacientes": { slug: "admision-pacientes" },
  "Programador de mensajes de WhatsApp": { slug: "programador-whatsapp" },
  "Pipelines de datos y dashboards": { slug: "pipelines-datos" },
  "Sitio corporativo con blog": { slug: "sitio-corporativo" },
  "dyty.dev": { slug: "dyty-dev" },
};

export type VideoProps = Project & Script & { index: number; total: number };

export const videos: VideoProps[] = projects.map((project, index) => {
  const script = scripts[project.title];
  if (!script) throw new Error(`Falta el guion de "${project.title}" en videos/src/scripts.ts`);
  return { ...project, ...script, index, total: projects.length };
});
