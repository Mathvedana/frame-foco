import { useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RealtimeNotificationsOptions {
  context: "ceo" | "client";
  onNewLead?: () => void;
  onNewMeeting?: () => void;
  onNewDiagnosis?: () => void;
}

export const useRealtimeNotifications = ({
  context,
  onNewLead,
  onNewMeeting,
  onNewDiagnosis,
}: RealtimeNotificationsOptions) => {
  const { toast } = useToast();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const handleInsert = useCallback(
    (table: string, payload: any) => {
      const record = payload.new;

      if (table === "leads") {
        const statusLabel =
          record.status === "quente" ? "🔥 Quente" : record.status === "morno" ? "🌡️ Morno" : "❄️ Frio";
        toast({
          title: "Novo Lead!",
          description: `${record.name} — ${statusLabel}`,
        });
        onNewLead?.();
      }

      if (table === "meetings") {
        const date = new Date(record.meeting_date).toLocaleDateString("pt-BR");
        toast({
          title: "Nova Reunião Agendada!",
          description: `Reunião em ${date}`,
        });
        onNewMeeting?.();
      }

      if (table === "diagnosis_requests" && context === "ceo") {
        toast({
          title: "Novo Diagnóstico!",
          description: `${record.contact_name} — ${record.company_name}`,
        });
        onNewDiagnosis?.();
      }
    },
    [toast, context, onNewLead, onNewMeeting, onNewDiagnosis]
  );

  useEffect(() => {
    const channel = supabase
      .channel("realtime-notifications")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, (payload) =>
        handleInsert("leads", payload)
      )
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "meetings" }, (payload) =>
        handleInsert("meetings", payload)
      );

    if (context === "ceo") {
      channel.on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "diagnosis_requests" },
        (payload) => handleInsert("diagnosis_requests", payload)
      );
    }

    channel.subscribe();
    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [context, handleInsert]);
};
