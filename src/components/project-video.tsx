"use client";

import Image from "next/image";
import { useRef } from "react";

// Demo del proyecto, hecha en videos/ con Remotion. No tiene audio.
// La tarjeta muestra el póster (lazy); "ver demo" abre un <dialog> con el video en loop,
// sin controles. Se detiene cerrando el modal (botón, Escape o clic fuera del video).
// En mobile (< sm) se usa la versión vertical; el cuadro cambia de proporción en el mismo
// breakpoint.
const MOBILE = "(max-width: 639px)";

export function ProjectVideo({ slug, title }: { slug: string; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const base = `/media/proyectos/${slug}`;

  function open() {
    const video = videoRef.current;
    dialogRef.current?.showModal();
    if (!video) return;
    // El archivo se elige al abrir: así no baja ninguno antes y no hace falta <source media>.
    const src = `${base}${window.matchMedia(MOBILE).matches ? "-vertical" : ""}.mp4`;
    if (!video.src.endsWith(src)) video.src = src;
    // Si el navegador bloquea la reproducción no hay mucho que hacer sin controles.
    video.play().catch(() => {});
  }

  function close() {
    dialogRef.current?.close();
  }

  function handleClose() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Ver demo de ${title}`}
        aria-haspopup="dialog"
        className="group relative grid aspect-video w-full place-items-center overflow-hidden rounded-md border border-line bg-canvas"
      >
        <Image
          src={`${base}.jpg`}
          alt=""
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 70vw, 88vw"
          className="object-cover"
        />
        <span className="relative inline-flex h-11 items-center gap-2 rounded-md border border-line-strong bg-canvas/80 px-4 text-sm font-medium text-fg transition-[border-color,transform] duration-150 ease-out group-hover:border-fg/60 group-active:scale-[0.97]">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
            <path d="M4 2.5v11l9-5.5z" />
          </svg>
          ver demo
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`Demo de ${title}`}
        onClose={handleClose}
        // Clic en el fondo (fuera del contenido) cierra.
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="demo-dialog m-auto w-[min(92vw,calc(80dvh*9/16))] max-w-none bg-transparent p-0 text-fg-body sm:w-[min(92vw,1120px)]"
      >
        <div className="flex items-center justify-between gap-4 pb-3">
          <p className="truncate text-sm text-fg-muted">
            <span aria-hidden="true">{"// "}</span>
            {title}
          </p>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-9 shrink-0 items-center rounded-md border border-line-strong px-3 text-sm text-fg transition-[border-color,transform] duration-150 ease-out hover:border-fg/60 active:scale-[0.97]"
          >
            cerrar <span aria-hidden="true">&nbsp;×</span>
          </button>
        </div>
        <video
          ref={videoRef}
          className="aspect-[9/16] w-full rounded-2xl border border-line bg-canvas sm:aspect-video"
          preload="none"
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
          onContextMenu={(e) => e.preventDefault()}
          aria-label={`Demo de ${title} (sin audio)`}
          // Solo MP4 (H.264): el WebM VP9 de Remotion fallaba al decodificar en Chrome. El src
          // lo pone open().
        />
      </dialog>
    </>
  );
}
