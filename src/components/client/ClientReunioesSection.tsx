import { useState } from "react";
import { Calendar, Clock, CheckCircle, XCircle, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Props {
  meetings: any[];
  companyId: string;
  onRefresh: () => void;
}

const ClientReunioesSection = ({ meetings, companyId, onRefresh }: Props) => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ meeting_date: "", status: "agendada", notes: "" });

  const scheduled = meetings.filter(m => m.status === "agendada");
  const completed = meetings.filter(m => m.status === "realizada");
  const cancelled = meetings.filter(m => m.status === "cancelada");

  const openNew = () => {
    setEditing(null);
    setForm({ meeting_date: "", status: "agendada", notes: "" });
    setDialogOpen(true);
  };

  const openEdit = (m: any) => {
    setEditing(m);
    const d = new Date(m.meeting_date);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setForm({ meeting_date: local, status: m.status, notes: m.notes || "" });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.meeting_date) return;
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase.from("meetings").update({
          meeting_date: new Date(form.meeting_date).toISOString(),
          status: form.status,
          notes: form.notes.trim() || null,
        }).eq("id", editing.id);
        if (error) throw error;
        toast({ title: "Reunião atualizada!" });
      } else {
        const { error } = await supabase.from("meetings").insert({
          meeting_date: new Date(form.meeting_date).toISOString(),
          status: form.status,
          notes: form.notes.trim() || null,
          company_id: companyId,
        });
        if (error) throw error;
        toast({ title: "Reunião agendada!" });
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
      const { error } = await supabase.from("meetings").delete().eq("id", deleteId);
      if (error) throw error;
      toast({ title: "Reunião excluída!" });
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
          <h2 className="text-lg font-display font-bold">Minhas Reuniões</h2>
          <p className="text-sm text-muted-foreground">{meetings.length} reuniões no total</p>
        </div>
        <Button onClick={openNew} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Nova Reunião
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5">
          <Calendar className="w-5 h-5 text-primary mb-2" />
          <p className="text-2xl font-display font-bold">{scheduled.length}</p>
          <p className="text-xs text-muted-foreground">Agendadas</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
          <p className="text-2xl font-display font-bold">{completed.length}</p>
          <p className="text-xs text-muted-foreground">Realizadas</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <XCircle className="w-5 h-5 text-muted-foreground mb-2" />
          <p className="text-2xl font-display font-bold">{cancelled.length}</p>
          <p className="text-xs text-muted-foreground">Canceladas</p>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">Todas as Reuniões</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {meetings.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Nenhuma reunião agendada.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Data</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Horário</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Notas</th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {meetings.map((m) => {
                    const date = new Date(m.meeting_date);
                    return (
                      <tr key={m.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium">{date.toLocaleDateString("pt-BR")}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            m.status === "agendada" ? "bg-primary/15 text-primary" :
                            m.status === "realizada" ? "bg-green-500/15 text-green-400" :
                            "bg-secondary text-muted-foreground"
                          }`}>{m.status}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">{m.notes || "—"}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(m)}>
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteId(m.id)}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Reunião" : "Nova Reunião"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input type="datetime-local" value={form.meeting_date} onChange={(e) => setForm({ ...form, meeting_date: e.target.value })} />
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="agendada">Agendada</SelectItem>
                <SelectItem value="realizada">Realizada</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Notas (opcional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
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
            <AlertDialogTitle>Excluir reunião?</AlertDialogTitle>
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

export default ClientReunioesSection;
