"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import {
  Check,
  Copy,
  Crosshair,
  ExternalLink,
  MapPin,
  Radio,
  Send,
  ShieldCheck,
} from "lucide-react";
import { CONTACT_CHANNELS } from "@/data/portfolio";
import { TacticalCard } from "@/components/ui/TacticalCard";

const MISSION_TYPES = [
  "Full-Stack Engineering",
  "UltraKerb Client Project",
  "Security / Consulting",
] as const;

interface ReceiptState {
  transmissionId: string;
  timestamp: string;
  provider: string;
  note?: string;
}

export function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [missionType, setMissionType] = useState<string>(MISSION_TYPES[0]);
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<ReceiptState | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [reticleVisible, setReticleVisible] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const reticleX = useSpring(rawX, { stiffness: 180, damping: 24, mass: 0.4 });
  const reticleY = useSpring(rawY, { stiffness: 180, damping: 24, mass: 0.4 });

  useEffect(() => {
    const onSelectMission = (event: Event) => {
      const custom = event as CustomEvent<string>;
      if (custom.detail) {
        setMissionType(custom.detail);
      }
    };
    window.addEventListener("ultrakerb:select-mission", onSelectMission);
    return () => {
      window.removeEventListener("ultrakerb:select-mission", onSelectMission);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(event.clientX - rect.left);
    rawY.set(event.clientY - rect.top);
    if (!reticleVisible) setReticleVisible(true);
  };

  const handleCopy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 2200);
    } catch {
      // Clipboard API fallback ignored silently
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, missionType, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Transmission failed. Please verify inputs.");
        setSubmitting(false);
        return;
      }

      setReceipt({
        transmissionId: data.transmissionId,
        timestamp: data.timestamp,
        provider: data.provider,
        note: data.note,
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMsg("Network error while establishing encrypted uplink.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="comms"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setReticleVisible(false)}
      className="relative overflow-hidden border-t border-emerald-500/20 bg-[#06080C] py-24 text-slate-100 sm:py-32"
    >
      {/* Distinct Tactical Dark Radar Grid & Soft Emerald/Cyan Radial Spotlight (No Duplicate Image) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 68% 58% at 50% 42%, rgba(16, 185, 129, 0.11) 0%, rgba(0, 240, 255, 0.06) 38%, rgba(6, 8, 12, 0.96) 80%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radar-grid opacity-80"
      />

      {/* Concentric SVG Targeting Radar Rings */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 opacity-30"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle cx="400" cy="400" r="140" stroke="#10B981" strokeOpacity="0.35" strokeDasharray="6 8" />
        <circle cx="400" cy="400" r="245" stroke="#00F0FF" strokeOpacity="0.28" strokeDasharray="12 10" />
        <circle cx="400" cy="400" r="355" stroke="#10B981" strokeOpacity="0.2" />
        <line x1="400" y1="20" x2="400" y2="780" stroke="#00F0FF" strokeOpacity="0.14" />
        <line x1="20" y1="400" x2="780" y2="400" stroke="#00F0FF" strokeOpacity="0.14" />
      </svg>

      {/* Interactive Signal Lock-On Reticle tracking cursor subtly inside Comms */}
      <motion.div
        aria-hidden="true"
        style={{ x: reticleX, y: reticleY }}
        animate={{ opacity: reticleVisible ? 0.6 : 0 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute top-0 left-0 z-[5] hidden -translate-x-1/2 -translate-y-1/2 lg:block"
      >
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-emerald-400/50 shadow-[0_0_24px_rgba(16,185,129,0.28)]">
          <div className="h-14 w-14 rounded-full border border-dashed border-[#00F0FF]/65" />
          <Crosshair className="absolute h-4 w-4 text-emerald-400" />
          <span className="absolute -bottom-5 font-mono text-[9px] tracking-widest text-emerald-400/90">
            UPLINK_LOCK
          </span>
        </div>
      </motion.div>

      {/* Corner Targeting Brackets */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-6 left-6 h-8 w-8 border-t-2 border-l-2 border-emerald-400/45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-6 right-6 h-8 w-8 border-t-2 border-r-2 border-emerald-400/45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-[#00F0FF]/45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-[#00F0FF]/45"
      />

      {/* Floating Copy Toast Feedback */}
      <AnimatePresence>
        {copiedId && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 border border-emerald-400/70 bg-[#060C10]/95 px-4 py-2.5 font-mono text-xs text-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.35)]"
          >
            <Check className="h-4 w-4" />
            <span>CHANNEL COPIED TO CLIPBOARD</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-emerald-400 uppercase">
              <Radio className="h-3.5 w-3.5" />
              <span>05.COMMS // ENCRYPTED RADAR UPLINK</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Initiate Direct Transmission
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 border border-emerald-500/45 bg-emerald-500/10 px-3 py-1.5 font-mono text-[10px] font-semibold tracking-widest text-emerald-400 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR ENGINEERING &amp; VENTURE COLLABORATIONS</span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <TacticalCard
              variant="dark"
              chamfer="md"
              className="border-slate-800 bg-[#0A0E14]/88 p-6 backdrop-blur-xl"
            >
              <div className="font-mono text-[11px] tracking-widest text-slate-300 uppercase">
                DIRECT ENCRYPTED CHANNELS
              </div>

              <div className="mt-5 space-y-3">
                {CONTACT_CHANNELS.map((channel) => {
                  const isCopied = copiedId === channel.id;
                  return (
                    <div
                      key={channel.id}
                      className="flex items-center justify-between gap-3 border border-slate-800 bg-black/60 p-3.5 transition-colors hover:border-emerald-400/55"
                    >
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] tracking-widest text-slate-400">
                          {channel.label}
                        </div>
                        <a
                          href={channel.href}
                          target={channel.id === "email" ? undefined : "_blank"}
                          rel={
                            channel.id === "email"
                              ? undefined
                              : "noopener noreferrer"
                          }
                          className="mt-0.5 flex items-center gap-1.5 truncate font-mono text-xs text-slate-100 hover:text-emerald-400"
                        >
                          <span className="truncate">{channel.value}</span>
                          <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(channel.id, channel.copyValue)}
                        aria-label={`Copy ${channel.label}`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center border border-slate-700/80 bg-slate-900 text-slate-300 transition-colors hover:border-emerald-400 hover:text-emerald-400"
                      >
                        {isCopied ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-slate-800/90 pt-5 space-y-2.5 font-mono text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span>Location: Jaffna, Sri Lanka (UTC+05:30)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="h-4 w-4 text-[#00F0FF]" />
                  <span>Response SLA: &lt; 24 Hours // Direct Founder Review</span>
                </div>
              </div>
            </TacticalCard>
          </div>

          <div className="lg:col-span-7">
            <TacticalCard
              variant="dark"
              chamfer="lg"
              className="border-slate-800 bg-[#0A0E14]/88 p-6 backdrop-blur-xl sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 font-mono text-[11px] tracking-widest text-slate-300">
                <span>ENCRYPTED TRANSMISSION TERMINAL</span>
                <span className="text-emerald-400">TLS 1.3 // READY</span>
              </div>

              <AnimatePresence mode="wait">
                {receipt ? (
                  <motion.div
                    key="receipt"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 border border-emerald-400/50 bg-emerald-500/[0.07] p-6"
                  >
                    <div className="flex items-center gap-2 font-mono text-sm font-bold tracking-widest text-emerald-400">
                      <ShieldCheck className="h-5 w-5" />
                      <span>PAYLOAD TRANSMITTED // RECEIPT CONFIRMED</span>
                    </div>

                    <div className="mt-4 space-y-2 font-mono text-xs text-slate-200">
                      <div>
                        <span className="text-slate-400">PACKET ID:</span>{" "}
                        {receipt.transmissionId}
                      </div>
                      <div>
                        <span className="text-slate-400">TIMESTAMP:</span>{" "}
                        {receipt.timestamp}
                      </div>
                      <div>
                        <span className="text-slate-400">RELAY MODE:</span>{" "}
                        {receipt.provider.toUpperCase()}
                      </div>
                      {receipt.note && (
                        <p className="mt-3 border-t border-emerald-400/20 pt-3 text-[11px] text-slate-300">
                          {receipt.note}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setReceipt(null)}
                      className="mt-6 border border-emerald-400/60 bg-black/60 px-4 py-2 font-mono text-xs font-semibold tracking-widest text-emerald-400 transition-colors hover:bg-emerald-400/15"
                    >
                      SEND ANOTHER TRANSMISSION
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="comms-name"
                          className="block font-mono text-[10px] tracking-widest text-slate-300 uppercase"
                        >
                          OPERATOR NAME
                        </label>
                        <input
                          id="comms-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name or organization"
                          className="mt-1.5 min-h-[46px] w-full border border-slate-700/90 bg-black/75 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-[#00F0FF] focus:shadow-[0_0_20px_-4px_rgba(0,240,255,0.6)] focus:ring-1 focus:ring-[#00F0FF]/60"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="comms-email"
                          className="block font-mono text-[10px] tracking-widest text-slate-300 uppercase"
                        >
                          RETURN FREQUENCY (EMAIL)
                        </label>
                        <input
                          id="comms-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="mt-1.5 min-h-[46px] w-full border border-slate-700/90 bg-black/75 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-[#00F0FF] focus:shadow-[0_0_20px_-4px_rgba(0,240,255,0.6)] focus:ring-1 focus:ring-[#00F0FF]/60"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="block font-mono text-[10px] tracking-widest text-slate-300 uppercase">
                        MISSION TYPE
                      </span>
                      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {MISSION_TYPES.map((type) => {
                          const active = missionType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setMissionType(type)}
                              className={`min-h-[46px] border px-3 py-2 font-mono text-[11px] font-medium transition-all ${
                                active
                                  ? "border-emerald-400 bg-emerald-500/18 text-emerald-300 shadow-[0_0_16px_-4px_rgba(16,185,129,0.65)]"
                                  : "border-slate-800 bg-black/65 text-slate-300 hover:border-slate-600 hover:text-white"
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="comms-message"
                        className="block font-mono text-[10px] tracking-widest text-slate-300 uppercase"
                      >
                        PAYLOAD BRIEF
                      </label>
                      <textarea
                        id="comms-message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Outline your system architecture goals, project timeline, or security assessment scope..."
                        className="mt-1.5 w-full resize-none border border-slate-700/90 bg-black/75 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-emerald-400 focus:shadow-[0_0_20px_-4px_rgba(16,185,129,0.6)] focus:ring-1 focus:ring-emerald-400/60"
                      />
                    </div>

                    {errorMsg && (
                      <div className="border border-[#FF003C]/60 bg-[#FF003C]/12 px-3.5 py-2 font-mono text-xs text-[#FF003C]">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="glitch-hover group relative flex w-full items-center justify-center gap-2.5 border border-emerald-400/80 bg-gradient-to-r from-emerald-500/20 via-[#00F0FF]/18 to-emerald-500/20 px-6 py-3.5 font-mono text-xs font-bold tracking-[0.2em] text-white uppercase shadow-[0_0_28px_-6px_rgba(16,185,129,0.6)] transition-all hover:border-[#00F0FF] hover:shadow-[0_0_34px_-4px_rgba(0,240,255,0.75)] disabled:opacity-60 clip-chamfer-sm"
                    >
                      <Send className="h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
                      <span>
                        {submitting
                          ? "ENCRYPTING & TRANSMITTING..."
                          : "TRANSMIT PAYLOAD >>"}
                      </span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </TacticalCard>
          </div>
        </div>
      </div>
    </section>
  );
}
