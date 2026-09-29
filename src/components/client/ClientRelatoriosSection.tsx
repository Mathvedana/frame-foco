import { FileBarChart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  companyId: string;
  leads: any[];
  meetings: any[];
}

const ClientRelatoriosSection = ({ companyId, leads, meetings }: Props) => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("reports").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).then(({ data }) => {
      setReports(data || []);
      setLoading(false);
    });
  }, [companyId]);

  const hotLeads = leads.filter(l => l.status === "quente").length;
  const convRate = leads.length > 0 ? Math.round((hotLeads / leads.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-display font-bold">Meus Relatórios</h2>
        <p className="text-sm text-muted-foreground">Análise de crescimento da sua empresa</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5">
          <FileBarChart className="w-5 h-5 text-primary mb-2" />
          <p className="text-2xl font-display font-bold">{reports.length}</p>
          <p className="text-xs text-muted-foreground">Relatórios</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <TrendingUp className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-display font-bold">{convRate}%</p>
          <p className="text-xs text-muted-foreground">Conversão</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <TrendingUp className="w-5 h-5 text-green-400 mb-2" />
          <p className="text-2xl font-display font-bold">{leads.length}</p>
          <p className="text-xs text-muted-foreground">Total Leads</p>
        </div>
      </div>

      {/* Performance */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">Desempenho</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Leads Gerados", value: leads.length, max: Math.max(leads.length, 20) },
            { label: "Leads Qualificados", value: hotLeads, max: Math.max(leads.length, 20) },
            { label: "Reuniões", value: meetings.length, max: Math.max(leads.length, 20) },
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

      {/* Reports List */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">Relatórios Gerados</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
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
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium capitalize">{r.report_type}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{new Date(r.created_at).toLocaleDateString("pt-BR")}</td>
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

export default ClientRelatoriosSection;
