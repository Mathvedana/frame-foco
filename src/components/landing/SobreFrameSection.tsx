import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "ESTRUTURAR",
    desc: "Organizamos a base para o negócio funcionar melhor.",
  },
  {
    num: "02",
    title: "POSICIONAR",
    desc: "Definimos como a marca deve ser percebida e lembrada.",
  },
  {
    num: "03",
    title: "COMUNICAR",
    desc: "Transformamos estratégia em comunicação que conecta e gera oportunidades.",
  },
  {
    num: "04",
    title: "EVOLUIR",
    desc: "Entregamos ferramentas, conhecimento e direção para a empresa continuar crescendo.",
  },
];

const SobreFrameSection = () => (
  <section id="sobre-frame" className="relative py-24 overflow-hidden">
    {/* Subtle decorative glows */}
    <div className="absolute top-28 left-6 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
    <div className="absolute bottom-12 right-6 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

    <div className="relative z-10 container mx-auto px-6 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-10 flex items-center gap-2">
          <span className="w-4 h-px bg-accent inline-block" />
          Sobre a Frame &amp; Foco
        </p>

        <h2 className="font-display font-bold tracking-[-0.03em] leading-[1.02] text-5xl md:text-6xl lg:text-7xl mb-10">
          <span className="text-foreground">Marketing é só o começo.</span>
          <br />
          <span
            className="text-gradient-frame"
          >
            Estruturamos empresas
          </span>
          <br />
          <span className="text-gradient-frame">para crescer.</span>
        </h2>

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-10">
          A <span className="text-foreground font-semibold">Frame &amp; Foco</span> vai além da
          comunicação. Estruturamos negócios, organizamos processos, desenvolvemos ferramentas e
          construímos estratégias para que cada empresa tenha clareza sobre onde está, para onde
          quer ir e como continuar evoluindo.
        </p>

        <div className="mb-24">
          <p className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Não criamos dependência.
          </p>
          <p className="font-display text-2xl md:text-3xl font-bold text-accent">
            Criamos estrutura para evolução.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-center text-xs font-semibold tracking-[0.25em] text-foreground uppercase mb-8">
          Método de atuação
        </p>

        <div>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[3rem_16rem_1fr] items-start gap-4 md:gap-8 py-8 border-t border-border/50 last:border-b"
            >
              <span className="text-sm font-bold text-accent pt-1">{step.num}</span>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight">
                {step.title}
              </h3>
              <p className="col-span-2 md:col-span-1 text-sm md:text-base text-muted-foreground leading-relaxed md:pt-0.5">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default SobreFrameSection;
