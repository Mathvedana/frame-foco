import { useEffect, useState } from "react";
import {
  Bot, Search, Target, PenTool, Users, Filter, MessageSquare,
  BarChart3, FileText, Lightbulb, Cog, TrendingUp, Zap, Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const FRAME_AGENTS = [
  { key: "diagnostico", name: "Diagnóstico", description: "Analisa nicho, faturamento e maturidade dos leads", icon: Search },
  { key: "posicionamento", name: "Posicionamento", description: "Define proposta de valor e público-alvo da Frame", icon: Target },
  { key: "conteudo", name: "Conteúdo", description: "Cria posts, campanhas e roteiros para a Frame & Foco", icon: PenTool },
  { key: "geracao_leads", name: "Geração de Leads", description: "Busca empresas potenciais para o método NVL", icon: Users },
  { key: "qualificacao", name: "Qualificação", description: "Classifica leads da Frame: frio, morno, quente", icon: Filter },
  { key: "whatsapp", name: "WhatsApp", description: "Atendimento e agendamento de reuniões via WhatsApp", icon: MessageSquare },
  { key: "comercial", name: "Comercial", description: "Analisa conversões e gargalos do funil da Frame", icon: BarChart3 },
  { key: "relatorios", name: "Relatórios", description: "Gera relatórios internos de performance", icon: FileText },
  { key: "relatorios_ceo", name: "Relatórios CEO", description: "Análise empresarial estratégica da Frame & Foco", icon: Bot },
  { key: "mentoria", name: "Mentoria", description: "Prepara diagnósticos e roteiros de mentoria", icon: Lightbulb },
  { key: "crescimento", name: "Crescimento", description: "Sugere melhorias e campanhas para a Frame", icon: TrendingUp },
  { key: "automacao", name: "Automação", description: "Organiza tarefas, CRM e dados internos", icon: Cog },
];

const FRAME_COMPANY_ID = "00000000-0000-0000-0000-ffa3e0f0c0ff";

const AgentesFrameSection = () => {
  const [agentStates, setAgentStates] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    FRAME_AGENTS.forEach(a => { initial[a.key] = true; });
    return initial;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStates();
  }, []);

  const loadStates = async () => {
    const { data } = await supabase
      .from("company_agents")
      .select("*")
      .eq("company_id", FRAME_COMPANY_ID);

    if (data && data.length > 0) {
      const states: Record<string, boolean> = {};
      FRAME_AGENTS.forEach(a => { states[a.key] = true; });
      data.forEach((row: any) => { states[row.agent_key] = row.enabled; });
      setAgentStates(states);
    }
    setLoading(false);
  };

  const toggleAgent = async (agentKey: string, enabled: boolean) => {
    setAgentStates(prev => ({ ...prev, [agentKey]: enabled }));

    const { error } = await supabase
      .from("company_agents")
      .upsert(
        { company_id: FRAME_COMPANY_ID, agent_key: agentKey, enabled, updated_at: new Date().toISOString() },
        { onConflict: "company_id,agent_key" }
      );

    if (error) {
      toast({ title: "Erro ao atualizar agente", description: error.message, variant: "destructive" });
      setAgentStates(prev => ({ ...prev, [agentKey]: !enabled }));
    } else {
      const agent = FRAME_AGENTS.find(a => a.key === agentKey);
      toast({ title: enabled ? "Agente ativado" : "Agente desativado", description: `${agent?.name} ${enabled ? "ativado" : "desativado"} para Frame & Foco` });
    }
  };

  const toggleAll = async (enabled: boolean) => {
    const newStates: Record<string, boolean> = {};
    FRAME_AGENTS.forEach(a => { newStates[a.key] = enabled; });
    setAgentStates(newStates);

    const promises = FRAME_AGENTS.map(a =>
      supabase
        .from("company_agents")
        .upsert(
          { company_id: FRAME_COMPANY_ID, agent_key: a.key, enabled, updated_at: new Date().toISOString() },
          { onConflict: "company_id,agent_key" }
        )
    );
    await Promise.all(promises);
    toast({ title: enabled ? "Todos ativados" : "Todos desativados", description: `${FRAME_AGENTS.length} agentes ${enabled ? "ativados" : "desativados"}` });
  };

  const activeCount = Object.values(agentStates).filter(Boolean).length;
  const activePercent = Math.round((activeCount / FRAME_AGENTS.length) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-display font-bold">Agentes IA — Frame & Foco</h2>
        <p className="text-sm text-muted-foreground">Controle os agentes que trabalham internamente para a sua empresa</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5">
          <Bot className="w-5 h-5 text-primary mb-2" />
          <p className="text-2xl font-display font-bold">{activeCount}/{FRAME_AGENTS.length}</p>
          <p className="text-xs text-muted-foreground">Agentes Ativos</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Shield className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-display font-bold">{activePercent}%</p>
          <p className="text-xs text-muted-foreground">Cobertura</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Zap className="w-5 h-5 text-green-400 mb-2" />
          <p className="text-2xl font-display font-bold">24/7</p>
          <p className="text-xs text-muted-foreground">Disponibilidade</p>
        </div>
      </div>

      {/* Progress bar */}
      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-display font-bold">Status Geral</p>
              <p className="text-xs text-muted-foreground">{activeCount} de {FRAME_AGENTS.length} agentes operando</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleAll(true)}
                className="text-xs px-3 py-1.5 rounded-md bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
              >
                Ativar todos
              </button>
              <button
                onClick={() => toggleAll(false)}
                className="text-xs px-3 py-1.5 rounded-md bg-secondary text-muted-foreground font-medium hover:bg-secondary/80 transition-colors"
              >
                Desativar todos
              </button>
            </div>
          </div>
          <Progress value={activePercent} className="h-2.5" />
        </CardContent>
      </Card>

      {/* Agents Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FRAME_AGENTS.map((agent) => {
          const enabled = agentStates[agent.key];
          return (
            <Card
              key={agent.key}
              className={`transition-all duration-200 ${
                enabled
                  ? "bg-card border-primary/20 hover:border-primary/40"
                  : "bg-secondary/30 border-border opacity-70"
              }`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    enabled ? "bg-primary/10" : "bg-secondary"
                  }`}>
                    <agent.icon className={`w-5 h-5 ${enabled ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(val) => toggleAgent(agent.key, val)}
                    disabled={loading}
                  />
                </div>
                <h3 className="font-display font-bold text-sm mb-1">{agent.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{agent.description}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${enabled ? "bg-green-400" : "bg-muted-foreground/40"}`} />
                  <span className={`text-[10px] font-medium ${enabled ? "text-green-400" : "text-muted-foreground"}`}>
                    {enabled ? "Operando" : "Desativado"}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AgentesFrameSection;
