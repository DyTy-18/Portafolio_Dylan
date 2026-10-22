// Renderiza todas las composiciones en MP4 (h264), horizontal y vertical.
// Uso: npm run render [-- filtro]
import { execFileSync } from "node:child_process";

const filter = process.argv[2] ?? "";
const list = execFileSync("npx", ["remotion", "compositions", "--quiet"], {
  encoding: "utf8",
  shell: true,
});
// --quiet imprime los ids separados por espacios, no uno por línea.
const ids = list
  .split(/\s+/)
  .filter((id) => /^\d{2}-/.test(id) && id.includes(filter));

for (const id of ids) {
  const run = (args) =>
    execFileSync("npx", ["remotion", "render", id, ...args], { stdio: "inherit", shell: true });
  run([`out/${id}.mp4`, "--codec=h264", "--crf=18"]);
}
