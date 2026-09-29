import { supabase } from "@/integrations/supabase/client";

export type ConversionEvent = "cta_click" | "diagnosis_submit" | "diagnosis_success";

/**
 * Registra um evento de conversão (clique em CTA ou envio de diagnóstico).
 * Nunca bloqueia a navegação: falhas são silenciosas.
 */
export const trackConversion = (event: ConversionEvent, ctaLabel?: string) => {
  try {
    void supabase.from("conversion_events").insert({
      event_name: event,
      cta_label: ctaLabel?.slice(0, 120) ?? null,
      page_path: window.location.pathname.slice(0, 200),
      referrer: document.referrer ? document.referrer.slice(0, 300) : null,
    });
  } catch {
    // ignora erros de tracking
  }
};
