import {
  Building2, Target, Zap, Calendar, TrendingUp, FileBarChart,
  Activity, UserPlus, BarChart3, Lightbulb, PieChart, ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  PieChart as RechartsPie, Pie, Cell,
} from "recharts";

const growthChartConfig = {
  leads: { label: "Leads", color: "hsl(215 90% 52%)" },
  meetings: { label: "Reuniões", color: "hsl(25 95% 55%)" },
} satisfies ChartConfig;

const planChartConfig = {
  essencial: { label: "Essencial", color: "hsl(215 90% 52%)" },
  elite: { label: "Elite", color: "hsl(25 95% 55%)" },
  platina: { label: "Platina", color: "hsl(45 95% 55%)" },
} satisfies ChartConfig;

const leadStatusConfig = {
  quente: { label: "Quente", color: "hsl(0 84% 60%)" },
  morno: { label: "Morno", color: "hsl(25 95% 55%)" },
  frio: { label: "Frio", color: "hsl(215 90% 52%)" },
} satisfies ChartConfig;

const COLORS = ["hsl(215 90% 52%)", "hsl(25 95% 55%)", "hsl(45 95% 55%)"];
const LEAD_COLORS = ["hsl(0 84% 60%)", "hsl(25 95% 55%)", "hsl(215 90% 52%)"];

interface Props {
  companies: any[];
  leads: any[];
  meetings: any[];
  stats: {
    totalCompanies: number;
    totalLeads: number;
    totalMeetings: number;
    essencial: number;
    elite: number;
    platina: number;
    hotLeads: number;
    warmLeads: number;
    coldLeads: number;
    activeMeetings: number;
    totalReports: number;
  };
}

const DashboardSection = ({ companies, leads, meetings, stats }: Props) => {
  const conversionRate = stats.totalLeads > 0 ? Math.round((stats.hotLeads / stats.totalLeads) * 100) : 0;
  const meetingRate = stats.totalLeads > 0 ? Math.round((stats.totalMeetings / stats.totalLeads) * 100) : 0;

  const getMonthlyData = () => {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const now = new Date();
    const last6 = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthIdx = d.getMonth();
      const year = d.getFullYear();
      const monthLeads = leads.filter(l => {
        const ld = new Date(l.created_at);
        return ld.getMonth() === monthIdx && ld.getFullYear() === year;
      }).length;
      const monthMeetings = meetings.filter(m => {
        const md = new Date(m.meeting_date);
        return md.getMonth() === monthIdx && md.getFullYear() === year;
      }).length;
      last6.push({ month: months[monthIdx], leads: monthLeads, meetings: monthMeetings });
    }
    return last6;
  };

  const planDistribution = [
    { name: "Essencial", value: stats.essencial },
    { name: "Elite", value: stats.elite },
    { name: "Platina", value: stats.platina },
  ].filter(p => p.value > 0);

  const leadFunnel = [
    { name: "Quente", value: stats.hotLeads },
    { name: "Morno", value: stats.warmLeads },
    { name: "Frio", value: stats.coldLeads },
  ].filter(p => p.value > 0);

  const strategies = [
    { name: "Geração de Leads Orgânico", performance: Math.min(100, stats.coldLeads * 10 + 20), status: stats.totalLeads > 5 ? "Funcionando" : "Em progresso" },
    { name: "Aquecimento de Leads", performance: conversionRate, status: conversionRate > 30 ? "Funcionando" : "Otimizando" },
    { name: "Agendamento de Reuniões", performance: meetingRate, status: meetingRate > 20 ? "Funcionando" : "Em progresso" },
    { name: "Conversão via Follow-up", performance: Math.min(100, stats.hotLeads * 15 + 10), status: stats.hotLeads > 3 ? "Funcionando" : "Início" },
  ];

  const opportunities: { icon: any; title: string; description: string; impact: string }[] = [];
  if (stats.coldLeads > stats.warmLeads) opportunities.push({ icon: Zap, title: "Aquecer leads frios", description: `Você tem ${stats.coldLeads} leads frios. Implemente uma sequência de follow-up.`, impact: "Alto" });
  if (stats.totalMeetings < stats.hotLeads) opportunities.push({ icon: Calendar, title: "Agendar mais reuniões", description: `${stats.hotLeads} leads quentes sem reunião.`, impact: "Alto" });
  if (stats.essencial > stats.elite) opportunities.push({ icon: ArrowUpRight, title: "Upgrade de planos", description: `${stats.essencial} empresas no Essencial. Oportunidade de upsell.`, impact: "Médio" });
  opportunities.push({ icon: Lightbulb, title: "Presença digital", description: "Invista em conteúdo nas redes sociais.", impact: "Médio" });

  const statCards = [
    { label: "Empresas Ativas", value: stats.totalCompanies, icon: Building2, color: "text-primary" },
    { label: "Leads Totais", value: stats.totalLeads, icon: Target, color: "text-accent" },
    { label: "Leads Quentes", value: stats.hotLeads, icon: Zap, color: "text-destructive" },
    { label: "Reuniões Agendadas", value: stats.activeMeetings, icon: Calendar, color: "text-primary" },
    { label: "Taxa de Conversão", value: `${conversionRate}%`, icon: TrendingUp, color: "text-accent" },
    { label: "Relatórios", value: stats.totalReports, icon: FileBarChart, color: "text-muted-foreground" },
  ];

  const monthlyData = getMonthlyData();

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-4 hover:border-primary/30 transition-colors">
            <stat.icon className={`w-4 h-4 ${stat.color} mb-2`} />
            <p className="text-2xl font-display font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
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
                  <linearGradient id="leadsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(215 90% 52%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(215 90% 52%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="meetingsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(25 95% 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(25 95% 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(215 10% 55%)' }} />
                <YAxis className="text-xs" tick={{ fill: 'hsl(215 10% 55%)' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="leads" stroke="hsl(215 90% 52%)" fill="url(#leadsFill)" strokeWidth={2} />
                <Area type="monotone" dataKey="meetings" stroke="hsl(25 95% 55%)" fill="url(#meetingsFill)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-accent" />
              Funil de Clientes — Status dos Leads
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
                  { label: "Quente", value: stats.hotLeads, pct: stats.totalLeads ? Math.round((stats.hotLeads / stats.totalLeads) * 100) : 0 },
                  { label: "Morno", value: stats.warmLeads, pct: stats.totalLeads ? Math.round((stats.warmLeads / stats.totalLeads) * 100) : 0 },
                  { label: "Frio", value: stats.coldLeads, pct: stats.totalLeads ? Math.round((stats.coldLeads / stats.totalLeads) * 100) : 0 },
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
              Estratégias — O que está funcionando
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
              Oportunidades para Vender Mais
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

      {/* Plan Distribution & Companies Table */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <PieChart className="w-4 h-4 text-primary" />
              Distribuição de Planos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ChartContainer config={planChartConfig} className="h-[200px] w-[200px]">
              <RechartsPie>
                <Pie data={planDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={2} stroke="hsl(220 20% 4%)">
                  {planDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </RechartsPie>
            </ChartContainer>
            <div className="flex gap-4 mt-2">
              {planDistribution.map((p, i) => (
                <div key={p.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{p.name}: {p.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              Empresas Ativas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {companies.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">Nenhuma empresa cadastrada ainda.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Empresa</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Plano</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Segmento</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Meses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((c) => (
                      <tr key={c.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer">
                        <td className="px-6 py-4 text-sm font-medium">{c.name}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            c.plan === "platina" ? "bg-yellow-500/15 text-yellow-400" :
                            c.plan === "elite" ? "bg-accent/15 text-accent" :
                            "bg-primary/15 text-primary"
                          }`}>{c.plan}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{c.segment || "—"}</td>
                        <td className="px-6 py-4">
                          <span className={`w-2 h-2 rounded-full inline-block mr-2 ${c.status === "ativo" ? "bg-green-500" : "bg-accent"}`} />
                          <span className="text-sm text-muted-foreground">{c.status}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{c.plan_months_remaining ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSection;
