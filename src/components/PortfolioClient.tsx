"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import {
  IronManFaceplateTransition,
  TransformersArmorBridge,
} from "@/components/ui/ArmorTransitions";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { FounderTransition } from "@/components/sections/FounderTransition";
import { CyberInterests } from "@/components/sections/CyberInterests";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export function PortfolioClient() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#070709]">
      <Navbar />
      <Hero />
      <IronManFaceplateTransition />
      <Projects />
      <TransformersArmorBridge />
      <Experience />
      <FounderTransition />
      <CyberInterests />
      <Contact />
      <Footer />
    </main>
  );
}
