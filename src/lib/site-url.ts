// URL pública del sitio. Se fija en el build con NEXT_PUBLIC_SITE_URL (ver README).
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);
