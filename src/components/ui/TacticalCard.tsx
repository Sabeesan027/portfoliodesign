"use client";

import React from "react";

type TacticalVariant = "light" | "dark" | "metal" | "ember" | "cyber";

interface TacticalCardProps {
  children: React.ReactNode;
  variant?: TacticalVariant;
  chamfer?: "sm" | "md" | "lg" | "none";
  reticles?: boolean;
  className?: string;
  onClick?: () => void;
}

const VARIANT_CLASSES: Record<TacticalVariant, string> = {
  light:
    "bg-white/90 border border-slate-200/90 text-slate-900 shadow-[0_12px_36px_-18px_rgba(15,23,42,0.18)]",
  dark: "bg-[#12161D]/90 border border-slate-800/90 text-slate-100 hover:border-slate-600/80",
  metal:
    "bg-gradient-to-b from-[#13171E] to-[#0D1015] border border-[#232A35] text-slate-100 hover:border-slate-500/70",
  ember:
    "bg-[#0B0807]/92 border border-[#FF4D00]/40 text-slate-100 shadow-[0_0_32px_-12px_rgba(255,77,0,0.45)]",
  cyber:
    "bg-[#080B10]/90 border border-[#00F0FF]/25 text-slate-100 hover:border-[#00F0FF]/60 shadow-[0_0_28px_-14px_rgba(0,240,255,0.35)]",
};

const RETICLE_COLOR: Record<TacticalVariant, string> = {
  light: "text-slate-400",
  dark: "text-slate-500",
  metal: "text-slate-500",
  ember: "text-[#FF7A00]",
  cyber: "text-[#00F0FF]/70",
};

const CHAMFER_CLASS = {
  none: "",
  sm: "clip-chamfer-sm",
  md: "clip-chamfer-md",
  lg: "clip-chamfer-lg",
};

function CornerReticle({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      <path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function TacticalCard({
  children,
  variant = "dark",
  chamfer = "md",
  reticles = true,
  className = "",
  onClick,
}: TacticalCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative transition-colors duration-300 ${CHAMFER_CLASS[chamfer]} ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {reticles && (
        <>
          <CornerReticle
            className={`absolute top-2 left-2 ${RETICLE_COLOR[variant]}`}
          />
          <CornerReticle
            className={`absolute top-2 right-2 ${RETICLE_COLOR[variant]}`}
          />
          <CornerReticle
            className={`absolute bottom-2 left-2 ${RETICLE_COLOR[variant]}`}
          />
          <CornerReticle
            className={`absolute bottom-2 right-2 ${RETICLE_COLOR[variant]}`}
          />
        </>
      )}
      {children}
    </div>
  );
}
