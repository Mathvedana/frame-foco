import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Maximize, Minimize, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slide } from "./mentoria-data";

interface MentoriaSlidePlayerProps {
  slides: Slide[];
  lessonTitle: string;
  onClose: () => void;
}

const MentoriaSlidePlayer = ({ slides, lessonTitle, onClose }: MentoriaSlidePlayerProps) => {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slide = slides[current];

  const goNext = useCallback(() => {
    if (current < slides.length - 1) setCurrent((c) => c + 1);
  }, [current, slides.length]);

  const goPrev = useCallback(() => {
    if (current > 0) setCurrent((c) => c - 1);
  }, [current]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
        } else {
          onClose();
        }
      }
      if (e.key === "f" || e.key === "F") toggleFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, onClose, toggleFullscreen]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <div className={`flex flex-col ${isFullscreen ? "fixed inset-0 z-50 bg-background" : "h-full"}`}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
            <X className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium truncate">{lessonTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {current + 1} / {slides.length}
          </span>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Slide area */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <div className="w-full max-w-4xl">
          {/* Slide card */}
          <div className="relative bg-card border border-border rounded-2xl shadow-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-14">
              {/* Slide number tag */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  Slide {current + 1}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-3xl lg:text-4xl font-display font-bold mb-6 md:mb-8 text-foreground leading-tight">
                {slide.title}
              </h2>

              {/* Highlight quote */}
              {slide.highlight && (
                <div className="mb-6 md:mb-8 pl-4 border-l-4 border-primary">
                  <p className="text-sm md:text-base lg:text-lg italic text-primary font-medium">
                    "{slide.highlight}"
                  </p>
                </div>
              )}

              {/* Bullets */}
              <ul className="space-y-2 md:space-y-3">
                {slide.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg text-muted-foreground">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-60" />
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card shrink-0">
        <Button variant="outline" size="sm" onClick={goPrev} disabled={current === 0} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Anterior
        </Button>

        {/* Progress dots */}
        <div className="flex gap-1.5 overflow-x-auto max-w-[50%] px-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                i === current ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <Button variant="outline" size="sm" onClick={goNext} disabled={current === slides.length - 1} className="gap-2">
          Próximo <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MentoriaSlidePlayer;
