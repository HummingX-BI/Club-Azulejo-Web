import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ────────────────────────────────────────────────
   Navbar — pastilla flotante centrada
   - Transparente sobre el hero
   - backdrop-blur + canvas/80 al hacer scroll
   - Mobile: menú de pantalla completa en serif
   ──────────────────────────────────────────────── */

const NAV_LINKS = [
  { to: "/#metodo", id: "metodo", label: "Método" },
  { to: "/#programas", id: "programas", label: "Programas" },
  { to: "/#instructores", id: "instructores", label: "Instructores" },
  { to: "/#galeria", id: "galeria", label: "Galería" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");
  const location = useLocation();

  /* ── Track scroll ──────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Track active section in viewport ──────── */
  useEffect(() => {
    // Only track hashes on home page
    if (location.pathname !== "/") {
      setActiveHash("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible intersecting entry
        let maxRatio = 0;
        let mostVisibleId = "";
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleId = entry.target.id;
          }
        });
        if (mostVisibleId) setActiveHash(`#${mostVisibleId}`);
      },
      { rootMargin: "-80px 0px -40% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [location.pathname]);

  /* ── Close on route change ─────────────────── */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* ── Auto-close mobile menu on desktop resize ─ */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Lock body scroll ──────────────────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Escape key ────────────────────────────── */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [mobileOpen, handleKeyDown]);

  return (
    <>
      {/*
        El header ocupa todo el ancho fijo pero con pointer-events: none
        para no bloquear clics en el hero. La <nav> recupera pointer-events.
      */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "16px var(--container-padding)",
          pointerEvents: "none",
        }}
      >
        <nav
          style={{
            maxWidth: "var(--container-max)",
            marginInline: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "56px",
            paddingInline: "24px",
            borderRadius: "var(--radius-pill)",
            /* Siempre pill; solo cambia fondo y blur */
            backgroundColor: scrolled ? "rgba(11, 27, 36, 0.82)" : "transparent",
            backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
            border: `1px solid ${scrolled ? "var(--color-line)" : "transparent"}`,
            transition: [
              "background-color var(--duration-md) var(--ease-out)",
              "border-color var(--duration-md) var(--ease-out)",
              "backdrop-filter var(--duration-md) var(--ease-out)",
            ].join(", "),
            pointerEvents: "auto",
          }}
        >
          {/* ── Wordmark ──────────────────────── */}
          <Link
            to="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "var(--color-text)",
              flexShrink: 0,
            }}
          >
            Club Azulejo
          </Link>

          {/* ── Desktop centre links ───────────── */}
          <ul className="nav-desktop-links">
            {NAV_LINKS.map(({ to, id, label }) => {
              const isHashLink = to.startsWith("/#");
              const isActive = isHashLink
                ? location.pathname === "/" && activeHash === `#${id}`
                : location.pathname === to;

              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (isHashLink && location.pathname === "/") {
                  e.preventDefault();
                  const target = document.getElementById(id);
                  // @ts-ignore
                  if (target && window.lenis) {
                    // @ts-ignore
                    window.lenis.scrollTo(target, { offset: -80, immediate: false });
                    window.history.pushState({}, "", to);
                  }
                }
              };

              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={handleClick}
                    className="nav-link"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: isActive ? "var(--color-text)" : "var(--color-text-muted)",
                      transition: "color var(--duration-sm) var(--ease-out)",
                      position: "relative",
                    }}
                  >
                    {label}
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "-4px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          backgroundColor: "var(--color-accent)",
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop right ─────────────────── */}
          <div className="nav-desktop-right">
            <Button variant="primary" size="md" href="/inscripcion">
              Agendar diagnóstico
            </Button>
          </div>

          {/* ── Mobile hamburger ──────────────── */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile fullscreen sheet ────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              backgroundColor: "var(--color-canvas)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "28px",
              padding: "var(--container-padding)",
            }}
          >
            {NAV_LINKS.map(({ to, id, label }, i) => {
              const isHashLink = to.startsWith("/#");
              const isActive = isHashLink
                ? location.pathname === "/" && activeHash === `#${id}`
                : location.pathname === to;

              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                setMobileOpen(false);
                if (isHashLink && location.pathname === "/") {
                  e.preventDefault();
                  const target = document.getElementById(id);
                  // @ts-ignore
                  if (target && window.lenis) {
                    // @ts-ignore
                    window.lenis.scrollTo(target, { offset: -80, immediate: false });
                    window.history.pushState({}, "", to);
                  }
                }
              };

              return (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={to}
                    onClick={handleClick}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 5vw, 3rem)",
                      fontWeight: 400,
                      color: isActive ? "var(--color-accent)" : "var(--color-text)",
                      transition: "color var(--duration-sm) var(--ease-out)",
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "center",
                marginTop: "16px",
              }}
            >
              <Button
                variant="primary"
                size="lg"
                href="/inscripcion"
                onClick={() => setMobileOpen(false)}
              >
                Agendar diagnóstico
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scoped styles ─────────────────────── */}
      <style>{`
        .nav-desktop-links {
          display: flex;
          align-items: center;
          gap: 28px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-desktop-right {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-shrink: 0;
        }
        .nav-mobile-toggle {
          display: none !important;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          color: var(--color-text);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .nav-link:hover {
          color: var(--color-text) !important;
        }

        /* ── Button hover states (global, scoped by class) */
        .btn--primary:hover  { filter: brightness(1.1); }
        .btn--primary:active { transform: scale(0.97); }
        .btn--ghost:hover {
          background-color: var(--color-surface) !important;
          border-color: var(--color-text-muted) !important;
        }
        .btn--ghost:active  { transform: scale(0.97); }
        .btn--text:hover .btn-arrow { transform: translateX(4px); }
        .btn-arrow { transition: transform var(--duration-md) var(--ease-out); }
        .btn:disabled { opacity: 0.4; pointer-events: none; }

        @media (max-width: 1023px) {
          .nav-desktop-links  { display: none !important; }
          .nav-desktop-right  { display: none !important; }
          .nav-mobile-toggle  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
