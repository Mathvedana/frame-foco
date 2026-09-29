import { useState } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { Send, CheckCircle, Copy, Check, FileDown } from "lucide-react";
import { generateDiagnosisPdf } from "@/lib/diagnosis-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackConversion } from "@/lib/tracking";

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const isValidPhone = (value: string): boolean => {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && /^[1-9]{2}9\d{8}$/.test(digits);
};

const formatMarkdown = (text: string): string => {
  return text
    .replace(/^#{1,6}\s+(.+)$/gm, '<strong>$1</strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />');
};

const stripMarkdown = (text: string): string => {
  return text
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/---/g, '');
};

const DiagnosisForm = ({ embedded = false }: { embedded?: boolean }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [copied, setCopied] = useState(false);
  const [lead, setLead] = useState<{
    company_name: string;
    contact_name: string;
    segment: string;
    revenue: string;
    whatsapp: string;
  } | null>(null);
  const { toast } = useToast();

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidPhone(phone)) {
      setPhoneError("Informe um celular válido com DDD (ex: 11 91234-5678)");
      return;
    }
    setPhoneError("");
    setLoading(true);
    trackConversion("diagnosis_submit", "Formulário Diagnóstico NVL");

    const formData = new FormData(e.currentTarget);
    const payload = {
      company_name: formData.get("company_name") as string,
      contact_name: formData.get("contact_name") as string,
      segment: formData.get("segment") as string,
      revenue: formData.get("revenue") as string,
      whatsapp: phone.replace(/\D/g, ""),
    };

    try {
      const { data, error } = await supabase.functions.invoke("diagnose", {
        body: payload,
      });

      if (error) throw error;

      const resultAnalysis = data.analysis || "";
      setAnalysis(resultAnalysis);
      setLead(payload);
      setSubmitted(true);
      trackConversion("diagnosis_success", "Formulário Diagnóstico NVL");

      // Relatório em PDF gerado automaticamente ao concluir o diagnóstico
      try {
        const fileName = generateDiagnosisPdf({
          companyName: payload.company_name,
          contactName: payload.contact_name,
          segment: payload.segment,
          revenue: payload.revenue,
          whatsapp: phone,
          analysis: resultAnalysis,
        });
        toast({
          title: "Relatório em PDF gerado",
          description: `Salvamos o arquivo ${fileName} no seu dispositivo.`,
        });
      } catch (pdfErr) {
        console.error("Erro ao gerar PDF:", pdfErr);
      }
    } catch (err: any) {
      toast({
        title: "Erro ao enviar diagnóstico",
        description: err.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!lead) return;
    generateDiagnosisPdf({
      companyName: lead.company_name,
      contactName: lead.contact_name,
      segment: lead.segment,
      revenue: lead.revenue,
      whatsapp: phone,
      analysis,
    });
  };

  const handleCopy = () => {
    const cleanAnalysis = stripMarkdown(analysis);
    navigator.clipboard.writeText(`Diagnóstico NVL\n\n${cleanAnalysis}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  if (submitted) {
    const cleanAnalysis = stripMarkdown(analysis);
    const clientPhone = phone.replace(/\D/g, "");
    const waPhone = clientPhone.startsWith("55") ? clientPhone : `55${clientPhone}`;
    const waMessage = encodeURIComponent(
      `Olá! Segue seu diagnóstico NVL:\n\n${cleanAnalysis}\n\nVamos conversar sobre os próximos passos? 😊`
    );
    const waLink = `https://api.whatsapp.com/send?phone=${waPhone}&text=${waMessage}`;

    return (
      <section className={embedded ? "" : "py-24"} id={embedded ? undefined : "diagnostico"}>
        <div className={embedded ? "" : "container mx-auto px-6"}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center glass-card rounded-2xl p-12"
          >
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold mb-2">Diagnóstico pronto!</h3>
            <p className="text-muted-foreground mb-6">Nossa IA analisou sua empresa e o relatório em PDF já foi baixado automaticamente.</p>
            {analysis && (
              <div
                className="text-left bg-secondary rounded-xl p-6 text-sm text-foreground [&_strong]:font-bold mb-4"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(formatMarkdown(analysis), {
                    ALLOWED_TAGS: ["strong", "em", "br"],
                    ALLOWED_ATTR: [],
                  }),
                }}
              />
            )}
            <Button
              onClick={handleDownloadPdf}
              size="lg"
              className="w-full mb-3 h-12 font-semibold bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <FileDown className="mr-2 w-4 h-4" /> Baixar relatório em PDF
            </Button>
            <Button
              onClick={handleCopy}
              size="lg"
              variant="outline"
              className="w-full mb-3 h-12 font-semibold"
            >
              {copied ? <><Check className="mr-2 w-4 h-4" /> Copiado!</> : <><Copy className="mr-2 w-4 h-4" /> Copiar diagnóstico completo</>}
            </Button>
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="w-full bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white font-semibold h-12 transition-colors"
              >
                Falar com a Frame &amp; Foco no WhatsApp
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <p className="text-xs text-muted-foreground mt-3">Copie o diagnóstico acima e cole no WhatsApp para enviar o resultado completo.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className={embedded ? "" : "py-24"} id={embedded ? undefined : "diagnostico"}>
      <div className={embedded ? "" : "container mx-auto px-6"}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          {!embedded && (
            <div className="text-center mb-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Receba seu <span className="text-accent">Diagnóstico</span>
              </h2>
              <p className="text-muted-foreground">Descubra o nível da sua empresa e o caminho para o crescimento.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-4">
            <Input name="company_name" placeholder="Nome da empresa" required className="bg-secondary border-border h-12" />
            <Input name="contact_name" placeholder="Seu nome" required className="bg-secondary border-border h-12" />
            <Input name="segment" placeholder="Segmento de atuação" required className="bg-secondary border-border h-12" />
            <Input name="revenue" placeholder="Faturamento médio mensal" required className="bg-secondary border-border h-12" />
            <div>
              <Input
                name="whatsapp"
                placeholder="(00) 00000-0000"
                required
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(formatPhone(e.target.value));
                  setPhoneError("");
                }}
                className={`bg-secondary border-border h-12 ${phoneError ? "border-destructive" : ""}`}
              />
              {phoneError && <p className="text-destructive text-sm mt-1">{phoneError}</p>}
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-gradient-hero text-primary-foreground font-semibold h-12 hover:opacity-90 transition-opacity"
            >
              {loading ? "Analisando com IA..." : "Receber Diagnóstico NVL"}
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default DiagnosisForm;
