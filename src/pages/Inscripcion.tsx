import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { NIVELES } from "@/data/niveles";

/* ────────────────────────────────────────────────────────────────
   Inscripción — Wizard en 4 pasos
   ──────────────────────────────────────────────────────────────── */

type FormData = {
  nombreAlumno: string;
  fechaNacimiento: string;
  nombreTutor: string;
  telefono: string;
  experienciaPrevia: string;
  nivelSeleccionado: string;
  horarioSeleccionado: string;
};

const HORARIOS_SIMULADOS = [
  "Lunes y Miércoles 16:00–16:50",
  "Martes y Jueves 17:00–17:50",
  "Sábados 09:00–09:50 (Intensivo)",
];

export default function Inscripcion() {
  const [paso, setPaso] = useState<number>(1);
  const [exito, setExito] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombreAlumno: "",
    fechaNacimiento: "",
    nombreTutor: "",
    telefono: "",
    experienciaPrevia: "",
    nivelSeleccionado: "",
    horarioSeleccionado: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* Validación básica para habilitar botón Continuar */
  const isPasoValido = () => {
    if (paso === 1) {
      return (
        formData.nombreAlumno.trim() !== "" &&
        formData.fechaNacimiento.trim() !== "" &&
        formData.nombreTutor.trim() !== "" &&
        formData.telefono.trim() !== ""
      );
    }
    if (paso === 2) {
      return formData.nivelSeleccionado !== "";
    }
    if (paso === 3) {
      return formData.horarioSeleccionado !== "";
    }
    return true;
  };

  const handleNext = () => {
    if (paso < 4) setPaso((p) => p + 1);
  };
  const handlePrev = () => {
    if (paso > 1) setPaso((p) => p - 1);
  };

  const handleSubmit = () => {
    setExito(true);
  };

  if (exito) {
    return (
      <section data-bg="canvas" style={{ paddingBlock: "120px", minHeight: "80vh" }}>
        <Container style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "24px",
              color: "var(--color-accent)",
            }}
          >
            ¡Diagnóstico Confirmado!
          </h2>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "40px" }}>
            Hemos recibido tu solicitud para <strong>{formData.nombreAlumno}</strong>. Nos
            comunicaremos al {formData.telefono} para confirmar los detalles de tu primera visita.
          </p>
          <Button href="/" variant="primary">
            Volver al inicio
          </Button>
        </Container>
      </section>
    );
  }

  return (
    <section data-bg="canvas" style={{ paddingBlock: "var(--spacing-section)", minHeight: "80vh" }}>
      <Container style={{ maxWidth: "800px" }}>
        {/* ── Cabecera */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Eyebrow>Admisión &amp; Diagnóstico</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "var(--color-text)",
              marginTop: "16px",
              marginBottom: "16px",
            }}
          >
            Inscripción en 4 Pasos.
          </h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            Garantizamos grupo según edad y afinidad acuática.
          </p>
        </div>

        {/* ── Indicador de progreso (riel simple) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            marginBottom: "64px",
            maxWidth: "400px",
            marginInline: "auto",
          }}
        >
          {/* Línea conectora */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "1px",
              backgroundColor: "var(--color-line)",
              zIndex: 0,
              transform: "translateY(-50%)",
            }}
          />
          {[1, 2, 3, 4].map((num) => {
            const isCompleted = num < paso;
            const isActive = num === paso;
            return (
              <div
                key={num}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: isActive || isCompleted ? "var(--color-accent)" : "var(--color-surface-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isActive || isCompleted ? "var(--color-canvas)" : "var(--color-text-muted)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: isActive ? "0 0 0 4px color-mix(in srgb, var(--color-accent) 20%, transparent)" : "none",
                  transition: "all var(--duration-sm) var(--ease-out)",
                }}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* ── Contenedor del paso actual */}
        <Card style={{ padding: "clamp(24px, 4vw, 48px)" }}>
          {/* PASO 1: Datos Generales */}
          {paso === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
                1. Datos del Alumno y Tutor
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
                <Input
                  label="Nombre del alumno"
                  name="nombreAlumno"
                  value={formData.nombreAlumno}
                  onChange={handleChange}
                  placeholder="Ej. Mateo Ramírez"
                />
                <Input
                  label="Fecha de nacimiento"
                  name="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
                <Input
                  label="Nombre del tutor"
                  name="nombreTutor"
                  value={formData.nombreTutor}
                  onChange={handleChange}
                  placeholder="Ej. Ana Ramírez"
                />
                <Input
                  label="Teléfono de contacto"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="55 1234 5678"
                />
              </div>
              <Input
                label="Experiencia previa o condiciones médicas"
                name="experienciaPrevia"
                value={formData.experienciaPrevia}
                onChange={handleChange}
                placeholder="Opcional..."
              />
            </div>
          )}

          {/* PASO 2: Selección de Nivel */}
          {paso === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
                2. Nivel Sugerido
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-small)" }}>
                Selecciona el nivel que mejor describa la habilidad actual del alumno. El diagnóstico
                final se confirmará en la alberca.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {NIVELES.map((nivel) => {
                  const isSelected = formData.nivelSeleccionado === nivel.id;
                  return (
                    <label
                      key={nivel.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "16px",
                        borderRadius: "var(--radius-card)",
                        border: `1px solid ${isSelected ? "var(--color-accent)" : "var(--color-line)"}`,
                        backgroundColor: isSelected ? "color-mix(in srgb, var(--color-accent) 5%, transparent)" : "transparent",
                        cursor: "pointer",
                        transition: "all var(--duration-sm) var(--ease-out)",
                      }}
                    >
                      <input
                        type="radio"
                        name="nivelSeleccionado"
                        value={nivel.id}
                        checked={isSelected}
                        onChange={handleChange}
                        style={{ accentColor: "var(--color-accent)" }}
                      />
                      <div>
                        <span style={{ display: "block", fontWeight: 600 }}>{nivel.nombre}</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                          {nivel.rangoEdad} • {nivel.ratio} ratio
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 3: Horarios */}
          {paso === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
                3. Horario Preferido
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {HORARIOS_SIMULADOS.map((horario) => {
                  const isSelected = formData.horarioSeleccionado === horario;
                  return (
                    <label
                      key={horario}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "16px",
                        borderRadius: "var(--radius-card)",
                        border: `1px solid ${isSelected ? "var(--color-accent)" : "var(--color-line)"}`,
                        backgroundColor: isSelected ? "color-mix(in srgb, var(--color-accent) 5%, transparent)" : "transparent",
                        cursor: "pointer",
                        transition: "all var(--duration-sm) var(--ease-out)",
                      }}
                    >
                      <input
                        type="radio"
                        name="horarioSeleccionado"
                        value={horario}
                        checked={isSelected}
                        onChange={handleChange}
                        style={{ accentColor: "var(--color-accent)" }}
                      />
                      <span style={{ fontWeight: 500 }}>{horario}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 4: Resumen */}
          {paso === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
                4. Resumen de Inscripción
              </h3>
              <div
                style={{
                  backgroundColor: "var(--color-surface-2)",
                  padding: "24px",
                  borderRadius: "var(--radius-card)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Alumno</p>
                  <p>{formData.nombreAlumno}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Tutor y Contacto</p>
                  <p>{formData.nombreTutor} • {formData.telefono}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Nivel y Horario</p>
                  <p>{NIVELES.find(n => n.id === formData.nivelSeleccionado)?.nombre} • {formData.horarioSeleccionado}</p>
                </div>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", textAlign: "center" }}>
                Diagnóstico inicial sin costo de membresía.
              </p>
            </div>
          )}

          {/* ── Controles al pie */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "40px",
              paddingTop: "24px",
              borderTop: "1px solid var(--color-line)",
            }}
          >
            <Button
              variant="text"
              onClick={handlePrev}
              style={{ opacity: paso === 1 ? 0 : 1, pointerEvents: paso === 1 ? "none" : "auto" }}
            >
              Atrás
            </Button>
            
            {paso < 4 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!isPasoValido()}
                style={{ opacity: !isPasoValido() ? 0.5 : 1 }}
              >
                Continuar
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit}>
                Confirmar diagnóstico
              </Button>
            )}
          </div>
        </Card>
      </Container>
    </section>
  );
}
