import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Images,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";
import { getGalleryData, GalleryImage } from "@/lib/gallery";

interface WorkGalleryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WorkGalleryModal({ open, onOpenChange }: WorkGalleryModalProps) {
  const [galleryData, setGalleryData] = useState(() => getGalleryData());
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [showDriveHint, setShowDriveHint] = useState(false);

  // Re-read gallery data when opened in case env changes or for fresh hydration
  useEffect(() => {
    if (open) {
      setGalleryData(getGalleryData());
    }
  }, [open]);

  const { images, isFromEnv } = galleryData;

  const handleNext = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => ((prev ?? 0) + 1) % images.length);
  }, [activeImageIndex, images.length]);

  const handlePrev = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => ((prev ?? 0) - 1 + images.length) % images.length);
  }, [activeImageIndex, images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeImageIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        setActiveImageIndex(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImageIndex, handleNext, handlePrev]);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const activeImage = activeImageIndex !== null ? images[activeImageIndex] : null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] max-h-[90vh] p-0 overflow-hidden flex flex-col rounded-2xl sm:rounded-3xl border-border bg-card text-card-foreground shadow-2xl outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0">
          {/* Header */}
          <div className="border-b border-border/80 px-5 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/30">
            <DialogHeader className="text-left space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary">
                  <Images className="size-3.5" />
                  Field Gallery
                </span>
                {isFromEnv ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-3" />
                    Drive Synced
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowDriveHint((prev) => !prev)}
                    className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors cursor-pointer outline-none focus:outline-none"
                    title="Click for instructions to add Drive images"
                  >
                    <Sparkles className="size-3 text-amber-500" />
                    Showcase Mode
                    <Info className="size-2.5 ml-0.5" />
                  </button>
                )}
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-card-foreground">
                Our Work & Treatment Gallery
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
                Real photos from our pest control treatments across residential, commercial, and
                industrial sites in Chennai.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="font-mono text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
                {images.length} {images.length === 1 ? "Photo" : "Photos"}
              </span>
            </div>
          </div>

          {/* Drive Configuration Guide Banner */}
          {(!isFromEnv || showDriveHint) && (
            <div className="mx-4 sm:mx-6 mt-4 p-3.5 rounded-xl border border-primary/20 bg-primary/5 text-xs text-muted-foreground flex items-start gap-2.5">
              <Info className="size-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-foreground">
                  How to fetch images from your Google Drive:
                </p>
                <p>
                  Add{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-primary font-bold">
                    VITE_GALLERY_IMAGES
                  </code>{" "}
                  to your <code className="rounded bg-muted px-1.5 py-0.5 font-mono">.env</code>{" "}
                  file with comma-separated Google Drive links. Ensure each Drive photo has
                  permissions set to <strong>"Anyone with the link can view"</strong>.
                </p>
                <p className="font-mono text-[11px] text-primary/90 opacity-90 truncate">
                  VITE_GALLERY_IMAGES="https://drive.google.com/file/d/.../view?usp=sharing, ..."
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDriveHint(false)}
                className="ml-auto text-muted-foreground hover:text-foreground p-1 outline-none focus:outline-none"
                aria-label="Dismiss guide"
              >
                <X className="size-3.5" />
              </button>
            </div>
          )}

          {/* Gallery Grid */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {images.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Images className="size-12 text-muted-foreground/40 mb-3" />
                <h4 className="text-base font-semibold">No images found</h4>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                  Add your Google Drive links into{" "}
                  <code className="font-mono">VITE_GALLERY_IMAGES</code> in{" "}
                  <code className="font-mono">.env</code>.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {images.map((img, idx) => {
                  const isLoaded = loadedImages[img.id];
                  const hasError = failedImages[img.id];

                  return (
                    <div
                      key={img.id}
                      onClick={() => setActiveImageIndex(idx)}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-muted/40 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 outline-none focus:outline-none"
                    >
                      {/* Image container */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                        {!isLoaded && !hasError && (
                          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
                            <Images className="size-8 text-muted-foreground/30 animate-bounce" />
                          </div>
                        )}

                        {hasError ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-muted text-muted-foreground">
                            <Info className="size-6 text-amber-500 mb-2" />
                            <p className="text-xs font-semibold">Image loading unavailable</p>
                            <p className="text-[10px] mt-1 text-muted-foreground/80">
                              Check that the Google Drive sharing is set to "Anyone with the link".
                            </p>
                          </div>
                        ) : (
                          <img
                            src={img.thumbnailUrl || img.url}
                            alt={img.title}
                            loading="lazy"
                            onLoad={() => handleImageLoad(img.id)}
                            onError={() => handleImageError(img.id)}
                            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-108 ${
                              isLoaded ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                        {/* Expand Icon */}
                        <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                          <Maximize2 className="size-3.5" />
                        </div>

                        {/* Bottom Tag / Title */}
                        <div className="absolute bottom-3 inset-x-3 text-left">
                          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary-light">
                            Project {idx + 1}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white leading-tight drop-shadow-sm truncate">
                            {img.title}
                          </h4>
                          {img.description && (
                            <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5">
                              {img.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="border-t border-border px-5 py-3 sm:px-6 flex items-center justify-between text-xs text-muted-foreground bg-muted/20">
            <span>Click any image to view in high resolution</span>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full bg-primary/10 hover:bg-primary/20 text-primary px-4 py-1.5 font-semibold text-xs transition-colors cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
            >
              Close Gallery
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox / Fullscreen Image Viewer */}
      {activeImage !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-between bg-black/95 backdrop-blur-xl p-4 sm:p-6 animate-fade-in outline-none focus:outline-none"
        >
          {/* Lightbox Top Bar */}
          <div className="flex w-full max-w-6xl items-center justify-between text-white/90 pb-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full text-white/90">
                {activeImageIndex !== null ? `${activeImageIndex + 1} / ${images.length}` : ""}
              </span>
              <span className="font-semibold text-sm sm:text-base text-white truncate max-w-[200px] sm:max-w-md">
                {activeImage.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {activeImage.url.startsWith("http") && (
                <a
                  href={activeImage.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors outline-none focus:outline-none"
                  title="Open original image"
                >
                  <ExternalLink className="size-4" />
                </a>
              )}
              <button
                type="button"
                onClick={() => setActiveImageIndex(null)}
                className="inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer outline-none focus:outline-none"
                aria-label="Close fullscreen"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Image & Prev/Next Arrows */}
          <div className="relative flex w-full max-w-6xl flex-1 items-center justify-center py-2">
            {/* Prev Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-10 flex size-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-95 cursor-pointer outline-none focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-6" />
              </button>
            )}

            {/* Displayed Image */}
            <div className="flex h-full max-h-[75vh] w-full items-center justify-center overflow-hidden">
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="max-h-full max-w-full rounded-xl object-contain shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-10 flex size-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-95 cursor-pointer outline-none focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="size-6" />
              </button>
            )}
          </div>

          {/* Lightbox Caption & Details */}
          <div className="w-full max-w-2xl text-center pt-2">
            <h3 className="text-base sm:text-lg font-bold text-white drop-shadow">
              {activeImage.title}
            </h3>
            {activeImage.description && (
              <p className="text-xs sm:text-sm text-white/70 mt-0.5">{activeImage.description}</p>
            )}
            <div className="mt-2 text-[11px] text-white/50 font-mono">
              Use Left / Right arrow keys to navigate · Esc to close
            </div>
          </div>
        </div>
      )}
    </>
  );
}
