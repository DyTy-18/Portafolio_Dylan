import type { ReactNode } from "react";
import { color } from "../theme";
import { Pill, Swap, Window, fmt, rise, useCount, useP } from "../ui";

const COLS = "1.25fr 1.15fr 1.45fr 1.1fr 0.95fr";

const campaigns: { name: string; template: string; to: string; freq: string; next: ReactNode }[] = [
  {
    name: "Recordatorio de pago",
    template: "recordatorio_pago",
    to: "Clientes con saldo · 320",
    freq: "cada mes · día 5",
    next: (
      <Swap
        at={58}
        from="hoy 09:00"
        to={<Swap at={150} from={<span style={{ color: color.accent }}>enviando…</span>} to={<span style={{ color: color.ok }}>enviado</span>} />}
      />
    ),
  },
  { name: "Bienvenida", template: "bienvenida_v2", to: "Contactos nuevos", freq: "al registrarse", next: "automático" },
  { name: "Novedades", template: "novedades_oct", to: "Suscriptores · 1.240", freq: "lun y jue · 18:00", next: "jue 18:00" },
  { name: "Encuesta", template: "encuesta_nps", to: "Compras de la semana", freq: "cada viernes", next: "vie 10:00" },
];

function Row({ cells, start, accent = false }: { cells: ReactNode[]; start: number; accent?: boolean }) {
  const p = useP(start, 12);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: COLS,
        alignItems: "center",
        height: 62,
        padding: "0 14px",
        fontSize: 14,
        borderTop: `1px solid ${color.line}`,
        borderLeft: `2px solid ${accent ? color.accent : "transparent"}`,
        background: accent ? color.accentTint : undefined,
        ...rise(p, 10),
      }}
    >
      {cells.map((c, i) => (
        <span key={i} style={{ color: i === 0 ? color.fg : i === 1 ? color.accent : color.fgMuted, whiteSpace: "nowrap" }}>
          {c}
        </span>
      ))}
    </div>
  );
}

function Stat({ label, to, start, dur }: { label: string; to: number; start: number; dur: number }) {
  const n = useCount(to, start, dur);
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <span style={{ color: color.fgMuted }}>{label}</span>
        <span style={{ color: color.fg }}>{fmt(n)}</span>
      </div>
      <div style={{ height: 6, background: color.line, borderRadius: 99, marginTop: 8, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            background: color.accent,
            transform: `scaleX(${n / 320})`,
            transformOrigin: "left",
          }}
        />
      </div>
    </div>
  );
}

export function ProgramadorDemo() {
  const report = useP(58, 12);
  return (
    <Window title="whatsapp · envíos programados">
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18, height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 22, color: color.fg }}>Envíos programados</div>
            <div style={{ fontSize: 13, color: color.fgMuted }}>WhatsApp Business · Cloud API oficial</div>
          </div>
          <Pill tone="ok">● API conectada</Pill>
        </div>
        <div style={{ border: `1px solid ${color.line}`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: COLS, padding: "10px 16px", fontSize: 12, color: color.fgMuted }}>
            <span>campaña</span>
            <span>plantilla de Meta</span>
            <span>para</span>
            <span>frecuencia</span>
            <span>próximo</span>
          </div>
          {campaigns.map((c, i) => (
            <Row key={c.name} cells={[c.name, c.template, c.to, c.freq, c.next]} start={8 + i * 6} />
          ))}
          <Row
            cells={["Promo fin de mes", "promo_fin_mes", "Todos · 2.860", "una vez", "31 oct 10:00"]}
            start={164}
            accent
          />
        </div>
        <div style={{ border: `1px solid ${color.line}`, borderRadius: 10, padding: "16px 18px", ...rise(report, 10) }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: color.fgMuted, marginBottom: 14 }}>
            <span>recordatorio de pago · envío de hoy</span>
            <span>estados que devuelve el webhook de Meta</span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            <Stat label="✓ enviados" to={320} start={64} dur={60} />
            <Stat label="✓✓ entregados" to={314} start={82} dur={64} />
            <Stat label="✓✓ leídos" to={241} start={100} dur={70} />
          </div>
        </div>
      </div>
    </Window>
  );
}
