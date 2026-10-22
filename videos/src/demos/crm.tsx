import { color } from "../theme";
import { Pointer, Window, fmt, pop, rise, useCount, useP } from "../ui";

const days = ["lun 21", "mar 22", "mié 23", "jue 24", "vie 25", "sáb 26"];
const hours = [9, 10, 11, 12, 13, 14, 15, 16];
const ROW = 66;
const COL = 150;
const HOURS_W = 50;
const HEAD = 30;

type Appt = { d: number; h: number; len: number; who: string; what: string };

const appts: Appt[] = [
  { d: 0, h: 9, len: 1, who: "Ana Q.", what: "Manicure" },
  { d: 0, h: 11, len: 2, who: "Rosa T.", what: "Corte + color" },
  { d: 1, h: 10, len: 1, who: "Carla M.", what: "Pedicure" },
  { d: 1, h: 14, len: 1.5, who: "Lía S.", what: "Alisado" },
  { d: 2, h: 9, len: 1.5, who: "Paola V.", what: "Paquete novia" },
  { d: 2, h: 13, len: 1, who: "Marta G.", what: "Cejas" },
  { d: 3, h: 11, len: 1, who: "Sofía A.", what: "Manicure" },
  { d: 4, h: 9, len: 2, who: "Elena R.", what: "Color" },
  { d: 4, h: 14, len: 1, who: "Nadia F.", what: "Corte" },
  { d: 5, h: 10, len: 1.5, who: "Iris C.", what: "Spa de manos" },
];

const nav = ["agenda", "clientes", "paquetes", "inventario", "comisiones", "reportes"];

function Block({ a, start, accent = false }: { a: Appt; start: number; accent?: boolean }) {
  const p = useP(start, 12);
  return (
    <div
      style={{
        position: "absolute",
        left: HOURS_W + a.d * COL + 4,
        top: HEAD + (a.h - 9) * ROW + 3,
        width: COL - 8,
        height: a.len * ROW - 6,
        borderRadius: 8,
        border: `1px solid ${accent ? color.accent : color.line}`,
        background: accent ? color.accentTint : color.surface,
        padding: "6px 9px",
        fontSize: 13,
        lineHeight: 1.35,
        overflow: "hidden",
        ...pop(p),
      }}
    >
      <div style={{ color: color.fg }}>{a.who}</div>
      <div style={{ color: color.fgMuted }}>{a.what}</div>
    </div>
  );
}

export function CrmDemo() {
  const commission = useCount(4820, 20, 70);
  const toast = useP(160, 14);

  return (
    <Window title="crm · agenda">
      <div style={{ display: "flex", height: "100%" }}>
        <aside
          style={{
            width: 210,
            borderRight: `1px solid ${color.line}`,
            padding: "20px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            style={{
              border: `1px solid ${color.line}`,
              borderRadius: 8,
              padding: "8px 10px",
              fontSize: 14,
              marginBottom: 14,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Sucursal Centro</span>
            <span style={{ color: color.fgMuted }}>▾</span>
          </div>
          {nav.map((n, i) => (
            <div
              key={n}
              style={{
                padding: "8px 10px",
                borderRadius: 6,
                fontSize: 15,
                color: i === 0 ? color.fg : color.fgMuted,
                background: i === 0 ? color.surfaceActive : undefined,
              }}
            >
              <span style={{ color: color.accent, opacity: i === 0 ? 1 : 0 }}>{"> "}</span>
              {n}
            </div>
          ))}
        </aside>

        <main style={{ flex: 1, padding: 20, position: "relative" }}>
          <div
            style={{
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 20, color: color.fg }}>Agenda</div>
              <div style={{ fontSize: 13, color: color.fgMuted }}>semana 21–26 oct</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: color.fgMuted }}>comisiones de la semana</div>
                <div style={{ fontSize: 18, color: color.fg }}>${fmt(commission)}</div>
              </div>
              <div
                style={{
                  border: `1px solid ${color.lineStrong}`,
                  borderRadius: 6,
                  padding: "8px 14px",
                  fontSize: 14,
                  color: color.fg,
                }}
              >
                + nueva cita
              </div>
            </div>
          </div>

          <div style={{ position: "relative", height: HEAD + hours.length * ROW }}>
            {days.map((d, i) => (
              <div
                key={d}
                style={{
                  position: "absolute",
                  left: HOURS_W + i * COL,
                  top: 0,
                  width: COL,
                  height: "100%",
                  borderLeft: `1px solid ${color.line}`,
                  fontSize: 13,
                  color: color.fgMuted,
                  paddingLeft: 8,
                }}
              >
                {d}
              </div>
            ))}
            {hours.map((h, i) => (
              <div
                key={h}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: HEAD + i * ROW,
                  borderTop: `1px solid ${color.line}`,
                  fontSize: 12,
                  color: color.fgMuted,
                  paddingTop: 4,
                }}
              >
                {h}:00
              </div>
            ))}
            {appts.map((a, i) => (
              <Block key={i} a={a} start={16 + i * 5} />
            ))}
            <Block a={{ d: 3, h: 15, len: 1, who: "Lucía R.", what: "Corte + color" }} start={134} accent />
          </div>

          <div
            style={{
              position: "absolute",
              right: 24,
              bottom: 22,
              width: 300,
              border: `1px solid ${color.accent}`,
              borderRadius: 10,
              background: color.surface,
              padding: "12px 16px",
              ...rise(toast, 16),
            }}
          >
            <div style={{ fontSize: 12, color: color.accent }}>stock bajo · Sucursal Centro</div>
            <div style={{ fontSize: 15, color: color.fg, marginTop: 4 }}>Tinte 6.0 · quedan 3 u.</div>
          </div>
        </main>
      </div>
      <Pointer
        keys={[
          { f: 96, x: 640, y: 420 },
          { f: 122, x: 1108, y: 44, click: true },
          { f: 150, x: 830, y: 572 },
          { f: 200, x: 860, y: 590 },
        ]}
      />
    </Window>
  );
}
