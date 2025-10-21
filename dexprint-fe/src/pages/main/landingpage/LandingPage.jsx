/* eslint-disable no-unused-vars */
import { Navbar } from "../../../components/main/navbar";
import { HeroSection } from "../../../components/main/sections/HeroSection";
import { CompanySection } from "../../../components/main/sections/CompanySection";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LandingPage() {
  return (
    <div className="relative max-w-full min-h-screen">
      {/* NAVBAR */}
      <Navbar />
      <HeroSection />
      <CompanySection />
    </div>
  );
}
