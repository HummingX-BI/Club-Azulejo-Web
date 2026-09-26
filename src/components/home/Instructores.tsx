import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";
import { INSTRUCTORES, type InstructorData } from "@/data/instructores";

/* ────────────────────────────────────────────────────────────────
   Instructores — "Cuerpo Técnico Colegiado"
   Layout: grid 3 columnas desktop, 1 columna móvil.
   Diseño esqueleto — se refinará en sesión posterior.
   ──────────────────────────────────────────────────────────────── */

function InstructorCard({ instructor }: { instructor: InstructorData }) {
  return (
    <Card style={{ padding: 0, display: "flex", flexDirection: "column" }}>
      {/* ── Bloque de foto (placeholder) ───────────────────────── */}
      <div style={{ position: "relative" }}>
        <div
          aria-label={`Foto de ${instructor.nombre} — pendiente`}
          style={{
            aspectRatio: "4 / 5",
            backgroundColor: "var(--color-surface-2)",
            borderRadius: "var(--radius-card) var(--radius-card) 0 0",
          }}
        />
        {/* Badge de especialidad superpuesto */}
        <span
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            display: "inline-block",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-line)",
            borderRadius: "var(--radius-pill)",
            padding: "4px 12px",
            fontFamily: "var(--font-body)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
          }}
        >
          {instructor.especialidadBadge}
        </span>
      </div>

      {/* ── Contenido textual ──────────────────────────────────── */}
      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "12px",
        }}
      >
        {/* Nombre */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              marginBottom: "4px",
            }}
          >
            {instructor.nombre}
          </h3>
          <p
            style={{
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-muted)",
              lineHeight: 1.4,
            }}
          >
            {instructor.rol}
          </p>
        </div>

        {/* Bio */}
        <p
          style={{
            fontSize: "var(--font-size-small)",
            color: "var(--color-text-muted)",
            lineHeight: 1.65,
          }}
        >
          {instructor.bio}
        </p>

        <Divider />

        {/* Certificaciones — lista de texto plano */}
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            flex: 1,
          }}
        >
          {instructor.certificaciones.map((cert) => (
            <li
              key={cert}
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.5,
                paddingLeft: "12px",
                borderLeft: "2px solid var(--color-line)",
              }}
            >
              {cert}
            </li>
          ))}
        </ul>

        <Divider />

        {/* Stat al pie */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span
            style={{
              fontSize: "0.6875rem",
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {instructor.statLabel}
          </span>
          <span
            className="tabular"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-small)",
              fontWeight: 700,
              color: "var(--color-text)",
            }}
          >
            {instructor.statValue}
          </span>
        </div>
      </div>
    </Card>
  );
}

/* ── Sección completa ────────────────────────────────────────────── */
export function Instructores() {
  return (
    <section
      id="instructores"
      data-bg="canvas-deep"
      style={{ paddingBlock: "var(--spacing-section)" }}
    >
      <Container>
        {/* ── Cabecera */}
        <Reveal>
          <Eyebrow number="03">Maestros &amp; Entrenadores</Eyebrow>
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
            Cuerpo Técnico Colegiado.
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p
            style={{
              fontSize: "var(--font-size-body)",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              maxWidth: "52ch",
              marginBottom: "clamp(40px, 6vw, 64px)",
            }}
          >
            Especialistas con certificación FINA, Cruz Roja Mexicana en
            Salvamento Acuático y formación en psicología infantil.
          </p>
        </Reveal>

        {/* ── Grid de instructores */}
        <div className="instructores-grid">
          {INSTRUCTORES.map((inst) => (
            <Reveal key={inst.id}>
              <InstructorCard instructor={inst} />
            </Reveal>
          ))}
        </div>
      </Container>

      <style>{`
        .instructores-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.5vw, 28px);
          align-items: start;
        }
        @media (max-width: 1023px) {
          .instructores-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 639px) {
          .instructores-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
