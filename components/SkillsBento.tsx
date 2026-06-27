"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { skills } from "@/data/profile";

export function SkillsBento() {
  return (
    <section id="skills" className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
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
        className="mx-auto grid max-w-7xl auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3"
      >
        {skills.map((skill, index) => (
          <motion.div key={skill.title} variants={staggerItem} className={skill.span}>
            <GlassCard>
              <div className="flex h-full min-h-[168px] flex-col justify-between gap-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-balance text-2xl font-semibold tracking-[-0.025em] text-ink">{skill.title}</h3>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-pretty text-sm leading-7 text-muted">{skill.body}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
