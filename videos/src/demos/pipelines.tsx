import { interpolate, useCurrentFrame } from "remotion";
import { color } from "../theme";
import { Pill, Window, clamp, fmt, pop, rise, useCount, useP } from "../ui";

const sources = [
  { name: "sitio-a.com", path: "/precios", rows: 1240, y: 70 },
  { name: "sitio-b.com", path: "/stock", rows: 980, y: 250 },
  { name: "api interna", path: "/ventas", rows: 1200, y: 430 },
];
const SRC_W = 250;
const SRC_H = 130;
const ETL = { x: 400, y: 150, w: 330, h: 330 };
const BI = { x: 840, y: 40, w: 330 };

function Source({ s, i }: { s: (typeof sources)[number]; i: number }) {
  const p = useP(6 + i * 6, 12);
  const rows = useCount(s.rows, 14 + i * 6, 50);
  return (
    <div
      style={{
        position: "absolute",
        left: 30,
        top: s.y,
        width: SRC_W,
        height: SRC_H,
        border: `1px solid ${color.line}`,
        borderRadius: 10,
        padding: "16px 18px",
        ...pop(p),
      }}
    >
      <div style={{ fontSize: 16, color: color.fg }}>{s.name}</div>
      <div style={{ fontSize: 14, color: color.accent, marginTop: 4 }}>{s.path}</div>
      <div style={{ fontSize: 13, color: color.fgMuted, marginTop: 18 }}>{fmt(rows)} filas</div>
    </div>
  );
}

/** Puntos que viajan por una línea recta en loop: dan la idea de datos en movimiento. */
function Flow({ x1, y1, x2, y2, start }: { x1: number; y1: number; x2: number; y2: number; start: number }) {
  const frame = useCurrentFrame();
  const vis = interpolate(frame, [start, start + 10], [0, 1], clamp);
  return (
    <>
      <svg style={{ position: "absolute", inset: 0, overflow: "visible" }} width={1} height={1}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color.line} strokeWidth={1.5} />
      </svg>
      {[0, 0.33, 0.66].map((o) => {
        const t = (((frame - start) / 34 + o) % 1 + 1) % 1;
        return (
          <span
            key={o}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 8,
              height: 8,
              borderRadius: 99,
              background: color.accent,
              opacity: vis,
              transform: `translate(${x1 + (x2 - x1) * t - 4}px, ${y1 + (y2 - y1) * t - 4}px)`,
            }}
          />
        );
      })}
    </>
  );
}

const code = [
  "frames = [leer(f) for f in fuentes]",
  "df = pd.concat(frames)",
  "df = df.drop_duplicates('sku')",
  "df = df.merge(stock, on='sku')",
  "auditar(df)",
];

function CodeLine({ text, i }: { text: string; i: number }) {
  const p = useP(40 + i * 10, 10);
  return <div style={{ opacity: p, transform: `translateX(${(1 - p) * -6}px)` }}>{text}</div>;
}

export function PipelinesDemo() {
  const frame = useCurrentFrame();
  const etl = useP(30, 14);
  const bi = useP(88, 14);
  const chart = interpolate(frame, [100, 150], [100, 0], clamp);
  const match = useCount(99.6, 104, 46);
  const alert = useP(156, 12);

  return (
    <Window title="etl · auditoría de datos">
      {sources.map((s, i) => (
        <Source key={s.name} s={s} i={i} />
      ))}
      {sources.map((s, i) => (
        <Flow
          key={s.name}
          x1={30 + SRC_W}
          y1={s.y + SRC_H / 2}
          x2={ETL.x}
          y2={ETL.y + ETL.h / 2}
          start={26 + i * 4}
        />
      ))}
      <Flow x1={ETL.x + ETL.w} y1={ETL.y + ETL.h / 2} x2={BI.x} y2={ETL.y + ETL.h / 2} start={90} />

      <div
        style={{
          position: "absolute",
          left: ETL.x,
          top: ETL.y,
          width: ETL.w,
          height: ETL.h,
          border: `1px solid ${color.lineStrong}`,
          borderRadius: 12,
          background: color.surface,
          padding: 18,
          ...pop(etl),
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 16, color: color.fg }}>etl.py</span>
          <Pill>python · pandas</Pill>
        </div>
        <div style={{ marginTop: 20, fontSize: 13, lineHeight: 2, color: color.fgBody }}>
          {code.map((c, i) => (
            <CodeLine key={c} text={c} i={i} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 18, bottom: 16, fontSize: 13, color: color.fgMuted }}>
          3.420 filas → 3.391 únicas
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: BI.x,
          top: BI.y,
          width: BI.w,
          bottom: 40,
          border: `1px solid ${color.line}`,
          borderRadius: 12,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          ...pop(bi),
        }}
      >
        <div style={{ fontSize: 13, color: color.fgMuted }}>power bi · integridad</div>
        <div style={{ fontSize: 34, color: color.fg, marginTop: 10 }}>{fmt(match, 1)} %</div>
        <div style={{ fontSize: 13, color: color.fgMuted }}>registros que coinciden entre fuentes</div>
        <svg
          viewBox="0 0 290 150"
          width={290}
          height={150}
          style={{ marginTop: 24, clipPath: `inset(0 ${chart}% 0 0)` }}
        >
          {[30, 75, 120].map((y) => (
            <line key={y} x1={0} x2={290} y1={y} y2={y} stroke={color.line} />
          ))}
          <polyline
            points="0,110 40,96 80,102 120,70 160,78 200,48 240,56 290,30"
            fill="none"
            stroke={color.accent}
            strokeWidth={2.5}
          />
          <polyline
            points="0,128 40,124 80,118 120,120 160,104 200,108 240,96 290,92"
            fill="none"
            stroke={color.lineStrong}
            strokeWidth={2}
          />
        </svg>
        <div
          style={{
            marginTop: "auto",
            border: `1px solid ${color.accent}`,
            borderRadius: 8,
            padding: "12px 14px",
            background: color.accentTint,
            ...rise(alert, 10),
          }}
        >
          <div style={{ fontSize: 15, color: color.fg }}>12 registros no cuadran</div>
          <div style={{ fontSize: 13, color: color.fgMuted, marginTop: 4 }}>precio distinto entre sitio-a y api</div>
        </div>
      </div>
    </Window>
  );
}
