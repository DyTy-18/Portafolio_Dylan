import type { ReactNode } from "react";

// Clases y piezas compartidas. Ver docs/design-system.md (Componentes).

export const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-md border border-line-strong px-4 text-sm font-medium text-fg transition-[border-color,background-color] duration-150 hover:border-fg/60 hover:bg-fg/[0.04]";

export const textLink =
  "inline-flex items-center gap-1.5 text-sm font-medium text-fg-body transition-colors duration-150 hover:text-fg";

export const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} data-reveal className="text-section text-fg">
      <span aria-hidden="true" className="text-fg-muted">
        ~/
      </span>
      {children}
    </h2>
  );
}
