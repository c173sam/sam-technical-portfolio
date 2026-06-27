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
        className="pointer-events-none absolute left-1/2 top-5 hidden -translate-x-1/2 text-center md:block"
        initial={reducedMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.8, delay: 0.25 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.8, delay: 0.35 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white/20">{label}</span>
            <span className="ml-3 text-cyan-100/42">{value}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-2.5rem)] max-w-7xl flex-col justify-end pb-9">
        <motion.div
          className="max-w-[520px] border-l border-cyan-100/16 pl-4"
          initial={reducedMotion ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.05, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs text-cyan-100/50">THREE-BODY CANDIDATE SYSTEM</p>
          <h1 className="mt-3 text-balance text-[clamp(2.15rem,5vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.032em] text-white/88">
            {profile.name}
            <span className="text-white/42"> / </span>
            {profile.englishName}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-7 text-white/50 sm:text-base">{profile.summary}</p>
        </motion.div>

        <motion.div
          className="mt-6 flex max-w-3xl flex-wrap gap-2"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
        >
          {roleSignal.map((role) => (
            <span key={role} className="rounded-full border border-cyan-100/12 bg-black/20 px-3 py-1.5 text-[11px] text-white/48 backdrop-blur-md">
              {role}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="mt-6 flex flex-col gap-3 sm:flex-row"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.76, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#profile"
            className="beam inline-flex h-10 items-center justify-center rounded-full border border-cyan-100/22 bg-black/24 px-5 text-xs font-semibold text-white/76 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
          >
            View Profile
          </a>
          <a
            href="#contact"
            className="beam inline-flex h-10 items-center justify-center rounded-full border border-white/14 bg-black/20 px-5 text-xs font-semibold text-white/66 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
          >
            Contact
          </a>
          <a
            href="#projects"
            className="beam inline-flex h-10 items-center justify-center rounded-full border border-white/14 bg-black/20 px-5 text-xs font-semibold text-white/66 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
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
        transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
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
