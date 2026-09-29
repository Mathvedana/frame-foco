import { FileBarChart, TrendingUp, Building2, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  companies: any[];
  leads: any[];
  meetings: any[];
  stats: { totalCompanies: number; totalLeads: number; totalMeetings: number; hotLeads: number; totalReports: number };
}

const RelatoriosSection = ({ companies, leads, meetings, stats }: Props) => {
  const [reports, setReports] = useState<any[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    supabase.from("reports").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setReports(data || []);
      setLoadingReports(false);
    });
  }, []);

  const conversionRate = stats.totalLeads > 0 ? Math.round((stats.hotLeads / stats.totalLeads) * 100) : 0;

  const summaryCards = [
    { label: "Relatórios Gerados", value: reports.length, icon: FileBarChart, color: "text-primary" },
    { label: "Empresas Analisadas", value: new Set(reports.map(r => r.company_id)).size, icon: Building2, color: "text-accent" },
    { label: "Taxa de Conversão Geral", value: `${conversionRate}%`, icon: TrendingUp, color: "text-green-400" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-display font-bold">Relatórios Estratégicos</h2>
        <p className="text-sm text-muted-foreground">Dados e análises de crescimento</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {summaryCards.map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-5">
            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
            <p className="text-2xl font-display font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Metrics Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Desempenho Geral</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Leads Gerados", value: stats.totalLeads, max: Math.max(stats.totalLeads, 50) },
              { label: "Leads Qualificados", value: stats.hotLeads, max: Math.max(stats.totalLeads, 50) },
              { label: "Reuniões Agendadas", value: stats.totalMeetings, max: Math.max(stats.totalLeads, 50) },
              { label: "Empresas Ativas", value: stats.totalCompanies, max: Math.max(stats.totalCompanies, 20) },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (item.value / item.max) * 100)}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Crescimento por Empresa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {companies.slice(0, 5).map((c) => {
              const compLeads = leads.filter(l => l.company_id === c.id).length;
              const compMeetings = meetings.filter(m => m.company_id === c.id).length;
              return (
                <div key={c.id} className="glass-card rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.segment || "—"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{compLeads} leads</p>
                      <p className="text-xs text-muted-foreground">{compMeetings} reuniões</p>
                    </div>
                  </div>
                </div>
              );
            })}
            {companies.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Sem dados</p>}
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">Relatórios Gerados</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loadingReports ? (
            <div className="p-8 flex justify-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : reports.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Nenhum relatório gerado ainda.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Tipo</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Plano</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium capitalize">{r.report_type}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          r.plan_level === "platina" ? "bg-yellow-500/15 text-yellow-400" :
                          r.plan_level === "elite" ? "bg-accent/15 text-accent" :
                          "bg-primary/15 text-primary"
                        }`}>{r.plan_level}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatoriosSection;
