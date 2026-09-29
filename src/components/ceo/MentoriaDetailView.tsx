import { useState, useEffect } from "react";
import { ArrowLeft, Play, Presentation, CheckCircle, Circle, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Mentoria, Lesson } from "./mentoria-data";
import MentoriaSlidePlayer from "./MentoriaSlidePlayer";

interface MentoriaDetailViewProps {
  mentoria: Mentoria;
  onBack: () => void;
}

const MentoriaDetailView = ({ mentoria, onBack }: MentoriaDetailViewProps) => {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showSlides, setShowSlides] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProgress = async () => {
      const { data } = await supabase
        .from("mentoria_progress")
        .select("lesson_id")
        .eq("user_id", user.id)
        .eq("mentoria_id", mentoria.id)
        .eq("completed", true);
      if (data) setCompletedLessons(new Set(data.map((d: any) => d.lesson_id)));
    };
    fetchProgress();
  }, [user, mentoria.id]);

  const progressPercent = mentoria.lessons.length
    ? Math.round((completedLessons.size / mentoria.lessons.length) * 100)
    : 0;

  const toggleComplete = async (lesson: Lesson) => {
    if (!user) return;
    const isCompleted = completedLessons.has(lesson.id);

    if (isCompleted) {
      await supabase
        .from("mentoria_progress")
        .delete()
        .eq("user_id", user.id)
        .eq("mentoria_id", mentoria.id)
        .eq("lesson_id", lesson.id);
      setCompletedLessons((prev) => {
        const next = new Set(prev);
        next.delete(lesson.id);
        return next;
      });
    } else {
      await supabase.from("mentoria_progress").upsert({
        user_id: user.id,
        mentoria_id: mentoria.id,
        lesson_id: lesson.id,
        completed: true,
        completed_at: new Date().toISOString(),
      }, { onConflict: "user_id,mentoria_id,lesson_id" });
      setCompletedLessons((prev) => new Set(prev).add(lesson.id));
    }
  };

  const goToNextLesson = () => {
    if (!activeLesson) return;
    const idx = mentoria.lessons.findIndex((l) => l.id === activeLesson.id);
    if (idx < mentoria.lessons.length - 1) {
      setActiveLesson(mentoria.lessons[idx + 1]);
    }
  };

  // Slide presentation view
  if (activeLesson && showSlides && activeLesson.slides.length > 0) {
    return (
      <div className="h-[calc(100vh-6rem)]">
        <MentoriaSlidePlayer
          slides={activeLesson.slides}
          lessonTitle={activeLesson.title}
          onClose={() => setShowSlides(false)}
        />
      </div>
    );
  }

  // Lesson detail view
  if (activeLesson) {
    const currentIdx = mentoria.lessons.findIndex((l) => l.id === activeLesson.id);
    const isLast = currentIdx === mentoria.lessons.length - 1;
    const isComplete = completedLessons.has(activeLesson.id);

    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setActiveLesson(null)} className="gap-2 text-muted-foreground">
          <ArrowLeft className="w-4 h-4" /> Voltar para aulas
        </Button>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Aula {currentIdx + 1} de {mentoria.lessons.length}</p>
          <h2 className="text-lg font-display font-bold">{activeLesson.title}</h2>
        </div>

        {/* Slide presentation preview */}
        <button
          onClick={() => setShowSlides(true)}
          className="w-full aspect-video bg-secondary rounded-xl flex items-center justify-center border border-border hover:border-primary/40 transition-colors group cursor-pointer"
        >
          <div className="text-center">
            <Presentation className="w-12 h-12 text-muted-foreground group-hover:text-primary mx-auto mb-2 transition-colors" />
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Abrir Apresentação ({activeLesson.slides.length} slides)
            </p>
            <p className="text-xs text-muted-foreground mt-1">Pressione F para tela cheia</p>
          </div>
        </button>

        {/* Lesson info */}
        <div className="glass-card rounded-xl p-6 space-y-4">
          <h3 className="font-display font-bold text-sm">Sobre esta aula</h3>
          <p className="text-sm text-muted-foreground">{activeLesson.description}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              className="gap-2"
              onClick={() => setShowSlides(true)}
            >
              <Presentation className="w-4 h-4" /> Apresentar
            </Button>
            <Button
              variant={isComplete ? "secondary" : "outline"}
              className="gap-2"
              onClick={() => toggleComplete(activeLesson)}
            >
              {isComplete ? <><CheckCircle className="w-4 h-4" /> Concluída</> : <><Circle className="w-4 h-4" /> Marcar como concluída</>}
            </Button>
            {!isLast && (
              <Button variant="outline" className="gap-2" onClick={goToNextLesson}>
                Próxima aula <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Mentoria overview with lesson list
  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 text-muted-foreground">
        <ArrowLeft className="w-4 h-4" /> Voltar para mentorias
      </Button>

      <div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
          {mentoria.category}
        </span>
        <h2 className="text-lg font-display font-bold mt-2">{mentoria.title}</h2>
        <p className="text-sm text-muted-foreground">{mentoria.description}</p>
      </div>

      {/* Progress */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progresso</span>
          <span className="text-sm font-bold text-primary">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {completedLessons.size} de {mentoria.lessons.length} aulas concluídas
        </p>
      </div>

      {/* Lesson list */}
      <div className="space-y-2">
        {mentoria.lessons.map((lesson, idx) => {
          const done = completedLessons.has(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => setActiveLesson(lesson)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors text-left ${
                done
                  ? "bg-primary/5 border-primary/20"
                  : "bg-card border-border hover:border-primary/30"
              }`}
            >
              <div className="shrink-0">
                {done ? (
                  <CheckCircle className="w-5 h-5 text-primary" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-xs text-muted-foreground">
                    {idx + 1}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${done ? "text-primary" : ""}`}>
                  Aula {idx + 1} — {lesson.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">{lesson.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Presentation className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{lesson.slides.length} slides</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MentoriaDetailView;
