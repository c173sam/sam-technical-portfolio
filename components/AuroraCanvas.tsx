"use client";

import { useEffect, useRef } from "react";

export function AuroraCanvas({ forceMotion = false }: { forceMotion?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches && !forceMotion;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawAtmosphere = (t: number) => {
      context.save();
      context.globalCompositeOperation = "lighter";
      context.filter = "blur(54px)";

      const fields = [
        {
          x: 0.34 + Math.sin(t * 0.08) * 0.08,
          y: 0.2 + Math.cos(t * 0.06) * 0.04,
          r: 0.58,
          color: "rgba(110, 96, 255, 0.22)"
        },
        {
          x: 0.68 + Math.cos(t * 0.07 + 1.4) * 0.07,
          y: 0.28 + Math.sin(t * 0.05) * 0.05,
          r: 0.52,
          color: "rgba(74, 221, 207, 0.16)"
        },
        {
          x: 0.48 + Math.sin(t * 0.05 + 3.5) * 0.05,
          y: 0.6 + Math.cos(t * 0.04) * 0.04,
          r: 0.6,
          color: "rgba(198, 88, 255, 0.12)"
        }
      ];

      for (const field of fields) {
        const radius = Math.max(width, height) * field.r;
        const gradient = context.createRadialGradient(width * field.x, height * field.y, 0, width * field.x, height * field.y, radius);
        gradient.addColorStop(0, field.color);
        gradient.addColorStop(0.42, field.color.replace(/0\.\d+\)/, "0.07)"));
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = gradient;
        context.fillRect(-80, -80, width + 160, height + 160);
      }
      context.restore();
    };

    const drawAuroraSheet = (t: number, mobile: boolean) => {
      context.save();
      context.globalCompositeOperation = "lighter";
      context.filter = `blur(${mobile ? 34 : 52}px)`;

      const gradient = context.createLinearGradient(0, height * 0.05, width, height * 0.58);
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(0.18, "rgba(82, 240, 221, 0.16)");
      gradient.addColorStop(0.48, "rgba(126, 101, 255, 0.36)");
      gradient.addColorStop(0.72, "rgba(210, 88, 255, 0.16)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = gradient;

      for (let band = 0; band < 3; band += 1) {
        const yBase = height * (0.12 + band * 0.12);
        const amp = (mobile ? 26 : 54) - band * 8;
        const phase = t * (0.16 + band * 0.045) + band * 1.7;

        context.beginPath();
        context.moveTo(-80, yBase + Math.sin(phase) * amp);

        for (let x = -80; x <= width + 120; x += width / 5) {
          const p = x / Math.max(width, 1);
          const cp1x = x + width / 9;
          const cp2x = x + width / 5;
          const cp1y = yBase + Math.sin(p * 5.2 + phase) * amp + Math.cos(phase * 0.7) * 24;
          const cp2y = yBase + Math.cos(p * 4.1 - phase * 0.85) * amp;
          const endY = yBase + Math.sin(p * 6.1 + phase * 0.72) * amp;
          context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x + width / 4.8, endY);
        }

        context.lineTo(width + 140, yBase + (mobile ? 95 : 150));
        context.lineTo(-120, yBase + (mobile ? 110 : 170));
        context.closePath();
        context.globalAlpha = 0.58 - band * 0.12;
        context.fill();
      }
      context.restore();
    };

    const drawFineLines = (t: number) => {
      context.save();
      context.globalCompositeOperation = "screen";
      context.filter = "blur(0.4px)";
      context.lineWidth = 1;

      for (let i = 0; i < 5; i += 1) {
        const y = height * (0.18 + i * 0.13) + Math.sin(t * 0.12 + i) * 22;
        const gradient = context.createLinearGradient(0, y, width, y + 60);
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(0.34, "rgba(86, 232, 220, 0.08)");
        gradient.addColorStop(0.58, "rgba(126, 101, 255, 0.13)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        context.strokeStyle = gradient;
        context.beginPath();
        for (let x = -40; x <= width + 40; x += 32) {
          const p = x / Math.max(width, 1);
          const lineY = y + Math.sin(p * 8 + t * 0.22 + i) * 11;
          if (x === -40) context.moveTo(x, lineY);
          else context.lineTo(x, lineY);
        }
        context.stroke();
      }
      context.restore();
    };

    const render = (time: number) => {
      const t = time / 1000;
      context.clearRect(0, 0, width, height);

      const mobile = width < 760;
      const intensity = mobile ? 0.68 : 1;

      context.globalAlpha = intensity;
      drawAtmosphere(t);
      drawAuroraSheet(t, mobile);
      drawFineLines(t);

      if (!reducedMotion) {
        raf = requestAnimationFrame(render);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    if (reducedMotion) {
      render(0);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-95" />;
}
