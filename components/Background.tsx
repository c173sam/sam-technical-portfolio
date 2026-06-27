"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AuroraCanvas } from "@/components/AuroraCanvas";

export function Background() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      <AuroraCanvas />
      <motion.div
        aria-hidden
        className="aurora-mask aurora-flow absolute -top-52 left-1/2 h-[840px] w-[1320px] -translate-x-1/2 rounded-full blur-3xl opacity-70"
        animate={
          reducedMotion
            ? undefined
            : {
                opacity: [0.55, 0.82, 0.62, 0.55]
              }
        }
        style={{
          y,
          background:
            "conic-gradient(from 145deg at 50% 50%, transparent 0 8%, oklch(var(--primary) / 0.62), oklch(var(--accent) / 0.38), oklch(var(--signal) / 0.34), oklch(var(--primary) / 0.56), transparent 82% 100%)"
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[15%] h-px w-[min(980px,78vw)] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(var(--accent) / 0.72), oklch(var(--primary) / 0.46), transparent)",
          boxShadow: "0 0 42px oklch(var(--accent) / 0.38)"
        }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[-16rem] top-[12%] h-[620px] w-[620px] rounded-full blur-3xl"
        animate={reducedMotion ? undefined : { opacity: [0.2, 0.38, 0.24], scale: [1, 1.1, 1] }}
        style={{ background: "radial-gradient(circle, oklch(var(--accent) / 0.2), transparent 66%)" }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-22rem] left-[-16rem] h-[760px] w-[760px] rounded-full blur-3xl"
        animate={reducedMotion ? undefined : { opacity: [0.16, 0.32, 0.18], scale: [1.04, 0.98, 1.04] }}
        style={{ background: "radial-gradient(circle, oklch(var(--primary) / 0.28), transparent 70%)" }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="grid-mask grid-drift absolute inset-0 opacity-[0.32]"
        style={{
          y: gridY,
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.07) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-[-10%] top-[10%] h-32 rotate-[-7deg] opacity-70 blur-xl"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(var(--primary) / 0.18), oklch(var(--accent) / 0.12), transparent)"
        }}
      />
      <div aria-hidden className="scanline absolute left-0 top-[28%] h-px w-full" />
      <div aria-hidden className="noise absolute inset-0 opacity-55 mix-blend-soft-light" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, transparent 0 24%, oklch(var(--bg) / 0.52) 58%, oklch(var(--bg)) 100%), linear-gradient(to bottom, transparent 0 55%, oklch(var(--bg) / 0.82) 100%)"
        }}
      />
    </div>
  );
}
