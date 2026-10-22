import { interpolate, useCurrentFrame } from "remotion";
import { color } from "../theme";
import { Pill, Pointer, Typed, Window, clamp, pop, rise, useP } from "../ui";

const articles = [
  { cat: "Datos", title: "Cómo auditar tus datos en 5 pasos" },
  { cat: "Procesos", title: "El costo real de un Excel compartido" },
  { cat: "Invitados", title: "Lo que aprendimos migrando a la nube" },
  { cat: "Datos", title: "Dashboards que la gerencia sí abre" },
];

function Card({ a, i }: { a: (typeof articles)[number]; i: number }) {
  const p = useP(8 + i * 6, 14);
  return (
    <div style={{ border: `1px solid ${color.line}`, borderRadius: 10, overflow: "hidden", ...rise(p, 14) }}>
      <div
        style={{
          height: 96,
          background: color.surface,
          borderBottom: `1px solid ${color.line}`,
          display: "grid",
          placeItems: "center",
          color: color.line,
          fontSize: 40,
        }}
      >
        {"{ }"}
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontSize: 12, color: color.accent }}>{a.cat}</div>
        <div style={{ fontSize: 15, color: color.fg, marginTop: 4, lineHeight: 1.35 }}>{a.title}</div>
      </div>
    </div>
  );
}

const TITLE = "Cómo auditar tus datos en 5 pasos";

export function SitioDemo() {
  const frame = useCurrentFrame();
  const titleLen = Math.max(0, Math.min(TITLE.length, Math.floor((frame - 46) / 1.2)));
  const meta = interpolate(frame, [92, 122], [0, 148], clamp);
  const pdf = useP(146, 14);

  return (
    <Window title="consultora.com/blog">
      <section style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 690, borderRight: `1px solid ${color.line}`, padding: 26 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: color.fgMuted }}>
          <span style={{ color: color.fg }}>Consultora</span>
          <span>servicios · casos · blog · contacto</span>
        </div>
        <div style={{ fontSize: 34, color: color.fg, marginTop: 30, letterSpacing: "-0.03em" }}>Blog</div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Pill tone="accent">todos</Pill>
          <Pill>datos</Pill>
          <Pill>procesos</Pill>
          <Pill>invitados</Pill>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 22 }}>
          {articles.map((a, i) => (
            <Card key={a.title} a={a} i={i} />
          ))}
        </div>
      </section>

      <section style={{ position: "absolute", left: 690, right: 0, top: 0, bottom: 0, padding: 26 }}>
        <div style={{ fontSize: 13, color: color.fgMuted }}>panel · editar artículo</div>
        <div style={{ fontSize: 13, color: color.fgMuted, marginTop: 22 }}>título SEO</div>
        <div
          style={{
            marginTop: 6,
            border: `1px solid ${frame >= 46 && frame < 90 ? color.accent : color.line}`,
            borderRadius: 8,
            padding: "11px 12px",
            fontSize: 14,
            color: color.fg,
            minHeight: 44,
          }}
        >
          <Typed text={TITLE} start={46} perChar={1.2} />
        </div>
        <div style={{ fontSize: 12, color: titleLen === TITLE.length ? color.ok : color.fgMuted, marginTop: 6, textAlign: "right" }}>
          {titleLen}/60
        </div>
        <div style={{ fontSize: 13, color: color.fgMuted, marginTop: 12 }}>meta descripción</div>
        <div style={{ height: 6, background: color.line, borderRadius: 99, marginTop: 10, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              background: meta >= 148 ? color.ok : color.accent,
              transform: `scaleX(${meta / 160})`,
              transformOrigin: "left",
            }}
          />
        </div>
        <div style={{ fontSize: 12, color: meta >= 148 ? color.ok : color.fgMuted, marginTop: 6, textAlign: "right" }}>
          {Math.round(meta)}/160
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <Pill>autor invitado: R. Salinas</Pill>
        </div>
        <div
          style={{
            marginTop: 26,
            height: 44,
            border: `1px solid ${color.lineStrong}`,
            borderRadius: 6,
            display: "grid",
            placeItems: "center",
            fontSize: 14,
            color: color.fg,
          }}
        >
          generar brochure en PDF
        </div>
        <div
          style={{
            marginTop: 18,
            display: "flex",
            gap: 16,
            alignItems: "center",
            border: `1px solid ${color.line}`,
            borderRadius: 10,
            padding: 14,
            ...pop(pdf),
          }}
        >
          <div
            style={{
              width: 64,
              height: 84,
              background: color.fgBody,
              borderRadius: 4,
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <div style={{ height: 8, width: "70%", background: color.accent }} />
            {[90, 100, 80, 95, 60].map((w, i) => (
              <div key={i} style={{ height: 4, width: `${w}%`, background: "#9a9da0" }} />
            ))}
          </div>
          <div>
            <div style={{ fontSize: 15, color: color.fg }}>brochure-auditoria.pdf</div>
            <div style={{ fontSize: 13, color: color.fgMuted, marginTop: 4 }}>2 páginas · desde la plantilla HTML</div>
            <div style={{ marginTop: 8 }}>
              <Pill tone="ok">✓ listo</Pill>
            </div>
          </div>
        </div>
      </section>

      <Pointer
        keys={[
          { f: 112, x: 600, y: 420 },
          { f: 134, x: 944, y: 324, click: true },
          { f: 200, x: 980, y: 380 },
        ]}
      />
    </Window>
  );
}
