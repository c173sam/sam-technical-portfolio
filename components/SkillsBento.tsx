"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { skillGroups } from "@/data/profile";

export function SkillsBento() {
  return (
    <section id="skills" className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-24 h-64 bg-[radial-gradient(circle_at_50%_50%,oklch(var(--primary)/0.16),transparent_62%)] blur-3xl" />
      <Reveal>
        <SectionHeading kicker="Skills" title="按真实实习场景组织能力，而不是普通技能清单">
          围绕 Technical Support、Project Support、Tools、Communication 四类能力呈现，突出进入技术团队后的可协作价值。
        </SectionHeading>
      </Reveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto grid max-w-7xl auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {skillGroups.map((group, index) => (
          <motion.div key={group.title} variants={staggerItem} className={index === 0 ? "xl:col-span-2" : ""}>
            <GlassCard>
              <div className="relative flex h-full min-h-[310px] flex-col justify-between overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -right-14 -top-14 h-40 w-40 rounded-full blur-3xl"
                  style={{ background: index % 2 === 0 ? "oklch(var(--accent) / 0.13)" : "oklch(var(--primary) / 0.16)" }}
                />
                <div className="relative">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className="rounded-full border border-white/10 bg-black/24 px-3 py-1 text-xs text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-white/16 to-transparent" />
                  </div>
                  <h3 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-ink">{group.title}</h3>
                  <p className="mt-4 text-pretty text-sm leading-7 text-muted">{group.summary}</p>
                </div>

                <div className="relative mt-10 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-muted backdrop-blur-xl transition-colors duration-300 hover:border-accent/30 hover:text-ink"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
