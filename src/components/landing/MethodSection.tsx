import { motion } from "framer-motion";
import { Compass, Gem, Target } from "lucide-react";

const pillars = [
  {
    icon: Compass,
    name: "Narrativa",
    description: "Como sua empresa é percebida pelo mercado.",
  },
  {
    icon: Gem,
    name: "Valor",
    description: "O que faz seu cliente escolher você.",
  },
  {
    icon: Target,
    name: "Longo Prazo",
    description: "Como construir crescimento sustentável e duradouro.",
  },
];

const MethodSection = () => {
  return (
    <section className="py-24 relative" id="metodo">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Método <span className="text-gradient-hero">NVL</span>
          </h2>
          <p className="text-accent font-semibold tracking-wide">
            Narrativa. Valor. Longo Prazo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-lg leading-relaxed mb-16 max-w-2xl mx-auto"
        >
          <p>
            O Método NVL foi criado para ajudar empresas a saírem da operação e construírem
            crescimento de forma organizada. Ele é baseado em três pilares fundamentais:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="glass-card rounded-2xl p-8 text-center group hover:border-primary/40 hover:shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.3)] transition-[border-color,box-shadow] duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                <pillar.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3 uppercase tracking-wide">{pillar.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-display text-3xl md:text-4xl font-bold">
            Crescimento não é acidente.
          </p>
          <p className="text-gradient-hero font-display text-3xl md:text-4xl font-bold">
            É decisão.
          </p>
          <p className="text-muted-foreground text-base mt-6 max-w-2xl mx-auto">
            Uma estrutura completa desenvolvida para ajudar empresas a crescerem com mais clareza,
            organização e resultado.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MethodSection;
