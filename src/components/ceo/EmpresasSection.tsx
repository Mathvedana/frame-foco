import { useState } from "react";
import { Building2, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Props {
  companies: any[];
  leads: any[];
  meetings: any[];
  onRefresh: () => void;
}

const EmpresasSection = ({ companies, leads, meetings, onRefresh }: Props) => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({ name: "", segment: "", revenue: "", plan: "essencial" as string, status: "ativo" });

  const getCompanyLeads = (companyId: string) => leads.filter(l => l.company_id === companyId);
  const getCompanyMeetings = (companyId: string) => meetings.filter(m => m.company_id === companyId);

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", segment: "", revenue: "", plan: "essencial", status: "ativo" });
    setDialogOpen(true);
  };

  const openEdit = (c: any) => {
    setEditing(c);
    setForm({ name: c.name, segment: c.segment || "", revenue: c.revenue || "", plan: c.plan, status: c.status });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase.from("companies").update({
          name: form.name.trim(),
          segment: form.segment.trim() || null,
          revenue: form.revenue.trim() || null,
          plan: form.plan as any,
          status: form.status,
        }).eq("id", editing.id);
        if (error) throw error;
        toast({ title: "Empresa atualizada!" });
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Não autenticado");
        const { error } = await supabase.from("companies").insert({
          name: form.name.trim(),
          segment: form.segment.trim() || null,
          revenue: form.revenue.trim() || null,
          plan: form.plan as any,
          status: form.status,
          owner_id: user.id,
        });
        if (error) throw error;
        toast({ title: "Empresa criada!" });
      }
      setDialogOpen(false);
      onRefresh();
    } catch (err: any) {
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const { error } = await supabase.from("companies").delete().eq("id", deleteId);
      if (error) throw error;
      toast({ title: "Empresa excluída!" });
      setDeleteId(null);
      onRefresh();
    } catch (err: any) {
      toast({ title: "Erro ao excluir", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-display font-bold">Empresas Cadastradas</h2>
          <p className="text-sm text-muted-foreground">{companies.length} empresas no método NVL</p>
        </div>
        <Button onClick={openNew} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Nova Empresa
        </Button>
      </div>

      {companies.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground mb-4">Nenhuma empresa cadastrada ainda.</p>
            <Button onClick={openNew} variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" /> Cadastrar Primeira Empresa
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {companies.map((company) => {
            const compLeads = getCompanyLeads(company.id);
            const compMeetings = getCompanyMeetings(company.id);
            const hotLeads = compLeads.filter(l => l.status === "quente").length;
            const convRate = compLeads.length > 0 ? Math.round((hotLeads / compLeads.length) * 100) : 0;

            return (
              <Card key={company.id} className="bg-card border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold">{company.name}</h3>
                        <p className="text-xs text-muted-foreground">{company.segment || "Segmento não definido"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        company.plan === "platina" ? "bg-yellow-500/15 text-yellow-400" :
                        company.plan === "elite" ? "bg-accent/15 text-accent" :
                        "bg-primary/15 text-primary"
                      }`}>
                        NVL {company.plan}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(company)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteId(company.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="glass-card rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Leads</p>
                      <p className="text-lg font-display font-bold">{compLeads.length}</p>
                    </div>
                    <div className="glass-card rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Leads Quentes</p>
                      <p className="text-lg font-display font-bold text-destructive">{hotLeads}</p>
                    </div>
                    <div className="glass-card rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Reuniões</p>
                      <p className="text-lg font-display font-bold">{compMeetings.length}</p>
                    </div>
                    <div className="glass-card rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Conversão</p>
                      <p className="text-lg font-display font-bold text-accent">{convRate}%</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progresso no método</span>
                      <span className="font-medium">{company.plan_months_remaining ?? 0} meses restantes</span>
                    </div>
                    <Progress value={company.plan_months_remaining ? Math.max(10, 100 - (company.plan_months_remaining / 12) * 100) : 50} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Empresa" : "Nova Empresa"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input placeholder="Nome da empresa" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Segmento" value={form.segment} onChange={(e) => setForm({ ...form, segment: e.target.value })} />
            <Input placeholder="Faturamento" value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })} />
            <Select value={form.plan} onValueChange={(v) => setForm({ ...form, plan: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="essencial">Essencial</SelectItem>
                <SelectItem value="elite">Elite</SelectItem>
                <SelectItem value="platina">Platina</SelectItem>
              </SelectContent>
            </Select>
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? "Salvando..." : "Salvar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir empresa?</AlertDialogTitle>
            <AlertDialogDescription>Esta ação não pode ser desfeita. Leads e reuniões associados também serão afetados.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmpresasSection;
