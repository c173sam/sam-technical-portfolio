"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { timeline } from "@/data/profile";

export function Timeline() {
  return (
    <section id="route" className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
      <Reveal>
        <SectionHeading kicker="Career Route" title="职业路线不是单点岗位，而是一条支持到交付的路径">
          这条路线从问题处理能力出发，逐步连接项目协作、方案交付和 FDE 方向探索。
        </SectionHeading>
      </Reveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto max-w-5xl"
      >
        <div className="absolute left-4 top-3 hidden h-[calc(100%-1.5rem)] w-px bg-white/12 md:block" />
        <div className="grid gap-4">
          {timeline.map((item, index) => (
            <motion.div key={item.title} variants={staggerItem} className="relative md:pl-12">
              <div className="absolute left-[0.56rem] top-7 hidden h-3 w-3 rounded-full border border-accent bg-bg shadow-[0_0_18px_oklch(var(--accent)/0.58)] md:block" />
              <GlassCard>
                <div className="grid gap-4 sm:grid-cols-[120px_1fr] sm:items-start">
                  <p className="text-sm font-medium text-accent">Step {index + 1}</p>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
