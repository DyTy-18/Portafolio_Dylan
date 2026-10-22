import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { RevealObserver } from "@/components/reveal-observer";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.github.url }],
  openGraph: {
    type: "profile",
    locale: "es_BO",
    url: "/",
    siteName: site.shortName,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={mono.variable} suppressHydrationWarning>
      <head>
        {/* Marca que hay JS antes del primer pintado: los reveals solo ocultan contenido si esto corre. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
