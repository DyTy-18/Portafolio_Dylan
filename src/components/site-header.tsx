import { site } from "@/content/site";

const nav = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#stack", label: "Stack" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="page-x flex h-14 items-center justify-between">
        <a href="#inicio" className="text-sm font-medium text-fg">
          {site.shortName}
        </a>
        <nav aria-label="Principal">
          <ul className="flex items-center gap-6 text-sm">
            {nav.map((item) => (
              <li key={item.href} className="hidden sm:block">
                <a
                  href={item.href}
                  className="text-fg-muted transition-colors duration-150 hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contacto"
                className="inline-flex h-8 items-center rounded-md border border-line-strong px-3 font-medium text-fg transition-[border-color] duration-150 hover:border-fg/60"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
