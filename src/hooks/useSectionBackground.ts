import { useEffect } from "react";
import { animate } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   useSectionBackground
   ────────────────────────────────────────────────────────────────
   1. Watches every <section data-bg="[key]"> via IntersectionObserver
      and animates --bg-current on :root (600ms interpolation).

   2. Injects a fixed caustic-water overlay layer (SVG feTurbulence
      displacement filter) behind all content at very low opacity
      (4–8%), with a slow drift animation (~25s loop). The overlay's
      opacity increases slightly in canvas-deep sections to reinforce
      the sense of depth.

   Respects prefers-reduced-motion: no animation, instant colour
   switch, and the caustic pattern is frozen (no keyframe).
   ──────────────────────────────────────────────────────────────── */

const BG_MAP: Record<string, string> = {
  canvas:        "#0B1B24", // Hero / default
  "canvas-deep": "#081420", // El Método — slightly deeper
};

/* Opacity of the caustic layer per section type */
const CAUSTIC_OPACITY: Record<string, number> = {
  canvas:        0.045, // subtle at base
  "canvas-deep": 0.075, // slightly stronger in depth sections
};

const DEFAULT_KEY = "canvas";

/** Parse a hex colour into [r, g, b] 0-255 */
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

/** Lerp [r,g,b] components and return a hex string */
function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) =>
        Math.round(Math.min(255, Math.max(0, v)))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}

/* ── Caustic overlay ────────────────────────────────────────────── */

/** Build the SVG filter + caustic overlay element and append to body */
function createCausticLayer(
  prefersReducedMotion: boolean
): HTMLDivElement {
  /* SVG filter definition — lives in a hidden <svg> */
  const svgNS = "http://www.w3.org/2000/svg";
  const filterSvg = document.createElementNS(svgNS, "svg") as SVGSVGElement;
  filterSvg.setAttribute("aria-hidden", "true");
  filterSvg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;";
  filterSvg.innerHTML = `
    <defs>
      <filter id="caustic-filter" x="0%" y="0%" width="100%" height="100%"
              color-interpolation-filters="sRGB">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012 0.018"
          numOctaves="4"
          seed="7"
          stitchTiles="stitch"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="28"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displaced"
        />
        <feColorMatrix
          in="displaced"
          type="saturate"
          values="0"
          result="grey"
        />
        <feBlend in="SourceGraphic" in2="grey" mode="screen" result="blend" />
        <feComposite in="blend" in2="SourceGraphic" operator="in" />
      </filter>
    </defs>`;
  document.body.appendChild(filterSvg);

  /* Visible caustic layer — a gradient rect filtered through the SVG */
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.id = "caustic-layer";
  layer.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    /* Caustic pattern: radial gradient with accent tones, filtered */
    background:
      radial-gradient(
        ellipse 160% 80% at 20% 30%,
        rgba(70,194,207,0.35) 0%,
        rgba(8,20,32,0) 60%
      ),
      radial-gradient(
        ellipse 100% 120% at 80% 70%,
        rgba(70,194,207,0.20) 0%,
        rgba(11,27,36,0) 55%
      );
    filter: url(#caustic-filter);
    opacity: ${CAUSTIC_OPACITY[DEFAULT_KEY]};
    will-change: opacity, transform;
    /* Slow drift: translate the pattern — cheap GPU transform, no repaint */
    ${prefersReducedMotion
      ? ""
      : `animation: caustic-drift 25s ease-in-out infinite alternate;`
    }
  `;
  document.body.appendChild(layer);

  if (!prefersReducedMotion) {
    /* Inject keyframes into a <style> tag */
    const style = document.createElement("style");
    style.id = "caustic-keyframes";
    style.textContent = `
      @keyframes caustic-drift {
        0%   { transform: translate(0px, 0px) scale(1.0); }
        25%  { transform: translate(8px, -12px) scale(1.02); }
        50%  { transform: translate(-6px, 10px) scale(0.99); }
        75%  { transform: translate(10px, 4px) scale(1.01); }
        100% { transform: translate(-4px, -8px) scale(1.02); }
      }
      @media (prefers-reduced-motion: reduce) {
        #caustic-layer { animation: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  return layer;
}

/* ── Main hook ──────────────────────────────────────────────────── */

export function useSectionBackground() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* Track current animated colour to interpolate FROM */
    let currentHex = BG_MAP[DEFAULT_KEY];
    let currentKey = DEFAULT_KEY;
    let stopAnimation: (() => void) | null = null;

    /* Create caustic overlay */
    const causticLayer = createCausticLayer(prefersReducedMotion);

    /* Animate caustic opacity separately to reinforce depth */
    let stopCausticAnim: (() => void) | null = null;
    const setCausticOpacity = (key: string) => {
      const targetOpacity = CAUSTIC_OPACITY[key] ?? CAUSTIC_OPACITY[DEFAULT_KEY];
      const currentOpacity = parseFloat(causticLayer.style.opacity || "0");
      if (Math.abs(targetOpacity - currentOpacity) < 0.001) return;

      if (prefersReducedMotion) {
        causticLayer.style.opacity = String(targetOpacity);
        return;
      }

      stopCausticAnim?.();
      const ctrl = animate(currentOpacity, targetOpacity, {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(v) {
          causticLayer.style.opacity = String(v);
        },
        onComplete() { stopCausticAnim = null; },
      });
      stopCausticAnim = () => ctrl.stop();
    };

    const setColor = (hex: string, key: string) => {
      /* Animate caustic depth independently of colour */
      if (key !== currentKey) {
        setCausticOpacity(key);
        currentKey = key;
      }

      if (hex === currentHex) return;

      if (prefersReducedMotion) {
        root.style.setProperty("--bg-current", hex);
        currentHex = hex;
        return;
      }

      stopAnimation?.();

      const from = hexToRgb(currentHex);
      const to   = hexToRgb(hex);
      const target = hex;

      const controls = animate(0, 1, {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(progress) {
          const r = from[0] + (to[0] - from[0]) * progress;
          const g = from[1] + (to[1] - from[1]) * progress;
          const b = from[2] + (to[2] - from[2]) * progress;
          root.style.setProperty("--bg-current", rgbToHex(r, g, b));
        },
        onComplete() {
          currentHex = target;
          stopAnimation = null;
        },
      });

      stopAnimation = () => controls.stop();
    };

    /* Set initial values */
    root.style.setProperty("--bg-current", BG_MAP[DEFAULT_KEY]);
    causticLayer.style.opacity = String(CAUSTIC_OPACITY[DEFAULT_KEY]);

    /* IntersectionObserver: fires when ≥25% of section is well into view */
    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!best || entry.intersectionRatio > best.intersectionRatio)
          ) {
            best = entry;
          }
        }
        if (!best) return;

        const key = (best.target as HTMLElement).dataset.bg ?? DEFAULT_KEY;
        const hex = BG_MAP[key] ?? BG_MAP[DEFAULT_KEY];
        setColor(hex, key);
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "0px 0px -40% 0px",
      }
    );

    const observe = () => {
      document.querySelectorAll<HTMLElement>("section[data-bg]").forEach((el) =>
        observer.observe(el)
      );
    };

    observe();

    /* MutationObserver picks up sections added after mount (route changes) */
    const mutationObs = new MutationObserver(observe);
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObs.disconnect();
      stopAnimation?.();
      stopCausticAnim?.();
      /* Clean up injected DOM nodes */
      causticLayer.remove();
      document.getElementById("caustic-keyframes")?.remove();
      document
        .querySelectorAll("svg[aria-hidden]")
        .forEach((el) => {
          if (el.querySelector("#caustic-filter")) el.remove();
        });
    };
  }, []);
}
