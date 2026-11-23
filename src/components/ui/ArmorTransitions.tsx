"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/* ============================================================================
   1. HERO -> PROJECTS: IRON MAN HELMET FACEPLATE & HYDRAULIC BULKHEAD SPLIT
   ============================================================================ */
export function IronManFaceplateTransition() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 92%",
          end: "bottom 15%",
          scrub: 0.65,
        },
      });

      // Phase A: Gold-titanium faceplate visors slide down & lock from top corners
      tl.fromTo(
        ".im-visor-left",
        { xPercent: -55, yPercent: -75, rotateZ: -8 },
        { xPercent: 0, yPercent: 0, rotateZ: 0, duration: 0.38, ease: "power3.out" },
        0
      )
        .fromTo(
          ".im-visor-right",
          { xPercent: 55, yPercent: -75, rotateZ: 8 },
          { xPercent: 0, yPercent: 0, rotateZ: 0, duration: 0.38, ease: "power3.out" },
          0
        )
        // Optical cyan eye-slits ignite and scan across
        .fromTo(
          ".im-eye-slit",
          { opacity: 0, scaleX: 0.25 },
          { opacity: 1, scaleX: 1, duration: 0.22, ease: "power2.out" },
          0.26
        )
        .fromTo(
          ".im-hud-banner",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          0.28
        )
        // Phase B: Vertical split down center like a Transformers hydraulic bulkhead door
        .to(
          ".im-visor-left",
          { xPercent: -102, duration: 0.38, ease: "power3.inOut" },
          0.62
        )
        .to(
          ".im-visor-right",
          { xPercent: 102, duration: 0.38, ease: "power3.inOut" },
          0.62
        )
        .to(
          ".im-hud-banner",
          { opacity: 0, scale: 0.94, duration: 0.25, ease: "power2.in" },
          0.68
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative z-20 h-56 w-full overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#11151E] to-[#0E1116] sm:h-64"
    >
      {/* Left Gold-Titanium Faceplate Visor */}
      <div
        className="im-visor-left absolute inset-y-0 left-0 w-1/2 border-r-2 border-[#D4AF37]/80 bg-gradient-to-br from-[#2B2418] via-[#1B1F29] to-[#0E1117] shadow-[inset_-12px_0_32px_rgba(212,175,55,0.22)]"
        style={{ clipPath: "polygon(0 0, 100% 10%, 96% 100%, 0 100%)" }}
      >
        {/* Left Cyan Optical Eye-Slit */}
        <div
          className="im-eye-slit absolute right-8 top-1/2 h-3.5 w-28 -translate-y-1/2 bg-[#00F0FF] shadow-[0_0_26px_#00F0FF,0_0_52px_rgba(0,240,255,0.75)] sm:right-14 sm:w-40"
          style={{ clipPath: "polygon(0 0, 100% 35%, 94% 100%, 8% 72%)" }}
        />
        <div className="absolute bottom-3 left-6 font-mono text-[10px] tracking-[0.22em] text-[#D4AF37]/75">
          MK-L // LEFT VISOR LOCK
        </div>
      </div>

      {/* Right Gold-Titanium Faceplate Visor */}
      <div
        className="im-visor-right absolute inset-y-0 right-0 w-1/2 border-l-2 border-[#D4AF37]/80 bg-gradient-to-bl from-[#2B2418] via-[#1B1F29] to-[#0E1117] shadow-[inset_12px_0_32px_rgba(212,175,55,0.22)]"
        style={{ clipPath: "polygon(0 10%, 100% 0, 100% 100%, 4% 100%)" }}
      >
        {/* Right Cyan Optical Eye-Slit */}
        <div
          className="im-eye-slit absolute left-8 top-1/2 h-3.5 w-28 -translate-y-1/2 bg-[#00F0FF] shadow-[0_0_26px_#00F0FF,0_0_52px_rgba(0,240,255,0.75)] sm:left-14 sm:w-40"
          style={{ clipPath: "polygon(0 35%, 100% 0, 92% 72%, 6% 100%)" }}
        />
        <div className="absolute bottom-3 right-6 font-mono text-[10px] tracking-[0.22em] text-[#D4AF37]/75">
          MK-L // RIGHT VISOR LOCK
        </div>
      </div>

      {/* Center J.A.R.V.I.S. Lock-On HUD Banner */}
      <div className="im-hud-banner relative z-10 flex h-full items-center justify-center px-4">
        <div className="border border-[#00F0FF]/55 bg-[#060B12]/90 px-5 py-3 text-center backdrop-blur-md shadow-[0_0_30px_-4px_rgba(0,240,255,0.5)] clip-chamfer-sm">
          <div className="font-mono text-[10px] tracking-[0.26em] text-[#00F0FF] neon-text-cyan sm:text-xs">
            J.A.R.V.I.S. // INITIALIZING SYSTEM ARCHIVE
          </div>
          <div className="mt-1 font-mono text-[9px] tracking-widest text-amber-300/80">
            OPTICAL SCAN COMPLETE — OPENING HYDRAULIC BULKHEAD
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   2. PROJECTS -> EXPERIENCE: HEAVY BEVELED TITANIUM BULKHEAD DOORS
   ============================================================================ */
export function TransformersArmorBridge() {
  const bridgeRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bridgeRef.current,
          start: "top 92%",
          end: "bottom 12%",
          scrub: 0.6,
        },
      });

      // Stage A: Two heavy beveled titanium bulkhead doors slide inward from left/right & interlock at center
      tl.fromTo(
        ".tf-bulkhead-left",
        { xPercent: -98, yPercent: 0 },
        { xPercent: 0, yPercent: 0, duration: 0.42, ease: "power3.out" },
        0
      )
        .fromTo(
          ".tf-bulkhead-right",
          { xPercent: 98, yPercent: 0 },
          { xPercent: 0, yPercent: 0, duration: 0.42, ease: "power3.out" },
          0
        )
        // Stage B: Mechanical clunk / center seam glow pulse upon interlock
        .fromTo(
          ".tf-center-seam-pulse",
          { opacity: 0, scaleY: 0.25 },
          { opacity: 1, scaleY: 1, duration: 0.14, ease: "power2.out" },
          0.4
        )
        .fromTo(
          ".tf-lock-badge",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.14, ease: "power2.out" },
          0.42
        )
        .to(
          ".tf-center-seam-pulse",
          { opacity: 0.25, duration: 0.12, ease: "sine.inOut" },
          0.54
        )
        // Stage C: Retract vertically to reveal the Experience bay cleanly
        .to(
          ".tf-bulkhead-left",
          { yPercent: -108, duration: 0.34, ease: "power3.inOut" },
          0.66
        )
        .to(
          ".tf-bulkhead-right",
          { yPercent: 108, duration: 0.34, ease: "power3.inOut" },
          0.66
        )
        .to(
          ".tf-lock-badge",
          { opacity: 0, y: -12, duration: 0.22, ease: "power2.in" },
          0.68
        );
    },
    { scope: bridgeRef }
  );

  return (
    <div
      ref={bridgeRef}
      aria-hidden="true"
      className="relative z-20 -my-px flex h-16 w-full items-center justify-center overflow-hidden border-y border-zinc-700/80 bg-[#0A0C10]"
    >
      {/* Left Heavy Beveled Titanium Bulkhead Door / Chevron */}
      <div
        className="tf-bulkhead-left absolute inset-y-0 left-0 w-[53%] border-r-2 border-zinc-500/85 bg-zinc-900 shadow-[inset_-14px_0_24px_rgba(0,0,0,0.75)]"
        style={{
          clipPath: "polygon(0 0, 94% 0, 100% 50%, 94% 100%, 0 100%)",
          backgroundImage:
            "linear-gradient(125deg, rgba(255,255,255,0.1) 0%, rgba(24,24,27,0.95) 45%, rgba(9,9,11,0.98) 100%)",
        }}
      />

      {/* Right Heavy Beveled Titanium Bulkhead Door / Chevron */}
      <div
        className="tf-bulkhead-right absolute inset-y-0 right-0 w-[53%] border-l-2 border-zinc-500/85 bg-zinc-900 shadow-[inset_14px_0_24px_rgba(0,0,0,0.75)]"
        style={{
          clipPath: "polygon(6% 0, 100% 0, 100% 100%, 6% 100%, 0 50%)",
          backgroundImage:
            "linear-gradient(235deg, rgba(255,255,255,0.1) 0%, rgba(24,24,27,0.95) 45%, rgba(9,9,11,0.98) 100%)",
        }}
      />

      {/* Center Mechanical Interlock Seam Glow Pulse */}
      <div className="tf-center-seam-pulse pointer-events-none absolute inset-y-0 left-1/2 z-10 w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#FF7A00] to-transparent opacity-0 shadow-[0_0_22px_#FF7A00]" />

      {/* Compact Mechanical Seam Status Badge */}
      <div className="tf-lock-badge relative z-20 flex items-center gap-2 border border-zinc-500/80 bg-zinc-950/95 px-4 py-1 font-mono text-[10px] font-bold tracking-[0.22em] text-zinc-100 opacity-0 shadow-[0_0_22px_rgba(255,122,0,0.45)] clip-chamfer-sm">
        <span className="h-1.5 w-1.5 bg-[#FF7A00] shadow-[0_0_8px_#FF7A00]" />
        <span>BULKHEAD LOCKED // EXPERIENCE BAY</span>
      </div>
    </div>
  );
}

/* ============================================================================
   3. J.A.R.V.I.S. HOVER RETICLE & LASER SCANLINE OVERLAY (Projects Cards)
   ============================================================================ */
export function JarvisHoverHud() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    >
      {/* Laser Scanline Sweep */}
      <div className="jarvis-laser-sweep absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-[#00F0FF]/20 to-transparent" />

      {/* Rotating SVG HUD Targeting Arcs in Top-Right */}
      <svg
        className="animate-spin-slow absolute -top-8 -right-8 h-36 w-36 text-[#00F0FF]/35"
        viewBox="0 0 120 120"
        fill="none"
      >
        <circle
          cx="60"
          cy="60"
          r="46"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="18 10 6 10"
        />
        <circle
          cx="60"
          cy="60"
          r="34"
          stroke="#FF7A00"
          strokeOpacity="0.65"
          strokeWidth="1.2"
          strokeDasharray="8 14"
        />
      </svg>

      {/* Glowing Corner Micro-Bolts */}
      <span className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
      <span className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
      <span className="absolute bottom-3 left-3 h-1.5 w-1.5 rounded-full bg-[#FF7A00] shadow-[0_0_10px_#FF7A00]" />
      <span className="absolute bottom-3 right-3 h-1.5 w-1.5 rounded-full bg-[#FF7A00] shadow-[0_0_10px_#FF7A00]" />
    </div>
  );
}

/* ============================================================================
   4. SVG IRON MAN ARC REACTOR + MOLTEN HELLFIRE CORE (Act III Climax)
   ============================================================================ */
export function ArcReactorCore({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center ${className}`}
    >
      {/* Outer Cyan-to-Amber Ring */}
      <svg
        className="ft-reactor-outer h-40 w-40 sm:h-48 sm:w-48"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle
          cx="100"
          cy="100"
          r="88"
          className="ft-reactor-stroke"
          stroke="#00F0FF"
          strokeWidth="3"
          strokeDasharray="24 10 8 10"
        />
        <circle
          cx="100"
          cy="100"
          r="72"
          className="ft-reactor-stroke"
          stroke="#00F0FF"
          strokeOpacity="0.6"
          strokeWidth="6"
          strokeDasharray="10 12"
        />
      </svg>

      {/* Inner Counter-Rotating Reactor Ring */}
      <svg
        className="ft-reactor-inner absolute h-28 w-28 sm:h-32 sm:w-32"
        viewBox="0 0 140 140"
        fill="none"
      >
        <circle
          cx="70"
          cy="70"
          r="54"
          className="ft-reactor-stroke"
          stroke="#00F0FF"
          strokeWidth="3"
          strokeDasharray="14 8"
        />
        <polygon
          points="70,22 112,96 28,96"
          className="ft-reactor-stroke"
          stroke="#00F0FF"
          strokeWidth="2.5"
          fill="rgba(0,240,255,0.12)"
        />
      </svg>

      {/* Glowing Core Orb */}
      <div className="ft-reactor-orb absolute h-12 w-12 rounded-full bg-[#00F0FF] shadow-[0_0_32px_#00F0FF,0_0_64px_rgba(0,240,255,0.85)] sm:h-14 sm:w-14" />
    </div>
  );
}
