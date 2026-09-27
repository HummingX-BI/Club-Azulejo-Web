import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/ui/Divider";
import { Reveal } from "@/components/ui/Reveal";
import metodoImg from "@/assets/images/metodo.jpg";

/* ────────────────────────────────────────────────────────────────
   Metodo — sección "El Método" (Home)
   Layout: 2 cols desktop (panel izq. + contenido der.), apila móvil.
   ──────────────────────────────────────────────────────────────── */

const PILARES = [
  {
    num: "01",
    title: "Adaptación Consciente",
    body: "Regulación respiratoria natural antes de la inmersión; dominio de flotación horizontal sin chalecos rígidos.",
  },
  {
    num: "02",
    title: "Biomecánica FINA",
    body: "Desglose cinemático de brazada, rolido escapular y patada propulsiva, con cámaras subacuáticas HD.",
  },
  {
    num: "03",
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
        "--color-surface-2": "#FFFFFF",
      } as React.CSSProperties}
    >
      {/* ── Fila 1: imagen (bleed real) + intro. FUERA de <Container>. ── */}
      <div className="metodo-hero-row">
        <div className="metodo-panel-col">
          <div className="metodo-panel">
            <div
              className="metodo-panel-image"
              style={{
                backgroundImage: `url(${metodoImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>

        <div className="metodo-content-col">
          <Reveal>
            <Eyebrow number="01">Pedagogía sensorial y científica</Eyebrow>
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
              El Método Azulejo: la{" "}
              <span style={{ color: "var(--color-accent)" }}>calma</span> como
              catalizador del dominio técnico.
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                maxWidth: "58ch",
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
                maxWidth: "58ch",
              }}
            >
              Enseñanza personalizada en agua templada con ratio 1:4,
              metodología propia y seguimiento continuo para cada alumno.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Fila 2: caption + pilares. DENTRO de <Container>, normal. ── */}
      <Container>
        <div
          style={{
            marginTop: "clamp(40px, 6vw, 64px)",
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-card)",
            padding: "clamp(32px, 5vw, 56px)",
          }}
        >
          <div style={{ maxWidth: "48ch", marginBottom: "clamp(32px, 4vw, 48px)" }}>
            <div style={{
              width: "32px",
              height: "3px",
              backgroundColor: "var(--color-accent)",
              marginBottom: "16px",
            }} />
            <Eyebrow>Pedagogía acuática libre de estrés</Eyebrow>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 400,
              lineHeight: 1.25,
              color: "var(--color-text)",
              marginTop: "12px",
            }}>
              Referencia: lineamientos técnicos FINA.
            </p>
          </div>

          <div className="metodo-pilares-row">
            {PILARES.map(({ num, title, body }, i) => (
              <Reveal key={num} delay={0.1 + i * 0.08} style={{ display: "contents" }}>
                <div className="metodo-pilar-col">
                  <span
                    className="tabular"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 3vw, 2.75rem)",
                      fontWeight: 400,
                      lineHeight: 1,
                      color: "var(--color-line)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {num}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--font-size-body)",
                      fontWeight: 600,
                      color: "var(--color-text)",
                      marginTop: "8px",
                      marginBottom: "6px",
                    }}
                  >
                    {title}
                  </p>
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
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        .metodo-hero-row {
          display: flex;
          align-items: flex-start;
          width: 100%;
          max-width: 1700px;
          margin-inline: auto;
          gap: clamp(24px, 4vw, 64px);
          padding-right: max(var(--container-padding), calc((100vw - var(--container-max)) / 2));
        }
        .metodo-panel-col {
          flex: 1 1 42%;
          min-width: 0;
        }
        .metodo-content-col {
          flex: 1 1 55%;
          min-width: 0;
          padding-top: clamp(8px, 2vw, 24px);
        }
        .metodo-panel {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 0 var(--radius-card) var(--radius-card) 0;
          background-color: var(--color-surface);
          overflow: hidden;
        }
        .metodo-panel-image {
          position: absolute;
          inset: 0;
        }
        .metodo-pilares-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        .metodo-pilar-col {
          padding: 28px clamp(16px, 3vw, 32px);
          border-left: 1px solid var(--color-line);
        }
        .metodo-pilar-col:first-child {
          border-left: none;
          padding-left: 0;
        }

        @media (max-width: 1023px) {
          .metodo-hero-row {
            flex-direction: column;
            padding-right: 0;
          }
          .metodo-panel-col {
            width: 100%;
          }
          .metodo-panel {
            aspect-ratio: 16 / 9;
            border-radius: var(--radius-card);
          }
          .metodo-content-col {
            padding-inline: var(--container-padding);
            padding-top: 24px;
          }
          .metodo-pilares-row {
            grid-template-columns: 1fr;
          }
          .metodo-pilar-col {
            border-left: none;
            border-top: 1px solid var(--color-line);
            padding-left: 0;
          }
          .metodo-pilar-col:first-child {
            border-top: none;
          }
        }
      `}</style>
    </section>
  );
}
