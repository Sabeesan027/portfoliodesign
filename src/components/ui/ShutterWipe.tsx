"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export function ShutterWipe() {
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
          start: "top bottom",
          end: "bottom top",
          scrub: 0.65,
        },
      });

      // 3 mechanical aperture blades slide inward to seal, then sweep outward into the dark Projects bay
      tl.fromTo(
        ".shutter-blade-1",
        { xPercent: -102 },
        { xPercent: 0, duration: 0.42, ease: "power2.inOut" },
        0
      )
        .fromTo(
          ".shutter-blade-2",
          { xPercent: 102 },
          { xPercent: 0, duration: 0.42, ease: "power2.inOut" },
          0.06
        )
        .fromTo(
          ".shutter-blade-3",
          { xPercent: -102 },
          { xPercent: 0, duration: 0.42, ease: "power2.inOut" },
          0.12
        )
        .fromTo(
          ".shutter-progress-fill",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.85, ease: "none" },
          0.05
        )
        .to(
          ".shutter-blade-1",
          { xPercent: 104, duration: 0.42, ease: "power2.inOut" },
          0.54
        )
        .to(
          ".shutter-blade-2",
          { xPercent: -104, duration: 0.42, ease: "power2.inOut" },
          0.58
        )
        .to(
          ".shutter-blade-3",
          { xPercent: 104, duration: 0.42, ease: "power2.inOut" },
          0.62
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative z-20 h-44 w-full overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#131820] to-[#0E1116] sm:h-52"
    >
      {/* 3-Blade Mechanical Aperture Shutter */}
      <div className="shutter-blade-1 absolute inset-x-0 top-0 h-1/3 border-y border-slate-500/40 bg-gradient-to-r from-[#1D2430] via-[#0F141B] to-[#1D2430] shadow-[0_8px_24px_rgba(0,0,0,0.65)]" />
      <div className="shutter-blade-2 absolute inset-x-0 top-1/3 h-1/3 border-y border-[#00F0FF]/25 bg-gradient-to-r from-[#141922] via-[#222B38] to-[#141922] shadow-[0_8px_24px_rgba(0,0,0,0.75)]" />
      <div className="shutter-blade-3 absolute inset-x-0 top-2/3 h-1/3 border-y border-slate-600/40 bg-gradient-to-r from-[#1A202B] via-[#0D1117] to-[#1A202B] shadow-[0_8px_24px_rgba(0,0,0,0.65)]" />

      {/* Center Scroll-Velocity HUD Progress Bar */}
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6">
        <div className="w-full max-w-xl border border-slate-700/80 bg-[#090C11]/90 px-4 py-2.5 backdrop-blur-md clip-chamfer-sm">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-slate-300">
            <span className="text-[#00F0FF]">DEPTH // 01 -&gt; 02</span>
            <span>APERTURE SHUTTER ENGAGED</span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden bg-slate-800">
            <div className="shutter-progress-fill h-full w-full origin-left bg-gradient-to-r from-[#00F0FF] via-white to-[#FF4D00]" />
          </div>
        </div>
      </div>
    </div>
  );
}
