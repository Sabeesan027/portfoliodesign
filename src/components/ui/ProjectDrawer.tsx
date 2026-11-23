"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { CheckCircle2, Cpu, Layers, X } from "lucide-react";
import type { ProjectSpec } from "@/data/portfolio";

interface ProjectDrawerProps {
  project: ProjectSpec | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!project) return;

    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      lenis?.start();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose, lenis]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-project-title"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close project specification drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Slide-over Tactical Spec Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-slate-700/80 bg-[#0B0E14] p-6 text-slate-100 shadow-2xl sm:p-8"
          >
            {/* Top HUD Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-slate-400">
                  <span>{project.code}</span>
                  <span>//</span>
                  <span
                    className={
                      project.live ? "text-emerald-400" : "text-sky-400"
                    }
                  >
                    {project.status}
                  </span>
                </div>
                <h3
                  id="drawer-project-title"
                  className="mt-2 font-display text-2xl font-bold tracking-tight text-white"
                >
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{project.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-slate-700/90 bg-slate-900/90 text-slate-300 transition-colors hover:border-[#FF4D00]/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Summary */}
            <div className="mt-6">
              <div className="font-mono text-[11px] tracking-widest text-slate-400 uppercase">
                MISSION OVERVIEW
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {project.summary}
              </p>
            </div>

            {/* Engineering Telemetry Metrics */}
            <div className="mt-6">
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-slate-400 uppercase">
                <Cpu className="h-3.5 w-3.5 text-[#00F0FF]" />
                <span>ENGINEERING METRICS</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="border border-slate-800/90 bg-[#10151E] p-3 clip-chamfer-sm"
                  >
                    <div className="font-mono text-[10px] tracking-widest text-slate-400">
                      {metric.label}
                    </div>
                    <div className="mt-1 font-display text-lg font-bold text-white">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Breakdown */}
            <div className="mt-6">
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-slate-400 uppercase">
                <Layers className="h-3.5 w-3.5 text-[#FF7A00]" />
                <span>SYSTEM ARCHITECTURE BREAKDOWN</span>
              </div>
              <ul className="mt-3 space-y-3">
                {project.architecture.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 border border-slate-800/70 bg-slate-950/60 p-3 text-sm leading-relaxed text-slate-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00F0FF]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mt-6 border-t border-slate-800 pt-5">
              <div className="font-mono text-[11px] tracking-widest text-slate-400 uppercase">
                DEPLOYED STACK
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 font-mono text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
