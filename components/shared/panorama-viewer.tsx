"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  X,
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PanoramaViewerProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// Custom panorama viewer that works with regular panorama images (not equirectangular)
export function PanoramaViewer({
  imageUrl,
  isOpen,
  onClose,
  title,
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // Auto-rotate using native scroll
  useEffect(() => {
    if (!isOpen || !isAutoPlaying || isLoading || !scrollRef.current) return;

    const scrollEl = scrollRef.current;
    const speed = 0.8; // pixels per frame

    const animate = () => {
      if (!scrollEl || !isAutoPlaying) return;

      const newScrollLeft = scrollEl.scrollLeft + speed;
      if (newScrollLeft >= scrollEl.scrollWidth - scrollEl.clientWidth) {
        scrollEl.scrollLeft = 0;
      } else {
        scrollEl.scrollLeft = newScrollLeft;
      }
      setScrollPosition(scrollEl.scrollLeft);
    };

    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [isOpen, isAutoPlaying, isLoading]);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    if (scrollRef.current) {
      setMaxScroll(
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
      );
    }
  }, []);

  // Handle manual scroll
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
      setMaxScroll(
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
      );
    }
  }, []);

  // Stop auto-play on user interaction
  const handleInteractionStart = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  // Navigation buttons
  const scrollBy = useCallback((amount: number) => {
    if (scrollRef.current) {
      setIsAutoPlaying(false);
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  }, []);

  // Update maxScroll on resize
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      if (scrollRef.current) {
        setMaxScroll(
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        scrollBy(-200);
      } else if (e.key === "ArrowRight") {
        scrollBy(200);
      } else if (e.key === " ") {
        e.preventDefault();
        setIsAutoPlaying((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, scrollBy]);

  const handleReset = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      setScrollPosition(0);
    }
    setIsAutoPlaying(true);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const progressPercent =
    maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0;

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black/95 animate-in fade-in duration-200"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-4">
          <span className="text-white font-medium text-sm">
            {title || "360° Panorama View"}
          </span>
          <span className="text-white/50 text-xs hidden sm:inline">
            Geser untuk melihat sekeliling
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title={isAutoPlaying ? "Pause" : "Play"}
          >
            {isAutoPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={handleReset}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Reset View"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-white/20 border-t-primary animate-spin" />
          </div>
          <p className="mt-4 text-white/70 text-sm">Memuat panorama...</p>
        </div>
      )}

      {/* Scrollable panorama container */}
      <div
        ref={scrollRef}
        className={cn(
          "absolute inset-0 overflow-x-auto overflow-y-hidden flex items-center transition-opacity duration-300 pt-16 pb-20",
          isLoading ? "opacity-0" : "opacity-100",
        )}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        onScroll={handleScroll}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
      >
        <img
          src={imageUrl}
          alt="Panorama 360"
          className="h-full max-h-[80vh] w-auto max-w-none select-none"
          style={{
            minWidth: "200%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          onLoad={handleImageLoad}
          draggable={false}
        />
      </div>

      {/* Hide scrollbar with CSS */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Navigation arrows */}
      <button
        onClick={() => scrollBy(-300)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => scrollBy(300)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Bottom controls hint */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/70 to-transparent p-4">
        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-4">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 text-white/50 text-xs">
          <span className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
            Geser atau gunakan panah
          </span>
          <span className="hidden sm:flex items-center gap-2">
            <span className="inline-block px-2 h-5 rounded border border-white/30 text-[10px] flex items-center">
              SPACE
            </span>
            Play/Pause
          </span>
          <span className="hidden sm:flex items-center gap-2">
            <span className="inline-block px-2 h-5 rounded border border-white/30 text-[10px] flex items-center">
              ESC
            </span>
            Tutup
          </span>
        </div>
      </div>
    </div>
  );
}

// Inline panorama viewer for embedding in page
interface InlinePanoramaProps {
  imageUrl: string;
  className?: string;
  height?: string;
  onExpand?: () => void;
}

export function InlinePanorama({
  imageUrl,
  className,
  height = "420px",
  onExpand,
}: InlinePanoramaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // Auto-rotate using native scroll
  useEffect(() => {
    if (!isAutoPlaying || isLoading || !scrollRef.current) return;

    const scrollEl = scrollRef.current;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      if (!scrollEl || !isAutoPlaying) return;

      const newScrollLeft = scrollEl.scrollLeft + speed;
      if (newScrollLeft >= scrollEl.scrollWidth - scrollEl.clientWidth) {
        scrollEl.scrollLeft = 0;
      } else {
        scrollEl.scrollLeft = newScrollLeft;
      }
      setScrollPosition(scrollEl.scrollLeft);
    };

    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isLoading]);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    if (scrollRef.current) {
      setMaxScroll(
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
      );
    }
  }, []);

  // Handle manual scroll
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
      setMaxScroll(
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
      );
    }
  }, []);

  // Stop auto-play on user interaction
  const handleInteractionStart = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  // Navigation buttons
  const scrollBy = useCallback((amount: number) => {
    if (scrollRef.current) {
      setIsAutoPlaying(false);
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  }, []);

  // Update maxScroll on resize
  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        setMaxScroll(
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const progressPercent =
    maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-slate-900", className)}
      style={{ height }}
    >
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-white/20 border-t-primary animate-spin" />
          </div>
          <p className="mt-4 text-white/70 text-sm">Memuat panorama...</p>
        </div>
      )}

      {/* Scrollable panorama container */}
      <div
        ref={scrollRef}
        className={cn(
          "absolute inset-0 overflow-x-auto overflow-y-hidden scrollbar-hide transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
        )}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        onScroll={handleScroll}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
      >
        <img
          src={imageUrl}
          alt="Panorama 360"
          className="h-full w-auto max-w-none select-none"
          style={{
            minWidth: "200%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          onLoad={handleImageLoad}
          draggable={false}
        />
      </div>

      {/* Hide scrollbar with CSS */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Navigation arrows */}
      {!isLoading && (
        <>
          <button
            onClick={() => scrollBy(-200)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBy(200)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Expand button */}
      {onExpand && !isLoading && (
        <button
          onClick={onExpand}
          className="absolute top-3 right-3 z-10 flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-sm px-3 py-2 text-white text-sm hover:bg-black/70 transition-colors"
        >
          <Maximize2 className="h-4 w-4" />
          <span className="hidden sm:inline">Perbesar</span>
        </button>
      )}

      {/* Play/Pause button */}
      {!isLoading && (
        <button
          onClick={() => setIsAutoPlaying((prev) => !prev)}
          className="absolute top-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
        >
          {isAutoPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </button>
      )}

      {/* Hint overlay */}
      {!isLoading && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1.5 text-white/80 text-xs">
          <RotateCcw className="h-3 w-3" />
          Geser untuk menjelajah
        </div>
      )}

      {/* Progress indicator */}
      {!isLoading && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
          <div
            className="h-full bg-primary/70 transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </div>
  );
}
