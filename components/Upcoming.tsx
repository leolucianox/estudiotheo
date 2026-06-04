"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { artist } from "@/lib/artist-data";
import { stripAccents } from "@/lib/text";

export default function Upcoming() {
  return (
    <section
      id="proximos"
      className="relative px-6 py-32 md:py-44 md:pl-44"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mb-16 font-display text-[clamp(1.6rem,3vw,2.6rem)] font-bold tracking-tight text-fg"
        >
          Onde ver a seguir
        </motion.h2>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {artist.upcoming.map((event, i) => (
            <motion.article
              key={event.venue}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative isolate flex flex-col justify-between gap-12 overflow-hidden bg-ink p-8 md:min-h-[20rem]"
            >
              {/* Imagem do local ao fundo — P&B, bem escurecida para leitura */}
              <Image
                src={event.image}
                alt={`${event.venue}, ${event.city}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="-z-10 object-cover opacity-30 grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-45"
              />
              {/* Véu escuro garante contraste do texto sobre qualquer foto */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/40"
              />

              <span className="font-cond text-sm font-medium uppercase tracking-[0.22em] text-accent drop-shadow">
                {event.date}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold leading-tight text-fg drop-shadow">
                  {stripAccents(event.venue)}
                </h3>
                <p className="mt-2 font-sans text-sm font-light tracking-wide text-muted">
                  {event.city}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
