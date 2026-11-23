import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/providers/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gnanavel Sabeesan | Full-Stack Software Engineer & Founder of UltraKerb",
  description:
    "Portfolio of Gnanavel Sabeesan (G. Sabeesan) — Full-Stack Engineer, Cybersecurity Researcher (BOLA API Mitigation), and Co-Founder & CEO of UltraKerb.",
  keywords: [
    "Gnanavel Sabeesan",
    "G. Sabeesan",
    "UltraKerb",
    "Full-Stack Software Engineer",
    "Cybersecurity Researcher",
    "BOLA Mitigation",
    "Next.js",
    "Django REST",
    "React Native",
    "Jaffna Sri Lanka",
  ],
  authors: [{ name: "Gnanavel Sabeesan" }],
  openGraph: {
    title: "Gnanavel Sabeesan | Full-Stack Software Engineer & Founder of UltraKerb",
    description:
      "Portfolio of Gnanavel Sabeesan (G. Sabeesan) — Full-Stack Engineer, Cybersecurity Researcher (BOLA API Mitigation), and Co-Founder & CEO of UltraKerb.",
    type: "website",
    locale: "en_US",
    siteName: "Gnanavel Sabeesan // UltraKerb",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gnanavel Sabeesan | Full-Stack Software Engineer & Founder of UltraKerb",
    description:
      "Full-Stack Engineer, Cybersecurity Researcher (BOLA API Mitigation), and Co-Founder & CEO of UltraKerb.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#070709] text-slate-100 antialiased selection:bg-[#FF4D00]/35 selection:text-white">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
