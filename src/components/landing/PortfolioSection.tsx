import { motion } from "framer-motion";
import { Film } from "lucide-react";

const PortfolioSection = () => (
  <section id="portfolio" className="py-24 bg-secondary/30">
    <div className="container mx-auto px-6 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Nosso <span className="text-accent">Portfólio</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Trabalhos audiovisuais e projetos estratégicos desenvolvidos pela Frame & Foco.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="aspect-video rounded-xl glass-card flex items-center justify-center group hover:border-primary/40 transition-colors"
          >
            <Film className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8 italic">
        Em breve, novos cases e projetos publicados.
      </p>
    </div>
  </section>
);

export default PortfolioSection;
