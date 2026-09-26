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

      {/* El Método — data-bg="canvas-deep" (tono más profundo) */}
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
