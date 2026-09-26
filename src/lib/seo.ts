/**
 * Mapa de títulos y meta descripciones por ruta.
 */
export const seoConfig: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Club Azulejo — Escuela de Natación",
    description: "Escuela de natación para todas las edades.",
  },
  "/metodo": {
    title: "Método | Club Azulejo",
    description: "Conoce nuestro método de enseñanza.",
  },
  "/programas": {
    title: "Programas | Club Azulejo",
    description: "Programas de natación por nivel y edad.",
  },
  "/instructores": {
    title: "Instructores | Club Azulejo",
    description: "Nuestro equipo de instructores certificados.",
  },
  "/galeria": {
    title: "Galería | Club Azulejo",
    description: "Fotos y videos de nuestras instalaciones.",
  },
  "/inscripcion": {
    title: "Inscripción | Club Azulejo",
    description: "Inscribe a tu hijo en línea.",
  },
  "/portal": {
    title: "Portal Familias | Club Azulejo",
    description: "Accede al portal de familias.",
  },
  "/admin": {
    title: "Admin | Club Azulejo",
    description: "Panel de administración.",
  },
};

/**
 * Actualiza el título y meta description del documento.
 */
export function applySeo(pathname: string): void {
  const config = seoConfig[pathname] ?? seoConfig["/"]!;
  document.title = config.title;

  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", config.description);
}
