/* eslint-disable no-unused-vars */
import { Navbar } from "../../../components/main/navbar";
import { HeroSection } from "../../../components/main/sections/HeroSection";
import { CompanySection } from "../../../components/main/sections/CompanySection";
import { ServiceSection } from "../../../components/main/sections/ServiceSection";
import { PortfolioSection } from "../../../components/main/sections/PortofolioSeciton";
import { CTASection } from "../../../components/main/sections/CtaSection";
import { TestimonialSection } from "../../../components/main/sections/TestimoniSection";
import { PartnerSection } from "../../../components/main/sections/LogoBrand";
import { Footer } from "../../../components/main/sections/FooterSection";
import { ProductSection } from "../../../components/main/sections/ProductSection";

export function LandingPage() {
  return (
    <div className="relative max-w-full min-h-screen scroll-smooth">
      {/* NAVBAR */}
      <Navbar />
      <section id="home">
        <HeroSection />
      </section>
      <section id="layanan">
        <ServiceSection />
      </section>
      <section id="company">
        <CompanySection />
      </section>
      <section id="product">
        <ProductSection />
      </section>
      {/* <section id="portofolio">
        <PortfolioSection />
      </section> */}
      <section id="kontak">
        <CTASection />
      </section>

      <TestimonialSection />
      <PartnerSection />
      <Footer />
    </div>
  );
}
