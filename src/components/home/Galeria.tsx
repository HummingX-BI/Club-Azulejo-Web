import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GALERIA, type CategoriaGaleria } from "@/data/galeria";

/* ────────────────────────────────────────────────────────────────
   Galería — "Momentos Azulejo"
   Fila de filtros + Grid de imágenes (placeholders).
   ──────────────────────────────────────────────────────────────── */

const CATEGORIAS: ("Todos" | CategoriaGaleria)[] = [
  "Todos",
  "Clases",
  "Exhibiciones",
  "Torneos",
  "Reconocimientos",
];

export function Galeria() {
  const [filtroActivo, setFiltroActivo] = useState<"Todos" | CategoriaGaleria>("Todos");

  const itemsMostrados =
    filtroActivo === "Todos"
      ? GALERIA
      : GALERIA.filter((item) => item.categoria === filtroActivo);

  return (
    <section
      id="galeria"
      data-bg="light-alt"
      style={{
        paddingBlock: "var(--spacing-section)",
        "--color-text": "#0B1B24",
        "--color-text-muted": "#5C6A72",
        "--color-line": "rgba(11,27,36,0.12)",
        "--color-surface": "rgba(11,27,36,0.04)",
        "--color-surface-2": "#FFFFFF",
      } as React.CSSProperties}
    >
      <Container>
        {/* ── Cabecera */}
        <Reveal>
          <Eyebrow number="04">Momentos Azulejo</Eyebrow>
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
              marginBottom: "16px",
            }}
          >
            Galería.
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p
            style={{
              fontSize: "var(--font-size-body)",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              maxWidth: "52ch",
              marginBottom: "clamp(32px, 5vw, 48px)",
            }}
          >
            Torneos, exhibiciones y reconocimientos de nuestra comunidad.
          </p>
        </Reveal>

        {/* ── Filtros */}
        <Reveal delay={0.2}>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "clamp(32px, 5vw, 48px)",
            }}
          >
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroActivo(cat)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-small)",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-pill)",
                  border: `1px solid ${
                    filtroActivo === cat ? "var(--color-accent)" : "var(--color-line)"
                  }`,
                  backgroundColor: filtroActivo === cat ? "rgba(70,194,207,0.12)" : "transparent",
                  color: filtroActivo === cat ? "var(--color-accent)" : "var(--color-text-muted)",
                  transition: "all var(--duration-sm) var(--ease-out)",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Grid de Galería */}
        <div className="galeria-grid">
          {itemsMostrados.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05} style={{ display: "contents" }}>
              <div
                className="galeria-item"
                aria-label={`Imagen: ${item.titulo}`}
              >
                {/* Overlay texto al fondo */}
                <div className="galeria-overlay">
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                      marginBottom: "4px",
                      display: "block",
                    }}
                  >
                    {item.categoria}
                  </span>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.125rem",
                      fontWeight: 400,
                      color: "var(--color-text)",
                    }}
                  >
                    {item.titulo}
                  </h4>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <style>{`
        .galeria-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2vw, 24px);
        }
        
        .galeria-item {
          position: relative;
          aspect-ratio: 1 / 1;
          background-color: var(--color-surface-2);
          border-radius: var(--radius-card);
          overflow: hidden;
          border: 1px solid var(--color-line);
          transition: border-color var(--duration-sm) var(--ease-out);
        }
        
        .galeria-item:hover {
          border-color: var(--color-text-muted);
        }
        
        .galeria-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          background: linear-gradient(to top, rgba(8,20,32,0.9) 0%, rgba(8,20,32,0) 100%);
        }

        @media (max-width: 1023px) {
          .galeria-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 639px) {
          .galeria-grid {
            grid-template-columns: 1fr;
          }
          .galeria-item {
            aspect-ratio: 4 / 3;
          }
        }
      `}</style>
    </section>
  );
}
