import { useEffect, useState } from "react";
import { MousePointerClick, Send, CheckCircle2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { supabase } from "@/integrations/supabase/client";

const chartConfig = {
  total: { label: "Eventos", color: "hsl(215 90% 52%)" },
} satisfies ChartConfig;

interface EventRow {
  event_name: string;
  cta_label: string | null;
  created_at: string;
}

const ConversoesSection = () => {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("conversion_events")
        .select("event_name, cta_label, created_at")
        .order("created_at", { ascending: false })
        .limit(2000);
      setEvents(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const clicks = events.filter((e) => e.event_name === "cta_click").length;
  const submits = events.filter((e) => e.event_name === "diagnosis_submit").length;
  const leads = events.filter((e) => e.event_name === "diagnosis_success").length;
  const rate = clicks > 0 ? Math.round((leads / clicks) * 100) : 0;

  const stats = [
    { label: "Cliques em CTAs", value: clicks, icon: MousePointerClick, color: "text-primary" },
    { label: "Diagnósticos enviados", value: submits, icon: Send, color: "text-accent" },
    { label: "Leads gerados", value: leads, icon: CheckCircle2, color: "text-green-400" },
    { label: "Taxa de conversão", value: `${rate}%`, icon: TrendingUp, color: "text-yellow-400" },
  ];

  const byCta = Object.entries(
    events
      .filter((e) => e.event_name === "cta_click" && e.cta_label)
      .reduce<Record<string, number>>((acc, e) => {
        acc[e.cta_label!] = (acc[e.cta_label!] || 0) + 1;
        return acc;
      }, {}),
  )
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total);

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    return {
      name: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      total: events.filter((e) => e.created_at.slice(0, 10) === key).length,
    };
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Eventos nos últimos 7 dias</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px] w-full">
            <BarChart data={last7}>
              <CartesianGrid vertical={false} strokeOpacity={0.15} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="total" fill="var(--color-total)" radius={6} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Cliques por CTA</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {byCta.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum clique registrado ainda.</p>
          )}
          {byCta.map((c) => (
            <div key={c.name} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
              <span className="text-sm">{c.name}</span>
              <span className="text-sm font-semibold">{c.total}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversoesSection;
