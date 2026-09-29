import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import DiagnosisForm from "./DiagnosisForm";
import { trackConversion } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/5516988307267";

const DiagnosticoCTASection = () => (
  <section id="diagnostico" className="py-24">
    <div className="container mx-auto px-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-10 md:p-14 text-center"
      >
        <p className="text-sm text-accent font-semibold tracking-widest mb-3">DIAGNÓSTICO NVL</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
          Descubra o que está travando o crescimento da sua empresa.
        </h2>
        <p className="text-muted-foreground mb-6">
          Receba gratuitamente uma análise estratégica baseada na realidade atual do seu negócio.
        </p>

        <ul className="text-left max-w-xl mx-auto space-y-2 text-sm text-foreground/90 mb-8">
          <li>• Seu nível atual de maturidade empresarial</li>
          <li>• Os gargalos que limitam seu crescimento</li>
          <li>• Oportunidades que talvez você ainda não esteja enxergando</li>
          <li>• Direcionamento estratégico para os próximos passos</li>
          <li>• Qual plano NVL faz mais sentido para sua empresa</li>
        </ul>

        <div className="text-left">
          <DiagnosisForm embedded />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("cta_click", "Diagnóstico — WhatsApp")}>
            <Button size="lg" variant="outline">
              <MessageCircle className="mr-2 w-4 h-4" />
              Falar no WhatsApp
            </Button>
          </a>
        </div>

        <p className="font-display text-xl md:text-2xl font-bold mt-10">
          Crescimento não é acidente.
          <br />
          <span className="text-gradient-hero">É decisão. 🚀</span>
        </p>
      </motion.div>
    </div>
  </section>
);

export default DiagnosticoCTASection;
