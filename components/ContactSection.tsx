"use client";

import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";

export function ContactSection() {
  return (
    <section id="contact" className="px-5 pb-10 pt-16 sm:px-8 sm:pb-14 sm:pt-24 lg:px-10">
      <Reveal>
        <div className="metal-panel relative mx-auto max-w-7xl overflow-hidden rounded-2xl p-6 sm:p-10">
          <div className="panel-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="text-sm font-medium text-accent">Open to Internship</p>
              <h2 className="text-balance mt-3 text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-5xl">
                Technical Support / IT Support / PMO / Solution 方向实习机会
              </h2>
              <p className="text-pretty mt-5 max-w-2xl text-base leading-8 text-muted">
                目标城市：{profile.targetCity}。本页面没有添加虚构联系方式；如需联系，可在投递平台、邮件或招聘沟通渠道中补充。
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/24 p-5">
              <p className="text-sm text-muted">Candidate</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-ink">
                {profile.name} / {profile.englishName}
              </p>
              <div className="mt-5 grid gap-3 text-sm leading-7 text-muted">
                <p>{profile.school} · {profile.major} · {profile.graduation}</p>
                <p>City · {profile.targetCity}</p>
                <p>Email · {profile.email || "待补充 / 通过投递平台联系"}</p>
              </div>
              <a
                href={profile.email ? `mailto:${profile.email}` : "#profile"}
                className="beam mt-6 inline-flex h-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.055] px-5 text-sm font-semibold text-ink backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </Reveal>
      <footer className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {profile.name} / {profile.englishName}</p>
        <p>Built with Next.js, TypeScript, Tailwind CSS and Framer Motion.</p>
      </footer>
    </section>
  );
}
