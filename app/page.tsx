"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Journey from "@/components/sections/Journey";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Certifications from "@/components/sections/Certifications";
import CodingProfiles from "@/components/sections/CodingProfiles";
import Contact from "@/components/sections/Contact";

// Galaxy scene is client-only and GPU-heavy — load without SSR so the
// initial HTML payload stays light and there's no WebGL/SSR mismatch.
const GalaxyBackground = dynamic(() => import("@/components/canvas/GalaxyBackground"), {
  ssr: false,
});

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <GalaxyBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Journey />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Achievements />
        <CodingProfiles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
