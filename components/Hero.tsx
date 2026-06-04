"use client";

import { motion } from "motion/react";
import { artist } from "@/lib/artist-data";
import { stripAccents } from "@/lib/text";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.22, delayChildren: 0.15 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="topo"
      className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center"
    >
      {/* halo radial suave para dar profundidade ao preto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 42%, rgba(231,227,218,0.06), transparent 70%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <motion.p
          variants={rise}
          className="eyebrow mb-8"
        >
          {artist.tagline}
        </motion.p>

        <motion.h1
          variants={rise}
          className="font-display text-[clamp(2.4rem,8vw,6.5rem)] font-black uppercase leading-[0.9] tracking-[-0.01em] text-fg"
        >
          {stripAccents(artist.name)}
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-8 max-w-md font-sans text-sm font-light leading-relaxed tracking-wide text-muted"
        >
          {artist.role}
          <br />
          {artist.location.replace(", ", " / ")}
        </motion.p>
      </motion.div>

      {/* indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="eyebrow text-[0.6rem]">Role</span>
          <span className="block h-10 w-px bg-line" />
        </motion.div>
      </motion.div>
    </section>
  );
}
