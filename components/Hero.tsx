"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile, quickFacts } from "@/data/profile";

const titleWords = [profile.name, "/", profile.englishName];
const signalRows = ["Network baseline", "Support workflow", "Deployment notes", "AI adoption map"];

export function Hero() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.34], ["0px", reducedMotion ? "0px" : "76px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.28], [1, 0.32]);

  return (
    <section className="relative flex min-h-[96svh] items-center px-5 py-20 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-x-5 top-5 mx-auto hidden max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/18 px-4 py-3 text-sm text-muted backdrop-blur-xl md:flex">
        <span>Sam / Technical Portfolio</span>
        <span className="text-accent">Shanghai · 2027 · Internship Ready</span>
      </div>

      <motion.div style={{ y: heroY, opacity }} className="mx-auto grid w-full max-w-7xl items-center gap-10 pt-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/[0.055] px-4 py-2 text-sm text-muted shadow-insetline backdrop-blur-xl"
          >
            <span className="pulse-core h-2 w-2 rounded-full bg-accent shadow-[0_0_20px_oklch(var(--accent)/0.9)]" />
            Technical Portfolio · AI deployment mindset
          </motion.div>

          <h1 className="hero-title text-balance max-w-5xl text-[clamp(4.3rem,12vw,6rem)] font-semibold leading-[0.9] tracking-[-0.038em] text-ink">
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
              className="beam inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-bg shadow-[0_0_38px_oklch(var(--primary)/0.22)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              View Profile
            </a>
            <a
              href="#contact"
              className="beam inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.055] px-6 text-sm font-semibold text-ink backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
            >
              Contact
            </a>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.92, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {["Support", "Delivery", "PMO", "AI Landing"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-muted backdrop-blur-xl">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="metal-panel relative overflow-hidden rounded-2xl p-4 sm:p-5"
        >
          <div className="panel-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="scanline absolute left-0 top-20 h-px w-full" />

          <div className="relative rounded-xl border border-white/10 bg-black/28 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-muted">Candidate Command Center</p>
                <p className="mt-1 text-lg font-semibold tracking-[-0.02em] text-ink">
                  {profile.name} / {profile.englishName}
                </p>
              </div>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                ACTIVE
              </span>
            </div>
          </div>

          <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                <p className="text-xs text-muted">{fact.label}</p>
                <p className="mt-2 text-sm font-semibold text-ink">{fact.value}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-4 rounded-xl border border-white/10 bg-black/22 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-medium text-muted">Readiness Signals</p>
              <p className="text-xs text-accent">Support → Delivery → AI</p>
            </div>
            <div className="space-y-3">
              {signalRows.map((row, index) => (
                <div key={row} className="grid grid-cols-[132px_1fr] items-center gap-3">
                  <span className="text-xs text-muted">{row}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-white/[0.065]">
                    <motion.span
                      className="block h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, oklch(var(--accent) / 0.8), oklch(var(--primary) / 0.9), oklch(var(--signal) / 0.72))"
                      }}
                      initial={reducedMotion ? false : { width: "18%" }}
                      animate={{ width: `${62 + index * 8}%` }}
                      transition={{ duration: 1.2, delay: 0.85 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-4 grid min-h-[190px] place-items-center overflow-hidden rounded-xl border border-white/10 bg-black/24">
            <div className="absolute h-56 w-56 rounded-full border border-white/10" />
            <div className="absolute h-36 w-36 rounded-full border border-accent/20 shadow-[0_0_70px_oklch(var(--accent)/0.16)]" />
            <motion.div
              aria-hidden
              className="absolute h-44 w-44 rounded-full border border-transparent"
              style={{
                borderTopColor: "oklch(var(--accent) / 0.72)",
                borderRightColor: "oklch(var(--primary) / 0.36)"
              }}
              animate={reducedMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden
              className="absolute h-24 w-24 rounded-full border border-transparent"
              style={{
                borderBottomColor: "oklch(var(--signal) / 0.62)",
                borderLeftColor: "oklch(var(--accent) / 0.34)"
              }}
              animate={reducedMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative text-center">
              <p className="text-xs text-muted">Target City</p>
              <p className="mt-1 text-4xl font-semibold tracking-[-0.03em] text-ink">上海</p>
              <p className="mt-2 text-xs text-muted">Technical Support · Project Intern</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
