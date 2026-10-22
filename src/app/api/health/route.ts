// Healthcheck del contenedor (Dockerfile / Dokploy)
export function GET() {
  return Response.json({ status: "ok" });
}
