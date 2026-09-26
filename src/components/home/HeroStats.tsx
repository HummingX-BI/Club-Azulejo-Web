import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

/* ────────────────────────────────────────────────
   HeroStats — franja de datos inmediatamente
   debajo del Hero. Sección independiente, fondo
   canvas, padding fino (no spacing-section completo).
   ──────────────────────────────────────────────── */

const STATS = [
  { value: "1:4",        label: "Ratio por instructor" },
  { value: "31.2 °C",   label: "Agua templada todo el año" },
  { value: "Salina + UV", label: "Sin cloro agresivo" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const itemVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function HeroStats() {
  return (
    <section
      data-bg="canvas"
      style={{
        /* Franja delgada: no usa --spacing-section, solo padding fino */
        paddingBlock: "clamp(20px, 2.5vw, 32px)",
        backgroundColor: "var(--color-canvas)",
      }}
    >
      <Container>
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="hero-stats"
        >
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="hero-stat"
              style={{ display: "flex", alignItems: "baseline", gap: "12px" }}
            >
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
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Scoped styles — reutiliza las mismas clases que tenía el Hero */}
      <style>{`
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
            border-bottom: none;
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
        }
      `}</style>
    </section>
  );
}
