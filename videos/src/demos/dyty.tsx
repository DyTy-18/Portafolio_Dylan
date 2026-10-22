import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { easeInOut } from "../theme";
import { H, W, Window, clamp } from "../ui";

// Capturas reales de https://dyty.dev en videos/public. Para actualizarlas, desde videos/:
//   CH=node_modules/.remotion/chrome-headless-shell/win64/chrome-headless-shell-win64/chrome-headless-shell.exe
//   $CH --headless --hide-scrollbars --virtual-time-budget=8000 --force-device-scale-factor=1.5 \
//     --window-size=1280,6000 --screenshot=public/dyty-desktop.png https://dyty.dev
//   (mobile: --force-device-scale-factor=2 --window-size=400,8000 --screenshot=public/dyty-mobile.png)
// Si cambian de alto, ajustar `stops` (px de la imagen donde se detiene el scroll).
const shots = {
  desktop: { src: "dyty-desktop.png", width: 1920, stops: [0, 1700, 4400] },
  mobile: { src: "dyty-mobile.png", width: 800, stops: [0, 3250, 8950] },
};

/** En vertical se usa la versión mobile, en una ventana angosta. */
export const dytyVerticalSize = { w: 440, h: 880 };

export function DytyDemo({ vertical = false }: { vertical?: boolean }) {
  const frame = useCurrentFrame();
  const shot = vertical ? shots.mobile : shots.desktop;
  const width = vertical ? dytyVerticalSize.w : W;
  const height = vertical ? dytyVerticalSize.h : H;
  const k = width / shot.width;
  const [a, b, c] = shot.stops;
  // Scroll con pausas: hero, servicios, páginas web.
  const y = interpolate(frame, [0, 40, 80, 112, 156, 210], [a, a, b, b, c, c], { ...clamp, easing: easeInOut });

  return (
    <Window title="https://dyty.dev" width={width} height={height}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <Img
          src={staticFile(shot.src)}
          style={{ display: "block", width, transform: `translateY(${-y * k}px)` }}
        />
      </div>
    </Window>
  );
}
