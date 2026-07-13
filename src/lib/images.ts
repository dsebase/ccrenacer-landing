// PLACEHOLDER · Imágenes de Unsplash mientras se sustituyen por fotos reales.
// Para reemplazar: dejá las claves iguales y cambiá los src por las fotos de la iglesia.

const u = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`

export const images = {
  hero: "/img/hero.png",                                 // Foto principal del Hero
  heroSecondary: u("1518531933037-91b2f5f229cc", 1200),  // rayos de luz / catedral · sin usar

  // Proceso renacer (scroll story)
  encuentro: "/img/proceso-encuentro.png",               // I · Encuentro (RNCR I)
  discipulado: "/img/proceso-formacion.png",             // II · Formación (RNCR II)
  envio: "/img/proceso-envio.png",                       // III · Envío (RNCR III)

  // Pilares (bento visión)
  adoracion: "/img/vision-adoracion.png",
  comunidad: "/img/vision-comunidad.png",
  formacion: "/img/vision-formacion.png",
  mision: "/img/vision-vision.png",         // tarjeta "Visión" del bento

  // Ministerios
  ninos: "/img/ministerio-kids.png",
  jovenes: "/img/ministerio-jovenes.png",
  familias: "/img/ministerio-familia.png",
  adoracionMin: "/img/ministerio-alabanza.png",
  misiones: "/img/ministerio-intercesion.png",      // Intercesión
  social: "/img/ministerio-multimedia.png",         // Multimedia

  // Eventos
  evento1: u("1501281668745-f7f57925c3b4", 800),
  evento2: u("1485395037613-e83d5c1f5290", 800),
  evento3: u("1492684223066-81342ee5ff30", 800),

  // Servicios
  servicio1: "/img/servicio-familiar.png",       // Servicio Familiar (principal)
  servicio2: "/img/servicio-amanecer.png",       // Amanecer con el Espíritu Santo
  servicio3: "/img/servicio-casa-oracion.png",   // Casa de Oración
  servicio4: "/img/servicio-jovenes.png",        // Servicio de Jóvenes

  // CTA / Sistema
  sistema: u("1551038247-3d9af20df552", 1400),           // arquitectura moderna

  // Contacto
  contacto: "/img/contacto.png",

  // Iglesia en Casa (collage sección 07)
  iec1: "/img/iec_1.jpg",
  iec2: "/img/iec_2.jpg",
  iec3: "/img/iec_3.jpg",
}

// Video de fondo del Manifiesto.
// Archivo actual: landing/public/video/video_rncr.mp4 (1080p, H.264, sin audio,
// convertido desde el original 4K video_rncr.MOV con ffmpeg).
// (opcionalmente agregá un .webm en manifiestoVideoWebm para mejor compresión).
// Si el archivo no existe, se muestra el poster + animaciones igual.
export const media = {
  manifiestoVideo: "/video/video_rncr.mp4",
  // Dejá el webm vacío hasta que tengas el archivo. Si ponés una ruta a un
  // .webm que NO existe, Chrome falla y no cae al mp4 (bug conocido de <source>).
  manifiestoVideoWebm: "",
  manifiestoPoster: u("1490127252417-7c393f993ee4", 1600), // fallback / primer frame
}
