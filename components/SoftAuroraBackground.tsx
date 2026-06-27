"use client";

import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useEffect, useRef } from "react";

type SoftAuroraBackgroundProps = {
  className?: string;
};

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
varying vec2 vUv;

#define TAU 6.28318530718

vec3 hash33(vec3 p) {
  p = vec3(
    dot(p, vec3(127.1, 311.7, 74.7)),
    dot(p, vec3(269.5, 183.3, 246.1)),
    dot(p, vec3(113.5, 271.9, 124.6))
  );
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float fade(float t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = vec3(fade(f.x), fade(f.y), fade(f.z));

  return mix(
    mix(
      mix(dot(hash33(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)),
          dot(hash33(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
      mix(dot(hash33(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)),
          dot(hash33(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x),
      u.y),
    mix(
      mix(dot(hash33(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)),
          dot(hash33(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
      mix(dot(hash33(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)),
          dot(hash33(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x),
      u.y),
    u.z);
}

float fbm(vec3 p) {
  float value = 0.0;
  float amp = 0.58;
  float freq = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amp * noise(p * freq);
    freq *= 2.02;
    amp *= 0.48;
  }
  return value;
}

float auroraBand(vec2 uv, float t, float offset, float width, float lift) {
  vec2 p = uv;
  p.x *= 1.15;
  float n = fbm(vec3(p.x * 1.45, p.y * 1.1 + offset, t * 0.09 + offset));
  float center = lift + n * 0.22 + sin(p.x * 3.2 + t * 0.16 + offset) * 0.055;
  float dist = abs(p.y - center);
  return exp(-dist * dist / width);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv;
  p.x *= uResolution.x / uResolution.y;

  float t = uTime;
  vec3 bg = vec3(0.006, 0.007, 0.011);

  float verticalFade = smoothstep(0.08, 0.82, uv.y) * (1.0 - smoothstep(0.96, 1.0, uv.y));
  float horizon = smoothstep(0.0, 0.5, 1.0 - uv.y);

  float b1 = auroraBand(vec2(p.x - 0.34, uv.y), t, 0.0, 0.018, 0.76);
  float b2 = auroraBand(vec2(p.x - 0.12, uv.y), t, 2.4, 0.034, 0.64);
  float b3 = auroraBand(vec2(p.x + 0.08, uv.y), t, 4.8, 0.052, 0.52);

  vec3 cyan = vec3(0.24, 1.0, 0.92);
  vec3 violet = vec3(0.45, 0.34, 1.0);
  vec3 magenta = vec3(0.92, 0.22, 1.0);

  vec3 color = bg;
  color += cyan * b1 * 0.58 * verticalFade;
  color += violet * b2 * 0.78 * verticalFade;
  color += magenta * b3 * 0.32 * verticalFade;

  vec2 glowPosA = vec2(0.35 + sin(t * 0.05) * 0.08, 0.28 + cos(t * 0.04) * 0.04);
  vec2 glowPosB = vec2(0.76 + cos(t * 0.04) * 0.06, 0.38 + sin(t * 0.035) * 0.05);
  float gA = 1.0 - smoothstep(0.0, 0.66, distance(uv, glowPosA));
  float gB = 1.0 - smoothstep(0.0, 0.58, distance(uv, glowPosB));

  color += violet * gA * 0.24;
  color += cyan * gB * 0.15;

  float vignette = smoothstep(0.92, 0.22, distance(uv, vec2(0.5, 0.36)));
  color *= mix(0.34, 1.0, vignette);
  color *= horizon;

  float grain = fract(sin(dot(gl_FragCoord.xy + t * 9.0, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.018;

  float alpha = clamp(length(color) * 1.4, 0.0, 1.0);
  gl_FragColor = vec4(color, alpha);
}
`;

export function SoftAuroraBackground({ className = "" }: SoftAuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false, dpr: Math.min(window.devicePixelRatio || 1, 1.75) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1, 1] }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const width = container.offsetWidth || window.innerWidth;
      const height = container.offsetHeight || window.innerHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];
    };

    let frame = 0;
    const update = (time: number) => {
      program.uniforms.uTime.value = time * 0.001;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(update);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      geometry.remove();
      program.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, []);

  return <div ref={containerRef} className={`absolute inset-0 ${className}`} />;
}
