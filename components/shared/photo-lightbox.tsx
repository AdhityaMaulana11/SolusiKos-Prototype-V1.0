"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoLightboxProps {
  photos: {
    id: string;
    url: string;
    caption?: string;
  }[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  // Placeholder gradient for demo (when no real images)
  placeholderGradient?: string;
}

export function PhotoLightbox({
  photos,
  initialIndex = 0,
  isOpen,
  onClose,
  placeholderGradient = "from-amber-400 to-orange-500",
}: PhotoLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsLoading(true);
    setImageError(false);
  }, [initialIndex, isOpen]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    setIsLoading(true);
    setImageError(false);
    setIsZoomed(false);
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    setIsLoading(true);
    setImageError(false);
    setIsZoomed(false);
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handlePrevious, handleNext, onClose]);

  if (!isOpen) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 animate-in fade-in duration-200">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-4">
          <span className="text-white/80 text-sm font-medium">
            {currentIndex + 1} / {photos.length}
          </span>
          {currentPhoto?.caption && (
            <span className="text-white/60 text-sm hidden sm:inline">
              {currentPhoto.caption}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title={isZoomed ? "Zoom Out" : "Zoom In"}
          >
            {isZoomed ? (
              <ZoomOut className="h-5 w-5" />
            ) : (
              <ZoomIn className="h-5 w-5" />
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

      {/* Main Image */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center p-4 sm:p-12 transition-all duration-300",
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in",
        )}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        {imageError || !currentPhoto?.url.startsWith("/images/") ? (
          // Placeholder gradient for demo mode
          <div
            className={cn(
              "w-full max-w-4xl aspect-[4/3] rounded-xl bg-gradient-to-br flex items-center justify-center transition-transform duration-300",
              placeholderGradient,
              isZoomed ? "scale-150" : "scale-100",
            )}
          >
            <div className="text-center text-white/80">
              <div className="grid grid-cols-4 gap-3 p-12 opacity-30">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-6 w-6 rounded bg-white/40" />
                ))}
              </div>
              <p className="text-lg font-medium mt-4">
                {currentPhoto?.caption || `Foto ${currentIndex + 1}`}
              </p>
              <p className="text-sm text-white/50 mt-1">
                Demo Mode - Gambar Placeholder
              </p>
            </div>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-4 border-white/20 border-t-white animate-spin" />
              </div>
            )}
            <img
              src={currentPhoto.url}
              alt={currentPhoto.caption || `Foto ${currentIndex + 1}`}
              className={cn(
                "max-h-full max-w-full object-contain rounded-lg transition-all duration-300",
                isLoading && "opacity-0",
                isZoomed ? "scale-150" : "scale-100",
              )}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setImageError(true);
              }}
            />
          </>
        )}
      </div>

      {/* Navigation Arrows */}
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            title="Sebelumnya"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            title="Berikutnya"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Thumbnail Navigation */}
      {photos.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="flex justify-center gap-2 overflow-x-auto pb-2">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                  setIsLoading(true);
                  setImageError(false);
                  setIsZoomed(false);
                }}
                className={cn(
                  "h-16 w-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                  currentIndex === index
                    ? "border-white ring-2 ring-white/30"
                    : "border-white/30 hover:border-white/60 opacity-60 hover:opacity-100",
                )}
              >
                {photo.url.startsWith("/images/") ? (
                  <img
                    src={photo.url}
                    alt={photo.caption || `Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient placeholder
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    className={cn(
                      "h-full w-full bg-gradient-to-br flex items-center justify-center text-white/60 text-xs",
                      placeholderGradient,
                    )}
                  >
                    {index + 1}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard hint */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/40 text-xs hidden sm:flex gap-4">
        <span>← → Navigasi</span>
        <span>ESC Tutup</span>
      </div>
    </div>
  );
}
