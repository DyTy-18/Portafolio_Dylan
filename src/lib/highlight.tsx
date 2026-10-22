import type { ReactNode } from "react";
import type { SnippetLang } from "@/content/snippets";

// Resaltado mínimo, en el servidor: comentarios, strings, literales y prompts. Suficiente para snippets cortos.

const COMMENT: Record<SnippetLang, RegExp | null> = {
  c: /\/\/.*$/,
  hash: /(^|\s)#.*$/,
  sql: /--.*$/,
  html: /<!--.*?-->/,
  text: null,
};

const TOKEN = /(["'`])(?:\\.|(?!\1).)*\1|\b(?:true|false|null|TRUE)\b|\b\d+(?:\.\d+)?\b/g;

const cls = {
  comment: "text-fg-muted",
  string: "text-accent",
  literal: "text-ok",
  prompt: "text-accent",
} as const;

function highlightCode(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const start = match.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    const token = match[0];
    const isString = /^["'`]/.test(token);
    out.push(
      <span key={`${keyBase}-${start}`} className={isString ? cls.string : cls.literal}>
        {token}
      </span>,
    );
    last = start + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function highlightLine(line: string, lang: SnippetLang, key: string): ReactNode {
  if (lang === "text") {
    if (line.startsWith(">")) return <span className={cls.prompt}>{line}</span>;
    if (line.startsWith("✓")) return <span className={cls.literal}>{line}</span>;
    return line;
  }

  // Prompt de terminal
  if (line.startsWith("$ ")) {
    return (
      <>
        <span className={cls.prompt}>$ </span>
        {line.slice(2)}
      </>
    );
  }

  const comment = COMMENT[lang]?.exec(line);
  // Un "#" o "//" dentro de un string no es comentario: si hay comillas antes, se ignora.
  const commentStart = comment && !/["'`]/.test(line.slice(0, comment.index)) ? comment.index : -1;
  const code = commentStart >= 0 ? line.slice(0, commentStart) : line;
  const rest = commentStart >= 0 ? line.slice(commentStart) : "";

  return (
    <>
      {highlightCode(code, key)}
      {rest && <span className={cls.comment}>{rest}</span>}
    </>
  );
}

export function highlight(code: string, lang: SnippetLang): ReactNode[] {
  return code.split("\n").map((line, i) => highlightLine(line, lang, String(i)));
}
