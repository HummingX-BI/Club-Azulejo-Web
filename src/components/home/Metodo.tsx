import { motion } from "framer-motion";
import { Wind, Activity, LineChart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/ui/Divider";
import { Reveal } from "@/components/ui/Reveal";

/* ────────────────────────────────────────────────────────────────
   Metodo — sección "El Método" (Home)
   Layout: 2 cols desktop (panel izq. + contenido der.), apila móvil.
   ──────────────────────────────────────────────────────────────── */

const PILARES = [
  {
    num: "01",
    icon: <Wind size={16} strokeWidth={1.5} aria-hidden="true" />,
    title: "Adaptación Consciente",
    body: "Regulación respiratoria natural antes de la inmersión; dominio de flotación horizontal sin chalecos rígidos.",
  },
  {
    num: "02",
    icon: <Activity size={16} strokeWidth={1.5} aria-hidden="true" />,
    title: "Biomecánica FINA",
    body: "Desglose cinemático de brazada, rolido escapular y patada propulsiva, con cámaras subacuáticas HD.",
  },
  {
    num: "03",
    icon: <LineChart size={16} strokeWidth={1.5} aria-hidden="true" />,
    title: "Bitácora Digital en Tiempo Real",
    body: "Al terminar cada clase, el instructor registra métricas de fatiga, repeticiones y video clave en el Portal de Familias.",
  },
] as const;

export function Metodo() {
  return (
    <section
      id="metodo"
      data-bg="light"
      style={{ 
        paddingBlock: "var(--spacing-section)",
        "--color-text": "#0B1B24",
        "--color-text-muted": "#5C6A72",
        "--color-line": "rgba(11,27,36,0.12)",
        "--color-surface": "rgba(11,27,36,0.04)",
        "--color-surface-2": "#FFFFFF"
      } as React.CSSProperties}
    >
      <Container>
        <div className="metodo-grid">

          {/* ── Columna izquierda: panel de video ─────────────────── */}
          <div className="metodo-panel-col">
            <div className="metodo-panel">
              {/* TODO: reemplazar por <video> o <img> real */}
              <div className="metodo-pool-texture" aria-hidden="true">
                {/* Líneas tipo carril de alberca hechas en CSS */}
                <div className="metodo-lane-lines">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="metodo-lane-line" />
                  ))}
                </div>
                {/* Reflejo de agua — gradiente radial sutil */}
                <div className="metodo-water-shimmer" />
              </div>

              {/* Badge de metodología */}
              <div className="metodo-badge">
                <span className="metodo-badge-dot" />
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>
                  Metodología validada
                </span>
              </div>
            </div>

            {/* Nota de respaldo bajo el panel */}
            <div style={{ marginTop: "20px" }}>
              <Divider style={{ marginBottom: "16px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-small)",
                  fontWeight: 500,
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.01em",
                }}>
                  Referencia: lineamientos técnicos FINA
                </p>
                <Eyebrow>Pedagogía acuática libre de estrés</Eyebrow>
              </div>
            </div>
          </div>

          {/* ── Columna derecha: contenido ────────────────────────── */}
          <div className="metodo-content-col">
            {/* ── Stats del módulo ──────────────────────────────── */}
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{
                display: "flex",
                gap: "0",
                marginBottom: "40px",
                paddingBottom: "28px",
                borderBottom: "1px solid var(--color-line)",
              }}
            >
              {[
                { value: "1:4",        label: "Ratio por instructor" },
                { value: "31.2 °C",   label: "Agua templada" },
                { value: "Salina + UV", label: "Sin cloro agresivo" },
              ].map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
                  style={{
                    flex: 1,
                    paddingLeft: i > 0 ? "20px" : 0,
                    borderLeft: i > 0 ? "1px solid var(--color-line)" : "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
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

            <Reveal>
              <Eyebrow number="01">
                Pedagogía sensorial y científica
              </Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--font-size-h2)",
                  fontWeight: 400,
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text)",
                  marginTop: "16px",
                  marginBottom: "20px",
                }}
              >
                El Método Azulejo: la calma{" "}
                <em style={{ fontStyle: "italic" }}>
                  como catalizador del dominio técnico.
                </em>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p
                style={{
                  fontSize: "var(--font-size-body)",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                  maxWidth: "44ch",
                  marginBottom: "16px",
                }}
              >
                Cada alumno avanza a su ritmo natural, sin miedos impuestos.
                Nuestro programa combina ciencia del movimiento con pedagogía
                sensorial para convertir el agua en un espacio de confianza.
              </p>
              <p
                style={{
                  fontSize: "var(--font-size-body)",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                  maxWidth: "44ch",
                  marginBottom: "48px",
                }}
              >
                Enseñanza personalizada en agua templada con ratio 1:4,
                metodología propia y seguimiento continuo para cada alumno.
              </p>
            </Reveal>

            {/* ── Lista numerada editorial ───────────────────────── */}
            <ol
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {PILARES.map(({ num, icon, title, body }, i) => (
                <Reveal key={num} delay={0.24 + i * 0.08}>
                  <li className="metodo-pilar">
                    {/* Número grande serif */}
                    <div className="metodo-pilar-num">
                      <span
                        className="tabular"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(2rem, 3vw, 2.75rem)",
                          fontWeight: 400,
                          lineHeight: 1,
                          color: "var(--color-line)",
                          letterSpacing: "-0.02em",
                          userSelect: "none",
                        }}
                      >
                        {num}
                      </span>
                    </div>

                    {/* Línea vertical divisoria */}
                    <div className="metodo-pilar-rule" aria-hidden="true" />

                    {/* Título + descripción */}
                    <div className="metodo-pilar-body">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "6px",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        {icon}
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "var(--font-size-body)",
                            fontWeight: 600,
                            color: "var(--color-text)",
                            lineHeight: 1.3,
                          }}
                        >
                          {title}
                        </p>
                      </div>
                      <p
                        style={{
                          fontSize: "var(--font-size-small)",
                          color: "var(--color-text-muted)",
                          lineHeight: 1.65,
                        }}
                      >
                        {body}
                      </p>
                    </div>
                  </li>
                  {/* Divider entre pilares, no después del último */}
                  {i < PILARES.length - 1 && (
                    <Divider style={{ marginBlock: "0" }} />
                  )}
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>

      {/* ── Scoped styles ────────────────────────────────────────── */}
      <style>{`
        /* Grid 2 cols desktop */
        .metodo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: start;
        }

        /* ── Panel de video ───────────────────────── */
        .metodo-panel {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: var(--radius-card);
          background-color: var(--color-surface);
          overflow: hidden;
        }

        /* Textura de carriles de alberca */
        .metodo-pool-texture {
          position: absolute;
          inset: 0;
        }
        .metodo-lane-lines {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          padding-block: 32px;
          gap: 0;
        }
        .metodo-lane-line {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(70, 194, 207, 0.06) 20%,
            rgba(70, 194, 207, 0.12) 50%,
            rgba(70, 194, 207, 0.06) 80%,
            transparent 100%
          );
        }
        .metodo-water-shimmer {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 90% 60% at 30% 40%,
            rgba(70, 194, 207, 0.06) 0%,
            transparent 70%
          );
        }

        /* Badge en la esquina superior del panel */
        .metodo-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--color-surface-2);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-pill);
          padding: 6px 14px;
        }
        .metodo-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--color-accent);
          flex-shrink: 0;
          animation: metodo-pulse 2.4s ease-in-out infinite;
        }
        @keyframes metodo-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
        @media (prefers-reduced-motion: reduce) {
          .metodo-badge-dot { animation: none; }
        }

        /* ── Lista editorial ──────────────────────── */
        .metodo-pilar {
          display: grid;
          grid-template-columns: 56px 1px 1fr;
          gap: 0 24px;
          align-items: start;
          padding-block: 28px;
        }
        .metodo-pilar-num {
          display: flex;
          align-items: flex-start;
          padding-top: 2px;
        }
        .metodo-pilar-rule {
          width: 1px;
          align-self: stretch;
          background-color: var(--color-line);
        }
        .metodo-pilar-body {
          padding-top: 4px;
        }

        /* ── Responsive ───────────────────────────── */
        @media (max-width: 1023px) {
          .metodo-grid {
            grid-template-columns: 1fr;
          }
          .metodo-panel {
            aspect-ratio: 16 / 9;
            max-height: 320px;
          }
        }
        @media (max-width: 767px) {
          .metodo-pilar {
            grid-template-columns: 44px 1px 1fr;
            gap: 0 16px;
            padding-block: 20px;
          }
        }
      `}</style>
    </section>
  );
}
