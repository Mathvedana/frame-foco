import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import SobreFrameSection from "@/components/landing/SobreFrameSection";
import SobreSection from "@/components/landing/SobreSection";
import ComoAjudamosSection from "@/components/landing/ComoAjudamosSection";
import MethodSection from "@/components/landing/MethodSection";
import AgentsSection from "@/components/landing/AgentsSection";
import PortfolioSection from "@/components/landing/PortfolioSection";

import DiagnosticoCTASection from "@/components/landing/DiagnosticoCTASection";
import ContatoSection from "@/components/landing/ContatoSection";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SobreFrameSection />
      <SobreSection />
      <ComoAjudamosSection />
      <MethodSection />
      <AgentsSection />
      <PortfolioSection />

      <DiagnosticoCTASection />
      <ContatoSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
