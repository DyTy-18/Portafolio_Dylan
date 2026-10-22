import { about, companies } from "@/content/site";
import { SectionTitle, external } from "@/components/ui";

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="about-title" className="border-t border-line">
      <div className="page-x section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionTitle id="about-title">sobre-mí</SectionTitle>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <div className="max-w-[68ch] space-y-6 leading-relaxed text-fg-body md:text-lg md:leading-relaxed">
              {about.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs text-fg-muted">{fact.label}</dt>
                  <dd className="mt-2 text-fg-body">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20 md:mt-28" data-reveal>
          <h3 className="text-xs text-fg-muted">
            <span aria-hidden="true">{"// "}</span>donde he trabajado
          </h3>
          <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-lg font-medium tracking-[-0.03em] text-fg-muted md:text-xl">
            {companies.map((company) => (
              <li key={company.name}>
                {company.url ? (
                  <a
                    href={company.url}
                    {...external}
                    className="transition-colors duration-150 hover:text-fg"
                  >
                    {company.name}
                    <span className="sr-only"> (abre en otra pestaña)</span>
                  </a>
                ) : (
                  company.name
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
