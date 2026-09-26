/* ────────────────────────────────────────────────────────────────
   galeria.ts — Datos ilustrativos de la galería "Momentos Azulejo".
   NOTA: Estos datos son de ejemplo para la demo visual con el cliente.
   ──────────────────────────────────────────────────────────────── */

export type CategoriaGaleria =
  | "Torneos"
  | "Exhibiciones"
  | "Reconocimientos"
  | "Clases";

export interface ItemGaleria {
  id: string;
  categoria: CategoriaGaleria;
  titulo: string;
  descripcionCorta: string;
  imagenUrl: string; // vacío por ahora — pendiente fotografía real
}

/* Datos ilustrativos */
export const GALERIA: ItemGaleria[] = [
  {
    id: "gal-1",
    categoria: "Torneos",
    titulo: "Copa Azulejo Invierno",
    descripcionCorta: "Competencia interna de velocidad y estilos.",
    imagenUrl: "",
  },
  {
    id: "gal-2",
    categoria: "Clases",
    titulo: "Estimulación temprana",
    descripcionCorta: "Niveles iniciales desarrollando confianza acuática.",
    imagenUrl: "",
  },
  {
    id: "gal-3",
    categoria: "Exhibiciones",
    titulo: "Muestra de nado sincronizado",
    descripcionCorta: "Presentación del equipo Élite Azulejo.",
    imagenUrl: "",
  },
  {
    id: "gal-4",
    categoria: "Reconocimientos",
    titulo: "Certificación FINA 2026",
    descripcionCorta: "Renovación de nuestro cuerpo técnico colegiado.",
    imagenUrl: "",
  },
  {
    id: "gal-5",
    categoria: "Clases",
    titulo: "Biomecánica avanzada",
    descripcionCorta: "Análisis de virajes y salidas en nivel 03.",
    imagenUrl: "",
  },
  {
    id: "gal-6",
    categoria: "Torneos",
    titulo: "Interclubes Regional",
    descripcionCorta: "Participación destacada de nuestros alumnos federados.",
    imagenUrl: "",
  },
  {
    id: "gal-7",
    categoria: "Reconocimientos",
    titulo: "Medallistas Estatales",
    descripcionCorta: "Alumnos de nivel 04 alcanzan el podio regional.",
    imagenUrl: "",
  },
  {
    id: "gal-8",
    categoria: "Exhibiciones",
    titulo: "Clase abierta a familias",
    descripcionCorta: "Demostración de progreso de niveles 01 y 02.",
    imagenUrl: "",
  },
];
