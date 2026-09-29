import { 
  LayoutDashboard, Building2, Bot, FileBarChart, GraduationCap, 
  Presentation, Users, Settings, LogOut, Cpu, MousePointerClick
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeNotifications } from "@/hooks/use-realtime-notifications";
import nvlLogo from "@/assets/nvl-logo.png";
import AiChat from "@/components/AiChat";
import DashboardSection from "@/components/ceo/DashboardSection";
import EmpresasSection from "@/components/ceo/EmpresasSection";
import AgentesIASection from "@/components/ceo/AgentesIASection";
import AgentesFrameSection from "@/components/ceo/AgentesFrameSection";
import RelatoriosSection from "@/components/ceo/RelatoriosSection";
import MentoriasSection from "@/components/ceo/MentoriasSection";
import ImersaoSection from "@/components/ceo/ImersaoSection";
import LeadsSection from "@/components/ceo/LeadsSection";
import ConfiguracoesSection from "@/components/ceo/ConfiguracoesSection";
import ConversoesSection from "@/components/ceo/ConversoesSection";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Building2, label: "Empresas" },
  { icon: FileBarChart, label: "Relatórios" },
  { icon: GraduationCap, label: "Mentorias" },
  { icon: Presentation, label: "Imersão NVL" },
  { icon: Users, label: "Leads Frame & Foco" },
  { icon: MousePointerClick, label: "Conversões" },
  { icon: Bot, label: "Agentes IA" },
  { icon: Cpu, label: "Agentes IA Frame & Foco" },
  { icon: Settings, label: "Configurações" },
];

const sectionTitles: Record<string, string> = {
  "Dashboard": "Dashboard CEO — Visão do Negócio",
  "Empresas": "Empresas",
  "Agentes IA": "Agentes de Inteligência Artificial",
  "Agentes IA Frame & Foco": "Agentes IA — Frame & Foco",
  "Relatórios": "Relatórios Estratégicos",
  "Mentorias": "Mentorias",
  "Imersão NVL": "Imersão NVL",
  "Leads Frame & Foco": "Leads Frame & Foco",
  "Conversões": "Conversões — CTAs e Diagnóstico NVL",
  "Configurações": "Configurações",
};

interface Stats {
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
}

const CeoDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const { signOut } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalCompanies: 0, totalLeads: 0, totalMeetings: 0,
    essencial: 0, elite: 0, platina: 0,
    hotLeads: 0, warmLeads: 0, coldLeads: 0,
    activeMeetings: 0, totalReports: 0,
  });
  const [companies, setCompanies] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useRealtimeNotifications({
    context: "ceo",
    onNewLead: () => setRefreshKey((k) => k + 1),
    onNewMeeting: () => setRefreshKey((k) => k + 1),
    onNewDiagnosis: () => setRefreshKey((k) => k + 1),
  });

  useEffect(() => {
    const fetchData = async () => {
      const [companiesRes, leadsRes, meetingsRes, reportsRes] = await Promise.all([
        supabase.from("companies").select("*"),
        supabase.from("leads").select("*"),
        supabase.from("meetings").select("*"),
        supabase.from("reports").select("id"),
      ]);

      const comps = companiesRes.data || [];
      const allLeads = leadsRes.data || [];
      const allMeetings = meetingsRes.data || [];

      setCompanies(comps);
      setLeads(allLeads);
      setMeetings(allMeetings);

      setStats({
        totalCompanies: comps.length,
        totalLeads: allLeads.length,
        totalMeetings: allMeetings.length,
        essencial: comps.filter(c => c.plan === "essencial").length,
        elite: comps.filter(c => c.plan === "elite").length,
        platina: comps.filter(c => c.plan === "platina").length,
        hotLeads: allLeads.filter(l => l.status === "quente").length,
        warmLeads: allLeads.filter(l => l.status === "morno").length,
        coldLeads: allLeads.filter(l => l.status === "frio").length,
        activeMeetings: allMeetings.filter(m => m.status === "agendada").length,
        totalReports: reportsRes.data?.length || 0,
      });
      setLoading(false);
    };
    fetchData();
  }, [refreshKey]);

  const renderSection = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    switch (activeMenu) {
      case "Dashboard":
        return <DashboardSection companies={companies} leads={leads} meetings={meetings} stats={stats} />;
      case "Empresas":
        return <EmpresasSection companies={companies} leads={leads} meetings={meetings} onRefresh={() => setRefreshKey((k) => k + 1)} />;
      case "Agentes IA":
        return <AgentesIASection companies={companies} leads={leads} />;
      case "Agentes IA Frame & Foco":
        return <AgentesFrameSection />;
      case "Relatórios":
        return <RelatoriosSection companies={companies} leads={leads} meetings={meetings} stats={stats} />;
      case "Mentorias":
        return <MentoriasSection />;
      case "Imersão NVL":
        return <ImersaoSection />;
      case "Leads Frame & Foco":
        return <LeadsSection />;
      case "Conversões":
        return <ConversoesSection />;
      case "Configurações":
        return <ConfiguracoesSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <img src={nvlLogo} alt="NVL" className="w-8 h-8" />
            <div>
              <p className="font-display font-bold text-sm">Frame & Foco</p>
              <p className="text-xs text-muted-foreground">Painel CEO</p>
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
        <div className="p-4">
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 border-b border-border flex items-center justify-between px-8">
          <h1 className="font-display text-xl font-bold">{sectionTitles[activeMenu] || activeMenu}</h1>
          <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-xs font-bold">
            D
          </div>
        </header>

        <div className="p-8">
          {renderSection()}
        </div>
      </main>
      <AiChat context="ceo" />
    </div>
  );
};

export default CeoDashboard;
