import type { ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import { color } from "../theme";
import { Pill, Pointer, Swap, Typed, Window, pop, rise, useP } from "../ui";

function Field({ label, top, children, active = false }: {
  label: string;
  top: number;
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <div style={{ position: "absolute", left: 32, width: 536, top }}>
      <div style={{ fontSize: 13, color: color.fgMuted, marginBottom: 6 }}>{label}</div>
      <div
        style={{
          height: 44,
          border: `1px solid ${active ? color.accent : color.line}`,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
          fontSize: 15,
          color: color.fg,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// QR de mentira: celdas fijas, sin aleatoriedad para que cada render sea igual.
function Qr() {
  const cells = Array.from({ length: 21 * 21 }, (_, i) => ((i * 2654435761) >>> 0) % 7 < 3);
  // Las tres esquinas de un QR: anillo de 7×7 con un cuadrado de 3×3 adentro.
  const finder = (x: number, y: number): boolean | null => {
    for (const [ox, oy] of [[0, 0], [14, 0], [0, 14]]) {
      const dx = x - ox;
      const dy = y - oy;
      if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7) {
        const inside = dx >= 0 && dx <= 6 && dy >= 0 && dy <= 6;
        const ring = dx === 0 || dx === 6 || dy === 0 || dy === 6;
        const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
        return inside && (ring || core);
      }
    }
    return null;
  };
  return (
    <svg width={92} height={92} viewBox="0 0 21 21" style={{ border: `1px solid ${color.lineStrong}`, borderRadius: 6, padding: 6 }}>
      {cells.map((on, i) => {
        const x = i % 21;
        const y = Math.floor(i / 21);
        return (finder(x, y) ?? on) ? <rect key={i} x={x} y={y} width={1} height={1} fill={color.fgBody} /> : null;
      })}
    </svg>
  );
}

const areas = ["Psicología", "Fonoaudiología", "Terapia ocupacional"];

export function AdmisionDemo() {
  const frame = useCurrentFrame();
  const menuOpen = frame >= 80 && frame < 100;
  const menu = useP(80, 8);
  const chosen = frame >= 100;
  const specialist = useP(118, 14);
  const payment = useP(140, 14);
  const note = useP(182, 12);

  return (
    <Window title="admision · registro de pacientes">
      <section style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 600, borderRight: `1px solid ${color.line}` }}>
        <div style={{ position: "absolute", left: 32, top: 24 }}>
          <div style={{ fontSize: 22, color: color.fg }}>Registro de paciente</div>
          <div style={{ fontSize: 13, color: color.fgMuted, marginTop: 4 }}>formulario público · paso 1 de 2</div>
        </div>
        <Field label="nombre del paciente" top={96} active={frame >= 12 && frame < 34}>
          <span>
            <Typed text="Mateo Choque" start={12} perChar={1.6} />
          </span>
        </Field>
        <Field label="edad" top={176} active={frame >= 36 && frame < 46}>
          <span>
            <Typed text="6 años" start={36} perChar={1.6} />
          </span>
        </Field>
        <Field label="motivo de consulta" top={256} active={frame >= 48 && frame < 78}>
          <span>
            <Typed text="No pronuncia bien la r" start={48} perChar={1.3} />
          </span>
        </Field>
        <Field label="área" top={336} active={menuOpen}>
          <span style={{ color: chosen ? color.fg : color.fgMuted }}>{chosen ? "Fonoaudiología" : "elegir área"}</span>
          <span style={{ color: color.fgMuted }}>▾</span>
        </Field>
        <div
          style={{
            position: "absolute",
            left: 32,
            width: 536,
            top: 410,
            border: `1px solid ${color.lineStrong}`,
            borderRadius: 8,
            background: color.surface,
            overflow: "hidden",
            zIndex: 2,
            opacity: menuOpen ? menu : 0,
            transform: `translateY(${(1 - menu) * -6}px)`,
          }}
        >
          {areas.map((a, i) => (
            <div
              key={a}
              style={{
                height: 40,
                display: "flex",
                alignItems: "center",
                padding: "0 14px",
                fontSize: 15,
                background: i === 1 && frame >= 90 ? color.surfaceActive : undefined,
                color: i === 1 && frame >= 90 ? color.fg : color.fgMuted,
              }}
            >
              {a}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 32,
            top: 436,
            width: 180,
            height: 44,
            border: `1px solid ${color.lineStrong}`,
            borderRadius: 6,
            display: "grid",
            placeItems: "center",
            fontSize: 15,
            color: color.fg,
          }}
        >
          continuar →
        </div>
      </section>

      <section style={{ position: "absolute", left: 600, right: 0, top: 0, bottom: 0, padding: 32 }}>
        <div style={{ border: `1px solid ${color.line}`, borderRadius: 12, padding: 22, ...pop(specialist) }}>
          <div style={{ fontSize: 13, color: color.fgMuted }}>especialista asignado</div>
          <div style={{ fontSize: 22, color: color.fg, marginTop: 8 }}>Lic. Paula Mendoza</div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <Pill tone="accent">Fonoaudiología</Pill>
            <Pill>mar 29 oct · 10:30</Pill>
          </div>
        </div>
        <div style={{ border: `1px solid ${color.line}`, borderRadius: 12, padding: 22, marginTop: 20, ...pop(payment) }}>
          <div style={{ fontSize: 13, color: color.fgMuted }}>pago de la consulta inicial</div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 14 }}>
            <Qr />
            <div>
              <div style={{ fontSize: 26, color: color.fg }}>Bs 150</div>
              <div style={{ marginTop: 8 }}>
                <Swap at={168} from={<Pill>esperando pago QR</Pill>} to={<Pill tone="ok">✓ pagado</Pill>} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: color.fgMuted, marginTop: 20, ...rise(note, 8) }}>
          ficha #0248 enviada al panel del equipo
        </div>
      </section>

      <Pointer
        keys={[
          { f: 66, x: 420, y: 470 },
          { f: 80, x: 300, y: 380, click: true },
          { f: 96, x: 260, y: 451, click: true },
          { f: 112, x: 122, y: 458, click: true },
          { f: 200, x: 160, y: 500 },
        ]}
      />
    </Window>
  );
}
