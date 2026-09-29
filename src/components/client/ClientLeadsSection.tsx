import { useState } from "react";
import { Users, Zap, Target, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Props {
  leads: any[];
  companyId: string;
  onRefresh: () => void;
}

const ClientLeadsSection = ({ leads, companyId, onRefresh }: Props) => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", status: "frio" as string });

  const hotLeads = leads.filter(l => l.status === "quente");
  const warmLeads = leads.filter(l => l.status === "morno");
  const coldLeads = leads.filter(l => l.status === "frio");

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", phone: "", status: "frio" });
    setDialogOpen(true);
  };

  const openEdit = (l: any) => {
    setEditing(l);
    setForm({ name: l.name, phone: l.phone || "", status: l.status });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase.from("leads").update({
          name: form.name.trim(),
          phone: form.phone.trim() || null,
          status: form.status as any,
        }).eq("id", editing.id);
        if (error) throw error;
        toast({ title: "Lead atualizado!" });
      } else {
        const { error } = await supabase.from("leads").insert({
          name: form.name.trim(),
          phone: form.phone.trim() || null,
          status: form.status as any,
          company_id: companyId,
        });
        if (error) throw error;
        toast({ title: "Lead criado!" });
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
      const { error } = await supabase.from("leads").delete().eq("id", deleteId);
      if (error) throw error;
      toast({ title: "Lead excluído!" });
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
          <h2 className="text-lg font-display font-bold">Meus Leads</h2>
          <p className="text-sm text-muted-foreground">{leads.length} leads no total</p>
        </div>
        <Button onClick={openNew} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Novo Lead
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5">
          <Zap className="w-5 h-5 text-destructive mb-2" />
          <p className="text-2xl font-display font-bold">{hotLeads.length}</p>
          <p className="text-xs text-muted-foreground">Quentes</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Target className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-display font-bold">{warmLeads.length}</p>
          <p className="text-xs text-muted-foreground">Mornos</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Users className="w-5 h-5 text-primary mb-2" />
          <p className="text-2xl font-display font-bold">{coldLeads.length}</p>
          <p className="text-xs text-muted-foreground">Frios</p>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">Todos os Leads</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {leads.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Nenhum lead gerado ainda.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Nome</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Telefone</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Data</th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">{lead.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{lead.phone || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          lead.status === "quente" ? "bg-destructive/15 text-destructive" :
                          lead.status === "morno" ? "bg-accent/15 text-accent" :
                          "bg-primary/15 text-primary"
                        }`}>{lead.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(lead)}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteId(lead.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Lead" : "Novo Lead"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input placeholder="Nome do lead" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Telefone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="frio">Frio</SelectItem>
                <SelectItem value="morno">Morno</SelectItem>
                <SelectItem value="quente">Quente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? "Salvando..." : "Salvar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir lead?</AlertDialogTitle>
            <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
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

export default ClientLeadsSection;
