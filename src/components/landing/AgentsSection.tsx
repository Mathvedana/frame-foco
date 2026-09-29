import { motion } from "framer-motion";
import {
  Search, Target, PenTool, Users, Filter, MessageSquare,
  BarChart3, FileText, Briefcase, GraduationCap, Lightbulb, Cog,
} from "lucide-react";

const agents = [
  { icon: Search, name: "Diagnóstico", desc: "Analisa nicho, faturamento e maturidade" },
  { icon: Target, name: "Posicionamento", desc: "Define proposta de valor e público" },
  { icon: PenTool, name: "Conteúdo", desc: "Cria posts, campanhas e roteiros" },
  { icon: Users, name: "Geração de Leads", desc: "Busca clientes potenciais" },
  { icon: Filter, name: "Qualificação", desc: "Classifica leads: frio, morno, quente" },
  { icon: MessageSquare, name: "WhatsApp", desc: "Conversa e agenda reuniões" },
  { icon: BarChart3, name: "Comercial", desc: "Analisa conversões e gargalos" },
  { icon: FileText, name: "Relatórios", desc: "Mostra leads, reuniões e crescimento" },
  { icon: Briefcase, name: "Relatórios CEO", desc: "Análise empresarial e estratégia" },
  { icon: GraduationCap, name: "Mentoria", desc: "Prepara diagnóstico e roteiro" },
  { icon: Lightbulb, name: "Crescimento", desc: "Sugere melhorias e campanhas" },
  { icon: Cog, name: "Automação", desc: "Organiza tarefas, CRM e dados" },
];

const AgentsSection = () => {
  return (
    <section className="py-24 bg-secondary/30" id="agentes">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            12 Agentes de <span className="text-accent">IA</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Uma inteligência completa trabalhando 24/7 pelo crescimento da sua empresa.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-5 hover:border-primary/40 transition-colors group"
            >
              <agent.icon className="w-8 h-8 text-primary mb-3 group-hover:text-accent transition-colors" />
              <h3 className="font-display font-semibold text-sm mb-1">{agent.name}</h3>
              <p className="text-xs text-muted-foreground">{agent.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
