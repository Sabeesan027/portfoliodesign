"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Layers, Radio } from "lucide-react";
import { PROJECTS, type ProjectSpec } from "@/data/portfolio";
import { ProjectDrawer } from "@/components/ui/ProjectDrawer";
import {
  ConstructionQrPreview,
  GpsKalmanPreview,
  PosReceiptPreview,
} from "@/components/ui/ProjectPreviews";

const RAIL_OFFSETS = [
  { x: -60, y: 0 },
  { x: 60, y: 0 },
  { x: 0, y: 50 },
];

const PROJECT_OUTCOMES: Record<
  string,
  { outcome: string; pills: string[]; preview: React.ReactNode }
> = {
  salesphere: {
    outcome:
      "High-speed retail billing & synchronized inventory platform with 80mm thermal ESC/POS printing.",
    pills: ["Real-Time Sync", "80mm ESC/POS", "RBAC Hardened"],
    preview: <PosReceiptPreview />,
  },
  "construction-tracker": {
    outcome:
      "Multi-site asset & material tracking platform eliminating manual reconciliation errors across construction sites.",
    pills: ["End-to-End TypeScript", "Multi-Site Stock", "QR Audit Trail"],
    preview: <ConstructionQrPreview />,
  },
  "gps-routing-engine": {
    outcome:
      "Consolidated React Native location-tracking engine with Kalman-filter smoothing and cost-optimized routing APIs.",
    pills: ["Kalman-Filter GPS", "36 Unit Tests", "<10k API Calls/Mo"],
    preview: <GpsKalmanPreview />,
  },
};

export function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectSpec | null>(
    null
  );

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".proj-rail-card", { x: 0, y: 0, opacity: 1 });
        gsap.set(".proj-guide-h", { scaleX: 1, opacity: 0.2 });
        gsap.set(".proj-guide-v", { scaleY: 1, opacity: 0.2 });
        gsap.set(".proj-lock-tick", { opacity: 1 });
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>(".proj-rail-card");

      cards.forEach((card, idx) => {
        const offset = RAIL_OFFSETS[idx] ?? { x: 0, y: 50 };
        gsap.set(card, { x: offset.x, y: offset.y, opacity: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none reset",
        },
      });

      tl.fromTo(
        ".proj-guide-h",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 0.85,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
        },
        0
      ).fromTo(
        ".proj-guide-v",
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 0.85,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.05
      );

      cards.forEach((card, idx) => {
        const startAt = 0.2 + idx * 0.16;
        const borderFlash = card.querySelector<HTMLElement>(".proj-border-flash");
        const lockTick = card.querySelector<HTMLElement>(".proj-lock-tick");

        tl.to(
          card,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.72,
            ease: "power3.out",
          },
          startAt
        )
          .fromTo(
            borderFlash,
            { opacity: 0 },
            { opacity: 1, duration: 0.14, ease: "power2.out" },
            startAt + 0.56
          )
          .to(
            borderFlash,
            { opacity: 0, duration: 0.45, ease: "power2.inOut" },
            startAt + 0.7
          )
          .fromTo(
            lockTick,
            { opacity: 0, x: 8 },
            { opacity: 1, x: 0, duration: 0.22, ease: "power2.out" },
            startAt + 0.58
          );
      });

      tl.to(
        ".proj-guide-h, .proj-guide-v",
        { opacity: 0.14, duration: 0.55, ease: "power2.out" },
        1.15
      );

      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-[#0E1116] bg-grid-dark py-20 text-slate-100 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-slate-800/90 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-slate-400 uppercase">
              <Layers className="h-3.5 w-3.5 text-[#00F0FF]" />
              <span>01.WORK // PRECISION MECHANICAL ALIGNMENT</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Production Deployments
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs leading-relaxed text-slate-400">
            Interactive system previews paired with scannable production specs.
            Select any deployment to open the deep architecture drawer.
          </p>
        </div>

        {/* Asymmetrical Alternating 12-Column Split Showcases */}
        <div className="mt-12 space-y-8">
          {PROJECTS.map((project, index) => {
            const spec = PROJECT_OUTCOMES[project.id];
            const reverseDesktop = index % 2 === 1;

            return (
              <div
                key={project.id}
                className="proj-rail-card relative will-change-transform"
              >
                {/* 1px Architectural Laser Alignment Guide Rails */}
                <div
                  aria-hidden="true"
                  className="proj-guide-h pointer-events-none absolute -inset-x-4 top-0 h-px origin-left bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-0"
                />
                <div
                  aria-hidden="true"
                  className="proj-guide-v pointer-events-none absolute -inset-y-4 left-0 w-px origin-top bg-gradient-to-b from-transparent via-[#00F0FF] to-transparent opacity-0"
                />

                <div
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  className="group relative grid cursor-pointer grid-cols-1 items-stretch gap-6 border border-slate-800 bg-[#10141B]/95 p-4 hover:border-[#00F0FF]/60 sm:p-7 lg:grid-cols-12 lg:gap-8 clip-chamfer-md"
                >
                  {/* Crisp #00F0FF Cyan Border Lock-On Flash */}
                  <div
                    aria-hidden="true"
                    className="proj-border-flash pointer-events-none absolute inset-0 border-2 border-[#00F0FF] opacity-0 shadow-[inset_0_0_26px_rgba(0,240,255,0.28)] clip-chamfer-md"
                  />

                  {/* Corner LOCKED // ALIGNED Telemetry Tick */}
                  <div className="proj-lock-tick pointer-events-none absolute right-5 bottom-3 z-20 hidden items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-[#00F0FF] opacity-0 sm:flex">
                    <span className="h-1.5 w-1.5 bg-[#00F0FF]" />
                    <span>LOCKED // ALIGNED</span>
                  </div>

                  {/* 7-Col Interactive Mini-UI Widget (Always below summary on < lg) */}
                  <div
                    className={`order-2 min-w-0 lg:col-span-7 ${
                      reverseDesktop ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {spec?.preview}
                  </div>

                  {/* 5-Col Scannable Engineering Summary + 3 Metric Pills (Always on top on < lg) */}
                  <div
                    className={`order-1 flex min-w-0 flex-col justify-between py-1 lg:col-span-5 ${
                      reverseDesktop ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[10px] tracking-widest text-slate-400">
                          {project.code}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 border px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-widest ${
                            project.live
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                              : "border-sky-500/40 bg-sky-500/10 text-sky-400"
                          }`}
                        >
                          <Radio className="h-3 w-3" />
                          {project.status}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white group-hover:text-[#00F0FF] sm:text-3xl">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-base font-medium leading-relaxed text-slate-300">
                        {spec?.outcome ?? project.summary}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {(spec?.pills ?? []).map((pill) => (
                          <span
                            key={pill}
                            className="border border-cyan-400/35 bg-cyan-400/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-wide text-cyan-200"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/90 pt-4 pb-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="border border-slate-800 bg-slate-900/80 px-2 py-0.5 font-mono text-[10px] text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold tracking-widest text-slate-200 group-hover:text-[#00F0FF]">
                        <span>FULL ARCHITECTURE</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
