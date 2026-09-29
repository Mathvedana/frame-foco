import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/frame-foco-logo-transparent.svg";


const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links: { label: string; href: string; route?: boolean; external?: boolean }[] = [
    { label: "Início", href: "#top" },
    { label: "Sobre", href: "#sobre" },
    { label: "Método NVL", href: "#metodo" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logoAsset} alt="Frame & Foco" className="h-10 md:h-12 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#diagnostico">
            <button className="bg-gradient-hero text-primary-foreground text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity">
              🚀 Diagnóstico NVL
            </button>
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-4 space-y-3">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#diagnostico" className="block text-sm font-semibold text-primary" onClick={() => setOpen(false)}>
            🚀 Diagnóstico NVL
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
