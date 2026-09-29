import { motion } from "framer-motion";
import { Film, Globe, Brain, Settings } from "lucide-react";

const areas = [
  {
    icon: Film,
    title: "Produção Audiovisual",
    desc: "Vídeos profissionais para gerar autoridade, confiança e posicionamento de mercado.",
  },
  {
    icon: Globe,
    title: "Criação de Sites",
    desc: "Sites modernos, rápidos e preparados para transformar visitantes em oportunidades de negócio.",
  },
  {
    icon: Brain,
    title: "Método NVL",
    desc: "Diagnóstico, posicionamento e estratégia para empresas que desejam crescer com mais clareza e direção.",
  },
  {
    icon: Settings,
    title: "Estruturação Empresarial",
    desc: "Organização de processos, posicionamento e construção de bases sólidas para crescimento sustentável.",
  },
];

const ComoAjudamosSection = () => (
  <section className="py-24 bg-secondary/30">
    <div className="container mx-auto px-6 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Como ajudamos empresas a <span className="text-accent">crescer</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A Frame & Foco atua em diferentes frentes para ajudar empresas a fortalecerem sua marca,
          aumentarem sua presença digital e construírem crescimento de forma estruturada.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {areas.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-6 hover:border-primary/40 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <a.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">{a.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ComoAjudamosSection;
