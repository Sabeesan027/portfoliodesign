"use client";

import { useEffect, useRef } from "react";

interface NetNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Packet {
  from: number;
  to: number;
  t: number;
  speed: number;
}

interface ThreatMatrixCanvasProps {
  underAttack: boolean;
  className?: string;
}

export function ThreatMatrixCanvas({
  underAttack,
  className = "",
}: ThreatMatrixCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const attackRef = useRef(underAttack);

  useEffect(() => {
    attackRef.current = underAttack;
  }, [underAttack]);

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

    const NODE_COUNT = 26;
    const nodes: NetNode[] = [];
    const packets: Packet[] = [];

    const initGraph = () => {
      nodes.length = 0;
      packets.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          radius: 1.8 + Math.random() * 1.8,
        });
      }
      for (let i = 0; i < 18; i++) {
        const from = Math.floor(Math.random() * NODE_COUNT);
        let to = Math.floor(Math.random() * NODE_COUNT);
        if (to === from) to = (from + 1) % NODE_COUNT;
        packets.push({
          from,
          to,
          t: Math.random(),
          speed: 0.005 + Math.random() * 0.009,
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0 && width > 0 && height > 0) {
        initGraph();
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let rafId = 0;
    let sweepAngle = 0;

    const render = () => {
      rafId = window.requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      const isBreach = attackRef.current;
      const primaryRgb = isBreach ? "255, 0, 60" : "0, 240, 255";
      const maxLinkDist = Math.min(240, Math.max(150, width * 0.18));

      // Subtle tactical radar sweep centered on upper-right quadrant
      sweepAngle = (sweepAngle + (isBreach ? 0.014 : 0.007)) % (Math.PI * 2);
      const cx = width * 0.72;
      const cy = height * 0.34;
      const radarRadius = Math.min(width, height) * 0.42;

      ctx.save();
      ctx.strokeStyle = `rgba(${primaryRgb}, 0.075)`;
      ctx.lineWidth = 1;
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radarRadius * r) / 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Sweep cone
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radarRadius, sweepAngle - 0.35, sweepAngle);
      ctx.closePath();
      ctx.fillStyle = `rgba(${primaryRgb}, 0.065)`;
      ctx.fill();
      ctx.restore();

      // Update & draw network nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * (isBreach ? 1.5 : 1);
        n.y += n.vy * (isBreach ? 1.5 : 1);

        if (n.x < 10 || n.x > width - 10) n.vx *= -1;
        if (n.y < 10 || n.y > height - 10) n.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxLinkDist) {
            const alpha = (1 - dist / maxLinkDist) * 0.22;
            ctx.strokeStyle = `rgba(${primaryRgb}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${primaryRgb}, 0.55)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw animated routing packets
      for (const pkt of packets) {
        pkt.t += pkt.speed * (isBreach ? 1.85 : 1);
        if (pkt.t >= 1) {
          pkt.t = 0;
          pkt.from = pkt.to;
          pkt.to = Math.floor(Math.random() * nodes.length);
          if (pkt.to === pkt.from) pkt.to = (pkt.from + 1) % nodes.length;
        }
        const a = nodes[pkt.from];
        const b = nodes[pkt.to];
        if (!a || !b) continue;
        const px = a.x + (b.x - a.x) * pkt.t;
        const py = a.y + (b.y - a.y) * pkt.t;

        ctx.fillStyle = `rgba(${primaryRgb}, 0.95)`;
        ctx.beginPath();
        ctx.arc(px, py, 2.3, 0, Math.PI * 2);
        ctx.fill();

        const halo = ctx.createRadialGradient(px, py, 0, px, py, 9);
        halo.addColorStop(0, `rgba(${primaryRgb}, 0.55)`);
        halo.addColorStop(1, `rgba(${primaryRgb}, 0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(px, py, 9, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    rafId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
