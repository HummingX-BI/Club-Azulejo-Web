import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

/**
 * Smooth-scroll wrapper powered by Lenis.
 * - Scrolls to top on route change.
 * - Disables itself when prefers-reduced-motion is active.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    /* Respect reduced-motion preference */
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    // @ts-ignore - expose globally for anchor scrolling
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* Scroll to top/hash on route change */
  useEffect(() => {
    if (lenisRef.current) {
      if (location.hash) {
        // Wait a tick for rendering, then scroll to hash
        setTimeout(() => {
          lenisRef.current?.scrollTo(location.hash, { offset: -80, immediate: false });
        }, 100);
      } else {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    } else {
      if (!location.hash) window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return <>{children}</>;
}
