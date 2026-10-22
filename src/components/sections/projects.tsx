import { projects, type Project } from "@/content/site";
import { TechIcon } from "@/components/tech-icon";
import { Carousel } from "@/components/carousel";
import { ProjectVideo } from "@/components/project-video";
import { SectionTitle, external } from "@/components/ui";

function hostOf(url: string) {
  return new URL(url).host.replace(/^www\./, "");
}

function ProjectSlide({ project, index }: { project: Project; index: number }) {
  const details = [
    { label: "problema", text: project.problem },
    { label: "qué hice", text: project.work },
    { label: "resultado", text: project.result },
  ].filter((d): d is { label: string; text: string } => Boolean(d.text));

  return (
    <li className="w-[88%] shrink-0 snap-start sm:w-[70%] lg:w-[46%]">
      <article className="flex h-full flex-col rounded-2xl border border-line p-6 transition-colors duration-150 hover:border-line-strong md:p-8">
        {project.video ? (
          <div className="mb-6">
            <ProjectVideo slug={project.video} title={project.title} />
          </div>
        ) : null}
        <p className="flex gap-3 text-xs text-fg-muted">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.context}</span>
        </p>
        <h3 className="mt-6 text-xl font-medium tracking-[-0.03em] text-fg md:text-2xl">
          {project.title}
        </h3>
        <dl className="mt-6 space-y-5 text-sm leading-relaxed">
          {details.map((d) => (
            <div key={d.label}>
              <dt className="text-fg-muted">
                <span aria-hidden="true">{"// "}</span>
                {d.label}
              </dt>
              <dd className="mt-1 text-fg-body">{d.text}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex flex-col gap-5 pt-8">
          <ul aria-label="Tecnologías" className="flex flex-wrap gap-x-4 gap-y-2">
            {project.stack.map((name) => (
              <li key={name} className="inline-flex items-center gap-2 text-xs text-fg-muted">
                <TechIcon name={name} className="size-3.5 shrink-0" />
                {name}
              </li>
            ))}
          </ul>
          {project.url ? (
            <a
              href={project.url}
              {...external}
              className="w-fit text-sm text-accent transition-colors duration-150 hover:text-accent-soft"
            >
              {hostOf(project.url)} <span aria-hidden="true">↗</span>
              <span className="sr-only"> (abre en otra pestaña)</span>
            </a>
          ) : null}
        </div>
      </article>
    </li>
  );
}

export function Projects() {
  return (
    <section id="proyectos" aria-labelledby="projects-title" className="border-t border-line">
      <div className="page-x section-y">
        <SectionTitle id="projects-title">proyectos</SectionTitle>
        <div className="mt-10 md:mt-14">
          <Carousel label="Proyectos" count={projects.length}>
            {projects.map((project, i) => (
              <ProjectSlide key={project.title} project={project} index={i} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
