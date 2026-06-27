"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { profile, quickFacts } from "@/data/profile";

export function ProfileSection() {
  return (
    <section id="profile" className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
      <Reveal>
        <SectionHeading kicker="Profile" title="面向技术支持与交付现场的成长型候选人">
          背景来自现代通信技术，目标不是把经历包装得很满，而是把真实的基础、方向和协作意识表达清楚。
        </SectionHeading>
      </Reveal>

      <Reveal className="mx-auto max-w-7xl">
        <div className="metal-panel relative overflow-hidden rounded-2xl p-5 sm:p-8 md:p-10">
          <div className="panel-grid pointer-events-none absolute inset-0 opacity-35" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-medium text-accent">Current Focus</p>
              <h3 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
                企业数字化现场里的支持、协作与 AI 落地
              </h3>
              <p className="text-pretty mt-5 max-w-xl text-base leading-8 text-muted">{profile.summary}</p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {quickFacts.map((fact) => (
                <motion.div key={fact.label} variants={staggerItem}>
                  <GlassCard>
                    <p className="text-xs text-muted">{fact.label}</p>
                    <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-ink">{fact.value}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
