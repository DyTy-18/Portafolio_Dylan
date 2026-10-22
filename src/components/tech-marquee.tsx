import { site, stack } from "@/content/site";
import { TechIcon, hasTechIcon } from "@/components/tech-icon";

// Primero el stack principal, luego el resto que tenga logo.
const items = Array.from(
  new Set([...site.heroStack, ...stack.flatMap((group) => group.items)]),
).filter(hasTechIcon);

function List({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      aria-label={duplicate ? undefined : "Tecnologías con las que trabajo"}
      className={`marquee-list flex shrink-0 items-center gap-10 pr-10 ${duplicate ? "marquee-dup" : ""}`}
    >
      {items.map((name) => (
        <li key={name} className="inline-flex items-center gap-2.5 text-sm whitespace-nowrap text-fg-muted">
          <TechIcon name={name} className="size-4 shrink-0" />
          {name}
        </li>
      ))}
    </ul>
  );
}

// Marquee CSS. Pausa con hover (puntero fino) o con el botón; WCAG 2.2.2 pide poder detenerlo.
export function TechMarquee() {
  return (
    <div className="marquee relative border-y border-line">
      <div className="overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max">
          <List />
          <List duplicate />
        </div>
      </div>
      <label className="marquee-control absolute -top-3 right-4 cursor-pointer rounded-md border border-line bg-canvas px-2 text-xs text-fg-muted transition-colors duration-150 hover:text-fg has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent-soft sm:right-6 lg:right-8">
        <input type="checkbox" className="marquee-toggle peer sr-only" />
        <span className="peer-checked:hidden">pausar</span>
        <span className="hidden peer-checked:inline">reanudar</span>
      </label>
    </div>
  );
}
