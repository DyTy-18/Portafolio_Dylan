import {
  siAlpinedotjs,
  siDocker,
  siExpress,
  siGoogleanalytics,
  siGoogletagmanager,
  siLaravel,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPandas,
  siPrisma,
  siPython,
  siReact,
  siSocketdotio,
  siSqlite,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
  siWhatsapp,
} from "simple-icons";

// Mismo criterio que src/components/tech-icon.tsx: lo que Simple Icons no trae va solo con el nombre.
const paths: Record<string, string> = {
  "Alpine.js": siAlpinedotjs.path,
  Docker: siDocker.path,
  Express: siExpress.path,
  "Google Analytics": siGoogleanalytics.path,
  "Google Tag Manager": siGoogletagmanager.path,
  Laravel: siLaravel.path,
  MySQL: siMysql.path,
  "Next.js": siNextdotjs.path,
  "Node.js": siNodedotjs.path,
  Pandas: siPandas.path,
  Prisma: siPrisma.path,
  Python: siPython.path,
  React: siReact.path,
  "Socket.IO": siSocketdotio.path,
  SQLite: siSqlite.path,
  "Tailwind CSS": siTailwindcss.path,
  TypeScript: siTypescript.path,
  Vue: siVuedotjs.path,
  WhatsApp: siWhatsapp.path,
};

export function iconPath(name: string): string | undefined {
  return paths[name];
}
