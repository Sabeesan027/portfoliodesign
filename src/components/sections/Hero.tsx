"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import {
  ArrowDown,
  ArrowRight,
  Download,
  Radio,
  Server,
  Shield,
} from "lucide-react";
import { STACK_NODES } from "@/data/portfolio";
import { TacticalCard } from "@/components/ui/TacticalCard";

const HEADLINE_FIRST = "GNANAVEL";
const HEADLINE_SECOND = "SABEESAN";

const TRUSTED_CLIENTS = [
  "SS Group of Companies",
  "AST Constructions Pvt Ltd",
  "Robin Studios",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lenis = useLenis();
  const [activeNodeId, setActiveNodeId] = useState(STACK_NODES[0].id);

  const activeNode =
    STACK_NODES.find((node) => node.id === activeNodeId) ?? STACK_NODES[0];

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".hero-bg-parallax",
        { yPercent: -10 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const scrollToTarget = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -12, duration: 1.3 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#F8FAFC] text-[#0F172A] pt-28 pb-0 sm:pt-36"
    >
      {/* Vivid Architectural Blueprint Background */}
      <div
        aria-hidden="true"
        className="hero-bg-parallax bg-radial-vignette pointer-events-none absolute -inset-y-16 inset-x-0 bg-cover bg-center bg-no-repeat opacity-[0.58]"
        style={{ backgroundImage: "url('/images/hero-blueprint-bg.png')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-light bg-gradient-to-b from-[#F8FAFC]/55 via-transparent to-[#F8FAFC]/90"
      />

      {/* Subtle architectural hairline frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-20 bottom-16 border border-[#CBD5E1]/80 sm:inset-x-8"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 sm:px-10 sm:pb-16">
        {/* Top tactical telemetry bar */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-300/85 pb-4 font-mono text-[11px] tracking-widest text-slate-600">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            <span>SYS.STATUS // ONLINE</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>LAT: 9.6615° N</span>
            <span>//</span>
            <span>LON: 80.0255° E</span>
          </div>
          <div>ACT I // PRECISION ARCHITECTURE</div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Identity & Dual-Audience CTAs */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2.5 border border-slate-300/95 bg-white/90 px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-widest text-slate-800 shadow-xs backdrop-blur-md"
            >
              <Radio className="h-3.5 w-3.5 text-slate-900" />
              <span>JAFFNA, SRI LANKA // FULL-STACK &amp; API SECURITY ENGINEER</span>
            </motion.div>

            <h1 className="mt-7 font-display text-4xl font-bold leading-[0.96] tracking-tight text-[#0F172A] sm:text-6xl lg:text-7xl">
              <span className="block overflow-hidden">
                {HEADLINE_FIRST.split("").map((char, idx) => (
                  <motion.span
                    key={`f-${idx}`}
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.08 + idx * 0.032,
                      type: "spring",
                      stiffness: 260,
                      damping: 24,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="mt-1 block overflow-hidden text-slate-900">
                {HEADLINE_SECOND.split("").map((char, idx) => (
                  <motion.span
                    key={`s-${idx}`}
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.28 + idx * 0.032,
                      type: "spring",
                      stiffness: 260,
                      damping: 24,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Elevated Contrast Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate-700 md:text-xl"
            >
              Architecting resilient full-stack web systems, cross-platform
              mobile engines, and zero-trust REST APIs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.45 }}
              className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-slate-700"
            >
              <span className="flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5 text-slate-900" />
                Co-Founder &amp; CEO @ UltraKerb
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-slate-900" />
                BOLA API Security Researcher
              </span>
            </motion.div>

            {/* Dual-Audience 3-Path CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <motion.button
                type="button"
                onClick={() => scrollToTarget("work")}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
                className="group inline-flex items-center gap-2.5 bg-slate-950 px-6 py-3.5 font-mono text-xs font-semibold tracking-widest text-white uppercase shadow-[0_14px_30px_-10px_rgba(15,23,42,0.62)] transition-colors hover:bg-slate-800 clip-chamfer-sm"
              >
                <span>Explore Systems</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </motion.button>

              <motion.a
                href="/Sabeesan_Gnanavel_Resume.pdf"
                download="Sabeesan_Gnanavel_Resume.pdf"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
                className="relative inline-flex items-center gap-2.5 border border-slate-900 bg-white/95 px-6 py-3.5 font-mono text-xs font-semibold tracking-widest text-slate-900 uppercase backdrop-blur-md transition-colors hover:bg-slate-900 hover:text-white"
              >
                <span className="pointer-events-none absolute -top-px -left-px h-2 w-2 border-t-2 border-l-2 border-slate-900" />
                <span className="pointer-events-none absolute -top-px -right-px h-2 w-2 border-t-2 border-r-2 border-slate-900" />
                <span className="pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-b-2 border-l-2 border-slate-900" />
                <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b-2 border-r-2 border-slate-900" />
                <Download className="h-4 w-4" />
                <span>Download CV</span>
              </motion.a>

              <button
                type="button"
                onClick={() => scrollToTarget("founder")}
                className="group inline-flex items-center gap-1.5 px-2 py-2 font-mono text-xs font-semibold tracking-wider text-amber-600 transition-colors hover:text-amber-500"
              >
                <span>Work with UltraKerb</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Crisp System Architecture Telemetry Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55 }}
            className="relative lg:col-span-5"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-10 flex items-center justify-center"
            >
              <svg
                className="animate-spin-slow h-[115%] w-[115%] text-sky-500/25"
                viewBox="0 0 360 360"
                fill="none"
              >
                <circle
                  cx="180"
                  cy="180"
                  r="164"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="24 12 6 12"
                />
                <circle
                  cx="180"
                  cy="180"
                  r="142"
                  stroke="#0F172A"
                  strokeOpacity="0.14"
                  strokeWidth="1"
                  strokeDasharray="6 14"
                />
              </svg>
              <svg
                className="animate-spin-slow-reverse absolute h-[92%] w-[92%] text-cyan-600/25"
                viewBox="0 0 300 300"
                fill="none"
              >
                <circle
                  cx="150"
                  cy="150"
                  r="134"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="40 20 8 20"
                />
              </svg>
            </div>

            <TacticalCard
              variant="light"
              chamfer="md"
              className="relative z-10 border-slate-300 bg-white/95 p-6 shadow-xl backdrop-blur-xl sm:p-7"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                    J.A.R.V.I.S. HUD // NODE TOPOLOGY
                  </div>
                  <div className="mt-0.5 font-display text-sm font-bold text-slate-900">
                    System Architecture Matrix
                  </div>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-700">
                  5 NODES NOMINAL
                </span>
              </div>

              <div className="mt-5 space-y-2.5">
                {STACK_NODES.map((node, index) => {
                  const isActive = node.id === activeNode.id;
                  return (
                    <motion.button
                      key={node.id}
                      type="button"
                      onMouseEnter={() => setActiveNodeId(node.id)}
                      onFocus={() => setActiveNodeId(node.id)}
                      onClick={() => setActiveNodeId(node.id)}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 450, damping: 28 }}
                      className={`flex w-full items-center justify-between border px-3.5 py-2.5 text-left transition-colors ${
                        isActive
                          ? "border-slate-900 bg-slate-950 text-white"
                          : "border-slate-200/90 bg-slate-50/95 text-slate-800 hover:border-slate-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-slate-400">
                          0{index + 1}
                        </span>
                        <div>
                          <div className="font-display text-sm font-semibold">
                            {node.label}
                          </div>
                          <div
                            className={`font-mono text-[10px] tracking-wider ${
                              isActive ? "text-slate-300" : "text-slate-500"
                            }`}
                          >
                            {node.layer}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`font-mono text-[10px] tracking-widest ${
                          isActive ? "text-emerald-400" : "text-slate-500"
                        }`}
                      >
                        [{node.status}]
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                  <span>INSPECTING: {activeNode.label}</span>
                  <span>PROTOCOL: HTTPS / TLS 1.3</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-700">
                  {activeNode.detail}
                </p>
              </div>
            </TacticalCard>
          </motion.div>
        </div>
      </div>

      {/* Client Credibility Strip inside Light Hero Canvas */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-8 sm:px-10 sm:pb-10">
        <div className="grid grid-cols-1 gap-2 rounded-lg border border-slate-300/70 bg-slate-900/[0.04] px-4 py-2.5 text-slate-800 backdrop-blur-sm sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6">
          <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-slate-600 uppercase">
            PRODUCTION SYSTEMS DEPLOYED FOR:
          </span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-900 sm:gap-x-4 sm:text-sm">
            {TRUSTED_CLIENTS.map((client, idx) => (
              <span key={client} className="inline-flex items-center gap-3 sm:gap-4">
                <span className="tracking-tight">{client}</span>
                {idx < TRUSTED_CLIENTS.length - 1 && (
                  <span className="text-slate-400" aria-hidden="true">
                    •
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
