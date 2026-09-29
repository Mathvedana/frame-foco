import jsPDF from "jspdf";

export type DiagnosisPdfData = {
  companyName: string;
  contactName: string;
  segment: string;
  revenue: string;
  whatsapp: string;
  analysis: string;
};

const stripMarkdown = (text: string): string =>
  text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/^---$/gm, "");

/** Gera o relatório do Diagnóstico NVL em PDF e devolve o nome do arquivo salvo. */
export const generateDiagnosisPdf = (data: DiagnosisPdfData): string => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;

  // Cabeçalho
  doc.setFillColor(10, 12, 18);
  doc.rect(0, 0, pageWidth, 110, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("FRAME & FOCO", margin, 50);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 140, 40);
  doc.text("Diagnostico NVL  |  Narrativa . Valor . Longo Prazo", margin, 72);
  doc.setTextColor(180, 190, 205);
  doc.setFontSize(9);
  doc.text(
    `Emitido em ${new Date().toLocaleDateString("pt-BR")}`,
    margin,
    92,
  );

  let y = 145;

  // Dados da empresa
  doc.setTextColor(20, 24, 32);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Dados da empresa", margin, y);
  y += 8;
  doc.setDrawColor(255, 140, 40);
  doc.setLineWidth(2);
  doc.line(margin, y, margin + 60, y);
  y += 22;

  doc.setFontSize(10.5);
  const rows: [string, string][] = [
    ["Empresa", data.companyName],
    ["Contato", data.contactName],
    ["Segmento", data.segment],
    ["Faturamento mensal", data.revenue],
    ["WhatsApp", data.whatsapp],
  ];
  rows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(value || "-"), margin + 130, y, { maxWidth: contentWidth - 130 });
    y += 18;
  });

  y += 16;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Analise estrategica", margin, y);
  y += 8;
  doc.line(margin, y, margin + 60, y);
  y += 24;

  // Corpo da análise
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const paragraphs = stripMarkdown(data.analysis).split(/\n+/).filter((p) => p.trim());
  paragraphs.forEach((paragraph) => {
    const lines = doc.splitTextToSize(paragraph.trim(), contentWidth) as string[];
    lines.forEach((line) => {
      if (y > pageHeight - 90) {
        doc.addPage();
        y = margin + 20;
      }
      doc.text(line, margin, y);
      y += 16;
    });
    y += 8;
  });

  // Rodapé em todas as páginas
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(20, 24, 32);
    doc.text("Crescimento nao e acidente. E decisao.", margin, pageHeight - 46);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(120, 130, 145);
    doc.text(
      "frameefoco.lovable.app  |  WhatsApp +55 16 98830-7267  |  @frameefoco01",
      margin,
      pageHeight - 30,
    );
    doc.text(`${i}/${total}`, pageWidth - margin, pageHeight - 30, { align: "right" });
  }

  const slug = (data.companyName || "empresa")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  const fileName = `diagnostico-nvl-${slug || "empresa"}.pdf`;
  doc.save(fileName);
  return fileName;
};
