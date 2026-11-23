"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Flame,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";
import { FOUNDER_PILLARS } from "@/data/portfolio";
import { EmberCanvas } from "@/components/ui/EmberCanvas";
import { ArcReactorCore } from "@/components/ui/ArmorTransitions";

const VENTURE_METRICS = [
  { label: "RELIABILITY", value: "100% Production Uptime" },
  { label: "ENGINEERING", value: "Full-Stack + Zero-Trust APIs" },
  { label: "OWNERSHIP", value: "End-to-End SDLC" },
];

export function FounderTransition() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const emberIntensityRef = useRef<number>(0);
  const [activePillarId, setActivePillarId] = useState(FOUNDER_PILLARS[0].id);
  const lenis = useLenis();

  const activePillar =
    FOUNDER_PILLARS.find((p) => p.id === activePillarId) ?? FOUNDER_PILLARS[0];

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        emberIntensityRef.current = 0.4;
        gsap.set(".ft-phase1-chassis, .ft-six-plates", {
          opacity: 0,
          pointerEvents: "none",
        });
        gsap.set(".ft-hellfire-bg", { opacity: 0.72 });
        gsap.set(".ft-founder-console", {
          opacity: 1,
          y: 0,
          scale: 1,
          pointerEvents: "auto",
        });
        return;
      }

      const mm = gsap.matchMedia();

      // DESKTOP (>= 768px): Full 240vh 6-Plate 3D Armor Morph
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=240%",
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.25) {
                emberIntensityRef.current = p * 0.4;
              } else if (p < 0.68) {
                emberIntensityRef.current = Math.min(1, 0.18 + (p - 0.25) * 2.3);
              } else {
                emberIntensityRef.current = Math.max(0.55, 1 - (p - 0.68) * 1.1);
              }
            },
          },
        });

        tl.to(
          ".ft-reactor-outer",
          { rotation: 420, duration: 0.34, ease: "power2.in" },
          0
        )
          .to(
            ".ft-reactor-inner",
            { rotation: -540, duration: 0.34, ease: "power2.in" },
            0
          )
          .to(
            ".ft-reactor-stroke",
            { stroke: "#FF7A00", duration: 0.24, ease: "power2.inOut" },
            0.1
          )
          .to(
            ".ft-reactor-orb",
            {
              backgroundColor: "#FFB800",
              boxShadow:
                "0 0 42px #FF5500, 0 0 90px rgba(255, 184, 0, 0.95)",
              scale: 1.35,
              duration: 0.24,
              ease: "power2.in",
            },
            0.1
          )
          .fromTo(
            ".ft-warning-hud",
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" },
            0.06
          )
          .to(
            ".ft-phase1-chassis",
            { opacity: 0, scale: 1.08, duration: 0.08, ease: "power2.in" },
            0.27
          )
          .fromTo(
            ".ft-six-plates",
            { opacity: 0 },
            { opacity: 1, duration: 0.04 },
            0.26
          )
          .to(
            ".ft-plate-tl",
            {
              xPercent: -75,
              yPercent: -68,
              rotateX: 28,
              rotateY: -38,
              scale: 0.82,
              opacity: 0,
              duration: 0.36,
              ease: "power3.in",
            },
            0.3
          )
          .to(
            ".ft-plate-tr",
            {
              xPercent: 78,
              yPercent: -64,
              rotateX: 26,
              rotateY: 38,
              scale: 0.82,
              opacity: 0,
              duration: 0.36,
              ease: "power3.in",
            },
            0.3
          )
          .to(
            ".ft-plate-ml",
            {
              xPercent: -96,
              yPercent: 0,
              rotateY: -48,
              scale: 0.85,
              opacity: 0,
              duration: 0.36,
              ease: "power3.in",
            },
            0.31
          )
          .to(
            ".ft-plate-mr",
            {
              xPercent: 96,
              yPercent: 0,
              rotateY: 48,
              scale: 0.85,
              opacity: 0,
              duration: 0.36,
              ease: "power3.in",
            },
            0.31
          )
          .to(
            ".ft-plate-bl",
            {
              xPercent: -74,
              yPercent: 72,
              rotateX: -28,
              rotateY: -34,
              scale: 0.82,
              opacity: 0,
              duration: 0.36,
              ease: "power3.in",
            },
            0.32
          )
          .to(
            ".ft-plate-br",
            {
              xPercent: 76,
              yPercent: 74,
              rotateX: -28,
              rotateY: 34,
              scale: 0.82,
              opacity: 0,
              duration: 0.36,
              ease: "power3.in",
            },
            0.32
          )
          .fromTo(
            ".ft-hellfire-bg",
            { opacity: 0.08, scale: 1.12 },
            { opacity: 0.72, scale: 1, duration: 0.34, ease: "power2.out" },
            0.3
          )
          .fromTo(
            ".ft-shockwave",
            { scale: 0.16, opacity: 1 },
            { scale: 2.75, opacity: 0, duration: 0.34, ease: "power2.out" },
            0.35
          )
          .fromTo(
            ".ft-slam-left",
            { xPercent: -105, opacity: 0.95 },
            { xPercent: 0, opacity: 0, duration: 0.22, ease: "power4.out" },
            0.66
          )
          .fromTo(
            ".ft-slam-right",
            { xPercent: 105, opacity: 0.95 },
            { xPercent: 0, opacity: 0, duration: 0.22, ease: "power4.out" },
            0.66
          )
          .fromTo(
            ".ft-slam-top",
            { yPercent: -105, opacity: 0.9 },
            { yPercent: 0, opacity: 0, duration: 0.22, ease: "power4.out" },
            0.66
          )
          .fromTo(
            ".ft-slam-bottom",
            { yPercent: 105, opacity: 0.9 },
            { yPercent: 0, opacity: 0, duration: 0.22, ease: "power4.out" },
            0.66
          )
          .fromTo(
            ".ft-founder-console",
            { opacity: 0, scale: 0.94, y: 34, pointerEvents: "none" },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              pointerEvents: "auto",
              duration: 0.28,
              ease: "power3.out",
            },
            0.7
          );
      });

      // MOBILE (< 768px): Crisp 130vh Vertical Reveal without heavy 3D Z-depth
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              emberIntensityRef.current = Math.min(0.85, 0.2 + self.progress * 0.8);
            },
          },
        });

        tl.to(".ft-reactor-outer", { rotation: 240, duration: 0.35, ease: "power2.in" }, 0)
          .to(".ft-reactor-stroke", { stroke: "#FF7A00", duration: 0.25 }, 0.08)
          .to(".ft-phase1-chassis", { opacity: 0, y: -24, duration: 0.18 }, 0.28)
          .fromTo(
            ".ft-hellfire-bg",
            { opacity: 0.15 },
            { opacity: 0.68, duration: 0.35 },
            0.22
          )
          .fromTo(
            ".ft-founder-console",
            { opacity: 0, y: 28, pointerEvents: "none" },
            {
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
              duration: 0.4,
              ease: "power3.out",
            },
            0.42
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const handleVentureInquiry = () => {
    window.dispatchEvent(
      new CustomEvent("ultrakerb:select-mission", {
        detail: "UltraKerb Client Project",
      })
    );
    const commsEl = document.getElementById("comms");
    if (!commsEl) return;
    if (lenis) {
      lenis.scrollTo(commsEl, { offset: -12, duration: 1.3 });
    } else {
      commsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#070709] text-slate-100"
      style={{ perspective: "1350px", transformStyle: "preserve-3d" }}
    >
      {/* Vivid Molten Hellfire + Gold-Titanium Background (0.72 peak opacity) */}
      <div
        aria-hidden="true"
        className="ft-hellfire-bg bg-radial-vignette pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0"
        style={{ backgroundImage: "url('/images/founder-hellfire-bg.png')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#070709]/65 via-transparent to-[#050608]/80"
      />

      {/* Radial Hellfire / Arc-Gold Shockwave Ring */}
      <div
        aria-hidden="true"
        className="ft-shockwave pointer-events-none absolute left-1/2 top-1/2 z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FFB800] opacity-0 shadow-[0_0_75px_rgba(255,85,0,0.95),inset_0_0_55px_rgba(255,184,0,0.65)]"
      />

      {/* 165-Particle Multi-Depth Ember Canvas + Heat Shimmer */}
      <div className="pointer-events-none absolute inset-0 z-15">
        <EmberCanvas intensityRef={emberIntensityRef} particleCount={165} />
      </div>

      {/* PHASE 2: 6-Plate Transformers Interlocking Armor Fracture */}
      <div
        aria-hidden="true"
        className="ft-six-plates pointer-events-none absolute inset-0 z-20 opacity-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {(
          [
            "ft-plate-tl clip-plate-tl",
            "ft-plate-tr clip-plate-tr",
            "ft-plate-ml clip-plate-ml",
            "ft-plate-mr clip-plate-mr",
            "ft-plate-bl clip-plate-bl",
            "ft-plate-br clip-plate-br",
          ] as const
        ).map((cls) => (
          <div
            key={cls}
            className={`${cls} absolute inset-0 border border-[#D4AF37]/65 bg-cover bg-center`}
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(22,26,34,0.88), rgba(10,12,16,0.92)), url('/images/mech-armor-bg.png')",
            }}
          />
        ))}
      </div>

      {/* PHASE 3: 4-Edge Heavy Obsidian & Gold-Titanium Armor Slam-In */}
      <div
        aria-hidden="true"
        className="ft-slam-left pointer-events-none absolute inset-y-0 left-0 z-25 w-1/2 border-r-2 border-[#D4AF37] bg-[#0B0908]/90 opacity-0"
      />
      <div
        aria-hidden="true"
        className="ft-slam-right pointer-events-none absolute inset-y-0 right-0 z-25 w-1/2 border-l-2 border-[#D4AF37] bg-[#0B0908]/90 opacity-0"
      />
      <div
        aria-hidden="true"
        className="ft-slam-top pointer-events-none absolute inset-x-0 top-0 z-25 h-1/3 border-b-2 border-[#FF5500] bg-[#0B0908]/85 opacity-0"
      />
      <div
        aria-hidden="true"
        className="ft-slam-bottom pointer-events-none absolute inset-x-0 bottom-0 z-25 h-1/3 border-t-2 border-[#FF5500] bg-[#0B0908]/85 opacity-0"
      />

      {/* PHASE 1: Mechanical Developer Chassis + Spinning Arc Reactor Core */}
      <div className="ft-phase1-chassis pointer-events-none absolute z-30 w-full max-w-xl px-6">
        <div className="ft-warning-hud mb-3 flex items-center justify-between border border-[#FF7A00]/80 bg-[#1A0D06]/90 px-4 py-2 font-mono text-[11px] font-bold tracking-widest text-[#FFB800] opacity-0 shadow-[0_0_24px_rgba(255,77,0,0.45)] backdrop-blur-md">
          <span className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#FF4D00] animate-pulse" />
            <span>ARC CORE OVERLOAD // INITIATING FOUNDER SUIT-UP</span>
          </span>
        </div>

        <div className="relative overflow-hidden border border-slate-600/80 bg-black/75 p-6 shadow-2xl backdrop-blur-xl clip-chamfer-md sm:p-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-[11px] text-slate-400">
            <span className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-[#00F0FF]" />
              CHASSIS // IDENTITY: SOFTWARE_DEVELOPER
            </span>
            <span className="text-[#FF7A00]">SCROLL TO CHARGE ↓</span>
          </div>

          <div className="my-5 flex flex-col items-center justify-center">
            <ArcReactorCore />
            <div className="mt-4 text-center font-mono text-xs tracking-widest text-slate-300">
              CONCENTRIC CORE: <span className="text-[#00F0FF]">CYAN</span> →{" "}
              <span className="text-[#FFB800]">GOLD-TITANIUM HELLFIRE</span>
            </div>
          </div>
        </div>
      </div>

      {/* PHASE 3: FULL-BLEED EDGE-TO-EDGE FOUNDER EDITION // ULTRAKERB COMMAND BAND */}
      <div className="ft-founder-console relative z-30 w-full opacity-0">
        {/* Full-Width Molten Gold/Amber Top Structural Beam */}
        <div className="molten-border-animated h-[3px] w-full shadow-[0_0_30px_rgba(255,122,0,0.85)]" />

        <div className="w-full bg-black/74 py-10 backdrop-blur-xl sm:py-16">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
            {/* Top Telemetry Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D4AF37]/30 pb-5">
              <div className="inline-flex items-center gap-2 border border-[#FF5500]/60 bg-[#FF4D00]/15 px-3 py-1 font-mono text-[11px] font-semibold tracking-widest text-[#FFB800]">
                <Flame className="h-3.5 w-3.5 text-[#FF4D00] animate-ember-pulse" />
                <span>ACT III // GOLD-TITANIUM ARMOR LOCKED</span>
              </div>
              <div className="font-mono text-[11px] tracking-widest text-amber-200/80">
                EXECUTIVE COMMAND // ULTRAKERB VENTURES
              </div>
            </div>

            {/* Asymmetric 12-Col Venture Grid */}
            <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left 6 Cols: Bold Statement + Venture Metrics + CTA */}
              <div className="lg:col-span-6">
                <h2 className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl xl:text-6xl">
                  <span className="block bg-gradient-to-r from-[#FF4D00] via-[#FFB800] to-[#FDE68A] bg-clip-text text-transparent neon-text-ember">
                    FOUNDER EDITION
                  </span>
                  <span className="mt-1 block text-white">
                    <span className="text-slate-500">//</span> ULTRAKERB
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-amber-100/90 sm:text-xl">
                  From writing production code to building scalable software
                  ventures.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {VENTURE_METRICS.map((metric) => (
                    <div
                      key={metric.label}
                      className="border border-[#D4AF37]/40 bg-black/70 px-4 py-3.5 backdrop-blur-md clip-chamfer-sm"
                    >
                      <div className="font-mono text-[9px] tracking-[0.2em] text-amber-200/65">
                        {metric.label}
                      </div>
                      <div className="mt-1.5 font-mono text-xs font-bold tracking-wide text-[#FFB800]">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  type="button"
                  onClick={handleVentureInquiry}
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  className="mt-8 inline-flex w-full items-center justify-between bg-gradient-to-r from-[#FF4D00] via-[#FF8800] to-[#FFB800] px-6 py-4 font-mono text-xs font-bold tracking-widest text-black uppercase shadow-[0_0_36px_-4px_rgba(255,77,0,0.85)] transition-shadow hover:shadow-[0_0_46px_rgba(255,184,0,0.95)] clip-chamfer-sm sm:w-auto sm:min-w-[300px]"
                >
                  <span>Initiate Venture Inquiry</span>
                  <ArrowRight className="ml-4 h-4 w-4" />
                </motion.button>
              </div>

              {/* Right 6 Cols: Interactive UltraKerb Capability Modules */}
              <div className="space-y-4 lg:col-span-6">
                <div className="grid grid-cols-1 gap-2.5">
                  {FOUNDER_PILLARS.map((pillar) => {
                    const isSelected = pillar.id === activePillar.id;
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() => setActivePillarId(pillar.id)}
                        onMouseEnter={() => setActivePillarId(pillar.id)}
                        className={`group flex w-full items-center justify-between border px-4 py-3.5 text-left font-mono text-xs tracking-wider transition-all duration-200 clip-chamfer-sm ${
                          isSelected
                            ? "border-[#FFB800] bg-gradient-to-r from-[#FF4D00]/32 to-[#D4AF37]/16 text-white shadow-[0_0_24px_-6px_rgba(255,122,0,0.75)]"
                            : "border-slate-700/80 bg-black/60 text-slate-300 hover:border-[#FF7A00]/80 hover:bg-[#FF4D00]/15 hover:text-amber-100"
                        }`}
                      >
                        <span className="font-semibold">{pillar.title}</span>
                        <Zap
                          className={`h-3.5 w-3.5 transition-colors ${
                            isSelected
                              ? "text-[#FFB800]"
                              : "text-slate-500 group-hover:text-[#FF7A00]"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="border border-[#D4AF37]/35 bg-black/70 p-5 backdrop-blur-md sm:p-6"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-[#FFB800]">
                      <span>PILLAR {activePillar.id} // ACTIVE BRIEF</span>
                      <Shield className="h-3.5 w-3.5" />
                    </div>
                    <h3 className="mt-2.5 font-display text-xl font-bold text-white sm:text-2xl">
                      {activePillar.headline}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200">
                      {activePillar.description}
                    </p>

                    <ul className="mt-4 space-y-2 border-t border-[#D4AF37]/25 pt-4">
                      {activePillar.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 font-mono text-xs text-amber-100/95"
                        >
                          <Check className="h-3.5 w-3.5 shrink-0 text-[#FFB800]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Molten Gold/Amber Bottom Structural Beam */}
        <div className="molten-border-animated h-[3px] w-full shadow-[0_0_30px_rgba(255,122,0,0.85)]" />
      </div>
    </section>
  );
}
