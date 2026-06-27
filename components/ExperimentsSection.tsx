"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { experiments } from "@/data/profile";

export function ExperimentsSection() {
  return (
    <section id="projects" className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-20 h-72 bg-[radial-gradient(circle_at_50%_50%,oklch(var(--accent)/0.11),transparent_64%)] blur-3xl" />
      <Reveal>
        <SectionHeading kicker="Projects / Experiments" title="不编造成熟项目，把学习路径做成可见的技术实验">
          当前阶段以 Learning Projects、Web Experiments、Deployment Practice 展示真实积累方向，视觉上高级，内容上保守可信。
        </SectionHeading>
      </Reveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto grid max-w-7xl gap-4 md:grid-cols-3"
      >
        {experiments.map((item, index) => (
          <motion.div key={item.title} variants={staggerItem}>
            <GlassCard>
              <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl"
                  style={{ background: index === 1 ? "oklch(var(--primary) / 0.16)" : "oklch(var(--accent) / 0.12)" }}
                />
                <div className="relative">
                  <span className="inline-flex rounded-full border border-white/10 bg-black/22 px-3 py-1 text-xs text-accent">
                    {item.label}
                  </span>
                  <h3 className="mt-5 text-balance text-2xl font-semibold tracking-[-0.025em] text-ink">{item.title}</h3>
                </div>
                <p className="relative mt-8 text-pretty text-sm leading-7 text-muted">{item.body}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
