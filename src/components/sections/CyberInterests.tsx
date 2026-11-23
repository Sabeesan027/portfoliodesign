"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { Cpu, Lock, Radar, ShieldAlert, ShieldCheck } from "lucide-react";
import { CYBER_PILLARS } from "@/data/portfolio";
import { TacticalCard } from "@/components/ui/TacticalCard";
import { BolaSimulator, type SimMode } from "@/components/ui/BolaSimulator";
import { ThreatMatrixCanvas } from "@/components/ui/ThreatMatrixCanvas";

export function CyberInterests() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [simMode, setSimMode] = useState<SimMode>("unprotected");
  const underAttack = simMode === "unprotected";

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".cyber-bg-parallax",
        { yPercent: -14 },
        {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="cyber"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[#00F0FF]/30 bg-[#030407] py-24 text-slate-100 sm:py-32"
    >
      {/* Vivid Cyber Warfare Command Center Background (0.56 opacity + parallax + radial vignette) */}
      <div
        aria-hidden="true"
        className="cyber-bg-parallax bg-radial-vignette pointer-events-none absolute -inset-y-24 inset-x-0 bg-cover bg-center bg-no-repeat opacity-[0.56]"
        style={{ backgroundImage: "url('/images/cyber-warfare-bg.png')" }}
      />

      {/* Edge-only vignette + subtle cyber grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-cyber bg-gradient-to-b from-[#030407]/72 via-transparent to-[#05060A]/82"
      />

      {/* Live Interactive HTML5 Canvas Network Packet & Radar Visualizer */}
      <div className="pointer-events-none absolute inset-0 z-[5]">
        <ThreatMatrixCanvas underAttack={underAttack} />
      </div>

      {/* Subtle CRT scanline micro-texture */}
      <div
        aria-hidden="true"
        className="crt-scanlines absolute inset-0 z-[6] opacity-35"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        {/* Section Header + Live J.A.R.V.I.S. Threat Level HUD Ring */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#00F0FF]/25 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00F0FF] uppercase">
              <Radar className="h-3.5 w-3.5" />
              <span>04.CYBER // J.A.R.V.I.S. THREAT MATRIX</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Cybersecurity &amp; API Warfare
            </h2>
          </div>

          {/* Live Rotating HUD Threat Status Ring */}
          <div
            className={`flex items-center gap-3.5 border px-4 py-2.5 backdrop-blur-xl transition-all duration-300 clip-chamfer-sm ${
              underAttack
                ? "border-[#FF003C]/70 bg-black/70 text-[#FF003C] shadow-[0_0_24px_-4px_rgba(255,0,60,0.6)]"
                : "border-[#00F0FF]/70 bg-black/70 text-[#00F0FF] shadow-[0_0_24px_-4px_rgba(0,240,255,0.55)]"
            }`}
          >
            <div className="relative flex h-9 w-9 items-center justify-center">
              <svg
                className="animate-spin-slow absolute inset-0 h-full w-full"
                viewBox="0 0 40 40"
                fill="none"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="12 6 4 6"
                />
              </svg>
              {underAttack ? (
                <ShieldAlert className="h-4 w-4" />
              ) : (
                <ShieldCheck className="h-4 w-4" />
              )}
            </div>
            <div className="font-mono">
              <div className="text-[9px] tracking-widest text-slate-400">
                HUD STATUS RING
              </div>
              <div className="text-xs font-bold tracking-widest">
                {underAttack
                  ? "THREAT LEVEL: CRITICAL"
                  : "THREAT LEVEL: NEUTRALIZED"}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Spotlight: Undergraduate Cybersecurity Research + BOLA Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.16 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <TacticalCard
            variant="cyber"
            chamfer="lg"
            className="bg-black/65 p-6 backdrop-blur-xl sm:p-9"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
              {/* Left: Research Brief */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 border border-[#00F0FF]/45 bg-[#00F0FF]/12 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-widest text-[#00F0FF]">
                  <Lock className="h-3 w-3" />
                  <span>UNDERGRADUATE RESEARCH SPOTLIGHT</span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                  Context-Aware Middleware for BOLA (Broken Object Level
                  Authorization) Mitigation in RESTful APIs
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-slate-200">
                  Broken Object Level Authorization (OWASP API1) remains the most
                  exploited vulnerability in modern APIs because standard
                  authentication verifies <em>who</em> you are, not whether you
                  own the requested object ID.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  This research introduces a lightweight, framework-agnostic
                  context-aware middleware layer that evaluates actor claims,
                  tenant boundaries, and resource-ownership graphs before
                  sensitive payloads ever leave the server.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="border border-[#00F0FF]/30 bg-black/70 p-3">
                    <div className="text-[10px] text-slate-400">TARGET VECTOR</div>
                    <div className="mt-1 font-semibold text-[#FF003C]">
                      IDOR / BOLA (API1)
                    </div>
                  </div>
                  <div className="border border-[#00F0FF]/30 bg-black/70 p-3">
                    <div className="text-[10px] text-slate-400">OVERHEAD</div>
                    <div className="mt-1 font-semibold text-[#00F0FF]">
                      1.4ms // 0 LEAKS
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Interactive Live API Attack Simulator */}
              <div className="lg:col-span-7">
                <BolaSimulator onModeChange={setSimMode} />
              </div>
            </div>
          </TacticalCard>
        </motion.div>

        {/* Secondary Cyber & Tech Pillars Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CYBER_PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.18 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
            >
              <TacticalCard
                variant="cyber"
                chamfer="md"
                className="flex h-full flex-col justify-between bg-black/65 p-6 backdrop-blur-xl"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-[#00F0FF]">
                    <span>{pillar.code} // DEFENSE PILLAR</span>
                    <Cpu className="h-3.5 w-3.5 opacity-75" />
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-200">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-800/90 pt-4">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#00F0FF]/30 bg-[#00F0FF]/[0.08] px-2 py-0.5 font-mono text-[10px] tracking-wider text-[#00F0FF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TacticalCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
