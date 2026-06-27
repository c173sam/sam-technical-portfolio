"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  a: number;
  tw: number;
};

type TrailPoint = {
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function drawGlow(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, alpha: number) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
  gradient.addColorStop(0.1, color);
  gradient.addColorStop(0.34, color.replace("0.75", "0.2"));
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawFlare(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "rgba(255, 230, 190, 0.62)";
  ctx.lineWidth = 0.8;
  ctx.shadowColor = "rgba(255, 199, 124, 0.55)";
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.moveTo(x, y - size * 0.72);
  ctx.lineTo(x, y + size * 0.72);
  ctx.stroke();
  ctx.restore();
}

function bodyPosition(index: number, t: number, cx: number, cy: number, scale: number) {
  const phase = (Math.PI * 2 * index) / 3;
  const slow = t * 0.00011;
  const fast = t * 0.00021;
  const x =
    cx +
    Math.cos(slow + phase) * scale * 0.72 +
    Math.sin(fast * 1.7 + phase * 1.25) * scale * 0.22 +
    Math.cos(t * 0.000047 + phase * 2.1) * scale * 0.12;
  const y =
    cy +
    Math.sin(slow * 1.2 + phase) * scale * 0.4 +
    Math.cos(fast * 1.35 + phase * 0.75) * scale * 0.18 +
    Math.sin(t * 0.000061 + phase * 1.8) * scale * 0.1;

  return { x, y };
}

export function ThreeBodyBackdrop({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const random = seededRandom(173);
    const stars: Star[] = Array.from({ length: window.innerWidth < 720 ? 130 : 220 }, () => ({
      x: random(),
      y: random(),
      z: random(),
      r: 0.3 + random() * 1.05,
      a: 0.05 + random() * 0.42,
      tw: 0.4 + random() * 1.8
    }));

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let raf = 0;
    let pointerX = 0;
    let pointerY = 0;
    const trails: TrailPoint[][] = [[], [], []];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / Math.max(width, 1) - 0.5) * 2;
      pointerY = (event.clientY / Math.max(height, 1) - 0.5) * 2;
    };

    const drawHud = (time: number) => {
      const centerX = width / 2 + pointerX * 10;
      ctx.save();
      ctx.font = "12px Arial, sans-serif";
      ctx.lineWidth = 1;

      ctx.globalAlpha = 0.045;
      ctx.strokeStyle = "rgba(150, 190, 205, 0.42)";
      for (let x = (time * 0.0012) % 78; x < width; x += 78) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = (time * 0.0009) % 78; y < height; y += 78) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.globalAlpha = clamp(width / 900, 0.22, 0.5);
      ctx.fillStyle = "rgba(214, 226, 235, 0.62)";
      const date = new Date();
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");
      ctx.textAlign = "center";
      ctx.font = "12px Arial, sans-serif";
      ctx.fillText(`${hour}:${minute}`, centerX, 29);
      ctx.font = "9px Arial, sans-serif";
      ctx.fillStyle = "rgba(150, 164, 176, 0.3)";
      ctx.fillText("Shanghai / technical portfolio", centerX, 42);

      if (width > 760) {
        ctx.textAlign = "left";
        ctx.font = "9px Arial, sans-serif";
        ctx.fillStyle = "rgba(176, 189, 200, 0.2)";
        ["Chaotic Era", "Signal: stable", "Orbit index", "Support path"].forEach((label, i) => {
          const y = height * 0.44 + i * 25;
          ctx.fillText(label, 52, y);
          ctx.strokeStyle = "rgba(134, 214, 224, 0.1)";
          ctx.beginPath();
          ctx.moveTo(52, y + 8);
          ctx.lineTo(154 + Math.sin(time * 0.001 + i) * 24, y + 8);
          ctx.stroke();
        });

        ctx.textAlign = "right";
        ["PROFILE", "TECH SUPPORT", "PROJECT FLOW"].forEach((label, i) => {
          const y = height * 0.42 + i * 34;
          ctx.fillStyle = "rgba(176, 189, 200, 0.22)";
          ctx.fillText(label, width - 54, y);
          ctx.strokeStyle = "rgba(134, 214, 224, 0.1)";
          ctx.beginPath();
          ctx.moveTo(width - 216, y + 8);
          ctx.lineTo(width - 54, y + 8);
          ctx.stroke();
        });
      }

      const waveY = height - 64;
      const waveWidth = Math.min(360, width * 0.42);
      ctx.globalAlpha = 0.24;
      ctx.strokeStyle = "rgba(220, 238, 244, 0.26)";
      ctx.beginPath();
      for (let i = 0; i <= 180; i += 1) {
        const p = i / 180;
        const amp = Math.sin(p * Math.PI) * 12;
        const y = waveY + Math.sin(i * 0.34 + time * 0.004) * amp * 0.33 + Math.sin(i * 0.12 + time * 0.002) * amp * 0.2;
        const x = width / 2 - waveWidth / 2 + p * waveWidth;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "rgba(91, 238, 230, 0.48)";
      ctx.fillRect(width / 2 - 0.5, height - 42, 1, 34);
      ctx.restore();
    };

    const render = (time: number) => {
      frame += 1;
      const motionTime = reduceMotion ? 2200 : time;
      const cx = width / 2 + pointerX * 7;
      const cy = height * 0.39 + pointerY * 5;
      const scale = Math.min(width, height) * (width < 720 ? 0.07 : 0.095);

      ctx.fillStyle = "#020304";
      ctx.fillRect(0, 0, width, height);

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.56);
      bg.addColorStop(0, "rgba(8, 13, 15, 0.94)");
      bg.addColorStop(0.36, "rgba(3, 6, 8, 0.98)");
      bg.addColorStop(1, "rgba(0, 0, 0, 1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      stars.forEach((star) => {
        const x = (star.x * width + Math.sin(motionTime * 0.000022 * star.tw + star.y * 8) * 12) % width;
        const y = (star.y * height + Math.cos(motionTime * 0.000018 * star.tw + star.x * 9) * 8) % height;
        const alpha = star.a * (0.52 + Math.sin(motionTime * 0.001 * star.tw + star.x * 8) * 0.28);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.z > 0.88 ? "rgba(220, 255, 248, 0.74)" : "rgba(190, 205, 215, 0.56)";
        ctx.fillRect(x, y, star.r, star.r);
      });
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const positions = [0, 1, 2].map((index) => bodyPosition(index, motionTime, cx, cy, scale));
      const colors = ["rgba(255, 245, 220, 0.75)", "rgba(255, 160, 124, 0.75)", "rgba(105, 242, 230, 0.75)"];

      positions.forEach((_, index) => {
        ctx.beginPath();
        for (let step = 0; step <= 70; step += 1) {
          const p = step / 70;
          const point = bodyPosition(index, motionTime - (1 - p) * 250000, cx, cy, scale);
          if (step === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
        ctx.strokeStyle = index === 2 ? "rgba(104, 245, 232, 0.052)" : "rgba(255, 220, 172, 0.045)";
        ctx.lineWidth = 0.5;
        ctx.shadowColor = index === 2 ? "rgba(86, 242, 232, 0.08)" : "rgba(255, 190, 120, 0.06)";
        ctx.shadowBlur = 4;
        ctx.stroke();
      });

      positions.forEach((point, index) => {
        const trail = trails[index];
        if (!reduceMotion && frame % 2 === 0) trail.push({ x: point.x, y: point.y });
        if (trail.length > 120) trail.shift();

        ctx.beginPath();
        trail.forEach((item, i) => {
          if (i === 0) ctx.moveTo(item.x, item.y);
          else ctx.lineTo(item.x, item.y);
        });
        ctx.strokeStyle = index === 2 ? "rgba(100, 244, 230, 0.1)" : "rgba(255, 220, 170, 0.08)";
        ctx.lineWidth = 0.8;
        ctx.shadowColor = index === 2 ? "rgba(71, 244, 230, 0.18)" : "rgba(255, 190, 110, 0.14)";
        ctx.shadowBlur = 7;
        ctx.stroke();
      });

      positions.forEach((point, index) => {
        const pulse = 1 + Math.sin(motionTime * 0.002 + index) * 0.16;
        drawGlow(ctx, point.x, point.y, (index === 0 ? 24 : 19) * pulse, colors[index], 0.82);
        drawGlow(ctx, point.x, point.y, (index === 0 ? 5.5 : 4.5) * pulse, colors[index], 0.95);
        drawFlare(ctx, point.x, point.y, (index === 0 ? 18 : 14) * pulse, index === 2 ? 0.28 : 0.42);
      });

      ctx.restore();

      const wash = ctx.createRadialGradient(width * 0.52, height * 0.35, 0, width * 0.52, height * 0.35, width * 0.48);
      wash.addColorStop(0, "rgba(30, 54, 60, 0.08)");
      wash.addColorStop(0.36, "rgba(10, 20, 28, 0.045)");
      wash.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      drawHud(motionTime);

      const vignette = ctx.createRadialGradient(width / 2, height * 0.48, Math.min(width, height) * 0.18, width / 2, height / 2, Math.max(width, height) * 0.74);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(0.68, "rgba(0,0,0,0.24)");
      vignette.addColorStop(1, "rgba(0,0,0,0.88)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      if (!reduceMotion) raf = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden bg-black ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 opacity-[0.14] mix-blend-soft-light [background-image:radial-gradient(circle_at_30%_20%,white_0_0.6px,transparent_0.9px),radial-gradient(circle_at_70%_80%,white_0_0.5px,transparent_0.8px)] [background-size:9px_9px,13px_13px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0)_22%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
}
