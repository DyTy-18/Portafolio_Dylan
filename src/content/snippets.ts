// Un snippet corto por tecnología del stack. Son ilustrativos: muestran el tipo de cosas que hago con cada una.
// `lang` solo decide cómo se marcan los comentarios (ver src/lib/highlight.tsx).

export type SnippetLang = "c" | "hash" | "sql" | "text" | "html";

export type Snippet = { file: string; lang: SnippetLang; code: string };

export const snippets: Record<string, Snippet> = {
  // Lenguajes
  PHP: {
    file: "Dylan.php",
    lang: "c",
    code: `<?php

final class Dylan extends Developer
{
    protected string $base = 'La Paz, Bolivia';

    public function ship(Idea $idea): Product
    {
        return $this->build($idea)->deploy();
    }
}`,
  },
  TypeScript: {
    file: "dylan.ts",
    lang: "c",
    code: `type Capa = "backend" | "frontend" | "devops";

export const dylan: Record<Capa, boolean> = {
  backend: true,
  frontend: true,
  devops: true,
};`,
  },
  JavaScript: {
    file: "dia.js",
    lang: "c",
    code: `const dia = ["café", "código", "deploy"];

dia.forEach((paso) => console.log(\`✓ \${paso}\`));
// ✓ café  ✓ código  ✓ deploy`,
  },
  Python: {
    file: "etl.py",
    lang: "hash",
    code: `import pandas as pd

leads = pd.read_csv("leads.csv")
limpios = leads.drop_duplicates("email").dropna()

print(f"{len(limpios)} leads listos para el CRM")`,
  },
  SQL: {
    file: "portafolio.sql",
    lang: "sql",
    code: `SELECT proyecto, stack
FROM portafolio
WHERE autor = 'Dylan'
  AND estado = 'en producción'
ORDER BY fecha DESC;`,
  },
  Java: {
    file: "Dylan.java",
    lang: "c",
    code: `public class Dylan {
    public static void main(String[] args) {
        System.out.println("Hola desde La Paz");
    }
}`,
  },

  // Backend
  Laravel: {
    file: "routes/web.php",
    lang: "c",
    code: `Route::middleware(['auth', 'sucursal'])
    ->prefix('admin')
    ->group(function () {
        Route::resource('citas', CitaController::class);
        Route::get('/reportes', ReporteController::class);
    });`,
  },
  "Node.js": {
    file: "server.mjs",
    lang: "c",
    code: `import { createServer } from "node:http";

createServer((req, res) => res.end("ok"))
  .listen(3000, () => console.log("escuchando en :3000"));`,
  },
  Express: {
    file: "webhooks.ts",
    lang: "c",
    code: `app.post("/webhooks/whatsapp", async (req, res) => {
  await procesarRespuesta(req.body); // 1 confirma, 2 cancela
  res.sendStatus(200);
});`,
  },
  "Next.js": {
    file: "app/page.tsx",
    lang: "c",
    code: `export default async function Page() {
  const proyectos = await getProyectos();
  return <Carrusel items={proyectos} />;
}`,
  },
  Django: {
    file: "views.py",
    lang: "hash",
    code: `def proyectos(request):
    items = Proyecto.objects.filter(publicado=True)
    return render(request, "proyectos.html", {"items": items})`,
  },

  // Frontend
  Vue: {
    file: "Saludo.vue",
    lang: "html",
    code: `<script setup>
const nombre = ref('Dylan')
</script>

<template>
  <h1>Hola, soy {{ nombre }}</h1>
</template>`,
  },
  React: {
    file: "Disponible.tsx",
    lang: "c",
    code: `export function Disponible() {
  const [remoto] = useState(true);
  return <p>{remoto ? "Disponible" : "Ocupado"}</p>;
}`,
  },
  Inertia: {
    file: "CitaController.php",
    lang: "c",
    code: `return Inertia::render('Citas/Index', [
    'citas' => Cita::with('cliente')->latest()->paginate(20),
]);`,
  },
  "Tailwind CSS": {
    file: "boton.html",
    lang: "html",
    code: `<a href="#contacto"
   class="rounded-md border border-white/20 px-4 py-2
          transition-colors hover:border-white">
  Contrátame
</a>`,
  },
  "Alpine.js": {
    file: "faq.blade.php",
    lang: "html",
    code: `<div x-data="{ abierto: false }">
  <button @click="abierto = !abierto">Ver más</button>
  <p x-show="abierto">Laravel + Alpine, sin build extra.</p>
</div>`,
  },
  Vite: {
    file: "vite.config.js",
    lang: "c",
    code: `export default defineConfig({
  plugins: [
    laravel({ input: ["resources/js/app.js"], refresh: true }),
  ],
});`,
  },

  // Bases de datos
  PostgreSQL: {
    file: "leads.sql",
    lang: "sql",
    code: `CREATE TABLE leads (
  id         bigserial PRIMARY KEY,
  email      text UNIQUE NOT NULL,
  fuente     text DEFAULT 'meta',
  creado_en  timestamptz DEFAULT now()
);`,
  },
  MySQL: {
    file: "citas.sql",
    lang: "sql",
    code: `SELECT s.nombre, COUNT(c.id) AS citas
FROM sucursales s
JOIN citas c ON c.sucursal_id = s.id
WHERE c.estado = 'confirmada'
GROUP BY s.nombre;`,
  },
  MariaDB: {
    file: "backup.sh",
    lang: "hash",
    code: `# respaldo diario antes de cada migración
mariadb-dump --single-transaction crm > crm_$(date +%F).sql`,
  },
  MongoDB: {
    file: "eventos.js",
    lang: "c",
    code: `db.eventos
  .find({ tipo: "lead", "utm.source": "meta" })
  .sort({ creadoEn: -1 })
  .limit(10);`,
  },
  Oracle: {
    file: "top.sql",
    lang: "sql",
    code: `SELECT nombre, total
FROM ventas
ORDER BY total DESC
FETCH FIRST 5 ROWS ONLY;`,
  },
  Drizzle: {
    file: "schema.ts",
    lang: "c",
    code: `export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  creadoEn: timestamp("creado_en").defaultNow(),
});`,
  },

  // Hosting y DevOps
  Hostinger: {
    file: "terminal",
    lang: "hash",
    code: `$ ssh dylan@vps
$ docker ps --format "{{.Names}}"
dyty
portafolio
# un VPS, varias apps`,
  },
  Dokploy: {
    file: "terminal",
    lang: "hash",
    code: `$ git push origin main
# Dokploy recibe el webhook, construye la imagen
# y la publica con HTTPS. Sin entrar al servidor.`,
  },
  Docker: {
    file: "Dockerfile",
    lang: "hash",
    code: `FROM node:22-alpine
WORKDIR /app
COPY .next/standalone ./
USER node
CMD ["node", "server.js"]`,
  },
  Cloudflare: {
    file: "dns",
    lang: "hash",
    code: `# DNS + proxy + SSL
dyty.dev      A      -> VPS   (proxied)
www           CNAME  -> dyty.dev`,
  },
  Git: {
    file: "terminal",
    lang: "hash",
    code: `$ git log --oneline -3
a1f3c9e fix: evitar doble envío del recordatorio
7be2d10 feat: pausar la automatización
3c09e44 feat: panel de citas en tiempo real`,
  },
  GitHub: {
    file: "terminal",
    lang: "hash",
    code: `$ gh auth status
✓ Logged in to github.com as DyTy-18`,
  },
  "AWS (básico)": {
    file: "terminal",
    lang: "hash",
    code: `$ aws s3 cp backup.sql s3://respaldos/
upload: ./backup.sql to s3://respaldos/backup.sql`,
  },

  // APIs e integraciones
  OpenAI: {
    file: "resumen.ts",
    lang: "c",
    code: `const resumen = await openai.responses.create({
  model: MODEL,
  input: \`Resume este lead en una línea: \${lead.mensaje}\`,
});`,
  },
  "Anthropic (Claude)": {
    file: "clasificar.ts",
    lang: "c",
    code: `const msg = await anthropic.messages.create({
  model: MODEL,
  max_tokens: 300,
  messages: [{ role: "user", content: "Clasifica este ticket" }],
});`,
  },
  Meta: {
    file: "LeadWebhook.php",
    lang: "c",
    code: `// Lead Ads: validar la firma antes de confiar en el payload
$firma = hash_hmac('sha256', $payload, $secret);

abort_unless(hash_equals("sha256={$firma}", $header), 403);`,
  },
  "Google Cloud": {
    file: "terminal",
    lang: "hash",
    code: `$ gcloud run deploy api --source . --region us-east1`,
  },
  WhatsApp: {
    file: "chat",
    lang: "text",
    code: `Hola Ana, te recordamos tu cita de mañana a las 10:00.
Responde 1 para confirmar o 2 para cancelar.
> 1
✓ Cita confirmada. ¡Te esperamos!`,
  },
  Vimeo: {
    file: "VideoStats.php",
    lang: "c",
    code: `$video = Http::withToken($token)
    ->get("https://api.vimeo.com/videos/{$id}")
    ->json();

// duración, reproducciones y estado, al dashboard`,
  },
  Stripe: {
    file: "checkout.ts",
    lang: "c",
    code: `const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [{ price: PRICE_ID, quantity: 1 }],
  success_url: \`\${url}/gracias\`,
});`,
  },
  Kommo: {
    file: "SyncKommo.php",
    lang: "c",
    code: `// cliente nuevo en el CRM -> lead en el embudo de Kommo
Http::withToken($token)->post("{$kommo}/api/v4/leads", [
    ['name' => $cliente->nombre, 'price' => $cita->total],
]);`,
  },
  HubSpot: {
    file: "contacto.ts",
    lang: "c",
    code: `await hubspot.crm.contacts.basicApi.create({
  properties: { email, firstname: nombre },
});`,
  },
  LearnWorlds: {
    file: "ProgresoWebhook.php",
    lang: "c",
    code: `// webhook: un estudiante completó una unidad
Progreso::updateOrCreate(
    ['user_id' => $e['user']['id'], 'unidad' => $e['unit']['id']],
    ['completado_en' => now()],
);`,
  },
  Accredible: {
    file: "certificado.ts",
    lang: "c",
    code: `// curso aprobado -> certificado emitido
await accredible.post("/credentials", {
  credential: { recipient, group_id: CURSO_ID },
});`,
  },
  Libélula: {
    file: "PagoController.php",
    lang: "c",
    code: `// pasarela boliviana: QR y tarjeta
$deuda = $libelula->registrarDeuda($cliente, $monto);

return redirect($deuda->url_pasarela_pagos);`,
  },

  // Datos
  Pandas: {
    file: "ventas.py",
    lang: "hash",
    code: `(ventas
    .groupby("sucursal")["monto"]
    .sum()
    .sort_values(ascending=False))`,
  },
  "Power BI": {
    file: "medida.dax",
    lang: "c",
    code: `Integridad % =
DIVIDE(
    COUNTROWS(FILTER(Datos, Datos[valido] = TRUE())),
    COUNTROWS(Datos)
)`,
  },
  Excel: {
    file: "leads.xlsx",
    lang: "text",
    code: `=XLOOKUP(A2; Leads[email]; Leads[fuente]; "sin fuente")`,
  },

  // Analítica y SEO
  "Google Tag Manager": {
    file: "dataLayer.js",
    lang: "c",
    code: `window.dataLayer.push({
  event: "generate_lead",
  form: "contacto",
});`,
  },
  "Google Analytics": {
    file: "gtag.js",
    lang: "c",
    code: `gtag("event", "generate_lead", {
  value: 1,
  currency: "BOB",
});`,
  },
  "Google Search Console": {
    file: "robots.txt",
    lang: "hash",
    code: `User-Agent: *
Allow: /
Disallow: /api/

Sitemap: https://dyty.dev/sitemap.xml`,
  },
  "Microsoft Clarity": {
    file: "clarity.js",
    lang: "c",
    code: `clarity("set", "seccion", "precios");
// después: mapas de calor y grabaciones de esa sección`,
  },

  // Herramientas
  Playwright: {
    file: "brochure.ts",
    lang: "c",
    code: `// brochures HTML -> PDF
await page.goto(\`\${url}/brochure/\${slug}\`);
const pdf = await page.pdf({ format: "A4", printBackground: true });`,
  },
  "VS Code": {
    file: "settings.json",
    lang: "c",
    code: `{
  "editor.fontFamily": "JetBrains Mono",
  "editor.formatOnSave": true,
  "workbench.colorTheme": "Default Dark Modern"
}`,
  },
};
