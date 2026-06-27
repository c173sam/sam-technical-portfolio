"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ThreeBodyBackdrop } from "@/components/ThreeBodyBackdrop";

export function Background({ forceMotion = false }: { forceMotion?: boolean }) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg">
      <ThreeBodyBackdrop />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[15%] h-px w-[min(980px,78vw)] -translate-x-1/2"
        style={{
          y,
          background:
            "linear-gradient(90deg, transparent, oklch(var(--accent) / 0.34), oklch(var(--primary) / 0.18), transparent)",
          boxShadow: "0 0 34px oklch(var(--accent) / 0.14)"
        }}
      />
      <motion.div
        aria-hidden
        className="grid-mask absolute inset-0 opacity-[0.045]"
        style={{
          y: gridY,
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.08) 1px, transparent 1px)",
          backgroundSize: "74px 74px"
        }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-x-[-10%] top-[10%] h-20 rotate-[-4deg] opacity-20 blur-xl"
        animate={reducedMotion && !forceMotion ? undefined : { x: ["-1%", "1%", "-1%"], opacity: [0.08, 0.18, 0.08] }}
        style={{ background: "linear-gradient(90deg, transparent, oklch(var(--accent) / 0.07), transparent)" }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
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
