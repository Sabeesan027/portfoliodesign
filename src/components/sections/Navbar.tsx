"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

type ThemePhase = "hero" | "engineer" | "igniting" | "cyber";

const NAV_LINKS = [
  { label: "01.WORK", href: "#work" },
  { label: "02.EXP", href: "#experience" },
  { label: "03.FOUNDER", href: "#founder" },
  { label: "04.CYBER", href: "#cyber" },
  { label: "05.COMMS", href: "#comms" },
];

export function Navbar() {
  const lenis = useLenis();
  const [phase, setPhase] = useState<ThemePhase>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const computePhase = () => {
      const workEl = document.getElementById("work");
      const founderEl = document.getElementById("founder");
      const cyberEl = document.getElementById("cyber");

      const y = window.scrollY + window.innerHeight * 0.35;

      if (cyberEl && y >= cyberEl.offsetTop) {
        setPhase("cyber");
      } else if (founderEl && y >= founderEl.offsetTop) {
        setPhase("igniting");
      } else if (workEl && y >= workEl.offsetTop) {
        setPhase("engineer");
      } else {
        setPhase("hero");
      }
    };

    computePhase();
    window.addEventListener("scroll", computePhase, { passive: true });
    window.addEventListener("resize", computePhase);
    return () => {
      window.removeEventListener("scroll", computePhase);
      window.removeEventListener("resize", computePhase);
    };
  }, []);

  const handleJump = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, { offset: -16, duration: 1.25 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isLight = phase === "hero";

  const pillChrome =
    phase === "hero"
      ? "border-slate-300/80 bg-white/80 text-slate-900 shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
      : phase === "engineer"
        ? "border-slate-700/80 bg-[#0E1116]/80 text-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
        : phase === "igniting"
          ? "border-[#FF4D00]/55 bg-[#120A07]/85 text-amber-50 shadow-[0_0_28px_-4px_rgba(255,77,0,0.45)]"
          : "border-[#00F0FF]/40 bg-[#05080D]/85 text-slate-100 shadow-[0_0_26px_-6px_rgba(0,240,255,0.4)]";

  const badgeConfig =
    phase === "igniting"
      ? {
          text: "IGNITING...",
          dot: "bg-[#FF4D00] shadow-[0_0_10px_#FF4D00]",
          classes:
            "border-[#FF4D00]/60 bg-[#FF4D00]/15 text-[#FFB800]",
        }
      : phase === "cyber"
        ? {
            text: "MODE: FOUNDER // CYBER",
            dot: "bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]",
            classes:
              "border-[#00F0FF]/50 bg-[#00F0FF]/12 text-[#00F0FF]",
          }
        : isLight
          ? {
              text: "MODE: ENGINEER",
              dot: "bg-emerald-500",
              classes:
                "border-slate-300 bg-slate-100/90 text-slate-800",
            }
          : {
              text: "MODE: ENGINEER",
              dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]",
              classes:
                "border-slate-700 bg-slate-900/90 text-slate-200",
            };

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-3 sm:px-6 pointer-events-none">
      <div className="w-full max-w-5xl pointer-events-auto">
        <nav
          aria-label="Primary navigation"
          className={`flex items-center justify-between gap-3 rounded-full border px-4 py-2.5 backdrop-blur-md transition-all duration-300 sm:px-5 ${pillChrome}`}
        >
          {/* Left: Monogram */}
          <button
            type="button"
            onClick={() => {
              if (lenis) {
                lenis.scrollTo(0, { duration: 1.2 });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2 font-display text-sm font-bold tracking-wider uppercase"
          >
            <span
              className={`inline-flex h-5 w-5 items-center justify-center border font-mono text-[10px] ${
                phase === "igniting"
                  ? "border-[#FF4D00] text-[#FFB800]"
                  : phase === "cyber"
                    ? "border-[#00F0FF] text-[#00F0FF]"
                    : isLight
                      ? "border-slate-900 text-slate-900"
                      : "border-slate-500 text-slate-100"
              }`}
            >
              +
            </span>
            <span>G. SABEESAN</span>
          </button>

          {/* Center: Section Jump Links */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleJump(link.href)}
                className={`rounded-full px-3 py-1 font-mono text-[11px] font-medium tracking-wider transition-colors ${
                  isLight
                    ? "text-slate-600 hover:bg-slate-900/8 hover:text-slate-950"
                    : phase === "igniting"
                      ? "text-amber-100/75 hover:bg-[#FF4D00]/20 hover:text-white"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Live Theme State Indicator Badge + Mobile toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className={`flex items-center gap-1.5 rounded-full border px-2 py-1 font-mono text-[9px] font-semibold tracking-wider transition-all duration-300 sm:gap-2 sm:px-3 sm:text-[10px] sm:tracking-widest ${badgeConfig.classes}`}
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full animate-pulse ${badgeConfig.dot}`}
              />
              <span className="max-w-[115px] truncate whitespace-nowrap sm:max-w-none">
                {badgeConfig.text}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border md:hidden ${
                isLight
                  ? "border-slate-300 text-slate-900"
                  : "border-slate-700 text-slate-200"
              }`}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className={`mt-2 rounded-2xl border p-3 backdrop-blur-md md:hidden ${pillChrome}`}
            >
              <div className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleJump(link.href)}
                    className={`rounded-lg border px-3 py-2 text-left font-mono text-xs tracking-wider ${
                      isLight
                        ? "border-slate-200 bg-white/70 text-slate-800"
                        : "border-slate-800 bg-black/40 text-slate-200"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
