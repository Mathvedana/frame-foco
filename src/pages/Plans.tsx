import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Sparkles, Rocket, Crown, Star } from "lucide-react";
import nvlLogo from "@/assets/nvl-logo.png";


import { Button } from "@/components/ui/button";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";


const nvlPlans = [
  {
    name: "Essencial",
    price: "R$ 900,00",
    icon: Sparkles,
    badge: "🟢",
    description: "Clareza e direção para começar",
    target: "Para quem precisa organizar a marca e saber por onde começar.",
    items: [
      "Diagnóstico completo do negócio",
      "Posicionamento e identidade da marca",
      "Agentes aplicados: Diagnóstico + Posicionamento",
      "Orientações práticas para aplicar",
      "Acesso ao Painel do Cliente",
    ],
  },
  {
    name: "Elite",
    price: "R$ 1.500,00",
    icon: Rocket,
    highlight: true,
    badge: "🟡",
    badgeText: "⭐ Mais Escolhido",
    description: "Estratégia + Presença que Conquista",
    target: "Para quem quer aparecer, atrair clientes e crescer de verdade.",
    items: [
      "Tudo do Plano Essencial",
      "Diagnóstico estratégico aprofundado",
      "Posicionamento de marca consolidado",
      "4 vídeos profissionais/mês (edição completa + legendas)",
      "Agentes ampliados: Conteúdo → Leads → Qualificação → Atendimento → Relatórios",
      "Estratégia de crescimento estruturada",
      "Acompanhamento mensal",
    ],
  },
  {
    name: "Platina",
    price: "R$ 2.000,00",
    icon: Crown,
    badge: "🔴",
    badgeText: "O Mais Completo",
    description: "Estrutura total para liderar o mercado",
    target: "Para quem quer ser referência absoluta e crescer com solidez e destaque.",
    items: [
      "Tudo do Plano Elite",
      "Diagnóstico estratégico completo",
      "8 vídeos profissionais/mês + vídeo institucional",
      "Todos os 12 Agentes em ação no seu negócio",
      "Relatórios estratégicos exclusivos",
      "Sistema de atração e oportunidades estruturado",
      "Visão de escala e expansão",
      "Prioridade total na produção e atendimento",
    ],
  },
];

const mentoriaPlan = {
  price: "R$ 3.000,00",
  items: [
    "Análise personalizada e profunda do seu momento",
    "Resolução de desafios que estão travando o crescimento",
    "Plano de ação estratégico sob medida",
    "Acompanhamento direto e dedicado",
    "Contratação independente — não exige vínculo com nenhum plano",
  ],
};

const Plans = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={nvlLogo} alt="NVL" className="w-8 h-8" />
            <span className="font-display font-bold text-lg">
              Frame & Foco <span className="text-primary">NVL</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-6xl space-y-24">
          {/* NVL */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Nossos <span className="text-gradient-hero">Planos</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                O Método NVL foi estruturado para atender empresas em diferentes momentos de crescimento.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {nvlPlans.map((plan, i) => {
                const Icon = plan.icon;
                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    className={`relative rounded-2xl p-[2px] ${
                      plan.highlight ? "bg-gradient-hero shadow-glow" : "bg-gradient-to-br from-primary/40 via-border to-accent/40"
                    }`}
                  >
                    {plan.badgeText && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-hero text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10 whitespace-nowrap">
                        {plan.highlight && <Star className="w-3 h-3 fill-current" />} {plan.badgeText}
                      </div>
                    )}
                    <div className="h-full rounded-[14px] bg-card p-6 md:p-8 flex flex-col border border-border/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${plan.highlight ? "bg-gradient-hero" : "bg-secondary"}`}>
                          <Icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-accent">{plan.badge} PLANO {plan.name.toUpperCase()}</p>
                          <h3 className="text-lg font-display font-bold leading-tight">{plan.description}</h3>
                        </div>
                      </div>

                      <p className="font-display text-3xl font-bold text-primary mb-2">💰 {plan.price}</p>

                      <ul className="space-y-2.5 flex-1 mb-6">
                        {plan.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="text-sm text-muted-foreground border-t border-border/50 pt-4">🎯 {plan.target}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mentoria Individual */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl p-[2px] mt-12 bg-gradient-to-br from-accent/60 via-border to-primary/60"
            >
              <div className="h-full rounded-[14px] bg-card p-6 md:p-10 border border-border/30">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 mb-4">
                      <span className="text-xs font-bold text-accent tracking-wide">💎 CONTRATAÇÃO EXCEPCIONAL</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">Mentoria Individual</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Não incluso em nenhum plano — opção à parte. Quer ir ainda mais fundo, resolver desafios
                      específicos e ter acompanhamento direto e exclusivo? É uma escolha separada.
                    </p>
                    <p className="font-display text-3xl font-bold text-primary">💰 {mentoriaPlan.price}</p>
                  </div>
                  <ul className="space-y-3">
                    {mentoriaPlan.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Closing CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center glass-card rounded-2xl p-10"
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Sua empresa está pronta para crescer?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Receba gratuitamente seu Diagnóstico NVL e descubra quais decisões precisam ser tomadas
              para acelerar o crescimento do seu negócio.
            </p>
            <p className="font-display text-2xl font-bold mb-8">
              Crescimento não é acidente.
              <br />
              <span className="text-gradient-hero">É decisão.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/#diagnostico">
                <Button size="lg" className="bg-gradient-hero text-primary-foreground font-semibold shadow-glow">
                  🚀 Receber Diagnóstico NVL
                </Button>
              </Link>
              <a href="https://wa.me/5516988307267" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">📞 Falar no WhatsApp</Button>
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <FloatingWhatsApp />
    </div>
  );
};

export default Plans;
