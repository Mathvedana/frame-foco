import { useState, useEffect } from "react";
import { Presentation, Play, Clock, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { imersoes } from "./mentoria-data";
import MentoriaDetailView from "./MentoriaDetailView";

const ImersaoSection = () => {
  const { user } = useAuth();
  const [selectedImersao, setSelectedImersao] = useState<string | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  const totalLessons = imersoes.reduce((acc, m) => acc + m.lessons.length, 0);

  useEffect(() => {
    if (!user) return;
    const fetchAllProgress = async () => {
      const { data } = await supabase
        .from("mentoria_progress")
        .select("mentoria_id, lesson_id")
        .eq("user_id", user.id)
        .eq("completed", true);
      if (data) {
        const map: Record<string, number> = {};
        data.forEach((d: any) => {
          map[d.mentoria_id] = (map[d.mentoria_id] || 0) + 1;
        });
        setProgressMap(map);
      }
    };
    fetchAllProgress();
  }, [user, selectedImersao]);

  const activeImersao = imersoes.find((m) => m.id === selectedImersao);

  if (activeImersao) {
    return (
      <MentoriaDetailView
        mentoria={activeImersao}
        onBack={() => setSelectedImersao(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-display font-bold">Imersão NVL</h2>
        <p className="text-sm text-muted-foreground">O nível mais profundo do método — treinamento intensivo com apresentações</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5">
          <BookOpen className="w-5 h-5 text-primary mb-2" />
          <p className="text-2xl font-display font-bold">{imersoes.length}</p>
          <p className="text-xs text-muted-foreground">Módulos</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Play className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-display font-bold">{totalLessons}</p>
          <p className="text-xs text-muted-foreground">Aulas</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Clock className="w-5 h-5 text-green-400 mb-2" />
          <p className="text-2xl font-display font-bold">15h+</p>
          <p className="text-xs text-muted-foreground">De Conteúdo</p>
        </div>
      </div>

      {/* Modules */}
      <div className="grid md:grid-cols-2 gap-4">
        {imersoes.map((mod) => {
          const completed = progressMap[mod.id] || 0;
          const percent = Math.round((completed / mod.lessons.length) * 100);

          return (
            <Card
              key={mod.id}
              className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => setSelectedImersao(mod.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Presentation className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
                    {mod.category}
                  </span>
                </div>
                <h3 className="font-display font-bold text-sm mb-1">{mod.title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{mod.description}</p>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{completed}/{mod.lessons.length} aulas</span>
                    <span>{percent}%</span>
                  </div>
                  <Progress value={percent} className="h-1.5" />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Play className="w-3 h-3" /> {mod.lessons.length} aulas
                  </span>
                  <span className="text-primary font-medium">Acessar →</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ImersaoSection;
