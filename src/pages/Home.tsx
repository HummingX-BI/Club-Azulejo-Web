import { Hero } from "@/components/home/Hero";
import { Metodo } from "@/components/home/Metodo";
import { Programas } from "@/components/home/Programas";
import { Instructores } from "@/components/home/Instructores";
import { Galeria } from "@/components/home/Galeria";

/* ────────────────────────────────────────────────────────────────
   Home — página principal
   Cada <section data-bg="..."> activa el hook useSectionBackground.
   ──────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* Hero — data-bg="canvas" (tono base) */}
      <section data-bg="canvas" style={{ padding: 0 }}>
        <Hero />
      </section>

      {/* Spacer: canvas sólido entre el hero y el módulo 01.
          El usuario scrollea, el hero se cubre de negro, ve canvas puro,
          y LUEGO aparece Metodo — tres beats distintos. */}
      <div
        aria-hidden
        style={{
          height: "clamp(120px, 16vw, 240px)",
        }}
      />

      {/* Módulo 01 — El Método */}
      <Metodo />

      {/* Programas — 4 fases — data-bg="canvas" (alterna con deep del Método) */}
      <Programas />

      {/* Instructores — data-bg="canvas-deep" */}
      <Instructores />

      {/* Galería — data-bg="canvas" */}
      <Galeria />
    </>
  );
}
