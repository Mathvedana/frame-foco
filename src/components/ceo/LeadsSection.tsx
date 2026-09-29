import { Users, Zap, Clock, Flame, Thermometer, Snowflake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const qualificationColors: Record<string, { bg: string; text: string; icon: typeof Flame }> = {
  quente: { bg: "bg-red-500/15", text: "text-red-400", icon: Flame },
  morno: { bg: "bg-accent/15", text: "text-accent", icon: Thermometer },
  frio: { bg: "bg-blue-400/15", text: "text-blue-400", icon: Snowflake },
};

const LeadsSection = () => {
  const [diagnoses, setDiagnoses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("diagnosis_requests").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setDiagnoses(data || []);
      setLoading(false);
    });
  }, []);

  const pending = diagnoses.filter(d => d.status === "pendente").length;
  const analyzed = diagnoses.filter(d => d.status !== "pendente").length;
  const hot = diagnoses.filter(d => d.lead_qualification === "quente").length;
  const warm = diagnoses.filter(d => d.lead_qualification === "morno").length;
  const cold = diagnoses.filter(d => d.lead_qualification === "frio").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-display font-bold">Leads Frame & Foco</h2>
        <p className="text-sm text-muted-foreground">Pessoas e empresas que pediram diagnóstico — qualificação automática por IA</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        <div className="glass-card rounded-xl p-5">
          <Users className="w-5 h-5 text-primary mb-2" />
          <p className="text-2xl font-display font-bold">{diagnoses.length}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Clock className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-display font-bold">{pending}</p>
          <p className="text-xs text-muted-foreground">Pendentes</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Zap className="w-5 h-5 text-green-400 mb-2" />
          <p className="text-2xl font-display font-bold">{analyzed}</p>
          <p className="text-xs text-muted-foreground">Analisados</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Flame className="w-5 h-5 text-red-400 mb-2" />
          <p className="text-2xl font-display font-bold">{hot}</p>
          <p className="text-xs text-muted-foreground">Quentes</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Thermometer className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-display font-bold">{warm}</p>
          <p className="text-xs text-muted-foreground">Mornos</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Snowflake className="w-5 h-5 text-blue-400 mb-2" />
          <p className="text-2xl font-display font-bold">{cold}</p>
          <p className="text-xs text-muted-foreground">Frios</p>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">Solicitações de Diagnóstico</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 flex justify-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : diagnoses.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Nenhuma solicitação ainda.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Contato</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Empresa</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Segmento</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Faturamento</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">WhatsApp</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Qualificação IA</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {diagnoses.map((d) => {
                    const qual = qualificationColors[d.lead_qualification] || null;
                    return (
                      <tr key={d.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium">{d.contact_name}</td>
                        <td className="px-6 py-4 text-sm">{d.company_name}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{d.segment}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{d.revenue}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{d.whatsapp}</td>
                        <td className="px-6 py-4">
                          {qual ? (
                            <Tooltip>
                              <TooltipTrigger>
                                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${qual.bg} ${qual.text}`}>
                                  <qual.icon className="w-3 h-3" />
                                  {d.lead_qualification}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-xs">{d.qualification_reason || "Qualificado por IA"}</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <span className="text-xs text-muted-foreground">Aguardando...</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            d.status === "pendente" ? "bg-accent/15 text-accent" : "bg-green-500/15 text-green-400"
                          }`}>{d.status}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(d.created_at).toLocaleDateString("pt-BR")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsSection;
