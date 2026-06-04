"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { artist } from "@/lib/artist-data";
import type { GalleryImage } from "@/lib/gallery";
import { stripAccents } from "@/lib/text";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function About({ image }: { image: GalleryImage }) {
  return (
    <section
      id="sobre"
      className="relative mx-auto max-w-6xl px-6 py-32 md:py-44 md:pl-44"
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        {/* Foto à esquerda */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] w-full overflow-hidden bg-surface"
        >
          <Image
            src={image.src}
            alt={`Retrato de ${artist.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover grayscale"
          />
        </motion.div>

        {/* Bio à direita */}
        <div>
          <motion.h2
            custom={1}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mb-10 font-display text-[clamp(1.6rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-fg"
          >
            {stripAccents(artist.name)}
          </motion.h2>

          <div className="space-y-6">
            {artist.bio.map((paragraph, i) => (
              <motion.p
                key={i}
                custom={i + 2}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                className="font-sans text-[0.95rem] font-light leading-relaxed text-muted"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
