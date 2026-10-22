import { Easing } from "remotion";
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";

// Tokens de docs/design-system.md (src/app/globals.css).
export const color = {
  canvas: "#000000",
  line: "#292d30",
  lineStrong: "#5f6368",
  fg: "#ffffff",
  fgBody: "#f0f0f0",
  fgMuted: "#a1a4a5",
  accent: "#9281f7",
  ok: "#3ad389",
  // Solo para las demos: superficies de las ventanas simuladas.
  surface: "#0b0c0d",
  surfaceActive: "#151718",
  accentTint: "rgba(146, 129, 247, 0.12)",
};

export const { fontFamily } = loadFont("normal", {
  weights: ["400", "500"],
  subsets: ["latin", "latin-ext"],
});

// Curvas del sistema de diseño: entradas ease-out, movimiento en pantalla ease-in-out.
export const easeOut = Easing.bezier(0.23, 1, 0.32, 1);
export const easeInOut = Easing.bezier(0.77, 0, 0.175, 1);

export const FPS = 30;
