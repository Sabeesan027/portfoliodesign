"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import {
  Award,
  Briefcase,
  Building2,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { CERTIFICATIONS, EDUCATION_CREDENTIALS } from "@/data/portfolio";

const HEAVY_SPRING = {
  type: "spring" as const,
  stiffness: 260,
  damping: 24,
};

function ArmorBolts() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-2.5 left-2.5 h-1.5 w-1.5 border border-zinc-400/70 bg-zinc-700"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-2.5 right-2.5 h-1.5 w-1.5 border border-zinc-400/70 bg-zinc-700"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2.5 left-2.5 h-1.5 w-1.5 border border-zinc-400/70 bg-zinc-700"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2.5 right-2.5 h-1.5 w-1.5 border border-zinc-400/70 bg-zinc-700"
      />
    </>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      // Smooth vertical parallax on brushed titanium armor background
      gsap.fromTo(
        ".exp-armor-parallax",
        { yPercent: -15 },
        {
          yPercent: 15,
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
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#07090C] py-24 text-slate-100 sm:py-32"
    >
      {/* Brushed Cybertronian Titanium Armor Background parallaxing behind cards */}
      <div
        aria-hidden="true"
        className="exp-armor-parallax bg-radial-vignette pointer-events-none absolute -inset-y-24 inset-x-0 bg-cover bg-center bg-no-repeat opacity-[0.58]"
        style={{ backgroundImage: "url('/images/mech-armor-bg.png')" }}
      />

      {/* Clean edge vignette to preserve contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07090C]/78 via-transparent to-[#070709]/86"
      />

      <div
        className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10"
        style={{ perspective: "1200px" }}
      >
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-zinc-700/70 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-zinc-300 uppercase">
              <Briefcase className="h-3.5 w-3.5 text-[#FF7A00]" />
              <span>02.EXP // HEAVY MECHANICAL ARMOR BAY</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Leadership &amp; Credentials
            </h2>
          </div>

          <div className="border border-zinc-600/80 bg-zinc-950/80 px-3 py-1 font-mono text-xs tracking-widest text-zinc-200 backdrop-blur-md">
            VERIFIED PRODUCTION TRACK RECORD
          </div>
        </div>

        {/* Primary Leadership Card — Solid Interlocking Left & Right Steel Armor Halves */}
        <div
          className="mt-12 grid grid-cols-1 overflow-hidden border border-zinc-700/90 bg-zinc-950/80 shadow-2xl backdrop-blur-xl clip-chamfer-lg lg:grid-cols-12"
          style={{ perspective: "1200px" }}
        >
          {/* Left Steel Armor Half: Hinges inward along Y-axis from left edge */}
          <motion.div
            initial={{ opacity: 0, rotateY: -26, x: -24 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: false, amount: 0.18 }}
            transition={HEAVY_SPRING}
            style={{ transformOrigin: "left center", transformPerspective: 1200 }}
            className="relative border-b border-zinc-700/80 bg-gradient-to-br from-zinc-900/90 via-zinc-950/90 to-black/90 p-7 sm:p-10 lg:col-span-7 lg:border-r lg:border-b-0"
          >
            <ArmorBolts />

            <div className="flex flex-wrap items-center gap-3.5 border-b border-zinc-800 pb-5">
              <span className="flex h-11 w-11 items-center justify-center border border-[#FF4D00]/55 bg-[#FF4D00]/15 text-[#FF7A00] clip-chamfer-sm">
                <Building2 className="h-5 w-5" />
              </span>
              <div>
                <div className="font-mono text-[11px] tracking-widest text-[#FF9500]">
                  LEADERSHIP // ACTIVE COMMAND
                </div>
                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  Co-Founder &amp; Lead Full-Stack Developer — UltraKerb
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-base leading-relaxed text-zinc-200">
                Directing technical architecture and full Software Development
                Lifecycle (SDLC) ownership across enterprise web platforms,
                custom point-of-sale software, and cross-platform mobile
                applications.
              </p>

              <ul className="space-y-3 text-sm leading-relaxed text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#FF7A00]" />
                  <span>
                    Full SDLC ownership from client discovery, database schema
                    design, and zero-trust REST APIs through Ubuntu VPS / Nginx
                    production operations.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#FF7A00]" />
                  <span>
                    Engineered and delivered commercial software systems for
                    enterprise clients including{" "}
                    <strong className="font-semibold text-white">
                      SS Group of Companies
                    </strong>{" "}
                    and{" "}
                    <strong className="font-semibold text-white">
                      AST Constructions Pvt Ltd
                    </strong>
                    .
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Steel Armor Half: Hinges inward along Y-axis from right edge to bolt shut */}
          <motion.div
            initial={{ opacity: 0, rotateY: 26, x: 24 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: false, amount: 0.18 }}
            transition={{ ...HEAVY_SPRING, delay: 0.06 }}
            style={{ transformOrigin: "right center", transformPerspective: 1200 }}
            className="relative flex flex-col justify-between bg-gradient-to-bl from-zinc-900/90 via-zinc-950/90 to-black/95 p-7 sm:p-10 lg:col-span-5"
          >
            <ArmorBolts />

            <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400">
                ARMOR UNIT // ULTRAKERB-01
              </span>
              <span className="border border-zinc-600/80 bg-zinc-900 px-3 py-1 font-mono text-xs tracking-widest text-zinc-100">
                NOV 2025 – PRESENT
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="border border-zinc-700/80 bg-black/70 p-4">
                <div className="font-mono text-[10px] tracking-widest text-zinc-400">
                  COMMERCIAL CLIENTS
                </div>
                <div className="mt-2 space-y-1.5 font-mono text-xs text-zinc-100">
                  <div>▸ SS Group of Companies</div>
                  <div>▸ AST Constructions Pvt Ltd</div>
                </div>
              </div>

              <div className="border border-zinc-700/80 bg-black/70 p-4">
                <div className="font-mono text-[10px] tracking-widest text-zinc-400">
                  CORE DELIVERABLES
                </div>
                <div className="mt-2 space-y-1.5 font-mono text-xs text-zinc-100">
                  <div>▸ Enterprise Web Platforms</div>
                  <div>▸ Custom POS &amp; Mobile Apps</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education & Credentials — Heavy Top-Hinged Steel Armor Flaps */}
        <div className="mt-12" style={{ perspective: "1200px" }}>
          <div className="mb-5 flex items-center gap-2 font-mono text-xs tracking-widest text-zinc-300 uppercase">
            <GraduationCap className="h-4 w-4 text-zinc-200" />
            <span>EDUCATION &amp; VERIFIED CREDENTIALS</span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {EDUCATION_CREDENTIALS.map((edu, index) => (
              <motion.div
                key={edu.code}
                initial={{
                  opacity: 0,
                  rotateX: -28,
                  rotateY: index === 0 ? -10 : 10,
                }}
                whileInView={{ opacity: 1, rotateX: 0, rotateY: 0 }}
                viewport={{ once: false, amount: 0.18 }}
                transition={{ ...HEAVY_SPRING, delay: index * 0.08 }}
                style={{
                  transformOrigin: "top center",
                  transformPerspective: 1200,
                }}
                className="relative border border-zinc-700/85 bg-gradient-to-b from-zinc-900/90 to-zinc-950/92 p-6 backdrop-blur-xl clip-chamfer-md"
              >
                <ArmorBolts />
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-widest text-zinc-400">
                  <span>{edu.code}</span>
                  <span className="text-zinc-200">{edu.period}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-white">
                  {edu.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-zinc-300">
                  {edu.institution}
                </p>
                <p className="mt-4 border-t border-zinc-800 pt-3 text-xs leading-relaxed text-zinc-300">
                  {edu.highlight}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Certifications Strip — Interlocking Bottom Armor Plates */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, rotateX: 30, y: 14 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: false, amount: 0.18 }}
                transition={{ ...HEAVY_SPRING, delay: 0.08 + idx * 0.07 }}
                style={{
                  transformOrigin: "bottom center",
                  transformPerspective: 1200,
                }}
                className="relative flex items-start gap-3.5 border border-zinc-700/85 bg-zinc-950/90 p-4 backdrop-blur-xl clip-chamfer-sm"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-zinc-700 bg-zinc-900 text-[#FF9500]">
                  {idx === 2 ? (
                    <Award className="h-4 w-4" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}
                </span>
                <div>
                  <div className="font-mono text-[9px] tracking-widest text-zinc-400">
                    {cert.tag}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold text-white">
                    {cert.title}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-zinc-300">
                    {cert.issuer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
