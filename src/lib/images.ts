// PLACEHOLDER · Imágenes de Unsplash mientras se sustituyen por fotos reales.
// Para reemplazar: dejá las claves iguales y cambiá los src por las fotos de la iglesia.

const u = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`

export const images = {
  hero: "/img/hero.webp",                                 // Foto principal del Hero
  heroSecondary: u("1518531933037-91b2f5f229cc", 1200),  // rayos de luz / catedral · sin usar

  // Proceso renacer (scroll story)
  encuentro: "/img/proceso-encuentro.webp",               // I · Encuentro (RNCR I)
  discipulado: "/img/proceso-formacion.webp",             // II · Formación (RNCR II)
  envio: "/img/proceso-envio.webp",                       // III · Envío (RNCR III)

  // Pilares (bento visión)
  adoracion: "/img/vision-adoracion.webp",
  comunidad: "/img/vision-comunidad.webp",
  formacion: "/img/vision-formacion.webp",
  mision: "/img/vision-vision.webp",         // tarjeta "Visión" del bento

  // Ministerios
  ninos: "/img/ministerio-kids.webp",
  jovenes: "/img/ministerio-jovenes.webp",
  familias: "/img/ministerio-familia.webp",
  adoracionMin: "/img/ministerio-alabanza.webp",
  misiones: "/img/ministerio-intercesion.webp",      // Intercesión
  social: "/img/ministerio-multimedia.webp",         // Multimedia
  conexion: "/img/ujieres_rncr1.webp",               // Conexión / Ujieres (foto real)

  // Eventos
  evento1: u("1501281668745-f7f57925c3b4", 800),
  evento2: u("1485395037613-e83d5c1f5290", 800),
  evento3: u("1492684223066-81342ee5ff30", 800),

  // Servicios
  servicio1: "/img/servicio-familiar.webp",       // Servicio Familiar (principal)
  servicio2: "/img/servicio-amanecer.webp",       // Amanecer con el Espíritu Santo
  servicio3: "/img/servicio-casa-oracion.webp",   // Casa de Oración
  servicio4: "/img/servicio-jovenes.webp",        // Servicio de Jóvenes

  // CTA / Sistema
  sistema: u("1551038247-3d9af20df552", 1400),           // arquitectura moderna

  // Contacto
  contacto: "/img/contacto.webp",

  // Iglesia en Casa (collage sección 07)
  iec1: "/img/iec_1.webp",
  iec2: "/img/iec_2.webp",
  iec3: "/img/iec_3.webp",
}

// Video de fondo del Manifiesto.
// Archivo actual: landing/public/video/video_rncr.mp4 (1080p, H.264, sin audio,
// convertido desde el original 4K video_rncr.MOV con ffmpeg).
// (opcionalmente agregá un .webm en manifiestoVideoWebm para mejor compresión).
// Si el archivo no existe, se muestra el poster + animaciones igual.
export const media = {
  manifiestoVideo: "/video/video_rncr_720.mp4",
  // Dejá el webm vacío hasta que tengas el archivo. Si ponés una ruta a un
  // .webm que NO existe, Chrome falla y no cae al mp4 (bug conocido de <source>).
  manifiestoVideoWebm: "",
  manifiestoPoster: "/img/manifiesto-poster.webp", // fotograma real del video (fallback en móvil)
}
