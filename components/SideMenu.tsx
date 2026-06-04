"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { artist } from "@/lib/artist-data";

export default function SideMenu() {
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);

  // Aparece quando o usuário rola para fora da tela inicial (≈80% da altura).
  useMotionValueEvent(scrollY, "change", (y) => {
    const threshold =
      typeof window !== "undefined" ? window.innerHeight * 0.8 : 600;
    setPastHero(y > threshold);
  });

  return (
    <AnimatePresence>
      {pastHero && (
        <motion.aside
          key="side-menu"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-0 top-0 z-50 hidden h-screen w-44 flex-col justify-center border-r border-line bg-ink/70 px-7 backdrop-blur-md md:flex"
        >
          <div className="mb-10">
            <a
              href="#topo"
              className="font-cond text-xl font-bold uppercase leading-[0.95] tracking-wide text-fg transition-colors hover:text-accent"
            >
              Theo
              <br />
              Marchetti
            </a>
          </div>

          <nav>
            <ul className="space-y-4">
              {artist.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.5 }}
                >
                  <a
                    href={item.href}
                    className="group flex items-center gap-2 font-cond text-sm font-medium uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-4" />
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div
            className="mt-12 eyebrow whitespace-nowrap text-[0.55rem]"
            style={{ letterSpacing: "0.16em" }}
          >
            São Paulo / BR
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
