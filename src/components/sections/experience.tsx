import { experience } from "@/content/site";
import { SectionTitle } from "@/components/ui";

export function Experience() {
  return (
    <section id="experiencia" aria-labelledby="experience-title" className="border-t border-line">
      <div className="page-x section-y">
        <SectionTitle id="experience-title">experiencia</SectionTitle>
        <ol className="mt-12 border-b border-line md:mt-16">
          {experience.map((job) => (
            <li
              key={`${job.company}-${job.role}`}
              data-reveal
              className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <p className="text-sm text-fg-muted md:col-span-3">{job.period}</p>
              <div className="md:col-span-9 lg:col-span-7">
                <h3 className="text-lg font-medium tracking-[-0.02em] text-fg">{job.role}</h3>
                <p className="mt-1 text-sm text-fg-muted">
                  {job.company}
                  {job.mode && ` · ${job.mode}`}
                </p>
                <p className="mt-4 leading-relaxed text-fg-body">{job.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
