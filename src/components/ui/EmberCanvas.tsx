"use client";

import { useEffect, useRef } from "react";

interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  depth: number; // 0.35 (far) to 1.4 (near)
  alpha: number;
  life: number;
  maxLife: number;
  hue: number;
  streak: boolean;
}

interface EmberCanvasProps {
  /** Ref holding a 0..1 intensity value updated smoothly by GSAP without triggering React re-renders */
  intensityRef: React.MutableRefObject<number>;
  particleCount?: number;
  className?: string;
}

export function EmberCanvas({
  intensityRef,
  particleCount = 165,
  className = "",
}: EmberCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const spawnParticle = (initial = false): EmberParticle => {
      const depth = 0.35 + Math.random() * 1.1;
      const fromCore = Math.random() < 0.55;
      const x = fromCore
        ? width * (0.15 + Math.random() * 0.7)
        : Math.random() * width;
      const y = initial
        ? Math.random() * height
        : height * (0.62 + Math.random() * 0.45);

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 1.4 * depth,
        vy: -(1.3 + Math.random() * 4.2) * depth,
        size: (0.9 + Math.random() * 2.5) * depth,
        depth,
        alpha: 0.38 + Math.random() * 0.62,
        life: initial ? Math.random() * 80 : 0,
        maxLife: 55 + Math.random() * 95,
        hue: 14 + Math.random() * 32, // #FF4D00 to #FFB800
        streak: depth > 1.05 && Math.random() < 0.35,
      };
    };

    const particles: EmberParticle[] = Array.from(
      { length: particleCount },
      () => spawnParticle(true)
    );

    let rafId = 0;
    let frame = 0;

    const render = () => {
      rafId = window.requestAnimationFrame(render);
      frame += 1;

      const intensity = Math.max(0, Math.min(1, intensityRef.current));
      ctx.clearRect(0, 0, width, height);

      if (intensity <= 0.015) return;

      const activeCount = Math.floor(
        particles.length * (0.28 + intensity * 0.72)
      );
      const speedBoost = 0.75 + intensity * 1.85;

      ctx.globalCompositeOperation = "lighter";

      // Subtle rising heat distortion shimmer waves when intensity > 0.35
      if (intensity > 0.35) {
        const waveAlpha = (intensity - 0.35) * 0.14;
        for (let w = 0; w < 3; w++) {
          const waveY =
            height - ((frame * (1.6 + w * 0.5) + w * 240) % (height + 160)) + 80;
          const grad = ctx.createLinearGradient(0, waveY - 35, 0, waveY + 35);
          grad.addColorStop(0, "rgba(255, 77, 0, 0)");
          grad.addColorStop(0.5, `rgba(255, 130, 0, ${waveAlpha})`);
          grad.addColorStop(1, "rgba(255, 77, 0, 0)");
          ctx.fillStyle = grad;
          ctx.fillRect(0, waveY - 35, width, 70);
        }
      }

      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];
        p.life += 1;
        const turbulence = Math.sin(p.life * 0.09 + i * 0.7) * 0.65 * p.depth;
        p.x += p.vx + turbulence;
        p.y += p.vy * speedBoost;

        if (
          p.life >= p.maxLife ||
          p.y < -30 ||
          p.x < -30 ||
          p.x > width + 30
        ) {
          particles[i] = spawnParticle(false);
          continue;
        }

        const progress = p.life / p.maxLife;
        const fade =
          progress < 0.16
            ? progress / 0.16
            : 1 - (progress - 0.16) / 0.84;
        const alpha = Math.max(0, fade * p.alpha * intensity);

        if (p.streak) {
          // High-velocity glowing spark streak
          ctx.strokeStyle = `hsla(${p.hue + 10}, 100%, 66%, ${alpha * 0.9})`;
          ctx.lineWidth = Math.max(1, p.size * 0.55);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 3.5, p.y - p.vy * speedBoost * 2.8);
          ctx.stroke();
        } else {
          // Multi-depth soft molten halo
          const glowRadius = p.size * (2.5 + intensity * 1.6);
          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            glowRadius
          );
          grad.addColorStop(0, `hsla(${p.hue + 16}, 100%, 76%, ${alpha})`);
          grad.addColorStop(
            0.42,
            `hsla(${p.hue}, 100%, 54%, ${alpha * 0.65})`
          );
          grad.addColorStop(1, `hsla(${p.hue - 8}, 100%, 38%, 0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();

          // White-hot ember core
          ctx.fillStyle = `rgba(255, 244, 214, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.48, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";
    };

    rafId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [intensityRef, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
