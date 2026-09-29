import { Settings, User, Shield, Bell, Globe, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const ConfiguracoesSection = () => {
  const { user } = useAuth();

  const settingsGroups = [
    {
      title: "Dados da Conta",
      icon: User,
      items: [
        { label: "Email", value: user?.email || "—" },
        { label: "Nome", value: user?.user_metadata?.full_name || "—" },
        { label: "Função", value: "Administrador (CEO)" },
      ],
    },
    {
      title: "Segurança",
      icon: Shield,
      items: [
        { label: "Autenticação", value: "Email + Senha" },
        { label: "Último acesso", value: new Date().toLocaleDateString("pt-BR") },
      ],
    },
    {
      title: "Integrações",
      icon: Globe,
      items: [
        { label: "WhatsApp", value: "Configuração pendente" },
        { label: "Google Agenda", value: "Não conectado" },
      ],
    },
    {
      title: "Agentes IA",
      icon: Bot,
      items: [
        { label: "Modelo de linguagem", value: "Ativo" },
        { label: "Qualificação automática", value: "Ativo" },
        { label: "Atendimento WhatsApp", value: "Configuração pendente" },
      ],
    },
    {
      title: "Notificações",
      icon: Bell,
      items: [
        { label: "Novos leads", value: "Ativo" },
        { label: "Reuniões agendadas", value: "Ativo" },
        { label: "Relatórios semanais", value: "Ativo" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-display font-bold">Configurações</h2>
        <p className="text-sm text-muted-foreground">Ajustes e controles da plataforma</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {settingsGroups.map((group) => (
          <Card key={group.title} className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <group.icon className="w-4 h-4 text-primary" />
                {group.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {group.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConfiguracoesSection;
