import type { ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import { color } from "../theme";
import { Pill, Swap, Window, fmt, rise, useCount, useP } from "../ui";

function Bubble({ ai = false, start, children }: { ai?: boolean; start: number; children: ReactNode }) {
  const p = useP(start, 12);
  return (
    <div
      style={{
        alignSelf: ai ? "flex-end" : "flex-start",
        maxWidth: 340,
        padding: "9px 13px",
        borderRadius: 12,
        fontSize: 14,
        lineHeight: 1.45,
        color: color.fg,
        border: `1px solid ${ai ? "rgba(146, 129, 247, 0.45)" : color.line}`,
        background: ai ? color.accentTint : color.surface,
        ...rise(p, 14),
      }}
    >
      {ai ? <div style={{ fontSize: 11, color: color.accent, marginBottom: 3 }}>asistente IA</div> : null}
      {children}
    </div>
  );
}

function Thinking({ from, to }: { from: number; to: number }) {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  return (
    <div
      style={{
        alignSelf: "flex-end",
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "12px 14px",
        border: "1px solid rgba(146, 129, 247, 0.45)",
        borderRadius: 12,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: 99,
            background: color.accent,
            opacity: 0.3 + 0.7 * Math.abs(Math.sin((frame - from) / 5 + i * 0.7)),
          }}
        />
      ))}
    </div>
  );
}

const ai = <Pill tone="accent">IA respondiendo</Pill>;
const solved = <Pill tone="ok">resuelta por IA</Pill>;
const human = <Pill>con un asesor</Pill>;

const inbox: { who: string; last: ReactNode; status: ReactNode }[] = [
  {
    who: "María V.",
    last: (
      <Swap
        at={78}
        from="¿Hacen envíos a Cochabamba?"
        to={<Swap at={150} from="¿Aceptan pago con QR?" to="Quiero un pedido grande" />}
      />
    ),
    status: <Swap at={168} from={ai} to={human} />,
  },
  { who: "Jorge P.", last: "¿Tienen la talla M?", status: solved },
  { who: "Lucía R.", last: "Perfecto, gracias", status: solved },
  { who: "Carlos M.", last: "Necesito factura", status: human },
];

function Counter({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div style={{ flex: 1, border: `1px solid ${color.line}`, borderRadius: 10, padding: "12px 16px" }}>
      <div style={{ fontSize: 12, color: color.fgMuted }}>{label}</div>
      <div style={{ fontSize: 24, color: color.fg, marginTop: 4 }}>{value}</div>
    </div>
  );
}

export function BotDemo() {
  const today = useCount(142, 10, 50, 120);
  const handoff = useP(168, 12);

  return (
    <Window title="whatsapp · asistente con IA">
      <div style={{ display: "flex", height: "100%" }}>
        <section style={{ width: 470, borderRight: `1px solid ${color.line}`, display: "flex", flexDirection: "column" }}>
          <header
            style={{
              height: 64,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 20px",
              borderBottom: `1px solid ${color.line}`,
            }}
          >
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: 99,
                border: `1px solid ${color.lineStrong}`,
                display: "grid",
                placeItems: "center",
                fontSize: 13,
              }}
            >
              MV
            </span>
            <div>
              <div style={{ color: color.fg, fontSize: 15 }}>María Vargas</div>
              <div style={{ color: color.fgMuted, fontSize: 12 }}>+591 7•• ••• 208</div>
            </div>
          </header>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, padding: "16px 20px" }}>
            <Bubble start={12}>Hola, ¿hacen envíos a Cochabamba?</Bubble>
            <Thinking from={28} to={46} />
            <Bubble ai start={46}>
              Hola, María. Sí, enviamos a todo el país: a Cochabamba llega en 2 a 3 días y el envío cuesta $5.
            </Bubble>
            <Bubble start={78}>¿Aceptan pago con QR?</Bubble>
            <Thinking from={90} to={104} />
            <Bubble ai start={104}>
              Sí, QR o transferencia. Te dejo el catálogo de este mes.
              <div
                style={{
                  marginTop: 8,
                  padding: "7px 10px",
                  border: `1px solid ${color.line}`,
                  borderRadius: 8,
                  fontSize: 13,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <span>catalogo-octubre.pdf</span>
                <span style={{ color: color.fgMuted }}>2,1 MB</span>
              </div>
            </Bubble>
            <Bubble start={150}>Quiero hablar con alguien por un pedido grande</Bubble>
            <div style={{ alignSelf: "center", ...rise(handoff, 8) }}>
              <Pill>la IA derivó la conversación a un asesor</Pill>
            </div>
          </div>
        </section>

        <section style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 20, color: color.fg }}>Bandeja</div>
              <div style={{ fontSize: 13, color: color.fgMuted }}>WhatsApp Business · Cloud API oficial</div>
            </div>
            <Pill tone="ok">● webhook activo</Pill>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <Counter label="conversaciones hoy" value={fmt(today)} />
            <Counter label="resueltas por la IA" value="87 %" />
            <Counter label="con un asesor" value={<Swap at={168} from="18" to="19" />} />
          </div>
          <div>
            {inbox.map((c) => (
              <div
                key={c.who}
                style={{
                  display: "grid",
                  gridTemplateColumns: "110px 1fr auto",
                  alignItems: "center",
                  gap: 12,
                  height: 54,
                  borderTop: `1px solid ${color.line}`,
                  fontSize: 14,
                }}
              >
                <span style={{ color: color.fg }}>{c.who}</span>
                <span style={{ color: color.fgMuted, whiteSpace: "nowrap", overflow: "hidden" }}>{c.last}</span>
                {c.status}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: color.fgMuted }}>
            <span>base de conocimiento: envíos · pagos · catálogo · horarios</span>
            <span>plantillas aprobadas por Meta: 6</span>
          </div>
        </section>
      </div>
    </Window>
  );
}
