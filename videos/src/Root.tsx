import { Composition, Folder, Sequence, Still } from "remotion";
import { ProjectVideo, posterFrame, videoDuration } from "./ProjectVideo";
import { videos, type VideoProps } from "./scripts";
import { FPS } from "./theme";

// Póster para el sitio: un frame de la demo. El `from` negativo adelanta todo el árbol
// (Freeze no sirve: las Sequence internas siguen mirando el frame real).
function Poster(props: VideoProps) {
  return (
    <Sequence from={-posterFrame(props)}>
      <ProjectVideo {...props} />
    </Sequence>
  );
}

export function Root() {
  return (
    <>
      {[
        { folder: "horizontal", width: 1920, height: 1080, suffix: "" },
        { folder: "vertical", width: 1080, height: 1920, suffix: "-vertical" },
      ].map((format) => (
        <Folder key={format.folder} name={format.folder}>
          {videos.map((video) => (
            <Composition
              key={video.slug}
              id={`${String(video.index + 1).padStart(2, "0")}-${video.slug}${format.suffix}`}
              component={ProjectVideo}
              durationInFrames={videoDuration(video)}
              fps={FPS}
              width={format.width}
              height={format.height}
              defaultProps={video}
            />
          ))}
        </Folder>
      ))}
      <Folder name="posters">
        {videos.map((video) => (
          <Still
            key={video.slug}
            id={`poster-${video.slug}`}
            component={Poster}
            width={1920}
            height={1080}
            defaultProps={video}
          />
        ))}
      </Folder>
    </>
  );
}
