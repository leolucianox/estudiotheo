"use client";

import { motion } from "motion/react";
import { artist } from "@/lib/artist-data";

export default function Timeline() {
  return (
    <section
      id="trajetoria"
      className="relative border-t border-line bg-surface/30 px-6 py-32 md:py-44 md:pl-44"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 font-display text-[clamp(1.6rem,3vw,2.6rem)] font-bold tracking-tight text-fg"
        >
          Trajetoria
        </motion.h2>

        <ol className="relative">
          {/* linha vertical da timeline */}
          <span
            aria-hidden
            className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-line md:left-[6.5rem]"
          />

          {artist.exhibitions.map((ex, i) => (
            <motion.li
              key={`${ex.venue}-${ex.year}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative grid grid-cols-[auto_1fr] items-baseline gap-x-8 py-7 pl-8 md:grid-cols-[5rem_1fr] md:gap-x-16 md:pl-0"
            >
              {/* ponto na linha */}
              <span
                aria-hidden
                className="absolute left-[-4px] top-9 h-2 w-2 rounded-full bg-accent md:left-[6.25rem]"
              />
              <span className="font-display text-2xl font-light text-accent md:text-right">
                {ex.year}
              </span>
              <div className="md:pl-12">
                <h3 className="font-sans text-xl font-medium text-fg md:text-2xl">
                  {ex.venue}
                </h3>
                <p className="mt-1 font-sans text-sm font-light tracking-wide text-muted">
                  {ex.city}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
