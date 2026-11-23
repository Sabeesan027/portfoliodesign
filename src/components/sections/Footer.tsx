"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Activity, ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const FOOTER_COORDS = [
  { label: "01.WORK", href: "#work" },
  { label: "02.EXP", href: "#experience" },
  { label: "03.FOUNDER", href: "#founder" },
  { label: "04.CYBER", href: "#cyber" },
  { label: "05.COMMS", href: "#comms" },
];

export function Footer() {
  const lenis = useLenis();
  const [sessionSeconds, setSessionSeconds] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSessionSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const formatSession = (totalSec: number) => {
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSec % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const jumpTo = (href: string) => {
    const el = document.querySelector<HTMLElement>(href);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -12, duration: 1.25 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#FF003C]/50 bg-[#030305] pt-24 pb-16 text-slate-200">
      {/* Top tri-neon accent laser bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] bg-gradient-to-r from-[#00F0FF] via-[#FF5500] to-[#FF003C] shadow-[0_0_26px_rgba(0,240,255,0.9)]"
      />

      {/* Amplified 3D Perspective Neon Cyber-Grid Floor + Glowing Arc-Cyan & Crimson Horizon Beam */}
      <div
        aria-hidden="true"
        className="cyber-horizon-stage pointer-events-none absolute inset-0 z-0"
      >
        {/* Glowing Arc-Cyan & Crimson Horizon Laser Beam */}
        <div className="absolute inset-x-0 top-[44%] h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-[#FF003C] opacity-80 shadow-[0_0_28px_#00F0FF,0_0_52px_#FF003C]" />
        <div
          className="absolute inset-x-0 top-8 h-52 opacity-75 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(0,240,255,0.42) 0%, rgba(255,0,60,0.32) 48%, transparent 78%)",
          }}
        />
        <div className="cyber-horizon-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030305]/70 via-transparent to-[#030305]/92" />
      </div>

      {/* Responsive Non-Clipping Glowing Outline Typography */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-8">
        <div className="font-display text-[clamp(1.6rem,5.6vw,6.2rem)] font-extrabold leading-tight tracking-tight select-none neon-outline-display sm:whitespace-nowrap">
          G. SABEESAN // ULTRAKERB
        </div>

        {/* Live System Uptime Telemetry Ticker */}
        <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 border border-[#00F0FF]/40 bg-black/75 px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] text-slate-200 backdrop-blur-md sm:text-[11px]">
          <span className="flex items-center gap-1.5 text-[#00F0FF]">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            <span>SYSTEM UPTIME: 99.98%</span>
          </span>
          <span className="text-slate-600">//</span>
          <span>SESSION: {formatSession(sessionSeconds)}</span>
          <span className="text-slate-600">//</span>
          <span className="text-[#FF003C]">OVERDRIVE ACTIVE</span>
        </div>
      </div>

      {/* Main Footer Telemetry & Navigation */}
      <div className="relative z-10 mx-auto mt-12 max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col items-center justify-between gap-8 border-y border-white/15 bg-black/60 px-5 py-7 backdrop-blur-xl md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {FOOTER_COORDS.map((coord) => (
              <button
                key={coord.href}
                type="button"
                onClick={() => jumpTo(coord.href)}
                className="font-mono text-xs tracking-widest text-slate-300 transition-colors hover:text-[#00F0FF]"
              >
                {coord.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:sabeesan@ultrakerb.com"
              aria-label="Email Gnanavel Sabeesan"
              className="glitch-hover flex h-10 w-10 items-center justify-center border border-[#00F0FF]/45 bg-black/80 text-[#00F0FF] transition-all hover:border-[#00F0FF] hover:shadow-[0_0_22px_rgba(0,240,255,0.75)]"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/gnanavel-sabeesan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="glitch-hover flex h-10 w-10 items-center justify-center border border-[#FF5500]/45 bg-black/80 text-[#FF9500] transition-all hover:border-[#FF5500] hover:shadow-[0_0_22px_rgba(255,85,0,0.75)]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/sabeesan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="glitch-hover flex h-10 w-10 items-center justify-center border border-[#FF003C]/45 bg-black/80 text-[#FF003C] transition-all hover:border-[#FF003C] hover:shadow-[0_0_22px_rgba(255,0,60,0.75)]"
            >
              <Github className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => {
                if (lenis) {
                  lenis.scrollTo(0, { duration: 1.4 });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              aria-label="Return to top"
              className="glitch-hover ml-2 flex h-10 items-center gap-1.5 border border-slate-700 bg-black/85 px-3 font-mono text-[10px] tracking-widest text-slate-300 transition-colors hover:border-[#00F0FF] hover:text-[#00F0FF]"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>TOP</span>
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-center font-mono text-[11px] tracking-widest text-slate-400 sm:flex-row">
          <span>© 2026 GNANAVEL SABEESAN. ALL SYSTEMS OPERATIONAL.</span>
          <span className="text-[#00F0FF]/85">
            JAFFNA, LK // 9.6615° N, 80.0255° E
          </span>
        </div>
      </div>
    </footer>
  );
}
