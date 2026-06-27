"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function Background() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      <motion.div
        aria-hidden
        className="aurora-mask absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full blur-3xl"
        animate={
          reducedMotion
            ? undefined
            : {
                x: ["-50%", "-47%", "-53%", "-50%"],
                scale: [1, 1.07, 0.96, 1],
                opacity: [0.48, 0.64, 0.52, 0.48]
              }
        }
        style={{
          y,
          background:
            "conic-gradient(from 160deg at 50% 50%, oklch(var(--primary) / 0.44), oklch(var(--accent) / 0.32), oklch(0.56 0.18 305 / 0.28), oklch(var(--primary) / 0.44))"
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[-18rem] top-[18%] h-[520px] w-[520px] rounded-full blur-3xl"
        animate={reducedMotion ? undefined : { opacity: [0.22, 0.38, 0.24], scale: [1, 1.08, 1] }}
        style={{ background: "radial-gradient(circle, oklch(var(--accent) / 0.22), transparent 64%)" }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-18rem] left-[-14rem] h-[620px] w-[620px] rounded-full blur-3xl"
        animate={reducedMotion ? undefined : { opacity: [0.18, 0.28, 0.2], scale: [1.05, 0.98, 1.05] }}
        style={{ background: "radial-gradient(circle, oklch(var(--primary) / 0.25), transparent 68%)" }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="grid-mask absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.075) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.075) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />
      <div aria-hidden className="noise absolute inset-0 opacity-45 mix-blend-soft-light" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, transparent 0 28%, oklch(var(--bg) / 0.64) 62%, oklch(var(--bg)) 100%)"
        }}
      />
    </div>
  );
}
