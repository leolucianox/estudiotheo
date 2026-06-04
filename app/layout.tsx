import type { Metadata } from "next";
import localFont from "next/font/local";
import { artist } from "@/lib/artist-data";
import "./globals.css";

// Base Neue — largura REGULAR. Corpo de texto e UI (peso leve→médio).
// Obs.: next/font exige paths como literais (sem template strings/variáveis).
const base = localFont({
  src: [
    { path: "../public/fonts/base_neue/BaseNeueTrial-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../public/fonts/base_neue/BaseNeueTrial-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/base_neue/BaseNeueTrial-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/base_neue/BaseNeueTrial-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-base",
  display: "swap",
});

// Base Neue — EXPANDED. Display: nome do hero e títulos de seção.
const baseExp = localFont({
  src: [
    { path: "../public/fonts/base_neue/BaseNeueTrial-ExpandedLight.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/base_neue/BaseNeueTrial-ExpandedBold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/base_neue/BaseNeueTrial-ExpandedBlack.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-base-exp",
  display: "swap",
});

// Base Neue — CONDENSED. Rótulos, navegação e metadados (caixa alta + tracking).
const baseCond = localFont({
  src: [
    { path: "../public/fonts/base_neue/BaseNeueTrial-CondensedMedium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/base_neue/BaseNeueTrial-CondensedBold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-base-cond",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${artist.name} — Fotografia`,
  description: `${artist.role}. ${artist.location}.`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // As variáveis das fontes ficam no <html> (= :root), onde o @theme do
    // Tailwind define --font-sans/--font-display/--font-cond referenciando-as.
    <html
      lang="pt-BR"
      className={`${base.variable} ${baseExp.variable} ${baseCond.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
