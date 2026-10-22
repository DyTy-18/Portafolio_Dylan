// Contenido del portafolio. Los campos opcionales vacíos no se muestran.

export const site = {
  name: "Mauricio Dylan Lara Ramos",
  shortName: "Dylan Lara",
  role: "Full Stack Developer",
  title: "Dylan Lara — Full Stack Developer",
  description:
    "Desarrollador full stack con 4 años de experiencia en Laravel, Vue, Next.js y TypeScript. Construyo aplicaciones web completas. Disponible para trabajo remoto.",
  tagline:
    "Construyo aplicaciones web completas, del backend a la interfaz, y las llevo a producción.",
  location: "La Paz, Bolivia",
  timezone: "UTC-4",
  email: "maudylan18lara@gmail.com",
  linkedin: {
    url: "https://www.linkedin.com/in/mauricio-dylan-lara-ramos-983324283",
    label: "linkedin.com/in/mauricio-dylan-lara-ramos-983324283",
  },
  github: {
    url: "https://github.com/DyTy-18",
    label: "github.com/DyTy-18",
  },
  cvPath: "/cv/dylan-lara-cv.pdf",
  heroStack: ["Laravel", "Vue", "Next.js", "TypeScript", "PostgreSQL"],
};

export const about = {
  paragraphs: [
    "Soy desarrollador full stack con 4 años de experiencia. Hoy soy líder técnico en Unifranz Executive Education y el único responsable de dos sistemas en producción.",
    "He construido plataformas internas, integraciones con APIs de terceros, sitios optimizados para rendimiento y SEO, y automatizaciones con IA. Me encargo de todo el ciclo: arquitectura, backend, frontend, despliegue y mantenimiento.",
  ],
  facts: [
    { label: "Idiomas", value: "Español nativo · Inglés B2" },
    { label: "Metodologías", value: "Scrum, Kanban" },
  ],
};

export type Company = { name: string; url?: string };

export const companies: Company[] = [
  { name: "Unifranz Executive Education", url: "https://exed.unifranz.com" },
  { name: "Unifranz Online", url: "https://unifranz.edu.bo" },
  { name: "Cristina Spa" },
  { name: "Otium" },
];

export type Project = {
  title: string;
  context: string;
  problem?: string;
  work: string;
  result?: string;
  stack: string[];
  url?: string;
  /** Demo en video: public/media/proyectos/<video>.{webm,mp4,jpg}. Se genera en videos/. */
  video?: string;
};

// Sin nombres de empresas: el contexto describe el tipo de cliente o de proyecto.
export const projects: Project[] = [
  {
    title: "CRM a medida",
    video: "crm-a-medida",
    context: "CRM · Salón con varias sucursales",
    problem:
      "Las citas, comisiones e inventario de cada sucursal se gestionaban sin un sistema central.",
    work: "Diseñé e implementé el CRM completo: agenda con reserva online, paquetes y contratos con pagos, cupones y enlaces de recomendación, inventario por sucursal con alertas de stock, comisiones y sueldos, reportes en PDF y Excel, roles por usuario y registro de actividad.",
    stack: ["Laravel", "MySQL", "Tailwind CSS", "Kommo", "WhatsApp", "Docker", "Dokploy"],
  },
  {
    title: "Bot de confirmación de citas por WhatsApp",
    video: "bot-citas-whatsapp",
    context: "Automatización · Integrado al CRM",
    problem: "Las confirmaciones y recordatorios de citas se hacían a mano, mensaje por mensaje.",
    work: "Servidor de WhatsApp que programa recordatorios y lleva la conversación con el cliente: responde 1 para confirmar o 2 para cancelar, y si cancela le ofrece reagendar. Cada respuesta actualiza la cita en el CRM. Incluye un panel en React con el estado en tiempo real y un botón para pausar la automatización.",
    stack: ["Node.js", "TypeScript", "Express", "React", "Socket.IO", "WhatsApp", "Docker"],
  },
  {
    title: "Programador de mensajes de WhatsApp",
    video: "programador-whatsapp",
    context: "Proyecto propio",
    work: "Panel para programar mensajes desde un número propio: una sola vez, cada cierto tiempo o en días y horas fijos. La conexión con WhatsApp corre en un worker aparte y, si estuvo apagado, decide qué mensajes atrasados enviar y cuáles saltar al siguiente horario.",
    stack: ["Next.js", "TypeScript", "Prisma", "SQLite", "WhatsApp", "Docker"],
  },
  {
    title: "Dashboard de seguimiento de estudiantes",
    video: "dashboard-estudiantes",
    context: "Dashboard · Educación online",
    problem: "No había visibilidad del avance de los estudiantes dentro de la plataforma de cursos.",
    work: "Construí una arquitectura de webhooks + backfill que sincroniza la actividad de LearnWorlds con un dashboard propio.",
    stack: ["Laravel", "Vue", "MySQL", "LearnWorlds"],
  },
  {
    title: "Sistema de admisión de pacientes",
    video: "admision-pacientes",
    context: "Sistema web · Salud infantil",
    work: "Formulario público de registro de pacientes con asignación de especialistas por área, página de pago y un panel con login para que el equipo revise cada ficha.",
    stack: ["Laravel", "Tailwind CSS"],
  },
  {
    title: "Pipelines de datos y dashboards",
    video: "pipelines-datos",
    context: "Datos · Consultora",
    work: "Pipelines ETL con Python y Pandas que consolidan datos de varias fuentes web, y dashboards en tiempo real en Power BI para auditar la integridad de los datos.",
    stack: ["Python", "Pandas", "Power BI"],
  },
  {
    title: "Sitio corporativo con blog",
    video: "sitio-corporativo",
    context: "Sitio web · Consultora",
    work: "Rediseño completo con blog administrable (SEO por artículo, categorías y autores invitados), generación de brochures HTML→PDF y un lead magnet bilingüe con formulario de diagnóstico.",
    stack: ["Laravel", "Tailwind CSS", "Alpine.js", "Playwright"],
  },
  {
    title: "dyty.dev",
    video: "dyty-dev",
    context: "Proyecto propio",
    work: "La web de mi estudio de desarrollo: captura de leads con Server Actions, un panel privado para gestionarlos, SEO técnico y analítica completa. Corre en Docker sobre un VPS propio.",
    stack: [
      "Next.js",
      "TypeScript",
      "Google Tag Manager",
      "Google Analytics",
      "Microsoft Clarity",
      "Docker",
      "Dokploy",
    ],
    url: "https://dyty.dev",
  },
];

export type Job = {
  role: string;
  company: string;
  period: string;
  mode?: string;
  summary: string;
};

export const experience: Job[] = [
  {
    role: "Líder técnico full stack",
    company: "Unifranz Executive Education",
    period: "2024 – actualidad",
    summary:
      "Único responsable técnico de la plataforma LXP (LearnWorlds) y del CRM interno Rocket. Integraciones con Meta, Vimeo, Accredible y Google. QA y mejoras de usabilidad.",
  },
  {
    role: "Desarrollador full stack",
    company: "Cristina Spa",
    period: "2024 – 2026",
    mode: "Freelance remoto",
    summary:
      "CRM a medida con Kommo, automatización del seguimiento de clientes por WhatsApp y reportes operativos.",
  },
  {
    role: "Desarrollador full stack",
    company: "Otium",
    period: "2025 – 2026",
    mode: "Freelance remoto",
    summary: "Rediseño del sitio web, pipelines ETL con Python y Pandas, y dashboards en Power BI.",
  },
  {
    role: "Desarrollador de automatización de procesos",
    company: "Unifranz Online",
    period: "2023 – 2024",
    summary: "Dashboards interactivos, reportes automatizados y pipelines ETL con Python.",
  },
];

export const stack: { group: string; items: string[] }[] = [
  { group: "Lenguajes", items: ["PHP", "TypeScript", "JavaScript", "Python", "SQL", "Java"] },
  { group: "Backend", items: ["Laravel", "Node.js", "Express", "Next.js", "Django"] },
  {
    group: "Frontend",
    items: ["Vue", "React", "Inertia", "Tailwind CSS", "Alpine.js", "Vite"],
  },
  {
    group: "Bases de datos",
    items: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Oracle", "Drizzle"],
  },
  {
    group: "Hosting y DevOps",
    items: ["Hostinger", "Dokploy", "Docker", "Cloudflare", "Git", "GitHub", "AWS (básico)"],
  },
  {
    group: "APIs e integraciones",
    items: [
      "OpenAI",
      "Anthropic (Claude)",
      "Meta",
      "Google Cloud",
      "WhatsApp",
      "Vimeo",
      "Stripe",
      "Kommo",
      "HubSpot",
      "LearnWorlds",
      "Accredible",
      "Libélula",
    ],
  },
  { group: "Datos", items: ["Pandas", "Power BI", "Excel"] },
  {
    group: "Analítica y SEO",
    items: ["Google Tag Manager", "Google Analytics", "Google Search Console", "Microsoft Clarity"],
  },
  { group: "Herramientas", items: ["Playwright", "VS Code"] },
];
