import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Only allow internal callers (the diagnose function passes the service-role key).
    const authHeader = req.headers.get("Authorization");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!authHeader || !serviceKey || authHeader !== `Bearer ${serviceKey}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { diagnosis_id, company_name, segment, revenue, ai_analysis } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `Você é um agente de qualificação de leads da Frame & Foco.
Analise os dados abaixo e classifique o lead.

Empresa: ${company_name}
Segmento: ${segment}
Faturamento: ${revenue}
Análise do diagnóstico: ${ai_analysis || "Não disponível"}

Classifique este lead com base no potencial de se tornar cliente do Método NVL.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: "Você é o Agente de Qualificação da Frame & Foco. Classifique leads usando a função fornecida.",
          },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "classify_lead",
              description: "Classifica um lead como quente, morno ou frio com justificativa.",
              parameters: {
                type: "object",
                properties: {
                  classification: {
                    type: "string",
                    enum: ["quente", "morno", "frio"],
                    description: "quente = alta probabilidade de fechar, morno = potencial mas precisa nutrição, frio = baixo interesse ou potencial",
                  },
                  reason: {
                    type: "string",
                    description: "Breve justificativa da classificação em português (max 200 chars)",
                  },
                },
                required: ["classification", "reason"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "classify_lead" } },
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    let classification = "frio";
    let reason = "Classificação padrão";

    if (toolCall?.function?.arguments) {
      try {
        const args = JSON.parse(toolCall.function.arguments);
        classification = args.classification || "frio";
        reason = args.reason || "Sem justificativa";
      } catch {
        console.error("Failed to parse tool call arguments");
      }
    }

    // Update diagnosis_requests with qualification
    if (diagnosis_id) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

      await fetch(`${supabaseUrl}/rest/v1/diagnosis_requests?id=eq.${diagnosis_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          lead_qualification: classification,
          qualification_reason: reason,
        }),
      });
    }

    return new Response(JSON.stringify({ classification, reason }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("qualify-lead error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro interno" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
