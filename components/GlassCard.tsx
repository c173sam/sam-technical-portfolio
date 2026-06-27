"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";

export function GlassCard({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 24 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 24 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, oklch(var(--accent) / 0.14), transparent 45%)`;

  return (
    <motion.div
      className={`perspective group ${className}`}
      onMouseMove={(event) => {
        if (reducedMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        rotateX.set((0.5 - py) * 6);
        rotateY.set((px - 0.5) * 7);
        glowX.set(px * 100);
        glowY.set(py * 100);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
        glowX.set(50);
        glowY.set(50);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="glass relative h-full overflow-hidden rounded-2xl p-5 transition-colors duration-300 group-hover:border-white/20 sm:p-6"
        style={{ backgroundImage: glow }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
