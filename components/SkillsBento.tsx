"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { skills } from "@/data/profile";

export function SkillsBento() {
  return (
    <section id="skills" className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-24 h-64 bg-[radial-gradient(circle_at_50%_50%,oklch(var(--primary)/0.16),transparent_62%)] blur-3xl" />
      <Reveal>
        <SectionHeading kicker="Capability Map" title="从通信基础到 AI 应用落地的能力拼图">
          用 bento grid 展示当前可迁移能力，不虚构项目经历，也不把学习中能力写成已精通。
        </SectionHeading>
      </Reveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto grid max-w-7xl auto-rows-fr grid-cols-1 gap-4 md:grid-cols-4"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.title}
            variants={staggerItem}
            className={index === 0 || index === 3 || index === 7 ? "md:col-span-2" : ""}
          >
            <GlassCard>
              <div className="relative flex h-full min-h-[190px] flex-col justify-between gap-8 overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl"
                  style={{ background: index % 2 === 0 ? "oklch(var(--accent) / 0.13)" : "oklch(var(--primary) / 0.15)" }}
                />
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-balance text-2xl font-semibold tracking-[-0.025em] text-ink">{skill.title}</h3>
                  <span className="rounded-full border border-white/10 bg-black/24 px-3 py-1 text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-white/14 to-transparent" />
                  <p className="text-pretty text-sm leading-7 text-muted">{skill.body}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
