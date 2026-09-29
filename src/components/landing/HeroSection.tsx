import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { trackConversion } from "@/lib/tracking";

const HeroSection = () => {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />

      {/* Subtle decorative glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-border/60 bg-secondary/40 backdrop-blur-sm text-xs md:text-sm font-medium tracking-wide text-muted-foreground"
          >
            <Zap className="w-3.5 h-3.5 text-accent fill-accent" />
            Estratégia, criatividade e performance para empresas que querem crescer
          </motion.span>

          <h1 className="font-display text-6xl md:text-7xl lg:text-[7.5rem] font-bold tracking-[-0.03em] leading-[0.95] mb-8">
            Crescimento não é
            <br />
            <span className="text-gradient-hero">acidente.</span>
            <br />
            É <span className="text-accent italic">decisão.</span>
          </h1>

          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A <span className="text-foreground font-semibold">Frame &amp; Foco</span> desenvolve estratégias
            inteligentes de branding, conteúdo, design e marketing digital para ajudar empresas a conquistar
            autoridade, atrair clientes e crescer de forma consistente.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a href="#diagnostico" className="w-full sm:w-auto" onClick={() => trackConversion("cta_click", "Hero — Quero impulsionar minha empresa")}>
              <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground px-8 h-14 text-base font-semibold shadow-orange hover:opacity-90 hover:scale-[1.02] transition-all">
                <Zap className="mr-2 w-5 h-5 fill-current" />
                Quero impulsionar minha empresa
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <a href="#portfolio" className="w-full sm:w-auto" onClick={() => trackConversion("cta_click", "Hero — Conhecer nossos projetos")}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 h-14 text-base border-border/70 hover:bg-secondary">
                <MessageCircle className="mr-2 w-5 h-5" />
                Conhecer nossos projetos
              </Button>
            </a>
          </div>

          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs md:text-sm text-muted-foreground/70 tracking-wide">
            <Check className="w-3.5 h-3.5 text-accent" /> Estratégias personalizadas
            <span className="text-border">·</span>
            Soluções completas
            <span className="text-border">·</span>
            Foco em resultados
            <span className="text-border">·</span>
            Equipe especializada
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
