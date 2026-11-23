"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  Database,
  Globe,
  Lock,
  Play,
  ShieldAlert,
  ShieldCheck,
  Terminal,
} from "lucide-react";

export type SimMode = "unprotected" | "protected";

interface BolaSimulatorProps {
  onModeChange?: (mode: SimMode) => void;
}

const LEAKED_PAYLOAD = `{
  "status": 200,
  "order_id": 8492,
  "owner_account": "usr_7719_enterprise",
  "customer_name": "AST Constructions Pvt Ltd",
  "billing_total_lkr": 1845000.00,
  "invoice_token": "inv_live_9f8a2c7e1b...",
  "warning": "REQUESTER usr_1042 != OWNER usr_7719"
}`;

const BLOCKED_PAYLOAD = `{
  "status": 403,
  "error": "BOLA_POLICY_VIOLATION",
  "message": "Context-aware ownership verification failed.",
  "evaluated_claims": {
    "actor_id": "usr_1042",
    "resource_owner": "usr_7719",
    "tenant_scope": "MISMATCH"
  },
  "telemetry": "1.4ms overhead // 0 leaks",
  "action": "REQUEST_INTERCEPTED_AND_LOGGED"
}`;

export function BolaSimulator({ onModeChange }: BolaSimulatorProps) {
  const [mode, setMode] = useState<SimMode>("unprotected");
  const [replayTick, setReplayTick] = useState(0);

  const isProtected = mode === "protected";

  const handleToggle = (nextMode: SimMode) => {
    setMode(nextMode);
    setReplayTick((prev) => prev + 1);
    onModeChange?.(nextMode);
  };

  return (
    <div className="relative overflow-hidden border border-slate-700/90 bg-black/75 p-4 backdrop-blur-xl sm:p-6 clip-chamfer-md">
      {/* Subtle top energy line */}
      <div
        className={`absolute inset-x-0 top-0 h-[2px] transition-colors duration-300 ${
          isProtected
            ? "bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"
            : "bg-gradient-to-r from-transparent via-[#FF003C] to-transparent"
        }`}
      />

      {/* J.A.R.V.I.S. / Delta Force Console Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <Terminal
            className={`h-4 w-4 ${
              isProtected ? "text-[#00F0FF]" : "text-[#FF003C]"
            }`}
          />
          <span className="font-mono text-xs tracking-widest text-slate-200 uppercase">
            TACTICAL THREAT CONSOLE // OWASP API1:2023
          </span>
        </div>

        <button
          type="button"
          onClick={() => setReplayTick((prev) => prev + 1)}
          className="inline-flex items-center gap-1.5 border border-slate-700/90 bg-slate-900/90 px-2.5 py-1 font-mono text-[11px] tracking-wider text-slate-300 transition-colors hover:border-[#00F0FF]/60 hover:text-white"
        >
          <Play className="h-3 w-3" />
          REPLAY PACKET
        </button>
      </div>

      {/* Mode Switcher */}
      <div
        role="tablist"
        aria-label="API Protection Mode"
        className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2"
      >
        <button
          type="button"
          role="tab"
          aria-selected={!isProtected}
          onClick={() => handleToggle("unprotected")}
          className={`relative flex items-center justify-center gap-2 border px-3 py-2.5 font-mono text-xs font-semibold tracking-wider transition-colors ${
            !isProtected
              ? "border-[#FF003C]/85 text-white"
              : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
          }`}
        >
          {!isProtected && (
            <motion.span
              layoutId="bola-mode-pill"
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="absolute inset-0 bg-[#FF003C]/18"
            />
          )}
          <ShieldAlert className="relative z-10 h-4 w-4 text-[#FF003C]" />
          <span className="relative z-10">[UNPROTECTED ENDPOINT]</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={isProtected}
          onClick={() => handleToggle("protected")}
          className={`relative flex items-center justify-center gap-2 border px-3 py-2.5 font-mono text-xs font-semibold tracking-wider transition-colors ${
            isProtected
              ? "border-[#00F0FF]/85 text-white"
              : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
          }`}
        >
          {isProtected && (
            <motion.span
              layoutId="bola-mode-pill"
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="absolute inset-0 bg-[#00F0FF]/15"
            />
          )}
          <ShieldCheck className="relative z-10 h-4 w-4 text-[#00F0FF]" />
          <span className="relative z-10">[CONTEXT-AWARE MIDDLEWARE ACTIVE]</span>
        </button>
      </div>

      {/* 3-Step Live Packet Trace SVG Circuit Visualization */}
      <div className="mt-4 border border-slate-800/90 bg-black/80 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-widest">
          <span className="text-slate-400">
            LIVE PACKET TRACE //{" "}
            <span className="text-slate-200">GET /api/v1/orders/8492</span>
          </span>
          <span
            className={
              isProtected
                ? "text-[#00F0FF] font-semibold"
                : "text-[#FF003C] font-semibold"
            }
          >
            {isProtected
              ? "1.4ms OVERHEAD // 0 LEAKS"
              : "BREACH VECTOR // VAULT EXPOSED"}
          </span>
        </div>

        <div className="relative grid grid-cols-1 items-center gap-2.5 sm:grid-cols-3 sm:gap-4">
          <svg
            aria-hidden="true"
            viewBox="0 0 600 40"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-8 w-full -translate-y-1/2 sm:block"
          >
            <line
              x1="90"
              y1="20"
              x2="290"
              y2="20"
              stroke={isProtected ? "rgba(0,240,255,0.38)" : "rgba(255,0,60,0.4)"}
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <line
              x1="310"
              y1="20"
              x2="510"
              y2="20"
              stroke={isProtected ? "rgba(51,65,85,0.45)" : "rgba(255,0,60,0.5)"}
              strokeWidth="2"
              strokeDasharray="6 4"
            />

            <motion.circle
              key={`p1-${mode}-${replayTick}`}
              r="5"
              cy="20"
              fill={isProtected ? "#00F0FF" : "#FF003C"}
              initial={{ cx: 95, opacity: 1 }}
              animate={{ cx: 292, opacity: [0.3, 1, 1, 0.2] }}
              transition={{
                duration: 1.05,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {!isProtected ? (
              <motion.circle
                key={`p2-${mode}-${replayTick}`}
                r="5"
                cy="20"
                fill="#FF003C"
                initial={{ cx: 312, opacity: 0 }}
                animate={{ cx: 505, opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.05,
                  delay: 0.48,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ) : (
              <motion.circle
                key={`shield-${replayTick}`}
                cx="300"
                cy="20"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="2.5"
                initial={{ r: 6, opacity: 0.95 }}
                animate={{ r: 18, opacity: 0 }}
                transition={{
                  duration: 1.05,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            )}
          </svg>

          <div className="relative z-10 flex flex-col items-center border border-slate-700/90 bg-[#0B1018] px-2 py-2.5 text-center clip-chamfer-sm">
            <Globe className="h-4 w-4 text-amber-400" />
            <div className="mt-1 font-mono text-[9px] font-bold tracking-wider text-slate-200 sm:text-[10px]">
              [CLIENT REQUEST]
            </div>
            <div className="mt-0.5 font-mono text-[9px] text-slate-400">
              usr_1042 → #8492
            </div>
          </div>

          <div
            className={`relative z-10 flex flex-col items-center border px-2 py-2.5 text-center transition-all clip-chamfer-sm ${
              isProtected
                ? "border-[#00F0FF] bg-[#041720] shadow-[0_0_24px_-4px_rgba(0,240,255,0.75)]"
                : "border-slate-700/70 bg-[#12090C] opacity-75"
            }`}
          >
            {isProtected ? (
              <ShieldCheck className="h-4 w-4 text-[#00F0FF]" />
            ) : (
              <ShieldAlert className="h-4 w-4 text-[#FF003C]" />
            )}
            <div className="mt-1 font-mono text-[9px] font-bold tracking-wider text-white sm:text-[10px]">
              [BOLA CONTEXT GUARD]
            </div>
            <div
              className={`mt-0.5 font-mono text-[9px] font-semibold ${
                isProtected ? "text-[#00F0FF]" : "text-[#FF003C]"
              }`}
            >
              {isProtected ? "DEFLECTED // 403" : "BYPASSED"}
            </div>
          </div>

          <div
            className={`relative z-10 flex flex-col items-center border px-2 py-2.5 text-center transition-all clip-chamfer-sm ${
              isProtected
                ? "border-emerald-500/45 bg-[#071412]"
                : "border-[#FF003C] bg-[#1E060B] shadow-[0_0_22px_-4px_rgba(255,0,60,0.7)]"
            }`}
          >
            <Database
              className={`h-4 w-4 ${
                isProtected ? "text-emerald-400" : "text-[#FF003C]"
              }`}
            />
            <div className="mt-1 font-mono text-[9px] font-bold tracking-wider text-slate-100 sm:text-[10px]">
              [POSTGRESQL VAULT]
            </div>
            <div
              className={`mt-0.5 font-mono text-[9px] font-semibold ${
                isProtected ? "text-emerald-400" : "text-[#FF003C]"
              }`}
            >
              {isProtected ? "SEALED // 0 LEAKS" : "RECORD LEAKED"}
            </div>
          </div>
        </div>
      </div>

      {/* Response Status & Payload */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${mode}-${replayTick}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className={`mt-4 border p-3.5 ${
            isProtected
              ? "border-[#00F0FF]/50 bg-[#00F0FF]/[0.06]"
              : "border-[#FF003C]/55 bg-[#FF003C]/[0.08]"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider">
              {isProtected ? (
                <>
                  <Lock className="h-4 w-4 text-[#00F0FF]" />
                  <span className="text-[#00F0FF] neon-text-cyan">
                    403 FORBIDDEN — BOLA BLOCKED
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 text-[#FF003C]" />
                  <span className="text-[#FF003C] neon-text-crimson">
                    200 OK — UNAUTHORIZED DATA LEAKED
                  </span>
                </>
              )}
            </div>
            <span className="font-mono text-[10px] text-slate-300">
              {isProtected
                ? "1.4ms OVERHEAD // 0 LEAKS"
                : "SEVERITY: CRITICAL (CVSS 8.6)"}
            </span>
          </div>

          <pre className="max-w-full overflow-x-auto border-t border-white/10 pt-2.5 font-mono text-xs leading-relaxed text-slate-200">
            <code>{isProtected ? BLOCKED_PAYLOAD : LEAKED_PAYLOAD}</code>
          </pre>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
