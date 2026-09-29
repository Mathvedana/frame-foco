import { motion } from "framer-motion";
import { MessageCircle, Instagram } from "lucide-react";

const ContatoSection = () => (
  <section id="contato" className="py-24 bg-secondary/30">
    <div className="container mx-auto px-6 max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Vamos <span className="text-accent">conversar</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Fale diretamente com a Frame & Foco pelos canais abaixo.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          <a
            href="https://wa.me/5516988307267"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 hover:border-primary/40 transition-colors group"
          >
            <MessageCircle className="w-8 h-8 text-[hsl(142,70%,40%)] mx-auto mb-3" />
            <p className="font-display font-bold mb-1">WhatsApp</p>
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">+55 16 98830-7267</p>
          </a>

          <a
            href="https://www.instagram.com/frameefoco01?igsh=MTQ3aXc5Y3pjaGN4cg=="
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 hover:border-primary/40 transition-colors group"
          >
            <Instagram className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="font-display font-bold mb-1">Instagram</p>
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">@frameefoco01</p>
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContatoSection;
