import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { color, easeInOut, easeOut, fontFamily } from "./theme";
import { iconPath } from "./icons";
import type { VideoProps } from "./scripts";
import { demos, verticalSizes } from "./demos";
import { H, W } from "./ui";

// Línea de tiempo (frames a 30 fps). Cada escena se solapa con la anterior OVERLAP frames.
const INTRO = 84;
const LINE = 75;
const DEMO = 210;
const STACK = 96;
const OVERLAP = 6;
const EXIT = 14;
const FADE_OUT = 16;

function timeline(hasProblem: boolean) {
  const durations = [INTRO, ...(hasProblem ? [LINE] : []), DEMO, STACK];
  const starts: number[] = [];
  let t = 0;
  for (const d of durations) {
    starts.push(t);
    t += d - OVERLAP;
  }
  return { durations, starts, total: t + OVERLAP };
}

export function videoDuration(props: Pick<VideoProps, "problem">) {
  return timeline(Boolean(props.problem)).total;
}

/** Frame para el póster del sitio: la demo ya armada. */
export function posterFrame(props: Pick<VideoProps, "problem">) {
  const { starts } = timeline(Boolean(props.problem));
  return starts[starts.length - 2] + 150;
}

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Escala tipográfica: el lado corto manda, así sirve igual en 16:9 y en 9:16.
function useLayout() {
  const { width, height } = useVideoConfig();
  const vertical = height > width;
  const unit = Math.min(width, height);
  return {
    vertical,
    padX: vertical ? unit * 0.085 : unit * 0.13,
    padY: vertical ? unit * 0.12 : unit * 0.075,
    phrase: unit * (vertical ? 0.086 : 0.09),
    title: unit * (vertical ? 0.1 : 0.108),
    meta: unit * 0.026,
    maxWidth: vertical ? width - unit * 0.17 : width * 0.78,
  };
}

/** Salida común de cada escena: sube un poco y se desvanece. */
function useExit(duration: number) {
  const frame = useCurrentFrame();
  const e = interpolate(frame, [duration - EXIT, duration], [0, 1], { ...clamp, easing: easeInOut });
  return { opacity: 1 - e, transform: `translateY(${-e * 36}px)` } satisfies CSSProperties;
}

type Token = { word: string; accent: boolean; suffix: string };

/** `*palabra*` va en acento; `|` fuerza un salto de línea. */
function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  for (const part of text.split(/(\*[^*]+\*)/)) {
    const accent = part.startsWith("*") && part.endsWith("*");
    const clean = accent ? part.slice(1, -1) : part;
    // La puntuación pegada a una palabra en acento ("*cuenta*.") se une a esa palabra.
    const glued = !accent && /^[.,;:!?]+/.exec(clean);
    if (glued && tokens.length && !clean.startsWith(" ")) tokens[tokens.length - 1].suffix += glued[0];
    const rest = glued ? clean.slice(glued[0].length) : clean;
    for (const word of rest.split(" ").filter(Boolean)) tokens.push({ word, accent, suffix: "" });
  }
  return tokens;
}

const WORD_STAGGER = 3;
const WORD_IN = 18;

/** Tipografía cinética: cada palabra sube desde detrás de una máscara. */
function KineticText({
  text,
  delay = 0,
  size,
  style,
}: {
  text: string;
  delay?: number;
  size: number;
  style?: CSSProperties;
}) {
  const frame = useCurrentFrame();
  const tokens = tokenize(text);
  const done = delay + (tokens.length - 1) * WORD_STAGGER + WORD_IN;
  const cursorOn = frame > done - 4 && Math.floor((frame - done) / 14) % 2 === 0;

  return (
    <p
      style={{
        margin: 0,
        fontSize: size,
        fontWeight: 500,
        lineHeight: 1.12,
        letterSpacing: "-0.045em",
        color: color.fg,
        ...style,
      }}
    >
      {tokens.map((t, i) => {
        if (t.word === "|") return <br key={i} />;
        const start = delay + i * WORD_STAGGER;
        const p = interpolate(frame, [start, start + WORD_IN], [0, 1], { ...clamp, easing: easeOut });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              paddingBottom: "0.08em",
              marginRight: "0.32em",
            }}
          >
            <span
              style={{
                display: "inline-block",
                color: t.accent ? color.accent : undefined,
                opacity: p,
                transform: `translateY(${(1 - p) * 105}%) rotate(${(1 - p) * 4}deg)`,
                transformOrigin: "left bottom",
              }}
            >
              {t.word}
              {t.suffix ? <span style={{ color: color.fg }}>{t.suffix}</span> : null}
            </span>
          </span>
        );
      })}
      <span
        style={{
          display: "inline-block",
          width: "0.5em",
          height: "0.9em",
          verticalAlign: "-0.08em",
          backgroundColor: color.fgMuted,
          opacity: cursorOn ? 1 : 0,
        }}
      />
    </p>
  );
}

function Label({ children, delay = 0 }: { children: string; delay?: number }) {
  const frame = useCurrentFrame();
  const { meta } = useLayout();
  const p = interpolate(frame, [delay, delay + 14], [0, 1], { ...clamp, easing: easeOut });
  return (
    <p
      style={{
        margin: 0,
        marginBottom: meta * 1.4,
        fontSize: meta * 1.15,
        color: color.fgMuted,
        opacity: p,
        transform: `translateX(${(1 - p) * -12}px)`,
      }}
    >
      {"// "}
      {children}
    </p>
  );
}

/** Texto que se tipea carácter a carácter, como en la terminal del hero. */
function Typed({ text, delay = 0, perChar = 1.2 }: { text: string; delay?: number; perChar?: number }) {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.floor((frame - delay) / perChar));
  return <>{text.slice(0, n)}</>;
}

function Intro({ props, duration }: { props: VideoProps; duration: number }) {
  const { title, meta } = useLayout();
  const exit = useExit(duration);
  const frame = useCurrentFrame();
  const contextIn = interpolate(frame, [22, 36], [0, 1], { ...clamp, easing: easeOut });
  const cmd = `cd ~/proyectos/${props.slug}`;

  return (
    <div style={exit}>
      <p style={{ margin: 0, fontSize: meta * 1.15, color: color.fgMuted }}>
        <span style={{ color: color.accent }}>{"> "}</span>
        <Typed text={cmd} perChar={0.6} />
      </p>
      <p
        style={{
          margin: 0,
          marginTop: meta * 0.7,
          marginBottom: meta * 2,
          fontSize: meta * 1.15,
          color: color.fgMuted,
          opacity: contextIn,
          transform: `translateY(${(1 - contextIn) * 10}px)`,
        }}
      >
        {String(props.index + 1).padStart(2, "0")} · {props.context}
      </p>
      <KineticText text={props.title} delay={26} size={title} style={{ letterSpacing: "-0.05em" }} />
    </div>
  );
}

function Phrase({ label, text, duration }: { label: string; text: string; duration: number }) {
  const { phrase } = useLayout();
  const exit = useExit(duration);
  return (
    <div style={exit}>
      <Label delay={8}>{label}</Label>
      <KineticText text={text} delay={12} size={phrase} />
    </div>
  );
}

function Stack({ items, duration }: { items: string[]; duration: number }) {
  const frame = useCurrentFrame();
  const { meta, vertical } = useLayout();
  const exit = useExit(duration);
  const chip = meta * 1.45;

  return (
    <div style={exit}>
      <Label delay={2}>stack</Label>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: chip * 0.6,
          maxWidth: vertical ? undefined : "92%",
        }}
      >
        {items.map((name, i) => {
          const start = 8 + i * 4;
          const p = interpolate(frame, [start, start + 16], [0, 1], { ...clamp, easing: easeOut });
          const d = iconPath(name);
          return (
            <li
              key={name}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: chip * 0.5,
                padding: `${chip * 0.45}px ${chip * 0.7}px`,
                border: `2px solid ${color.lineStrong}`,
                borderRadius: 10,
                fontSize: chip,
                color: color.fgBody,
                opacity: p,
                transform: `translateY(${(1 - p) * 18}px) scale(${0.95 + p * 0.05})`,
              }}
            >
              {d ? (
                <svg viewBox="0 0 24 24" width={chip * 0.95} height={chip * 0.95} fill={color.fgMuted}>
                  <path d={d} />
                </svg>
              ) : null}
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** La demo del proyecto, escalada para que la ventana quepa en el formato. */
function Demo({ slug, duration }: { slug: string; duration: number }) {
  const { width, height } = useVideoConfig();
  const { vertical, padX, meta } = useLayout();
  const exit = useExit(duration);
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 20], [0, 1], { ...clamp, easing: easeOut });
  const availW = width - padX * 2;
  const own = vertical ? verticalSizes[slug] : undefined;
  const w = own?.w ?? W;
  const h = own?.h ?? H;
  // En vertical una ventana ancha quedaría ilegible: se agranda y la cámara la recorre.
  const panned = vertical && !own;
  const s = panned ? 1.2 : Math.min(availW / w, (height - (vertical ? 520 : 380)) / h);
  const pan = panned
    ? interpolate(frame, [24, duration - 30], [0, w * s - availW], { ...clamp, easing: easeInOut })
    : 0;
  const Component = demos[slug];

  return (
    <div style={exit}>
      <p style={{ margin: 0, marginBottom: meta * 1.2, fontSize: meta * 1.15, color: color.fgMuted, opacity: p }}>
        {"// ejemplo de cómo se ve"}
      </p>
      <div
        style={{
          width: Math.min(w * s, availW),
          height: h * s,
          opacity: p,
          transform: `translateY(${(1 - p) * 24}px) scale(${0.95 + 0.05 * p})`,
        }}
      >
        <div
          style={{
            width: w,
            height: h,
            transform: `translateX(${-pan}px) scale(${s})`,
            transformOrigin: "top left",
          }}
        >
          <Component vertical={vertical} />
        </div>
      </div>
    </div>
  );
}

/** Retícula de líneas de 1px: no decora, sirve para que se note el movimiento de cámara. */
function Grid() {
  const { width, height } = useVideoConfig();
  const step = Math.min(width, height) / 6;
  const lines = { stroke: color.line, strokeWidth: 1 };
  const xs = Array.from({ length: Math.ceil(width / step) + 3 }, (_, i) => (i - 1) * step);
  const ys = Array.from({ length: Math.ceil(height / step) + 3 }, (_, i) => (i - 1) * step);
  return (
    <svg width={width} height={height} style={{ position: "absolute", inset: 0, opacity: 0.45 }}>
      {xs.map((x) => (
        <line key={`x${x}`} x1={x} x2={x} y1={-step} y2={height + step} {...lines} />
      ))}
      {ys.map((y) => (
        <line key={`y${y}`} y1={y} y2={y} x1={-step} x2={width + step} {...lines} />
      ))}
    </svg>
  );
}

function Hud({ props, total }: { props: VideoProps; total: number }) {
  const frame = useCurrentFrame();
  const { padX, padY, meta } = useLayout();
  const p = interpolate(frame, [0, 14], [0, 1], { ...clamp, easing: easeOut });
  const progress = interpolate(frame, [0, total - FADE_OUT], [0, 1], clamp);
  const text: CSSProperties = { fontSize: meta, color: color.fgMuted, margin: 0 };

  return (
    <AbsoluteFill style={{ opacity: p }}>
      <div
        style={{
          position: "absolute",
          top: padY * 0.7,
          left: padX,
          right: padX,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p style={text}>~/proyectos</p>
        <p style={text}>
          {String(props.index + 1).padStart(2, "0")} / {String(props.total).padStart(2, "0")}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: padY * 0.7,
          left: padX,
          right: padX,
          height: 2,
          backgroundColor: color.line,
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: color.accent,
            transform: `scaleX(${progress})`,
            transformOrigin: "left",
          }}
        />
      </div>
    </AbsoluteFill>
  );
}

export function ProjectVideo(props: VideoProps) {
  const frame = useCurrentFrame();
  const layout = useLayout();
  const { durations, starts, total } = timeline(Boolean(props.problem));

  // Cámara: acercamiento y paneo lentos durante todo el clip.
  const t = interpolate(frame, [0, total], [0, 1], { ...clamp, easing: easeInOut });
  const camera = `scale(${1 + t * 0.035}) translate(${(t - 0.5) * -20}px, ${(t - 0.5) * 12}px)`;
  // Arranca y termina en negro para que el loop no salte.
  const fade = interpolate(frame, [total - FADE_OUT, total], [1, 0], { ...clamp, easing: easeInOut });

  const last = durations.length - 1;
  const scenes = [
    <Intro key="intro" props={props} duration={durations[0]} />,
    ...(props.problem ? [<Phrase key="problem" label="problema" text={props.problem} duration={LINE} />] : []),
    <Demo key="demo" slug={props.slug} duration={DEMO} />,
    <Stack key="stack" items={props.stack} duration={durations[last]} />,
  ];
  const demoIndex = last - 1;

  return (
    <AbsoluteFill style={{ backgroundColor: color.canvas, fontFamily, opacity: fade }}>
      <AbsoluteFill style={{ transform: camera, transformOrigin: "25% 50%" }}>
        <Grid />
        {scenes.map((scene, i) => (
          <Sequence key={i} from={starts[i]} durationInFrames={durations[i]} layout="none">
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: i === demoIndex ? "center" : undefined,
                paddingLeft: layout.padX,
                paddingRight: layout.padX,
              }}
            >
              <div style={{ maxWidth: layout.maxWidth }}>{scene}</div>
            </AbsoluteFill>
          </Sequence>
        ))}
      </AbsoluteFill>
      <Hud props={props} total={total} />
    </AbsoluteFill>
  );
}
