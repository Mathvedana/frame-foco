import { 
  LayoutDashboard, Users, Calendar, FileBarChart, Layers, 
  TrendingUp, Activity, UserPlus, BarChart3, Lightbulb, LogOut, Zap, Target
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeNotifications } from "@/hooks/use-realtime-notifications";
import nvlLogo from "@/assets/nvl-logo.png";
import AiChat from "@/components/AiChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  PieChart as RechartsPie, Pie, Cell,
} from "recharts";
import ClientLeadsSection from "@/components/client/ClientLeadsSection";
import ClientReunioesSection from "@/components/client/ClientReunioesSection";
import ClientRelatoriosSection from "@/components/client/ClientRelatoriosSection";
import ClientPlanoSection from "@/components/client/ClientPlanoSection";

const menuItems = [
  { icon: LayoutDashboard, label: "Meu Crescimento" },
  { icon: Users, label: "Leads" },
  { icon: Calendar, label: "Reuniões" },
  { icon: FileBarChart, label: "Relatórios" },
  { icon: Layers, label: "Plano NVL" },
];

const growthChartConfig = {
  leads: { label: "Leads", color: "hsl(215 90% 52%)" },
  meetings: { label: "Reuniões", color: "hsl(25 95% 55%)" },
} satisfies ChartConfig;

const leadStatusConfig = {
  quente: { label: "Quente", color: "hsl(0 84% 60%)" },
  morno: { label: "Morno", color: "hsl(25 95% 55%)" },
  frio: { label: "Frio", color: "hsl(215 90% 52%)" },
} satisfies ChartConfig;

const LEAD_COLORS = ["hsl(0 84% 60%)", "hsl(25 95% 55%)", "hsl(215 90% 52%)"];

const sectionTitles: Record<string, string> = {
  "Meu Crescimento": "Meu Crescimento",
  "Leads": "Meus Leads",
  "Reuniões": "Minhas Reuniões",
  "Relatórios": "Meus Relatórios",
  "Plano NVL": "Meu Plano NVL",
};

const ClientDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Meu Crescimento");
  const { signOut, user } = useAuth();
  const [company, setCompany] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [reportsCount, setReportsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useRealtimeNotifications({
    context: "client",
    onNewLead: () => setRefreshKey((k) => k + 1),
    onNewMeeting: () => setRefreshKey((k) => k + 1),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const { data: comp } = await supabase
        .from("companies").select("*").eq("owner_id", user.id).single();

      if (comp) {
        setCompany(comp);
        const [leadsRes, meetingsRes, reportsRes] = await Promise.all([
          supabase.from("leads").select("*").eq("company_id", comp.id).order("created_at", { ascending: false }),
          supabase.from("meetings").select("*").eq("company_id", comp.id),
          supabase.from("reports").select("id").eq("company_id", comp.id),
        ]);
        setLeads(leadsRes.data || []);
        setMeetings(meetingsRes.data || []);
        setReportsCount(reportsRes.data?.length || 0);
      }
      setLoading(false);
    };
    fetchData();
  }, [user, refreshKey]);

  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.status === "quente").length;
  const warmLeads = leads.filter(l => l.status === "morno").length;
  const coldLeads = leads.filter(l => l.status === "frio").length;
  const activeMeetings = meetings.filter(m => m.status === "agendada").length;
  const conversionRate = totalLeads > 0 ? Math.round((hotLeads / totalLeads) * 100) : 0;
  const meetingRate = totalLeads > 0 ? Math.round((meetings.length / totalLeads) * 100) : 0;

  const getMonthlyData = () => {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const now = new Date();
    const last6 = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthIdx = d.getMonth();
      const year = d.getFullYear();
      last6.push({
        month: months[monthIdx],
        leads: leads.filter(l => { const ld = new Date(l.created_at); return ld.getMonth() === monthIdx && ld.getFullYear() === year; }).length,
        meetings: meetings.filter(m => { const md = new Date(m.meeting_date); return md.getMonth() === monthIdx && md.getFullYear() === year; }).length,
      });
    }
    return last6;
  };

  const leadFunnel = [
    { name: "Quente", value: hotLeads },
    { name: "Morno", value: warmLeads },
    { name: "Frio", value: coldLeads },
  ].filter(p => p.value > 0);

  const strategies = [
    { name: "Captação de Leads", performance: Math.min(100, coldLeads * 10 + 20), status: totalLeads > 5 ? "Funcionando" : "Em progresso" },
    { name: "Aquecimento de Leads", performance: conversionRate, status: conversionRate > 30 ? "Funcionando" : "Otimizando" },
    { name: "Agendamento de Reuniões", performance: meetingRate, status: meetingRate > 20 ? "Funcionando" : "Em progresso" },
  ];

  const opportunities: { icon: any; title: string; description: string; impact: string }[] = [];
  if (coldLeads > warmLeads) opportunities.push({ icon: Zap, title: "Aquecer leads frios", description: `Você tem ${coldLeads} leads frios. Uma sequência de follow-up pode convertê-los.`, impact: "Alto" });
  if (meetings.length < hotLeads) opportunities.push({ icon: Calendar, title: "Agendar mais reuniões", description: `${hotLeads} leads quentes aguardam contato.`, impact: "Alto" });
  opportunities.push({ icon: Lightbulb, title: "Presença digital", description: "Invista em conteúdo nas redes sociais.", impact: "Médio" });

  const statCards = [
    { label: "Leads Totais", value: totalLeads, icon: Target, color: "text-accent" },
    { label: "Leads Quentes", value: hotLeads, icon: Zap, color: "text-destructive" },
    { label: "Reuniões Agendadas", value: activeMeetings, icon: Calendar, color: "text-primary" },
    { label: "Taxa de Conversão", value: `${conversionRate}%`, icon: TrendingUp, color: "text-accent" },
  ];

  const monthlyData = getMonthlyData();

  const renderGrowthSection = () => (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-5 hover:border-primary/30 transition-colors">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
            <p className="text-3xl font-display font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Crescimento — Últimos 6 Meses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={growthChartConfig} className="h-[250px] w-full">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="clientLeadsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(215 90% 52%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(215 90% 52%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="clientMeetingsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(25 95% 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(25 95% 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(215 10% 55%)' }} />
                <YAxis className="text-xs" tick={{ fill: 'hsl(215 10% 55%)' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="leads" stroke="hsl(215 90% 52%)" fill="url(#clientLeadsFill)" strokeWidth={2} />
                <Area type="monotone" dataKey="meetings" stroke="hsl(25 95% 55%)" fill="url(#clientMeetingsFill)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-accent" />
              Funil de Leads — Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <ChartContainer config={leadStatusConfig} className="h-[220px] w-[220px]">
                <RechartsPie>
                  <Pie data={leadFunnel} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" strokeWidth={2} stroke="hsl(220 20% 4%)">
                    {leadFunnel.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={LEAD_COLORS[index % LEAD_COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RechartsPie>
              </ChartContainer>
              <div className="flex-1 space-y-4">
                {[
                  { label: "Quente", value: hotLeads, pct: totalLeads ? Math.round((hotLeads / totalLeads) * 100) : 0 },
                  { label: "Morno", value: warmLeads, pct: totalLeads ? Math.round((warmLeads / totalLeads) * 100) : 0 },
                  { label: "Frio", value: coldLeads, pct: totalLeads ? Math.round((coldLeads / totalLeads) * 100) : 0 },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value} ({item.pct}%)</span>
                    </div>
                    <Progress value={item.pct} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategies & Opportunities */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Estratégias — Desempenho
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {strategies.map((strategy) => (
              <div key={strategy.name} className="glass-card rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{strategy.name}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    strategy.status === "Funcionando" ? "bg-green-500/15 text-green-400" :
                    strategy.status === "Otimizando" ? "bg-accent/15 text-accent" :
                    "bg-secondary text-muted-foreground"
                  }`}>{strategy.status}</span>
                </div>
                <Progress value={strategy.performance} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">{strategy.performance}% de efetividade</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              Oportunidades para Crescer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {opportunities.map((opp, idx) => (
              <div key={idx} className="glass-card rounded-lg p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <opp.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{opp.title}</h4>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        opp.impact === "Alto" ? "bg-destructive/15 text-destructive" : "bg-accent/15 text-accent"
                      }`}>{opp.impact}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{opp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads Table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Leads Recentes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {leads.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Nenhum lead gerado ainda.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Nome</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Telefone</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.slice(0, 10).map((lead) => (
                    <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">{lead.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{lead.phone || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          lead.status === "quente" ? "bg-destructive/15 text-destructive" :
                          lead.status === "morno" ? "bg-accent/15 text-accent" :
                          "bg-primary/15 text-primary"
                        }`}>{lead.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );

  const renderSection = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }
    if (!company) {
      return (
        <div className="glass-card rounded-xl p-12 text-center">
          <p className="text-muted-foreground">Nenhuma empresa vinculada à sua conta ainda.</p>
        </div>
      );
    }

    switch (activeMenu) {
      case "Meu Crescimento":
        return renderGrowthSection();
      case "Leads":
        return <ClientLeadsSection leads={leads} companyId={company.id} onRefresh={() => setRefreshKey((k) => k + 1)} />;
      case "Reuniões":
        return <ClientReunioesSection meetings={meetings} companyId={company.id} onRefresh={() => setRefreshKey((k) => k + 1)} />;
      case "Relatórios":
        return <ClientRelatoriosSection companyId={company.id} leads={leads} meetings={meetings} />;
      case "Plano NVL":
        return <ClientPlanoSection company={company} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 border-r border-border bg-card/50 flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <img src={nvlLogo} alt="NVL" className="w-8 h-8" />
            <div>
              <p className="font-display font-bold text-sm">NVL</p>
              <p className="text-xs text-muted-foreground">Área do Cliente</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeMenu === item.label
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {company && (
          <div className="p-4 m-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Plano Atual</p>
            <p className="font-display font-bold text-primary capitalize">NVL {company.plan}</p>
            <p className="text-xs text-muted-foreground mt-1">{company.plan_months_remaining} meses restantes</p>
          </div>
        )}

        <div className="p-4">
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="h-16 border-b border-border flex items-center justify-between px-8">
          <h1 className="font-display text-xl font-bold">{sectionTitles[activeMenu] || activeMenu}</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{company?.name || "Minha Empresa"}</span>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              {company?.name?.[0] || "N"}
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {renderSection()}
        </div>
      </main>
      <AiChat context="client" />
    </div>
  );
};

export default ClientDashboard;
