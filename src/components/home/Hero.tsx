import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

/* ────────────────────────────────────────────────
   Hero — fullscreen with parallax image, gradient
   dissolve, and staggered text entrance
   ──────────────────────────────────────────────── */

/* Attempt to load the hero image; fall back to CSS gradient */
let heroSrc: string | null = null;
try {
  const modules = import.meta.glob("@/assets/images/hero.jpg", { eager: true, query: "?url", import: "default" });
  const key = Object.keys(modules)[0];
  if (key) heroSrc = modules[key] as string;
} catch {
  /* no image – will use CSS fallback */
}

const STATS = [
  { value: "1:4", label: "Ratio por instructor" },
  { value: "31.2 °C", label: "Agua templada todo el año" },
  { value: "Salina + UV", label: "Sin cloro agresivo" },
];

/* Stagger animation variants */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* Parallax: image moves slower than scroll */
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        height: "100svh",
        minHeight: "640px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}
    >
      {/* ── Background layer ──────────────────── */}
      <motion.div
        data-parallax
        style={{
          position: "absolute",
          inset: 0,
          y: imageY,
          zIndex: 0,
          ...(heroSrc
            ? {
                backgroundImage: `url(${heroSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
              }
            : {
                /* CSS-only fallback: layered radial gradients */
                background: [
                  "radial-gradient(ellipse 120% 80% at 30% 60%, rgba(70, 194, 207, 0.12) 0%, transparent 70%)",
                  "radial-gradient(ellipse 100% 100% at 80% 30%, rgba(18, 39, 49, 0.9) 0%, transparent 60%)",
                  "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(26, 52, 65, 0.7) 0%, transparent 50%)",
                  "linear-gradient(180deg, #0E2430 0%, #0B1B24 100%)",
                ].join(", "),
              }),
        }}
      />

      {/* ── Dark overlay ──────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: heroSrc
            ? "linear-gradient(180deg, rgba(11,27,36,0.45) 0%, rgba(11,27,36,0.2) 40%, rgba(11,27,36,0.75) 75%, var(--color-canvas) 100%)"
            : "linear-gradient(180deg, transparent 0%, transparent 60%, var(--color-canvas) 100%)",
        }}
      />

      {/* ── Content ───────────────────────────── */}
      <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "104px" }}>
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: "720px" }}
          >
            <motion.div variants={itemVariants} style={{ marginBottom: "20px" }}>
              <Eyebrow>
                Atelier acuático privado · Lindavista
              </Eyebrow>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--font-size-display)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--color-text)",
                marginBottom: "24px",
              }}
            >
              Donde la técnica se convierte{" "}
              <br className="hero-break" />
              en <em style={{ fontStyle: "italic" }}>serenidad.</em>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                maxWidth: "520px",
                marginBottom: "32px",
              }}
            >
              Enseñanza personalizada en agua templada con ratio 1:4,
              metodología propia y seguimiento continuo para cada alumno.
            </motion.p>

            <motion.div
              variants={itemVariants}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
            >
              <Button variant="primary" size="lg" href="/inscripcion">
                Agendar clase diagnóstica
              </Button>
              <Button variant="ghost" size="lg" href="/metodo">
                Conocer el método
              </Button>
            </motion.div>
          </motion.div>
        </Container>

        {/* ── Stats bar ───────────────────────── */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <Container>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
              className="hero-stats"
            >
              {STATS.map(({ value, label }, i) => (
                <div key={label} className="hero-stat" style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                  {i > 0 && (
                    <div
                      className="hero-stat-divider"
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "1px",
                        height: "24px",
                        backgroundColor: "var(--color-line)",
                      }}
                    />
                  )}
                  <span
                    className="tabular"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "var(--font-size-small)",
                      color: "var(--color-text)",
                    }}
                  >
                    {value}
                  </span>
                  <span
                    style={{
                      fontSize: "var(--font-size-eyebrow)",
                      color: "var(--color-text-muted)",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </Container>

          {/* Padding below stats */}
          <div style={{ height: "clamp(24px, 3vw, 40px)" }} />
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} strokeWidth={1.5} color="var(--color-text-muted)" style={{ opacity: 0.5 }} />
        </motion.div>
      </motion.div>

      {/* ── Responsive styles ─────────────────── */}
      <style>{`
        .hero-break {
          display: none;
        }
        @media (min-width: 768px) {
          .hero-break {
            display: block;
          }
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 0;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
        }
        .hero-stat {
          position: relative;
          flex: 1;
          padding: 16px 0;
          padding-left: 0;
        }
        .hero-stat:not(:first-child) {
          padding-left: 24px;
        }
        .hero-stat:first-child .hero-stat-divider {
          display: none;
        }

        @media (max-width: 767px) {
          .hero-stats {
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
          }
          .hero-stat {
            width: 100%;
            padding: 12px 0;
          }
          .hero-stat:not(:first-child) {
            padding-left: 0;
            border-top: 1px solid var(--color-line);
          }
          .hero-stat .hero-stat-divider {
            display: none !important;
          }
          .hero-stats {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
