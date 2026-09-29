import { MessageCircle } from "lucide-react";
import { trackConversion } from "@/lib/tracking";

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/5516988307267"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar no WhatsApp"
    onClick={() => trackConversion("cta_click", "Botão flutuante — WhatsApp")}
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white shadow-glow transition-transform hover:scale-110"
  >
    <MessageCircle className="w-7 h-7" />
  </a>
);

export default FloatingWhatsApp;
