import type { Metadata, Viewport } from "next";
import { Onest, Bagel_Fat_One } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const onest = Onest({ subsets: ["latin"], weight: ["400", "600", "700", "800"], display: "swap", variable: "--font-onest" });
const bagel = Bagel_Fat_One({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-bagel-fat", preload: false });

const title = "Pazzit, el pase de tus visitas";
const description =
  "Tus visitas entran sin vueltas. El vecino invita, la visita recibe su pase por WhatsApp y la portería lo valida con un escaneo. Para barrios cerrados y edificios.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Pazzit",
    title,
    description,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pazzit" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  icons: {
    icon: [
      { url: "/brand/pazzit-app-icon.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/brand/pazzit-app-icon-noche.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F6FF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1030" },
  ],
};

// Antes del primer paint: marca que hay JS y aplica el tema guardado (sin flash).
const THEME_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('pazzit-theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${onest.variable} ${bagel.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
