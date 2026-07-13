// ────────────────────────────────────────────────────────────────
// Datos de la AGENDA RENACER (página /agenda).
// Dos tipos de actividad:
//   · "weekly"  → se repite cada semana en un día fijo (servicios, oración…)
//   · "special" → ocurre una sola vez en una fecha concreta (eventos)
// El calendario expande automáticamente las "weekly" en cada mes.
// Para agregar/editar actividades, modificá los arreglos de abajo.
// ────────────────────────────────────────────────────────────────

export type Categoria =
  | "Servicio"
  | "Jóvenes"
  | "Oración"
  | "Adoración"
  | "Bautismos"
  | "Conferencia"

// Color de acento por categoría (paleta de marca).
export const categoriaColor: Record<Categoria, string> = {
  Servicio: "#179cda",     // spirit-500
  Jóvenes: "#0c87a8",      // spirit-700
  Oración: "#45b6e3",      // spirit-400
  Adoración: "#11a0c0",    // spirit-600
  Bautismos: "#7ccdec",    // spirit-300
  Conferencia: "#c8962a",  // dorado · eventos destacados
}

export interface ActividadBase {
  titulo: string
  hora: string
  lugar: string
  categoria: Categoria
  descripcion: string
}

export interface ActividadSemanal extends ActividadBase {
  tipo: "weekly"
  // 0=Domingo, 1=Lunes … 6=Sábado
  diaSemana: number
}

export interface ActividadEspecial extends ActividadBase {
  tipo: "special"
  // Fecha en formato YYYY-MM-DD
  fecha: string
}

export type Actividad = ActividadSemanal | ActividadEspecial

// Actividades semanales (se repiten cada semana) ─────────────────
export const semanales: ActividadSemanal[] = [
  {
    tipo: "weekly",
    diaSemana: 0,
    hora: "09:00",
    titulo: "Servicio Familiar",
    lugar: "Sede Central",
    categoria: "Servicio",
    descripcion:
      "Nuestro servicio principal: adoración, palabra y comunidad para toda la familia. Espacio para niños (RNCR Kids) durante la reunión.",
  },
  {
    tipo: "weekly",
    diaSemana: 0,
    hora: "11:00",
    titulo: "Servicio de Jóvenes",
    lugar: "Sede Central",
    categoria: "Jóvenes",
    descripcion:
      "Una generación encendida viviendo la fe. Alabanza, mensaje y conexión para jóvenes y universitarios.",
  },
  {
    tipo: "weekly",
    diaSemana: 3,
    hora: "05:00",
    titulo: "Amanecer con el Espíritu Santo",
    lugar: "Zoom",
    categoria: "Oración",
    descripcion:
      "Comenzamos el día buscando la presencia de Dios en oración. Transmisión por Zoom para toda la iglesia.",
  },
  {
    tipo: "weekly",
    diaSemana: 3,
    hora: "19:00",
    titulo: "Casa de Oración",
    lugar: "Sede Central",
    categoria: "Oración",
    descripcion:
      "Noche de intercesión y adoración. Sostenemos juntos la visión en la presencia de Dios.",
  },
  {
    tipo: "weekly",
    diaSemana: 5,
    hora: "05:00",
    titulo: "Amanecer con el Espíritu Santo",
    lugar: "Zoom",
    categoria: "Oración",
    descripcion:
      "Comenzamos el día buscando la presencia de Dios en oración. Transmisión por Zoom para toda la iglesia.",
  },
]

// Eventos especiales (fecha única) ───────────────────────────────
export const especiales: ActividadEspecial[] = [
  {
    tipo: "special",
    fecha: "2026-06-15",
    hora: "19:00",
    titulo: "Encuentro de Adoración",
    lugar: "Sede Central",
    categoria: "Adoración",
    descripcion:
      "Una noche dedicada a la presencia de Dios: adoración extendida, palabra y ministración.",
  },
  {
    tipo: "special",
    fecha: "2026-06-22",
    hora: "09:00",
    titulo: "Bautismos de Verano",
    lugar: "Playa La Herradura",
    categoria: "Bautismos",
    descripcion:
      "Celebramos públicamente la fe de quienes han decidido seguir a Cristo. Una mañana de testimonio y fiesta en familia.",
  },
  {
    tipo: "special",
    fecha: "2026-07-05",
    hora: "Todo el día",
    titulo: "Conferencia Renacer 2026",
    lugar: "Auditorio Nacional",
    categoria: "Conferencia",
    descripcion:
      "Nuestro encuentro anual: invitados, talleres y plenarias para crecer en la visión de renacer para ver el Reino.",
  },
]

export const actividades: Actividad[] = [...semanales, ...especiales]
