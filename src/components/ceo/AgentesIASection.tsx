import { useEffect, useState } from "react";
import { Bot, MessageSquare, Zap, Users, TrendingUp, Settings, Search, Target, PenTool, Filter, BarChart3, FileText, Lightbulb, Cog, Info, Globe, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Props {
  companies: any[];
  leads: any[];
}

const AGENT_LIST = [
  { key: "diagnostico", name: "Diagnóstico", description: "Analisa nicho, faturamento e maturidade", icon: Search },
  { key: "posicionamento", name: "Posicionamento", description: "Define proposta de valor e público", icon: Target },
  { key: "conteudo", name: "Conteúdo", description: "Cria posts, campanhas e roteiros", icon: PenTool },
  { key: "geracao_leads", name: "Geração de Leads", description: "Busca clientes potenciais", icon: Users },
  { key: "qualificacao", name: "Qualificação", description: "Classifica leads: frio, morno, quente", icon: Filter },
  { key: "whatsapp", name: "WhatsApp", description: "Conversa e agenda reuniões", icon: MessageSquare },
  { key: "comercial", name: "Comercial", description: "Analisa conversões e gargalos", icon: BarChart3 },
  { key: "relatorios", name: "Relatórios", description: "Mostra leads, reuniões e crescimento", icon: FileText },
  { key: "relatorios_ceo", name: "Relatórios CEO", description: "Análise empresarial e estratégia", icon: Bot },
  { key: "mentoria", name: "Mentoria", description: "Prepara diagnóstico e roteiro", icon: Lightbulb },
  { key: "crescimento", name: "Crescimento", description: "Sugere melhorias e campanhas", icon: TrendingUp },
  { key: "automacao", name: "Automação", description: "Organiza tarefas, CRM e dados", icon: Cog },
];

const GLOBAL_AGENT_CONTROL_ID = "00000000-0000-0000-0000-00000000c001";

const AgentesIASection = ({ companies, leads }: Props) => {
  const [agentStates, setAgentStates] = useState<Record<string, Record<string, boolean>>>({});
  const [globalStates, setGlobalStates] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    AGENT_LIST.forEach(a => { initial[a.key] = true; });
    return initial;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgentStates();
  }, [companies]);

  const loadAgentStates = async () => {
    setLoading(true);

    const companyIds = companies.map(c => c.id);
    const [companyAgentsRes, globalAgentsRes] = await Promise.all([
      companyIds.length > 0
        ? supabase.from("company_agents").select("*").in("company_id", companyIds)
        : Promise.resolve({ data: [], error: null }),
      supabase.from("company_agents").select("*").eq("company_id", GLOBAL_AGENT_CONTROL_ID),
    ]);

    if (companyAgentsRes.error || globalAgentsRes.error) {
      toast({
        title: "Erro ao carregar agentes",
        description: companyAgentsRes.error?.message || globalAgentsRes.error?.message,
        variant: "destructive",
      });
    }

    const states: Record<string, Record<string, boolean>> = {};
    companies.forEach(c => {
      states[c.id] = {};
      AGENT_LIST.forEach(a => { states[c.id][a.key] = true; });
    });

    (companyAgentsRes.data || []).forEach((row: any) => {
      if (states[row.company_id]) {
        states[row.company_id][row.agent_key] = row.enabled;
      }
    });

    const gStates: Record<string, boolean> = {};
    AGENT_LIST.forEach(a => { gStates[a.key] = true; });

    (globalAgentsRes.data || []).forEach((row: any) => {
      if (row.agent_key in gStates) {
        gStates[row.agent_key] = row.enabled;
      }
    });

    setAgentStates(states);
    setGlobalStates(gStates);
    setLoading(false);
  };

  const toggleAgent = async (companyId: string, agentKey: string, enabled: boolean) => {
    setAgentStates(prev => ({
      ...prev,
      [companyId]: { ...prev[companyId], [agentKey]: enabled },
    }));

    const { error } = await supabase
      .from("company_agents")
      .upsert(
        { company_id: companyId, agent_key: agentKey, enabled, updated_at: new Date().toISOString() },
        { onConflict: "company_id,agent_key" }
      );

    if (error) {
      toast({ title: "Erro ao atualizar agente", description: error.message, variant: "destructive" });
      setAgentStates(prev => ({
        ...prev,
        [companyId]: { ...prev[companyId], [agentKey]: !enabled },
      }));
      return;
    }

    toast({ title: enabled ? "Agente ativado" : "Agente desativado", description: `${AGENT_LIST.find(a => a.key === agentKey)?.name} ${enabled ? "ativado" : "desativado"}` });
  };

  const toggleGlobalAgent = async (agentKey: string, enabled: boolean) => {
    setGlobalStates(prev => ({ ...prev, [agentKey]: enabled }));

    const { error } = await supabase
      .from("company_agents")
      .upsert(
        {
          company_id: GLOBAL_AGENT_CONTROL_ID,
          agent_key: agentKey,
          enabled,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "company_id,agent_key" }
      );

    if (error) {
      toast({ title: "Erro ao atualizar controle global", description: error.message, variant: "destructive" });
      setGlobalStates(prev => ({ ...prev, [agentKey]: !enabled }));
      return;
    }

    toast({
      title: enabled ? "Controle global ativado" : "Controle global desativado",
      description: `${AGENT_LIST.find(a => a.key === agentKey)?.name} ${enabled ? "ativado" : "desativado"} no controle global`,
    });
  };

  const activeGlobalCount = Object.values(globalStates).filter(Boolean).length;

  const getCompanyActiveCount = (companyId: string) => {
    const states = agentStates[companyId];
    if (!states) return AGENT_LIST.length;
    return Object.values(states).filter(Boolean).length;
  };

  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-display font-bold">Agentes de Inteligência Artificial</h2>
        <p className="text-sm text-muted-foreground">Ative ou desative agentes globalmente ou por empresa</p>
      </div>

      {/* Independence banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-accent/30 bg-accent/5">
        <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">Os controles abaixo são independentes</p>
          <p className="text-xs text-muted-foreground mt-0.5">O <strong>Controle Global</strong> define quais agentes estão disponíveis na plataforma como um todo. Os <strong>Agentes por Empresa</strong> controlam quais agentes estão ativos para cada empresa individualmente. Alterar um não afeta o outro.</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5">
          <Bot className="w-5 h-5 text-primary mb-2" />
          <p className="text-2xl font-display font-bold">{activeGlobalCount}</p>
          <p className="text-xs text-muted-foreground">Agentes Globais Ativos</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Zap className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-display font-bold">{AGENT_LIST.length}</p>
          <p className="text-xs text-muted-foreground">Total de Agentes</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <TrendingUp className="w-5 h-5 text-green-400 mb-2" />
          <p className="text-2xl font-display font-bold">{companies.length}</p>
          <p className="text-xs text-muted-foreground">Empresas Gerenciadas</p>
        </div>
      </div>

      {/* Global Agent Toggles */}
      <Card className="bg-card border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Controle Global de Agentes
            </CardTitle>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wider">Plataforma</span>
          </div>
          <p className="text-xs text-muted-foreground">Define a disponibilidade dos agentes na plataforma — não afeta configurações individuais das empresas</p>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {AGENT_LIST.map((agent) => (
              <div
                key={agent.key}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  globalStates[agent.key]
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-secondary/30"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                    globalStates[agent.key] ? "bg-primary/15" : "bg-secondary"
                  }`}>
                    <agent.icon className={`w-4 h-4 ${globalStates[agent.key] ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-display font-semibold truncate">{agent.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{agent.description}</p>
                  </div>
                </div>
                <Switch
                  checked={globalStates[agent.key]}
                  onCheckedChange={(val) => toggleGlobalAgent(agent.key, val)}
                  disabled={loading}
                  className="shrink-0 ml-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Per-company agents */}
      <Card className="bg-card border-accent/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Building2 className="w-4 h-4 text-accent" />
              Agentes por Empresa
            </CardTitle>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent uppercase tracking-wider">Individual</span>
          </div>
          <p className="text-xs text-muted-foreground">Controle independente para cada empresa — não altera o controle global</p>
        </CardHeader>
        <CardContent className="p-0">
          {companies.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Nenhuma empresa cadastrada.</div>
          ) : (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Empresa</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Plano</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Agentes Ativos</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((c) => {
                      const activeCount = getCompanyActiveCount(c.id);
                      const isSelected = selectedCompany === c.id;
                      return (
                        <>
                          <tr
                            key={c.id}
                            className={`border-b border-border/50 cursor-pointer transition-colors ${
                              isSelected ? "bg-primary/5" : "hover:bg-secondary/30"
                            }`}
                            onClick={() => setSelectedCompany(isSelected ? null : c.id)}
                          >
                            <td className="px-6 py-4 text-sm font-medium">{c.name}</td>
                            <td className="px-6 py-4">
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                c.plan === "platina" ? "bg-yellow-500/15 text-yellow-400" :
                                c.plan === "elite" ? "bg-accent/15 text-accent" :
                                "bg-primary/15 text-primary"
                              }`}>{c.plan}</span>
                            </td>
                            <td className="px-6 py-4 text-sm">{activeCount}/{AGENT_LIST.length}</td>
                            <td className="px-6 py-4 text-xs text-primary font-medium">
                              {isSelected ? "Fechar ▲" : "Gerenciar ▼"}
                            </td>
                          </tr>
                          {isSelected && (
                            <tr key={`${c.id}-agents`}>
                              <td colSpan={4} className="px-6 py-4 bg-secondary/20">
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                  {AGENT_LIST.map((agent) => {
                                    const enabled = agentStates[c.id]?.[agent.key] !== false;
                                    return (
                                      <div
                                        key={agent.key}
                                        className={`flex items-center justify-between p-2.5 rounded-lg border transition-colors ${
                                          enabled ? "border-primary/20 bg-card" : "border-border bg-secondary/40"
                                        }`}
                                      >
                                        <div className="flex items-center gap-2 min-w-0">
                                          <agent.icon className={`w-3.5 h-3.5 shrink-0 ${enabled ? "text-primary" : "text-muted-foreground"}`} />
                                          <span className={`text-xs font-medium truncate ${enabled ? "" : "text-muted-foreground"}`}>{agent.name}</span>
                                        </div>
                                        <Switch
                                          checked={enabled}
                                          onCheckedChange={(val) => toggleAgent(c.id, agent.key, val)}
                                          disabled={loading}
                                          className="shrink-0 ml-2 scale-90"
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentesIASection;
