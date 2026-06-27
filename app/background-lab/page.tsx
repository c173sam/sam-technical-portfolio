import { Background } from "@/components/Background";

export default function BackgroundLab() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-bg text-ink">
      <Background forceMotion />
      <section className="relative z-10 flex min-h-screen items-center justify-center px-5">
        <div className="pointer-events-none absolute inset-x-8 top-8 flex items-center justify-between rounded-full border border-white/10 bg-black/18 px-4 py-3 text-xs text-muted backdrop-blur-xl sm:text-sm">
          <span>Dynamic Background Lab</span>
          <span className="text-accent">Aurora · Grid · Glow · Noise</span>
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-8 h-px w-64 bg-gradient-to-r from-transparent via-accent/80 to-transparent shadow-[0_0_34px_oklch(var(--accent)/0.5)]" />
          <h1 className="hero-title text-balance text-[clamp(3.5rem,12vw,6rem)] font-semibold leading-[0.9] tracking-[-0.038em]">
            Premium Motion Background
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-muted sm:text-lg">
            Slow aurora ribbons, atmospheric grid drift, soft radial depth and restrained technical motion.
          </p>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {["slow", "cinematic", "technical", "clean"].map((item) => (
              <div key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-muted backdrop-blur-xl">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-accent via-white/20 to-transparent" />
      </section>
    </main>
  );
}
