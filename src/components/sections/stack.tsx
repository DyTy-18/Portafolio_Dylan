import { stack } from "@/content/site";
import { snippets } from "@/content/snippets";
import { highlight } from "@/lib/highlight";
import { TechIcon } from "@/components/tech-icon";
import { StackMenu, type StackGroup } from "@/components/stack-menu";
import { SectionTitle } from "@/components/ui";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-");
}

const FALLBACK = { file: "README.md", lang: "text" as const, code: "" };

export function Stack() {
  const groups: StackGroup[] = stack.map((g) => ({
    label: g.group.toLowerCase(),
    slug: slugify(g.group),
    items: g.items.map((name) => {
      const snippet = snippets[name] ?? { ...FALLBACK, code: `# ${name}` };
      return {
        name,
        file: snippet.file,
        wrap: snippet.lang === "text",
        lines: highlight(snippet.code, snippet.lang),
        icon: (
          <TechIcon
            name={name}
            placeholder
            className="size-4 shrink-0 text-fg-muted transition-colors duration-150 group-hover:text-fg group-aria-pressed:text-fg"
          />
        ),
      };
    }),
  }));

  return (
    <section id="stack" aria-labelledby="stack-title" className="border-t border-line">
      <div className="page-x section-y">
        <SectionTitle id="stack-title">stack</SectionTitle>
        <div className="mt-12 md:mt-16" data-reveal>
          <StackMenu groups={groups} />
        </div>
      </div>
    </section>
  );
}
