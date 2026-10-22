import { existsSync } from "node:fs";
import path from "node:path";
import { companies, site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/tech-marquee";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Stack } from "@/components/sections/stack";
import { Contact } from "@/components/sections/contact";

// El botón "Descargar CV" solo aparece si el PDF existe en public/.
const hasCv = existsSync(path.join(process.cwd(), "public", site.cvPath));

const currentEmployer = companies[0];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.shortName,
  jobTitle: site.role,
  url: siteUrl,
  email: `mailto:${site.email}`,
  sameAs: [site.linkedin.url, site.github.url],
  address: {
    "@type": "PostalAddress",
    addressLocality: "La Paz",
    addressCountry: "BO",
  },
  worksFor: {
    "@type": "Organization",
    name: currentEmployer.name,
    url: currentEmployer.url,
  },
  knowsLanguage: ["es", "en"],
  knowsAbout: site.heroStack,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:border focus:border-line-strong focus:bg-canvas focus:px-4 focus:py-2 focus:text-sm focus:text-fg"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido">
        <Hero hasCv={hasCv} />
        <TechMarquee />
        <About />
        <Projects />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="page-x flex flex-col gap-2 py-10 text-sm text-fg-muted sm:flex-row sm:justify-between">
          <p>{site.name}</p>
          <p>
            {site.location} · {site.timezone}
          </p>
        </div>
      </footer>
    </>
  );
}
