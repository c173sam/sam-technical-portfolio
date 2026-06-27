import { ThreeBodyBackdrop } from "@/components/ThreeBodyBackdrop";

export default function BackgroundLab() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-ink">
      <ThreeBodyBackdrop />

      <div className="pointer-events-none relative z-10 min-h-screen px-5 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/[0.08] bg-black/14 px-4 py-3 text-xs text-white/48 backdrop-blur-md sm:text-sm">
          <span>Three-Body Background Lab</span>
          <span className="text-cyan-200/80">orbit trails / starfield / HUD</span>
        </div>

        <section className="mx-auto flex min-h-[calc(100vh-5.5rem)] max-w-7xl items-end pb-8">
          <div className="max-w-sm border-l border-cyan-100/14 pl-4">
            <p className="text-sm leading-6 text-white/44">
              Reference direction: dark astronomical system, central three-body motion, restrained telemetry, subtle waveform.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
