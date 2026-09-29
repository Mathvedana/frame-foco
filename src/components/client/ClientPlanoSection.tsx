import { Layers, Star, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  company: any;
}

const ClientPlanoSection = ({ company }: Props) => {
  if (!company) {
    return (
      <div className="text-center py-12 text-muted-foreground">Nenhuma empresa vinculada.</div>
    );
  }

  const planFeatures: Record<string, string[]> = {
    essencial: [
      "Diagnóstico empresarial completo",
      "Funil de vendas estruturado",
      "Relatórios mensais de desempenho",
      "2 agentes de IA ativos",
      "Suporte por WhatsApp",
    ],
    elite: [
      "Tudo do plano Essencial",
      "Estratégias avançadas de conversão",
      "Relatórios semanais detalhados",
      "3 agentes de IA ativos",
      "Mentoria em grupo",
      "Suporte prioritário",
    ],
    platina: [
      "Tudo do plano Elite",
      "Mentoria individual com especialista",
      "4 agentes de IA personalizados",
      "Relatórios estratégicos exclusivos",
      "Acesso à Imersão NVL",
      "Acompanhamento dedicado",
      "Suporte VIP",
    ],
  };

  const features = planFeatures[company.plan] || planFeatures.essencial;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-display font-bold">Meu Plano NVL</h2>
        <p className="text-sm text-muted-foreground">Detalhes da sua assinatura</p>
      </div>

      {/* Plan Card */}
      <Card className="bg-card border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-hero p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-foreground/70">Plano Atual</p>
                <h3 className="text-2xl font-display font-bold text-primary-foreground capitalize mt-1">
                  NVL {company.plan}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-primary-foreground/70">Tempo restante</p>
                <p className="text-2xl font-display font-bold text-primary-foreground mt-1">
                  {company.plan_months_remaining ?? 0} meses
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <h4 className="font-display font-bold text-sm">O que está incluso:</h4>
            <div className="space-y-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-sm text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Info */}
      <Card className="bg-card border-border">
        <CardContent className="p-6 space-y-3">
          <h4 className="font-display font-bold text-sm mb-4">Dados da Empresa</h4>
          {[
            { label: "Empresa", value: company.name },
            { label: "Segmento", value: company.segment || "Não definido" },
            { label: "Faturamento", value: company.revenue || "Não informado" },
            { label: "Status", value: company.status },
            { label: "Início do plano", value: company.plan_start_date ? new Date(company.plan_start_date).toLocaleDateString("pt-BR") : "—" },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientPlanoSection;
