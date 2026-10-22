// Copia los videos ya renderizados (out/) al sitio, horizontal y vertical (mobile), y genera
// el póster de cada uno.
// Uso, después de `npm run render`: npm run export-web
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";

const dest = "../public/media/proyectos";
mkdirSync(dest, { recursive: true });

const rendered = readdirSync("out").filter((f) => /^\d{2}-[a-z0-9-]+\.mp4$/.test(f) && !f.includes("-vertical"));
if (!rendered.length) throw new Error("No hay videos en out/. Corre primero `npm run render`.");

for (const file of rendered) {
  const id = file.replace(/\.mp4$/, "");
  const slug = id.replace(/^\d{2}-/, "");
  // Solo MP4: el WebM VP9 fallaba al decodificar en Chrome (MEDIA_ERR_DECODE).
  copyFileSync(`out/${id}.mp4`, `${dest}/${slug}.mp4`);
  if (!existsSync(`out/${id}-vertical.mp4`)) throw new Error(`Falta out/${id}-vertical.mp4`);
  copyFileSync(`out/${id}-vertical.mp4`, `${dest}/${slug}-vertical.mp4`);
  execFileSync(
    "npx",
    ["remotion", "still", `poster-${slug}`, `${dest}/${slug}.jpg`, "--image-format=jpeg", "--jpeg-quality=80", "--scale=0.5", "--log=error"],
    { stdio: "inherit", shell: true },
  );
  console.log(`+ ${slug}`);
}
