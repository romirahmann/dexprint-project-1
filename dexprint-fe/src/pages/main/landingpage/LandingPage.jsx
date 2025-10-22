/* eslint-disable no-unused-vars */
import { Navbar } from "../../../components/main/navbar";
import { HeroSection } from "../../../components/main/sections/HeroSection";
import { CompanySection } from "../../../components/main/sections/CompanySection";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceSection } from "../../../components/main/sections/ServiceSection";
import { PortfolioSection } from "../../../components/main/sections/PortofolioSeciton";
import { CTASection } from "../../../components/main/sections/CtaSection";
import { TestimonialSection } from "../../../components/main/sections/TestimoniSection";
import { PartnerSection } from "../../../components/main/sections/LogoBrand";
import { Footer } from "../../../components/main/sections/FooterSection";

export function LandingPage() {
  return (
    <div className="relative max-w-full min-h-screen">
      {/* NAVBAR */}
      <Navbar />
      <HeroSection />
      <CompanySection />
      <ServiceSection />
      <PortfolioSection />
      <CTASection />
      <TestimonialSection />
      <PartnerSection />
      <Footer />
    </div>
  );
}
