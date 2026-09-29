const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-6 text-center">
      <p className="font-display font-bold text-lg mb-1">
        FRAME & FOCO
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        Estratégia • Audiovisual • Crescimento
      </p>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center text-sm text-muted-foreground mb-6">
        <a href="https://wa.me/5516988307267" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          WhatsApp: +55 16 98830-7267
        </a>
        <a href="https://www.instagram.com/frameefoco01?igsh=MTQ3aXc5Y3pjaGN4cg==" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          Instagram: @frameefoco01
        </a>
      </div>

      <p className="font-display text-lg font-bold">
        Crescimento não é acidente.
        <br />
        <span className="text-gradient-hero">É decisão. 🚀</span>
      </p>

      <p className="text-xs text-muted-foreground mt-6">
        © {new Date().getFullYear()} Frame & Foco. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
