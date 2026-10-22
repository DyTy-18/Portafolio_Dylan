import { color } from "../theme";
import { Pill, Window, fmt, rise, useCount, useP } from "../ui";

function Kpi({ label, to, suffix = "", accent = false, start }: {
  label: string;
  to: number;
  suffix?: string;
  accent?: boolean;
  start: number;
}) {
  const p = useP(start, 12);
  const n = useCount(to, start, 50);
  return (
    <div style={{ flex: 1, border: `1px solid ${color.line}`, borderRadius: 10, padding: "14px 18px", ...rise(p) }}>
      <div style={{ fontSize: 13, color: color.fgMuted }}>{label}</div>
      <div style={{ fontSize: 30, color: accent ? color.accent : color.fg, marginTop: 6 }}>
        {fmt(n)}
        {suffix}
      </div>
    </div>
  );
}

const bars = [42, 58, 51, 73, 66, 88, 79];
const dayNames = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

function Bar({ value, i }: { value: number; i: number }) {
  const p = useP(34 + i * 6, 22);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ height: 300, display: "flex", alignItems: "flex-end" }}>
        <div
          style={{
            width: 40,
            height: value * 3,
            background: i === 5 ? color.accent : color.lineStrong,
            borderRadius: "4px 4px 0 0",
            transform: `scaleY(${p})`,
            transformOrigin: "bottom",
          }}
        />
      </div>
      <span style={{ fontSize: 12, color: color.fgMuted }}>{dayNames[i]}</span>
    </div>
  );
}

const events: [number, string, string, string, string][] = [
  [20, "14:02:11", "lesson.completed", "m.rojas", "Excel avanzado · L4"],
  [42, "14:02:19", "course.enrolled", "j.pinto", "Liderazgo"],
  [64, "14:02:26", "quiz.submitted", "a.vargas", "Finanzas · Q2"],
  [86, "14:02:40", "lesson.completed", "l.cruz", "Excel avanzado · L5"],
  [108, "14:02:52", "course.completed", "r.salas", "Marketing digital"],
  [130, "14:03:05", "lesson.completed", "p.mamani", "Liderazgo · L1"],
];

function Event({ e }: { e: (typeof events)[number] }) {
  const p = useP(e[0], 12);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "84px 170px 96px 1fr",
        fontSize: 13,
        padding: "9px 0",
        borderTop: `1px solid ${color.line}`,
        ...rise(p, 8),
      }}
    >
      <span style={{ color: color.fgMuted }}>{e[1]}</span>
      <span style={{ color: color.accent }}>{e[2]}</span>
      <span style={{ color: color.fg }}>{e[3]}</span>
      <span style={{ color: color.fgMuted, whiteSpace: "nowrap" }}>{e[4]}</span>
    </div>
  );
}

export function DashboardDemo() {
  const backfill = useP(150, 36);
  const synced = useCount(2140, 150, 36);
  const backfillIn = useP(146, 10);

  return (
    <Window title="dashboard · seguimiento de estudiantes">
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, height: "100%" }}>
        <div style={{ display: "flex", gap: 16 }}>
          <Kpi label="estudiantes activos" to={1284} start={6} />
          <Kpi label="lecciones hoy" to={362} start={10} />
          <Kpi label="avance promedio" to={64} suffix=" %" start={14} />
          <Kpi label="en riesgo" to={37} accent start={18} />
        </div>
        <div style={{ display: "flex", gap: 16, flex: 1, minHeight: 0 }}>
          <div style={{ width: 470, border: `1px solid ${color.line}`, borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 14, color: color.fgMuted }}>lecciones completadas · últimos 7 días</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, padding: "0 6px" }}>
              {bars.map((v, i) => (
                <Bar key={i} value={v} i={i} />
              ))}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              border: `1px solid ${color.line}`,
              borderRadius: 10,
              padding: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 14, color: color.fgMuted }}>eventos · webhooks de LearnWorlds</span>
              <Pill tone="ok">● recibiendo</Pill>
            </div>
            {events.map((e) => (
              <Event key={e[1]} e={e} />
            ))}
            <div style={{ marginTop: "auto", ...rise(backfillIn, 8) }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                <span style={{ color: color.fgMuted }}>backfill · historial anterior</span>
                <span style={{ color: backfill >= 1 ? color.ok : color.fg }}>{fmt(synced)} eventos</span>
              </div>
              <div style={{ height: 6, background: color.line, borderRadius: 99, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    background: color.accent,
                    transform: `scaleX(${backfill})`,
                    transformOrigin: "left",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
