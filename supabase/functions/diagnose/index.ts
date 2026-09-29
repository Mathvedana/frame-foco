import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { company_name, contact_name, segment, revenue, whatsapp } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `Analise esta empresa usando o Método NVL da Frame & Foco.
NVL significa: Narrativa, Valor e Longo Prazo.
- Narrativa: identidade, propósito e posicionamento do negócio.
- Valor: capacidade de comunicar e entregar valor real ao mercado.
- Longo Prazo: visão estratégica e crescimento sustentável.

Empresa: ${company_name}
Contato: ${contact_name}
Segmento: ${segment}
Faturamento médio mensal: ${revenue}
WhatsApp: ${whatsapp}

Identifique:
- Nível de maturidade empresarial (iniciante, intermediário, avançado)
- Posicionamento atual
- Pontos fortes e fracos
- Estratégia inicial recomendada
- Plano NVL sugerido (Essencial, Elite ou Platina)

IMPORTANTE: NVL significa Narrativa, Valor e Longo Prazo. NÃO use "Nível, Valor e Lucro".
Lembre: "Crescimento não é acidente. É decisão."
Responda de forma profissional e estruturada em português. Não use símbolos de markdown como # ou * na resposta.`;

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
            content: "Você é a NVL AI da Frame & Foco. Seu objetivo é estruturar crescimento empresarial para microempreendedores seguindo o Método NVL. O Brasil é movido por microempreendedores.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns minutos." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || "Análise não disponível.";

    // Save to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const saveRes = await fetch(`${supabaseUrl}/rest/v1/diagnosis_requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        company_name,
        contact_name,
        segment,
        revenue,
        whatsapp,
        ai_analysis: analysis,
        status: "pendente",
      }),
    });

    const savedRows = await saveRes.json();
    const diagnosisId = savedRows?.[0]?.id;

    // Auto-qualify lead in background
    if (diagnosisId) {
      const qualifyUrl = `${supabaseUrl}/functions/v1/qualify-lead`;
      fetch(qualifyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          diagnosis_id: diagnosisId,
          company_name,
          segment,
          revenue,
          ai_analysis: analysis,
        }),
      }).catch((err) => console.error("Background qualify-lead error:", err));
    }

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("diagnose error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro interno" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
