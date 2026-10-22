import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { ghostButton, textLink } from "@/components/ui";

const k = "text-fg-body";
const s = "text-accent";
const p = "text-fg-muted";

type Segment = [text: string, className: string];

const output: Segment[][] = [
  [["const ", p], ["dylan", k], [" = {", p]],
  [["  ahora", k], [": ", p], ['"Líder técnico, Unifranz EXED"', s], [",", p]],
  [["  experiencia", k], [": ", p], ['"4 años"', s], [",", p]],
  [["  base", k], [": ", p], [`"${site.location}"`, s], [",", p]],
  [["  zona", k], [": ", p], [`"${site.timezone}"`, s], [",", p]],
  [["  remoto", k], [": ", p], ["true", "text-ok"], [",", p]],
  [["  idiomas", k], [": [", p], ['"es"', s], [", ", p], ['"en (B2)"', s], ["],", p]],
  [["};", p]],
];

// Tiempos (ms). El comando empieza cuando la ventana ya entró (200ms de delay + 280ms de rise).
const command = "cat dylan.ts";
const TYPE_START = 600;
const CHAR_MS = 55; // debe coincidir con .term-type en globals.css
const OUTPUT_START = TYPE_START + command.length * CHAR_MS + 250;
const LINE_MS = 45;
const PROMPT_AT = OUTPUT_START + output.length * LINE_MS + 120;

const vars = (v: Record<string, string | number>) => v as CSSProperties;

function ProfileTerminal() {
  return (
    <figure className="rounded-2xl border border-line bg-canvas">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="ml-2 text-xs text-fg-muted">~/dylan</span>
      </div>
      <pre className="overflow-x-auto px-4 py-5 text-xs leading-6 sm:px-5 sm:text-sm sm:leading-7">
        <code>
          <span className="block">
            <span className={p}>$ </span>
            <span
              className={`term-type inline-block align-top ${k}`}
              style={vars({ "--chars": command.length, "--delay": `${TYPE_START}ms` })}
            >
              {command}
            </span>
          </span>
          {output.map((line, i) => (
            <span
              key={i}
              className="term-out block"
              style={vars({ "--delay": `${OUTPUT_START + i * LINE_MS}ms` })}
            >
              {line.map(([text, cls], j) => (
                <span key={j} className={cls}>
                  {text}
                </span>
              ))}
            </span>
          ))}
          <span className="term-out block" style={vars({ "--delay": `${PROMPT_AT}ms` })}>
            <span className={p}>$ </span>
            <span className="term-caret" aria-hidden="true" style={vars({ "--delay": `${PROMPT_AT}ms` })} />
          </span>
        </code>
      </pre>
      <figcaption className="flex items-center gap-2 border-t border-line px-4 py-3 text-xs text-fg-muted">
        <span className="size-1.5 rounded-full bg-ok" aria-hidden="true" />
        Disponible para trabajo remoto
      </figcaption>
    </figure>
  );
}

export function Hero({ hasCv }: { hasCv: boolean }) {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="page-x pt-16 pb-20 md:pt-28 md:pb-28">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="text-display text-fg">
            <span className="block">Mauricio Dylan</span>
            <span className="block">Lara Ramos</span>
          </h1>
          <p className="mt-8 animate-rise text-lg font-medium tracking-[-0.02em] text-fg [animation-delay:60ms] md:text-xl">
            <span aria-hidden="true" className="text-accent">
              &gt;{" "}
            </span>
            {site.role}
          </p>
          <p className="mt-3 max-w-md animate-rise leading-relaxed text-fg-muted [animation-delay:120ms]">
            {site.tagline}
          </p>
          <div className="mt-9 flex animate-rise flex-wrap items-center gap-x-6 gap-y-4 [animation-delay:180ms]">
            <a href="#proyectos" className={ghostButton}>
              Ver proyectos
            </a>
            {hasCv && (
              <a href={site.cvPath} download className={textLink}>
                Descargar CV <span aria-hidden="true">↓</span>
              </a>
            )}
          </div>
        </div>
        <div className="animate-rise [animation-delay:200ms] lg:col-span-5">
          <ProfileTerminal />
        </div>
      </div>
    </section>
  );
}
