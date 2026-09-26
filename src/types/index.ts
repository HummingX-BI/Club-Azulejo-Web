// ─── Tipos base del proyecto Club Azulejo ───

export interface Club {
  nombre: string;
  horarios: string[];
  alberca: string;
}

export interface Instructor {
  id: string;
  nombre: string;
  especialidad: string;
  foto: string;
}

export interface Nivel {
  id: string;
  nombre: string;
  descripcion: string;
  edadMin: number;
  edadMax: number;
}

export interface Alumno {
  id: string;
  nombre: string;
  nivelId: string;
  tutorNombre: string;
  tutorTelefono: string;
}

export interface Carril {
  id: string;
  nombre: string;
  nivelId: string;
  instructorId: string;
  horario: string;
  capacidad: number;
  ocupados: number;
}

export interface Metrica {
  label: string;
  valor: number;
  unidad?: string;
}

export interface Pago {
  id: string;
  alumnoId: string;
  monto: number;
  fecha: string;
  concepto: string;
  estado: "pagado" | "pendiente" | "vencido";
}

export interface Lead {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  score: number;
  origen: string;
  estado: "nuevo" | "contactado" | "convertido" | "perdido";
}

export interface Campana {
  id: string;
  nombre: string;
  canal: string;
  presupuesto: number;
  leads: number;
  conversiones: number;
}

export interface FAQ {
  pregunta: string;
  respuesta: string;
}
