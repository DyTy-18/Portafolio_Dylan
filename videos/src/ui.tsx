import type { CSSProperties, ReactNode } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { color, easeInOut, easeOut } from "./theme";

// Piezas compartidas por las demos. Cada demo se dibuja en un lienzo fijo de W×H
// y la escena la escala para el formato horizontal o vertical.
export const W = 1200;
export const H = 720;
const BAR = 44;

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Progreso 0→1 con ease-out entre `start` y `start + dur`. */
export function useP(start: number, dur = 14) {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing: easeOut });
}

export const rise = (p: number, d = 12): CSSProperties => ({
  opacity: p,
  transform: `translateY(${(1 - p) * d}px)`,
});

export const pop = (p: number): CSSProperties => ({
  opacity: p,
  transform: `scale(${0.95 + 0.05 * p})`,
});

export const panel: CSSProperties = {
  border: `1px solid ${color.line}`,
  borderRadius: 10,
  background: color.surface,
};

export const muted: CSSProperties = { color: color.fgMuted };

/** Números con punto de miles y coma decimal. */
export function fmt(n: number, decimals = 0) {
  const [int, dec] = n.toFixed(decimals).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return dec ? `${grouped},${dec}` : grouped;
}

export function useCount(to: number, start: number, dur = 40, from = 0) {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + dur], [from, to], { ...clamp, easing: easeOut });
}

/** Texto que se escribe carácter a carácter, con cursor mientras escribe. */
export function Typed({ text, start, perChar = 1.5 }: { text: string; start: number; perChar?: number }) {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.min(text.length, Math.floor((frame - start) / perChar)));
  const typing = frame >= start && n < text.length;
  return (
    <>
      {text.slice(0, n)}
      {typing ? (
        <span
          style={{
            display: "inline-block",
            width: "0.5em",
            height: "1.05em",
            verticalAlign: "-0.18em",
            background: color.fgMuted,
          }}
        />
      ) : null}
    </>
  );
}

/** Ventana de app con barra de título, como la terminal del hero. */
export function Window({
  title,
  children,
  width = W,
  height = H,
}: {
  title: string;
  children: ReactNode;
  width?: number;
  height?: number;
}) {
  return (
    <div
      style={{
        width,
        height,
        border: `1px solid ${color.lineStrong}`,
        borderRadius: 16,
        background: color.canvas,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontSize: 16,
        color: color.fgBody,
        letterSpacing: 0,
      }}
    >
      <div
        style={{
          height: BAR,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
          borderBottom: `1px solid ${color.line}`,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 11, height: 11, borderRadius: 99, background: "#3a3e42" }} />
        ))}
        <span style={{ marginLeft: 14, fontSize: 14, color: color.fgMuted }}>{title}</span>
      </div>
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>{children}</div>
    </div>
  );
}

type Tone = "muted" | "ok" | "accent";
const toneColor: Record<Tone, string> = { muted: color.fgMuted, ok: color.ok, accent: color.accent };

export function Pill({ children, tone = "muted" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 9px",
        border: `1px solid ${toneColor[tone]}`,
        borderRadius: 6,
        color: toneColor[tone],
        fontSize: 13,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

/** Reemplaza un contenido por otro en el frame `at`, con un fundido corto. */
export function Swap({ at, from, to }: { at: number; from: ReactNode; to: ReactNode }) {
  const p = useP(at, 10);
  return (
    <span style={{ display: "inline-grid", justifyItems: "start" }}>
      <span style={{ gridArea: "1 / 1", opacity: 1 - p, transform: `translateY(${-p * 6}px)` }}>{from}</span>
      <span style={{ gridArea: "1 / 1", opacity: p, transform: `translateY(${(1 - p) * 6}px)` }}>{to}</span>
    </span>
  );
}

type Key = { f: number; x: number; y: number; click?: boolean };

/** Puntero del mouse que recorre puntos clave (coordenadas del cuerpo de la ventana). */
export function Pointer({ keys }: { keys: Key[] }) {
  const frame = useCurrentFrame();
  const fs = keys.map((k) => k.f);
  const opt = { ...clamp, easing: easeInOut };
  const x = interpolate(frame, fs, keys.map((k) => k.x), opt);
  const y = interpolate(frame, fs, keys.map((k) => k.y), opt);
  const show = interpolate(frame, [fs[0] - 8, fs[0]], [0, 1], clamp);
  const pressed = keys.some((k) => k.click && frame >= k.f && frame < k.f + 6);

  return (
    <>
      {keys
        .filter((k) => k.click)
        .map((k) => {
          const r = interpolate(frame, [k.f, k.f + 14], [0, 1], { ...clamp, easing: easeOut });
          return (
            <span
              key={k.f}
              style={{
                position: "absolute",
                left: k.x - 18,
                top: k.y - 18,
                width: 36,
                height: 36,
                borderRadius: 99,
                border: `2px solid ${color.accent}`,
                opacity: frame >= k.f ? 1 - r : 0,
                transform: `scale(${0.6 + r * 0.8})`,
                zIndex: 9,
              }}
            />
          );
        })}
      <svg
        width={22}
        height={28}
        viewBox="0 0 22 28"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translate(${x}px, ${y}px) scale(${pressed ? 0.85 : 1})`,
          transformOrigin: "top left",
          opacity: show,
          zIndex: 10,
        }}
      >
        <path
          d="M1 1 L1 22 L6.5 16.5 L10.5 26 L14.5 24.3 L10.5 15.3 L18 15.3 Z"
          fill={color.fg}
          stroke={color.canvas}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
