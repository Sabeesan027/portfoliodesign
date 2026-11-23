"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Navigation,
  Printer,
  QrCode,
  Radio,
  RefreshCw,
} from "lucide-react";

/* ============================================================================
   1. SALESPHERE POS — LIVE CHECKOUT & THERMAL RECEIPT PREVIEW
   ============================================================================ */
export function PosReceiptPreview() {
  const [printing, setPrinting] = useState(false);
  const [stockRemaining, setStockRemaining] = useState(48);
  const [justDeducted, setJustDeducted] = useState(false);

  const triggerTestPrint = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (printing) return;
    setPrinting(true);
    setJustDeducted(true);
    setStockRemaining((prev) => Math.max(1, prev - 1));
    window.setTimeout(() => {
      setPrinting(false);
    }, 950);
    window.setTimeout(() => {
      setJustDeducted(false);
    }, 1800);
  };

  return (
    <div className="relative flex h-full flex-col justify-between border border-slate-700/80 bg-[#090C11] p-4 font-mono text-xs sm:p-5 clip-chamfer-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-[#00F0FF]">
          <Printer className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold tracking-widest">
            SALESPHERE // TERMINAL #04
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          READY // 80MM
        </span>
      </div>

      <div className="my-4 space-y-2 border border-slate-800/90 bg-black/60 p-3 text-[11px]">
        <div className="flex justify-between text-slate-400">
          <span>ITEM</span>
          <span>QTY × LKR</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-slate-200">
          <span className="truncate">Industrial Breaker 32A</span>
          <span className="shrink-0">2 × 4,850.00</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-slate-200">
          <span className="truncate">Copper Cable Roll (50m)</span>
          <span className="shrink-0">1 × 18,400.00</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-slate-200">
          <span className="truncate">PVC Conduit Coupling</span>
          <span className="shrink-0">12 × 180.00</span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-dashed border-slate-700 pt-2 text-slate-400">
          <span>LIVE STOCK LEDGER</span>
          <span className="flex items-center gap-1.5 text-slate-200">
            <span>{stockRemaining} Units</span>
            {justDeducted && (
              <span className="bg-[#FF4D00]/25 px-1.5 py-0.5 text-[9px] font-bold text-[#FFB800]">
                -1 Unit
              </span>
            )}
          </span>
        </div>
        <div className="flex justify-between text-sm font-bold text-white">
          <span>TOTAL SYNCED</span>
          <span className="text-[#00F0FF]">LKR 30,260.00</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[10px] text-slate-400">
          ESC/POS: <span className="text-emerald-400">ATOMIC COMMIT</span>
        </div>
        <button
          type="button"
          onClick={triggerTestPrint}
          className="inline-flex items-center gap-1.5 border border-[#00F0FF]/60 bg-[#00F0FF]/12 px-3 py-1.5 text-[10px] font-bold tracking-widest text-[#00F0FF] transition-colors hover:bg-[#00F0FF]/25"
        >
          <Printer className={`h-3 w-3 ${printing ? "animate-bounce" : ""}`} />
          <span>{printing ? "PRINTING 80MM..." : "Print Test Receipt"}</span>
        </button>
      </div>
    </div>
  );
}

/* ============================================================================
   2. CONSTRUCTION INVENTORY — QR ASSET VERIFICATION & SITE STOCK BARS
   ============================================================================ */
const SITE_ASSETS = [
  {
    tag: "QR-AST-0194",
    name: "Hilti Rotary Hammer TE-70",
    site: "Site A — Jaffna Depot",
    levelPct: 92,
    stock: "11 / 12",
  },
  {
    tag: "QR-AST-0428",
    name: "Makita Cut-Off Saw 355mm",
    site: "Site B — Kilinochchi",
    levelPct: 68,
    stock: "4 / 6",
  },
  {
    tag: "QR-AST-0712",
    name: "Laser Level Tripod Kit",
    site: "Site C — Highway Sector",
    levelPct: 45,
    stock: "2 / 4",
  },
];

export function ConstructionQrPreview() {
  const [scannedIndex, setScannedIndex] = useState(0);

  const cycleScan = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScannedIndex((prev) => (prev + 1) % SITE_ASSETS.length);
  };

  return (
    <div className="relative flex h-full flex-col justify-between border border-slate-700/80 bg-[#090C11] p-4 font-mono text-xs sm:p-5 clip-chamfer-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-[#FF9500]">
          <QrCode className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold tracking-widest">
            MULTI-SITE QR ASSET MATRIX
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400">
          <RefreshCw
            className="h-3 w-3 animate-spin"
            style={{ animationDuration: "5s" }}
          />
          LIVE SYNC ACTIVE
        </span>
      </div>

      <div className="my-4 space-y-2.5">
        {SITE_ASSETS.map((asset, idx) => {
          const isSelected = idx === scannedIndex;
          return (
            <div
              key={asset.tag}
              className={`border px-3 py-2.5 transition-colors ${
                isSelected
                  ? "border-[#FF9500]/75 bg-[#FF4D00]/10"
                  : "border-slate-800/90 bg-black/55"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#FFB800]">
                      {asset.tag}
                    </span>
                    <span className="truncate text-[11px] font-semibold text-white">
                      {asset.name}
                    </span>
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-400">
                    {asset.site}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-[10px] font-bold text-slate-200">
                    {asset.stock}
                  </div>
                  <div className="mt-0.5 flex items-center justify-end gap-1 text-[9px] text-emerald-400">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    <span>{isSelected ? "QR VERIFIED" : "SYNCED"}</span>
                  </div>
                </div>
              </div>

              {/* Real-time site inventory bar */}
              <div className="mt-2 h-1.5 w-full overflow-hidden bg-slate-800">
                <div
                  className={`h-full transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#FF4D00] to-[#FFB800]"
                      : "bg-emerald-500/80"
                  }`}
                  style={{ width: `${asset.levelPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-[10px] text-slate-400">
          AUDIT: <span className="text-slate-200">TYPE-SAFE LEDGER</span>
        </span>
        <button
          type="button"
          onClick={cycleScan}
          className="inline-flex items-center gap-1.5 border border-[#FF9500]/65 bg-[#FF4D00]/15 px-3 py-1.5 text-[10px] font-bold tracking-widest text-[#FFB800] transition-colors hover:bg-[#FF4D00]/25"
        >
          <QrCode className="h-3 w-3" />
          <span>Simulate QR Scan</span>
        </button>
      </div>
    </div>
  );
}

/* ============================================================================
   3. MOBILE GPS & ROUTING — SVG ROUTE TRAJECTORY VISUALIZER
   ============================================================================ */
const RAW_GPS_POINTS = [
  { x: 32, y: 124 },
  { x: 74, y: 92 },
  { x: 112, y: 132 },
  { x: 158, y: 74 },
  { x: 204, y: 112 },
  { x: 256, y: 58 },
  { x: 304, y: 94 },
  { x: 356, y: 42 },
  { x: 404, y: 66 },
  { x: 448, y: 34 },
];

export function GpsKalmanPreview() {
  const [viewMode, setViewMode] = useState<"kalman" | "raw">("kalman");

  return (
    <div className="relative flex h-full flex-col justify-between border border-slate-700/80 bg-[#090C11] p-4 font-mono text-xs sm:p-5 clip-chamfer-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-sky-400">
          <Navigation className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold tracking-widest">
            ROUTE TRAJECTORY VISUALIZER
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setViewMode("raw");
            }}
            className={`border px-2 py-1 text-[9px] font-semibold tracking-wider transition-colors ${
              viewMode === "raw"
                ? "border-[#FF003C] bg-[#FF003C]/20 text-[#FF003C]"
                : "border-slate-700 bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            Raw Noisy GPS
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setViewMode("kalman");
            }}
            className={`border px-2 py-1 text-[9px] font-semibold tracking-wider transition-colors ${
              viewMode === "kalman"
                ? "border-[#00F0FF] bg-[#00F0FF]/18 text-[#00F0FF]"
                : "border-slate-700 bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            Kalman-Filtered Path
          </button>
        </div>
      </div>

      <div className="relative my-3 overflow-hidden border border-slate-800/90 bg-black/70 p-2">
        <svg viewBox="0 0 480 160" className="h-36 w-full sm:h-40" fill="none">
          <path
            d="M0 40H480M0 80H480M0 120H480M120 0V160M240 0V160M360 0V160"
            stroke="rgba(148,163,184,0.12)"
            strokeWidth="1"
          />

          {/* Road polyline base */}
          <path
            d="M28 122 C110 110, 175 94, 248 76 C320 58, 385 48, 452 34"
            stroke="rgba(56,189,248,0.2)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Noisy Raw GPS Scatter */}
          <g opacity={viewMode === "raw" ? 1 : 0.35}>
            <polyline
              points={RAW_GPS_POINTS.map((p) => `${p.x},${p.y}`).join(" ")}
              stroke="#FF003C"
              strokeWidth={viewMode === "raw" ? "2" : "1.2"}
              strokeDasharray="4 4"
            />
            {RAW_GPS_POINTS.map((p, idx) => (
              <circle key={idx} cx={p.x} cy={p.y} r="3.4" fill="#FF003C" />
            ))}
          </g>

          {/* Smoothed Kalman-Filtered Snapped Route */}
          {viewMode === "kalman" && (
            <motion.path
              d="M28 122 C110 110, 175 94, 248 76 C320 58, 385 48, 452 34"
              stroke="#00F0FF"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0.15 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          <circle cx="28" cy="122" r="5" fill="#00F0FF" />
          <circle cx="452" cy="34" r="5" fill="#10B981" />
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px]">
        <span className="text-slate-300">
          MODE:{" "}
          <span
            className={
              viewMode === "kalman" ? "text-[#00F0FF]" : "text-[#FF003C]"
            }
          >
            {viewMode === "kalman"
              ? "KALMAN SMOOTHED // SNAPPED"
              : "RAW UNFILTERED // HIGH JITTER"}
          </span>
        </span>
        <span className="inline-flex items-center gap-1 text-emerald-400">
          <Radio className="h-3 w-3" />
          3 WATCHERS → 1 UNIFIED
        </span>
      </div>
    </div>
  );
}
