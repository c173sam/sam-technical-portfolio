"use client";

import { useEffect, useRef } from "react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

    const drawRibbon = (
      t: number,
      baseY: number,
      amplitude: number,
      thickness: number,
      speed: number,
      colors: [string, string, string],
      offset: number
    ) => {
      const gradient = context.createLinearGradient(width * 0.08, baseY - amplitude, width * 0.92, baseY + amplitude);
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(0.22, colors[0]);
      gradient.addColorStop(0.52, colors[1]);
      gradient.addColorStop(0.78, colors[2]);
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      context.save();
      context.globalCompositeOperation = "lighter";
      context.filter = `blur(${Math.max(12, thickness * 0.2)}px)`;
      context.lineWidth = thickness;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = gradient;

      context.beginPath();
      for (let i = -60; i <= width + 60; i += 28) {
        const p = i / Math.max(width, 1);
        const waveA = Math.sin(p * Math.PI * 2.2 + t * speed + offset) * amplitude;
        const waveB = Math.sin(p * Math.PI * 5.1 - t * speed * 0.62 + offset * 0.7) * amplitude * 0.34;
        const drift = Math.sin(t * speed * 0.22 + offset) * amplitude * 0.25;
        const y = baseY + waveA + waveB + drift;
        if (i === -60) context.moveTo(i, y);
        else context.lineTo(i, y);
      }
      context.stroke();
      context.restore();
    };

    const drawLightColumns = (t: number) => {
      context.save();
      context.globalCompositeOperation = "screen";
      for (let i = 0; i < 7; i += 1) {
        const x = ((i * 0.17 + t * 0.008) % 1) * width;
        const alpha = 0.055 + Math.sin(t * 0.55 + i) * 0.022;
        const gradient = context.createLinearGradient(x, 0, x + width * 0.16, height);
        gradient.addColorStop(0, `rgba(142, 179, 255, 0)`);
        gradient.addColorStop(0.35, `rgba(139, 117, 255, ${alpha})`);
        gradient.addColorStop(0.65, `rgba(85, 240, 220, ${alpha * 0.75})`);
        gradient.addColorStop(1, `rgba(142, 179, 255, 0)`);
        context.fillStyle = gradient;
        context.beginPath();
        context.moveTo(x - width * 0.08, 0);
        context.lineTo(x + width * 0.08, 0);
        context.lineTo(x + width * 0.24, height);
        context.lineTo(x - width * 0.02, height);
        context.closePath();
        context.fill();
      }
      context.restore();
    };

    const drawOrbit = (t: number) => {
      const cx = width * 0.72;
      const cy = height * 0.42;
      const radius = Math.min(width, height) * 0.24;

      context.save();
      context.globalCompositeOperation = "lighter";
      context.translate(cx, cy);
      context.rotate(t * 0.035);
      context.scale(1.45, 0.48);
      for (let i = 0; i < 3; i += 1) {
        context.beginPath();
        context.strokeStyle = `rgba(${i === 1 ? "85, 240, 220" : "136, 116, 255"}, ${0.08 - i * 0.014})`;
        context.lineWidth = 1.2;
        context.arc(0, 0, radius + i * 42, 0, Math.PI * 1.45);
        context.stroke();
      }
      context.restore();
    };

    const drawDepthGlow = (t: number) => {
      context.save();
      context.globalCompositeOperation = "screen";
      const glows = [
        { x: 0.18 + Math.sin(t * 0.11) * 0.04, y: 0.22, r: 0.42, c: "rgba(105, 95, 255, 0.28)" },
        { x: 0.82 + Math.sin(t * 0.09 + 2) * 0.03, y: 0.52, r: 0.38, c: "rgba(82, 236, 218, 0.2)" },
        { x: 0.48 + Math.sin(t * 0.07 + 4) * 0.05, y: 0.88, r: 0.5, c: "rgba(214, 92, 255, 0.16)" }
      ];

      for (const glow of glows) {
        const radius = Math.max(width, height) * glow.r;
        const gradient = context.createRadialGradient(width * glow.x, height * glow.y, 0, width * glow.x, height * glow.y, radius);
        gradient.addColorStop(0, glow.c);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      }
      context.restore();
    };

    const render = (time: number) => {
      const t = time / 1000;
      context.clearRect(0, 0, width, height);

      const mobile = width < 760;
      const intensity = mobile ? 0.68 : 1;

      drawDepthGlow(t);
      drawLightColumns(t);

      drawRibbon(
        t,
        lerp(height * 0.12, height * 0.18, mobile ? 1 : 0),
        (mobile ? 34 : 58) * intensity,
        mobile ? 34 : 72,
        0.38,
        ["rgba(88, 242, 223, 0.34)", "rgba(129, 111, 255, 0.58)", "rgba(232, 85, 255, 0.28)"],
        0.2
      );
      drawRibbon(
        t,
        height * 0.28,
        (mobile ? 28 : 50) * intensity,
        mobile ? 28 : 58,
        -0.28,
        ["rgba(129, 111, 255, 0.24)", "rgba(91, 244, 224, 0.36)", "rgba(120, 90, 255, 0.42)"],
        1.8
      );
      drawRibbon(
        t,
        height * 0.48,
        (mobile ? 18 : 38) * intensity,
        mobile ? 18 : 42,
        0.22,
        ["rgba(232, 85, 255, 0.16)", "rgba(129, 111, 255, 0.3)", "rgba(85, 240, 220, 0.22)"],
        3.2
      );

      if (!mobile) drawOrbit(t);

      if (!reducedMotion) {
        raf = requestAnimationFrame(render);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    render(0);
    if (!reducedMotion) raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-95" />;
}
