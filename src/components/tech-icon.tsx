import {
  siAlpinedotjs,
  siAnthropic,
  siCloudflare,
  siDjango,
  siDocker,
  siDrizzle,
  siExpress,
  siGit,
  siGithub,
  siGoogleanalytics,
  siGooglecloud,
  siGooglesearchconsole,
  siGoogletagmanager,
  siHostinger,
  siHubspot,
  siInertia,
  siJavascript,
  siLaravel,
  siMariadb,
  siMeta,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPandas,
  siPhp,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siSocketdotio,
  siSqlite,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVimeo,
  siVite,
  siVuedotjs,
  siWhatsapp,
  type SimpleIcon,
} from "simple-icons";

// Marcas sin ícono en Simple Icons (LearnWorlds, Kommo, Dokploy, Power BI...) se muestran solo con el nombre.
const icons: Record<string, SimpleIcon> = {
  "Alpine.js": siAlpinedotjs,
  "Anthropic (Claude)": siAnthropic,
  Cloudflare: siCloudflare,
  Django: siDjango,
  Docker: siDocker,
  Drizzle: siDrizzle,
  Express: siExpress,
  Git: siGit,
  GitHub: siGithub,
  "Google Analytics": siGoogleanalytics,
  "Google Cloud": siGooglecloud,
  "Google Search Console": siGooglesearchconsole,
  "Google Tag Manager": siGoogletagmanager,
  Hostinger: siHostinger,
  HubSpot: siHubspot,
  Inertia: siInertia,
  JavaScript: siJavascript,
  Laravel: siLaravel,
  MariaDB: siMariadb,
  Meta: siMeta,
  MongoDB: siMongodb,
  MySQL: siMysql,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  Pandas: siPandas,
  PHP: siPhp,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  Python: siPython,
  React: siReact,
  "Socket.IO": siSocketdotio,
  SQLite: siSqlite,
  Stripe: siStripe,
  "Tailwind CSS": siTailwindcss,
  TypeScript: siTypescript,
  Vimeo: siVimeo,
  Vite: siVite,
  Vue: siVuedotjs,
  WhatsApp: siWhatsapp,
};

export function TechIcon({
  name,
  className,
  placeholder = false,
}: {
  name: string;
  className?: string;
  /** Reserva el espacio del ícono para alinear listas verticales. */
  placeholder?: boolean;
}) {
  const icon = icons[name];
  if (!icon) return placeholder ? <span aria-hidden="true" className={className} /> : null;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}

export function hasTechIcon(name: string) {
  return name in icons;
}
