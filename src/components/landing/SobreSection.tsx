import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackConversion } from "@/lib/tracking";
import davidDeTernoPhoto from "@/assets/David - CEO da Frame & Foco.png";
import joseCarecaPhoto from "@/assets/José Daniel - Socio da Frame & Foco.png";

const WHATSAPP_URL = "https://wa.me/5516988307267";

const SobreSection = () => (
  <section id="sobre" className="relative overflow-hidden py-24 md:py-32">
    <div className="absolute inset-x-0 bottom-0 h-72 bg-primary/5 blur-3xl" />
    <div className="relative container mx-auto px-6 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Por trás da Frame
        </p>
        <h2 className="max-w-3xl font-display text-5xl font-bold leading-[0.98] md:text-7xl">
          Grandes ideias precisam
          <br />
          de <span className="text-transparent [-webkit-text-stroke:1px_hsl(var(--foreground))]">grandes mentes.</span>
        </h2>
      </motion.div>

      <div className="mb-24 grid gap-12 lg:grid-cols-2 lg:gap-6">
        {/* David */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="min-w-0"
        >
          <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-2 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>Creative_Engine_v2.0</span>
            <span>01 / 02</span>
          </div>
          <div className="rounded-md border border-border bg-card p-2">
            <div className="aspect-[4/3] overflow-hidden rounded-sm bg-muted">
              <img
                src={davidDeTernoPhoto}
                alt="David — CEO da Frame & Foco"
                className="h-full w-full object-cover object-center grayscale-[15%]"
              />
            </div>
          </div>
          <div className="mt-4 flex items-start justify-between gap-4">
            <p className="font-display text-xl font-bold uppercase text-foreground">David</p>
            <p className="pt-1 text-right text-[9px] font-semibold uppercase tracking-[0.14em] text-accent">Direção &amp; Crescimento</p>
          </div>
          <div className="mt-3 space-y-4 border-l border-accent/60 pl-4 text-sm italic leading-relaxed text-muted-foreground">
              <p>
                Acredito que toda grande empresa começa com alguém que decidiu dar o primeiro passo.
              </p>
              <p>
                Todos os dias vejo empreendedores enfrentando desafios, criando oportunidades e construindo negócios que movimentam a economia do nosso país. E foi justamente por acreditar nessas pessoas que escolhi esse caminho.
              </p>
              <p>
                Como CEO da Frame & Foco, meu propósito é ajudar empresas a crescer por meio de <span className="text-foreground font-medium">posicionamento, comunicação, estratégia e produção audiovisual</span> que realmente gerem resultados.
              </p>
              <p>
                Acredito que uma marca forte não nasce por acaso. Ela é construída com visão, consistência e a coragem de evoluir constantemente.
              </p>
              <p>
                Foi com essa mentalidade que construímos a Frame & Foco: unindo criatividade, tecnologia e estratégia para transformar negócios em marcas mais relevantes, competitivas e preparadas para o futuro.
              </p>
              <p>
                Porque, no final, uma verdade continua a mesma: empresas crescem quando as pessoas passam a enxergar o verdadeiro valor que elas entregam.
              </p>
          </div>
        </motion.div>

        {/* José Daniel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="min-w-0"
        >
          <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-2 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>Team_Manifest // Active Sessions</span>
            <span>02 / 02</span>
          </div>
          <div className="rounded-md border border-border bg-card p-2">
            <div className="aspect-[4/3] overflow-hidden rounded-sm bg-muted">
              <img
                src={joseCarecaPhoto}
                alt="José Daniel — Sócio da Frame & Foco"
                className="h-full w-full object-cover object-top grayscale-[15%]"
              />
            </div>
          </div>
          <div className="mt-4 flex items-start justify-between gap-4">
            <p className="font-display text-xl font-bold uppercase text-foreground">José Daniel</p>
            <p className="pt-1 text-right text-[9px] font-semibold uppercase tracking-[0.14em] text-accent">Estratégia &amp; Operação</p>
          </div>
          <div className="mt-3 space-y-4 border-l border-accent/60 pl-4 text-sm italic leading-relaxed text-muted-foreground">
              <p>
                Acredito que o Brasil é movido por microempreendedores. São eles que formam a maior base empresarial do país e impulsionam a economia todos os dias.
              </p>
              <p>
                É por isso que a Frame & Foco existe.
              </p>
              <p>
                Nossa missão é ajudar empresas a crescer através de <span className="text-foreground font-medium">posicionamento, comunicação, audiovisual e estratégia</span>.
              </p>
              <p>
                Foi com essa visão que nasceu a Frame & Foco: unir criatividade, tecnologia e crescimento para ajudar negócios a construírem marcas mais fortes, relevantes e preparadas para o futuro.
              </p>
              <p>
                Porque no final, uma verdade continua a mesma: empresas crescem quando as pessoas passam a enxergar o verdadeiro valor que elas entregam.
              </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center font-display text-3xl font-bold leading-tight md:text-5xl"
      >
        <p>Pessoas criam.</p>
        <p className="text-accent">Tecnologia potencializa.</p>
        <p>Estratégia direciona.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="border-y border-border/70 py-8"
      >
        <p className="font-display text-lg md:text-xl font-semibold text-foreground mb-5 text-center">
          Pronto para transformar o crescimento da sua empresa em uma decisão estratégica?
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#diagnostico" className="w-full sm:w-auto" onClick={() => trackConversion("cta_click", "Sobre — Diagnóstico NVL")}>
            <Button size="lg" className="w-full sm:w-auto bg-gradient-hero text-primary-foreground px-6 h-12 font-semibold shadow-glow hover:opacity-90 hover:scale-[1.02] transition-all">
              🚀 Receber Diagnóstico NVL
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" onClick={() => trackConversion("cta_click", "Sobre — WhatsApp")}>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 h-12 border-border/70 hover:bg-secondary">
              <MessageCircle className="mr-2 w-4 h-4" />
              Falar no WhatsApp
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SobreSection;
