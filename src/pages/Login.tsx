import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";
import nvlLogo from "@/assets/nvl-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, role } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // Redirect handled by useEffect below
  };

  // Redirect after role is loaded
  const { user } = useAuth();
  if (user && role) {
    const target = role === "admin" ? "/ceo" : "/cliente";
    navigate(target, { replace: true });
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={nvlLogo} alt="NVL" className="w-12 h-12 mx-auto mb-4" />
          </Link>
          <h1 className="font-display text-2xl font-bold">Entrar no NVL</h1>
          <p className="text-sm text-muted-foreground mt-1">Acesse sua plataforma de crescimento</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-4">
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">{error}</div>
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-secondary border-border h-12"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-secondary border-border h-12"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-hero text-primary-foreground font-semibold h-12 hover:opacity-90 transition-opacity"
          >
            {loading ? "Entrando..." : "Entrar"}
            <LogIn className="ml-2 w-4 h-4" />
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="text-primary hover:underline">← Voltar ao site</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
