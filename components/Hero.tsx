"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";

const hudLines = [
  ["Candidate", `${profile.name} / ${profile.englishName}`],
  ["City", profile.targetCity],
  ["Major", profile.major],
  ["Graduation", profile.graduation]
];

const roleSignal = ["Technical Support", "IT Support", "PMO", "Solution Intern", "FDE探索"];

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden px-5 py-5 sm:px-8 lg:px-10">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 bg-black"
        initial={reducedMotion ? false : { opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.35, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.9, times: [0, 0.18, 0.64, 1], ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-px w-40 bg-gradient-to-r from-transparent via-cyan-100/56 to-transparent" />
          <p className="text-xs text-cyan-100/62">INITIALIZING THREE-BODY SYSTEM</p>
          <p className="mt-2 text-[11px] text-white/34">徐念齐 / Sam</p>
        </div>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-1/2 top-5 hidden -translate-x-1/2 text-center md:block"
        initial={reducedMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[11px] text-white/34">Sam / Technical Portfolio</p>
        <div className="mx-auto mt-2 h-px w-48 bg-gradient-to-r from-transparent via-cyan-100/24 to-transparent" />
      </motion.div>

      <div className="pointer-events-none absolute left-5 top-6 hidden w-44 text-[10px] leading-6 text-white/22 md:block lg:left-10">
        {["Chaotic Era", "Internship signal", "Support route", "AI landing"].map((item, index) => (
          <motion.div
            key={item}
            className="border-b border-cyan-100/10 py-1"
            initial={reducedMotion ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.22 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {item}
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute right-5 top-[41%] hidden w-52 text-right text-[10px] leading-6 text-white/22 md:block lg:right-10">
        {hudLines.map(([label, value], index) => (
          <motion.div
            key={label}
            className="border-b border-cyan-100/10 py-1"
            initial={reducedMotion ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.3 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white/20">{label}</span>
            <span className="ml-3 text-cyan-100/42">{value}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-2.5rem)] max-w-7xl flex-col justify-end pb-9">
        <motion.div
          className="max-w-[430px] border-l border-cyan-100/14 pl-4"
          initial={reducedMotion ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.05, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] text-cyan-100/42">THREE-BODY CANDIDATE SYSTEM</p>
          <h1 className="mt-2 text-balance text-[clamp(1.55rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-white/78">
            {profile.name}
            <span className="text-white/42"> / </span>
            {profile.englishName}
          </h1>
          <p className="mt-3 max-w-md text-pretty text-xs leading-6 text-white/42 sm:text-sm">{profile.summary}</p>
        </motion.div>

        <motion.div
          className="mt-5 flex max-w-2xl flex-wrap gap-2"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.62, ease: [0.16, 1, 0.3, 1] }}
        >
          {roleSignal.map((role) => (
            <span key={role} className="rounded-full border border-cyan-100/10 bg-black/18 px-2.5 py-1 text-[10px] text-white/42 backdrop-blur-md">
              {role}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="mt-5 flex flex-col gap-2 sm:flex-row"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.76, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#profile"
            className="beam inline-flex h-9 items-center justify-center rounded-full border border-cyan-100/18 bg-black/22 px-4 text-[11px] font-semibold text-white/68 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
          >
            View Profile
          </a>
          <a
            href="#contact"
            className="beam inline-flex h-9 items-center justify-center rounded-full border border-white/12 bg-black/18 px-4 text-[11px] font-semibold text-white/58 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
          >
            Contact
          </a>
          <a
            href="#projects"
            className="beam inline-flex h-9 items-center justify-center rounded-full border border-white/12 bg-black/18 px-4 text-[11px] font-semibold text-white/58 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
          >
            Projects
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#profile"
        aria-label="Scroll to profile"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] text-white/28 md:flex"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>Scroll</span>
        <motion.span
          className="h-10 w-px bg-gradient-to-b from-cyan-100/70 via-white/16 to-transparent"
          animate={reducedMotion ? undefined : { scaleY: [0.55, 1, 0.55], opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>
    </section>
  );
}
