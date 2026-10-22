"use client";

import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";

// Alto de cada opción (h-11 = 44px) + gap-1 (4px). El indicador se desplaza de a este paso.
const ITEM_STEP = 48;

export type StackTech = {
  name: string;
  icon: ReactNode;
  file: string;
  lines: ReactNode[];
  /** Texto plano (un chat, una fórmula): se ajusta al ancho en vez de desplazarse. */
  wrap?: boolean;
};
export type StackGroup = { label: string; slug: string; items: StackTech[] };

// Menú de pestañas (patrón ARIA tabs) + ventana de código de la tecnología elegida.
// Íconos y código llegan renderizados desde el servidor.
export function StackMenu({ groups }: { groups: StackGroup[] }) {
  const [active, setActive] = useState(0);
  const [tech, setTech] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  function selectGroup(index: number) {
    if (index === active) return;
    setActive(index);
    setTech(0);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = groups.length - 1;
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? index === last
          ? 0
          : index + 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? index === 0
            ? last
            : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    selectGroup(next);
    const tab = tabs.current[next];
    tab?.focus();
    // En móvil la lista es horizontal: trae la opción a la vista si quedó fuera.
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  const current = groups[active].items[tech] ?? groups[active].items[0];

  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-10">
      <div
        role="tablist"
        aria-label="Categorías del stack"
        aria-orientation="vertical"
        className="relative -mx-4 flex gap-1 self-start overflow-x-auto px-4 [scrollbar-width:none] md:col-span-4 md:mx-0 md:flex-col md:overflow-visible md:px-0 lg:col-span-3 [&::-webkit-scrollbar]:hidden"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-11 rounded-md border border-line bg-fg/[0.04] transition-transform duration-250 ease-in-out md:block"
          style={{ transform: `translateY(${active * ITEM_STEP}px)` }}
        />
        {groups.map((group, i) => (
          <button
            key={group.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={(e) => {
              selectGroup(i);
              e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
            }}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") selectGroup(i);
            }}
            onKeyDown={(e) => onKeyDown(e, i)}
            className="group relative flex h-11 shrink-0 items-center gap-3 rounded-md px-3 text-left text-sm whitespace-nowrap text-fg-muted transition-colors duration-150 hover:text-fg aria-selected:text-fg max-md:border max-md:border-transparent max-md:aria-selected:border-line max-md:aria-selected:bg-fg/[0.04]"
          >
            <span
              aria-hidden="true"
              className="text-accent opacity-0 transition-opacity duration-150 group-aria-selected:opacity-100"
            >
              &gt;
            </span>
            <span className="md:flex-1">{group.label}</span>
            <span className="text-xs text-fg-muted tabular-nums">
              {String(group.items.length).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      <div className="min-w-0 md:col-span-8 lg:col-span-9">
        {groups.map((group, i) => (
          <div
            key={group.slug}
            role="tabpanel"
            id={`${id}-panel-${i}`}
            aria-labelledby={`${id}-tab-${i}`}
            hidden={i !== active}
          >
            <p className="text-sm text-fg-muted">
              <span aria-hidden="true" className="text-accent">
                ${" "}
              </span>
              ls ~/stack/{group.slug}
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {group.items.map((item, j) => (
                // Entrada con @starting-style al mostrarse el panel, escalonada 30ms.
                // El hover y la selección viven en el botón para que ese delay no los retrase.
                <li
                  key={item.name}
                  className="transition-[opacity,translate] duration-200 ease-out starting:translate-y-1.5 starting:opacity-0"
                  style={{ transitionDelay: `${j * 30}ms` } as CSSProperties}
                >
                  <button
                    type="button"
                    aria-pressed={i === active && j === tech}
                    aria-controls={`${id}-code`}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setTech(j);
                    }}
                    onFocus={() => setTech(j)}
                    onClick={() => setTech(j)}
                    className="group flex h-full w-full items-center gap-3 rounded-md border border-line px-4 py-3 text-left text-sm text-fg-body transition-[border-color,background-color,translate] duration-150 ease-out hover:-translate-y-0.5 hover:border-line-strong aria-pressed:border-line-strong aria-pressed:bg-fg/[0.04] aria-pressed:text-fg"
                  >
                    {item.icon}
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <figure
          id={`${id}-code`}
          className="mt-6 overflow-hidden rounded-2xl border border-line"
        >
          <figcaption className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
            <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
            <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
            <span className="ml-2 truncate text-xs text-fg-muted">
              ~/stack/{groups[active].slug}/{current.file}
            </span>
          </figcaption>
          <pre className="h-76 overflow-auto px-4 py-4 text-xs leading-6 sm:px-5 sm:text-[13px]">
            {/* key: al cambiar de tecnología las líneas se montan de nuevo y entran con @starting-style */}
            <code key={`${active}-${current.name}`} className={current.wrap ? "block whitespace-pre-wrap" : "block w-max min-w-full"}>
              {current.lines.map((line, k) => (
                <span
                  key={k}
                  className="block min-h-6 transition-[opacity,translate] duration-200 ease-out starting:-translate-x-1 starting:opacity-0"
                  style={{ transitionDelay: `${k * 20}ms` } as CSSProperties}
                >
                  {line}
                </span>
              ))}
            </code>
          </pre>
        </figure>
      </div>
    </div>
  );
}
