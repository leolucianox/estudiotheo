"use client";

import { motion } from "motion/react";
import { artist } from "@/lib/artist-data";

export default function Contact() {
  return (
    <section
      id="contato"
      className="relative border-t border-line bg-surface/30 px-6 py-32 md:py-44 md:pl-44"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-3xl font-display text-[clamp(1.6rem,3.4vw,3.2rem)] font-bold leading-[1.1] tracking-tight text-fg"
        >
          Vamos conversar sobre{" "}
          <span className="text-muted">luz e cidade.</span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-12 border-t border-line pt-12 md:grid-cols-3">
          <div>
            <p className="eyebrow mb-3">Telefone</p>
            <a
              href={`tel:${artist.contact.phone.replace(/\s/g, "")}`}
              className="font-sans text-xl font-normal text-fg transition-colors hover:text-accent"
            >
              {artist.contact.phone}
            </a>
          </div>

          <div>
            <p className="eyebrow mb-3">Ateliê</p>
            <p className="font-sans text-xl font-light leading-snug text-fg">
              {artist.contact.address}
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3">Redes</p>
            <ul className="space-y-2">
              {artist.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-sans text-xl font-normal text-fg transition-colors hover:text-accent"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-5" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
