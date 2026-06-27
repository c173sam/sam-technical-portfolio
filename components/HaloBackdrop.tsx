"use client";

export function HaloBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg" aria-hidden="true">
      <div className="halo-stage">
        <div className="halo-field halo-field-a" />
        <div className="halo-field halo-field-b" />
        <div className="halo-field halo-field-c" />
        <div className="halo-core" />
      </div>
      <div className="halo-grid" />
      <div className="halo-vignette" />
      <div className="noise absolute inset-0 opacity-45 mix-blend-soft-light" />
    </div>
  );
}
