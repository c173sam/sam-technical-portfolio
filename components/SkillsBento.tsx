"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { skillGroups } from "@/data/profile";

const allTags = skillGroups.flatMap((group) => group.items);

export function SkillsBento() {
  return (
    <section id="skills" className="section-haze relative px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
      <Reveal>
        <SectionHeading kicker="Skills" title="能力不是清单，是进入团队后的协作界面">
          按真实实习工作流组织能力：支持现场、项目协作、工具链和沟通交付。视觉服务判断，不用花哨效果掩盖信息。
        </SectionHeading>
      </Reveal>

      <Reveal className="mx-auto mb-5 max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-black/24 py-3 backdrop-blur-xl">
        <div className="tag-marquee flex w-max gap-2 px-3">
          {[...allTags, ...allTags].map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="relative mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <div className="metal-panel sticky top-8 overflow-hidden rounded-2xl p-6 sm:p-8">
            <div className="panel-grid pointer-events-none absolute inset-0 opacity-35" />
            <div className="relative">
              <p className="text-sm font-medium text-accent">Capability Matrix</p>
              <h3 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
                面向 Technical Support 到 Solution Delivery 的基础能力面板
              </h3>
              <p className="mt-5 text-pretty text-sm leading-7 text-muted">
                这里不写“精通”，而是把可验证、可继续成长的能力放到真实岗位语境里：处理问题、跟进项目、整理文档、学习工具链。
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {["Support", "PMO", "Tools", "AI"].map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-black/24 p-4">
                    <p className="text-xs text-muted">Focus</p>
                    <p className="mt-2 text-lg font-semibold text-ink">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4 md:grid-cols-2"
        >
          {skillGroups.map((group, index) => (
            <motion.div key={group.title} variants={staggerItem}>
              <GlassCard>
                <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden">
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
                    <h3 className="text-balance text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">{group.title}</h3>
                    <p className="mt-4 text-pretty text-sm leading-7 text-muted">{group.summary}</p>
                  </div>

                  <div className="relative mt-9 flex flex-wrap gap-2">
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
      </div>
    </section>
  );
}
