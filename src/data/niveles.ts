/* ────────────────────────────────────────────────────────────────
   niveles.ts — Datos ilustrativos de la trayectoria pedagógica.
   NOTA: Estos datos son de ejemplo para la demo visual con el cliente.
   Los valores reales serán confirmados por la coordinación académica.
   ──────────────────────────────────────────────────────────────── */

export type NivelEstado = "actual" | "disponible";

export interface NivelPrograma {
  id: string;
  numero: string;          // "01" .. "04"
  nombre: string;
  rangoEdad: string;       // e.g. "4–7 años"
  ratio: string;           // e.g. "1:3"
  sesiones: string;        // e.g. "24 sesiones"
  hitos: [string, string, string];
  estado: NivelEstado;
  alumnoDestacado?: string; // nombre de ejemplo — dato ilustrativo
}

/* Datos ilustrativos — no reflejan inscripciones reales */
export const NIVELES: NivelPrograma[] = [
  {
    id: "acuaticos",
    numero: "01",
    nombre: "Acuáticos",
    rangoEdad: "4–7 años",
    ratio: "1:3",
    sesiones: "24 sesiones",
    hitos: [
      "Flotación dorsal autónoma",
      "Desplazamiento con patada de crol",
      "Inmersión voluntaria hasta 30 s",
    ],
    estado: "disponible",
  },
  {
    id: "exploradores",
    numero: "02",
    nombre: "Exploradores",
    rangoEdad: "7–11 años",
    ratio: "1:4",
    sesiones: "32 sesiones",
    hitos: [
      "Crol completo con respiración lateral",
      "Introducción a dorso coordinado",
      "Viraje de toque en pared",
    ],
    estado: "actual",
    alumnoDestacado: "Mateo R.",
  },
  {
    id: "navegantes",
    numero: "03",
    nombre: "Navegantes",
    rangoEdad: "11–15 años",
    ratio: "1:4",
    sesiones: "40 sesiones",
    hitos: [
      "Dominio de 4 estilos reglamentarios",
      "Salida de bloque y reacción cronometrada",
      "Registro biomecánico en bitácora digital",
    ],
    estado: "disponible",
  },
  {
    id: "elite",
    numero: "04",
    nombre: "Élite Azulejo",
    rangoEdad: "15+ años",
    ratio: "1:2",
    sesiones: "Plan personalizado",
    hitos: [
      "Preparación para competencia federada",
      "Análisis de video subacuático HD",
      "Plan de temporada con métricas FINA",
    ],
    estado: "disponible",
  },
];
