import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal wrapper.
 *
 * Content renders fully visible in the HTML (SSR, crawlers and no-JS users),
 * and is only hidden after hydration confirms IntersectionObserver support and
 * the element starts off-screen — so the animation never blanks the page.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const rect = el.getBoundingClientRect();
    const startsVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    if (startsVisible) return;

    setArmed(true);
    setShown(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as "div";

  return (
    <Component
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform",
        armed && !shown ? "translate-y-8 opacity-0 blur-[6px]" : "translate-y-0 opacity-100 blur-0",
        className,
      )}
    >
      {children}
    </Component>
  );
}
