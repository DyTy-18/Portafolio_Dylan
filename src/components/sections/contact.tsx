import { site } from "@/content/site";
import { external } from "@/components/ui";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, accent: true },
  { label: "LinkedIn", value: site.linkedin.label, href: site.linkedin.url },
  { label: "GitHub", value: site.github.label, href: site.github.url },
];

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contact-title" className="border-t border-line">
      <div className="page-x section-y grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2
            id="contact-title"
            data-reveal
            className="text-[clamp(1.75rem,1rem+3vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.05em] text-fg"
          >
            ¿Tienes una vacante o un proyecto?
          </h2>
          <p className="mt-6 text-lg text-fg-muted">
            <span aria-hidden="true" className="text-accent">
              &gt;{" "}
            </span>
            Escríbeme.
          </p>
        </div>
        <ul className="border-b border-line lg:col-span-5 lg:self-end">
          {channels.map((c) => {
            const isMail = c.href.startsWith("mailto:");
            return (
              <li key={c.label} className="border-t border-line">
                <a
                  href={c.href}
                  {...(isMail ? {} : external)}
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span className="min-w-0">
                    <span className="block text-sm text-fg-muted">{c.label}</span>
                    <span
                      className={`mt-1 block text-sm break-all transition-colors duration-150 sm:text-base ${
                        c.accent
                          ? "text-accent group-hover:text-accent-soft"
                          : "text-fg-body group-hover:text-fg"
                      }`}
                    >
                      {c.value}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-fg-muted transition-colors duration-150 group-hover:text-fg"
                  >
                    ↗
                  </span>
                  {!isMail && <span className="sr-only"> (abre en otra pestaña)</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
