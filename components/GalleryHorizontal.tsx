"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import type { GalleryImage } from "@/lib/gallery";

// Formatos variados para uma diagramação de galeria (não uniforme).
// O índice define o "molde" de cada foto, criando ritmo na linha horizontal.
const FORMATS = [
  "h-[60vh] w-[42vw] md:w-[26vw]",
  "h-[78vh] w-[58vw] md:w-[34vw]",
  "h-[48vh] w-[46vw] md:w-[22vw]",
  "h-[70vh] w-[64vw] md:w-[38vw]",
  "h-[55vh] w-[50vw] md:w-[28vw]",
];

export default function GalleryHorizontal({
  images,
}: {
  images: GalleryImage[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scroll vertical → deslocamento horizontal da linha de fotos.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="relative h-[400vh] bg-ink"
    >
      {/* Painel sticky: ocupa a tela enquanto a seção alta é rolada. */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex items-center gap-6 pl-10 md:gap-10 md:pl-[15rem]"
        >
          {/* Painel de abertura da galeria */}
          <div className="flex w-[70vw] shrink-0 flex-col justify-center pr-12 md:w-[30vw]">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-bold leading-[1.05] tracking-tight text-fg">
              A cidade
              <br />
              em claro
              <br />
              e escuro
            </h2>
            <p className="mt-6 max-w-xs font-sans text-sm font-light leading-relaxed text-muted">
              Uma sequência de instantes — role para atravessar a coleção.
            </p>
          </div>

          {/* Fotos */}
          {images.map((img, i) => (
            <figure
              key={img.src}
              className={`group relative shrink-0 overflow-hidden bg-surface ${
                FORMATS[i % FORMATS.length]
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 60vw, 35vw"
                className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
              />
              {/* véu inferior para legibilidade da legenda */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="font-sans text-xs font-light tracking-wide text-fg drop-shadow">
                  {img.alt}
                </span>
                <span className="eyebrow text-[0.6rem] text-fg/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}

          {/* Painel de fechamento */}
          <div className="flex w-[60vw] shrink-0 items-center pr-28 md:w-[30vw] md:pr-48">
            <p className="font-cond text-lg font-medium uppercase tracking-[0.25em] text-muted">
              continua&nbsp;abaixo&nbsp;—
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
