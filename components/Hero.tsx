"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile, quickFacts } from "@/data/profile";

const titleWords = [profile.name, "/", profile.englishName];

export function Hero() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.34], ["0px", reducedMotion ? "0px" : "70px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.28], [1, 0.34]);

  return (
    <section className="relative flex min-h-[92svh] items-center px-5 py-24 sm:px-8 lg:px-10">
      <motion.div style={{ y: heroY, opacity }} className="mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[1.12fr_0.88fr]">
        <div>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 inline-flex rounded-full border border-white/12 bg-white/[0.045] px-4 py-2 text-sm text-muted shadow-insetline backdrop-blur-xl"
          >
            Technical Portfolio · Shanghai 2027
          </motion.div>

          <h1 className="text-balance max-w-5xl text-[clamp(4rem,13vw,6rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-ink">
            {titleWords.map((word, index) => (
              <motion.span
                key={word + index}
                className="inline-block"
                initial={reducedMotion ? false : { opacity: 0, y: 62, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.95, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
                {index === 0 ? "\u00A0" : ""}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="text-pretty mt-8 max-w-3xl text-lg leading-8 text-muted sm:text-xl"
          >
            {profile.roles.join(" / ")}
          </motion.p>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.64, ease: [0.16, 1, 0.3, 1] }}
            className="text-pretty mt-5 max-w-2xl text-base leading-8 text-muted"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#profile"
              className="beam inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-bg transition-transform duration-300 hover:-translate-y-0.5"
            >
              View Profile
            </a>
            <a
              href="#contact"
              className="beam inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.045] px-6 text-sm font-semibold text-ink backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
            >
              Contact
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="glass relative overflow-hidden rounded-2xl p-5 sm:p-6"
        >
          <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-accent shadow-[0_0_22px_oklch(var(--accent)/0.9)]" />
          <p className="text-sm font-medium text-accent">Candidate Command Center</p>
          <div className="mt-8 grid gap-3">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                <span className="text-sm text-muted">{fact.label}</span>
                <span className="text-right text-sm font-medium text-ink">{fact.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-xl border border-white/10 bg-black/18 p-4">
            <p className="text-sm leading-7 text-muted">
              Seeking early-career internship opportunities where support, delivery, documentation and AI adoption meet real business systems.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
