# Guía de imágenes y video — Comunidad Cristiana Renacer

Todas las imágenes se reemplazan en un solo archivo: **`src/lib/images.ts`**.
El video y su póster, en **`src/lib/images.ts` → `media`** (archivo físico en `public/video/`).

**Recomendaciones generales para TODAS las imágenes:**
- Formato: **JPG** o **WebP** (WebP pesa menos). Logos en PNG/SVG.
- Peso ideal por imagen: **150–400 KB** (optimizá en [squoosh.app](https://squoosh.app) o TinyPNG).
- Las medidas indicadas son el **mínimo recomendado**; podés subir más resolución (mejor para pantallas retina), solo cuidá el peso.
- Casi todas usan `object-cover` (se recortan para llenar), así que respetá la **orientación** (vertical/horizontal/cuadrada) más que el píxel exacto.

---

## 01 · HERO (inicio)
| Clave en images.ts | Concepto | Orientación | Medida recomendada |
|---|---|---|---|
| `hero` | Foto principal de impacto: adoración / congregación llena / momento de gloria | **Vertical** | **1200 × 1600 px** (3:4) |

> Es la primera imagen que se ve. Que sea potente, con buena luz. También se reutiliza como póster del Facebook Live en `/en-vivo`.

---

## 02 · MANIFIESTO — 🎥 VIDEO DE FONDO
| Clave | Concepto | Formato | Especificación |
|---|---|---|---|
| `media.manifiestoVideo` | Video atmosférico de fondo: agua, luz, adoración, abstracto/espiritual | **MP4 (H.264)** | **1920 × 1080 (16:9)**, 8–20 s en **loop perfecto**, **sin audio**, **< 5 MB** |
| `media.manifiestoPoster` | Imagen de respaldo (primer frame) mientras carga el video | JPG | 1920 × 1080 (16:9) |

> Archivo va en `public/video/manifiesto.mp4`. Instrucciones de compresión en `public/video/LEEME.txt`.
> Opcional: `manifiesto.webm` para mejor compresión.

---

## 03 · VISIÓN & MISIÓN (bento de 4 tarjetas)
| Clave | Tarjeta | Orientación | Medida recomendada |
|---|---|---|---|
| `adoracion` | Adoración (tarjeta ancha) | **Horizontal** | **1600 × 900 px** (16:9) |
| `mision` | Visión (tarjeta alta) | **Vertical** | **900 × 1200 px** (3:4) |
| `formacion` | Formación (cuadrada) | **Cuadrada** | **1000 × 1000 px** (1:1) |
| `comunidad` | Comunidad (cuadrada) | **Cuadrada** | **1000 × 1000 px** (1:1) |

> Todas llevan un overlay oscuro encima (para que se lea el texto), así que funcionan bien fotos con algo de contraste.

---

## 04 · EL PROCESO DE RENACER (scroll-story, 3 etapas)
| Clave | Etapa | Orientación | Medida recomendada |
|---|---|---|---|
| `encuentro` | Paso I · Encuentro (primera visita / adoración) | **Horizontal** | **1920 × 1280 px** (3:2) |
| `discipulado` | Paso II · Formación (células / discipulado) | **Horizontal** | **1920 × 1280 px** (3:2) |
| `envio` | Paso III · Envío (misiones / salir) | **Horizontal** | **1920 × 1280 px** (3:2) |

> Se ven a pantalla grande en desktop. Cuanto mejor resolución, mejor.

---

## 05 · MINISTERIOS (bento de 6 tarjetas)
| Clave | Ministerio | Orientación | Medida recomendada |
|---|---|---|---|
| `familias` | Familia (tarjeta ancha) | **Horizontal** | **1600 × 900 px** (16:9) |
| `misiones` | Intercesión (tarjeta alta) | **Vertical** | **900 × 1200 px** (3:4) |
| `ninos` | RNCR Kids (cuadrada) | **Cuadrada** | **1000 × 1000 px** (1:1) |
| `jovenes` | Jóvenes (cuadrada) | **Cuadrada** | **1000 × 1000 px** (1:1) |
| `adoracionMin` | Alabanza & Adoración (tarjeta ancha) | **Horizontal** | **1600 × 900 px** (16:9) |
| `social` | Multimedia (cuadrada) | **Cuadrada** | **1000 × 1000 px** (1:1) |

> Tienen overlay oscuro degradado. Idealmente fotos reales de cada ministerio.

---

## 06 · SERVICIOS SEMANALES (4 tarjetas verticales)
| Clave | Servicio | Orientación | Medida recomendada |
|---|---|---|---|
| `servicio1` | Servicio Familiar (Dom 9:00) | **Vertical** | **800 × 1100 px** (3:4) |
| `servicio4` | Servicio de Jóvenes (Dom 11:00) | **Vertical** | **800 × 1100 px** (3:4) |
| `servicio3` | Casa de Oración (Mié 19:00) | **Vertical** | **800 × 1100 px** (3:4) |
| `servicio2` | Amanecer con el Espíritu Santo (Mié y Vie 5:00, Zoom) | **Vertical** | **800 × 1100 px** (3:4) |

> Tarjetas altas (420 px). Overlay oscuro abajo para la hora y el nombre.

---

## 07 · EVENTOS (imagen flotante al pasar el cursor)
| Clave | Concepto | Orientación | Medida recomendada |
|---|---|---|---|
| `evento1` | Foto/flyer del evento 1 | **Vertical** | **600 × 800 px** (3:4) |
| `evento2` | Foto/flyer del evento 2 | **Vertical** | **600 × 800 px** (3:4) |
| `evento3` | Foto/flyer del evento 3 | **Vertical** | **600 × 800 px** (3:4) |

> Aparecen pequeñas (≈280×360) flotando junto al cursor. No hace falta mucha resolución.

---

## 08 · UBICACIONES — sin imágenes (solo texto/tarjetas)
## 09 · DAR / OFRENDA — sin imágenes

---

## 10 · SISTEMA INTERNO (fondo)
| Clave | Concepto | Orientación | Medida recomendada |
|---|---|---|---|
| `sistema` | Fondo abstracto/moderno (arquitectura, tecnología, ciudad) | **Horizontal** | **1920 × 1080 px** (16:9) |

> Se ve muy oscurecido (opacidad 25 %) detrás del panel del dashboard. No necesita ser nítida.

---

## 11 · CONTACTO
| Clave | Concepto | Orientación | Medida recomendada |
|---|---|---|---|
| `contacto` | Foto cálida de comunidad / fachada / equipo | **Horizontal** | **1200 × 900 px** (4:3) |

---

## LOGOS / FAVICON (ya cargados — referencia)
| Archivo en public/ | Uso | Medida |
|---|---|---|
| `logo_menu.png` | Menú principal y mobile | 400 × 100 (horizontal, fondo transparente) |
| `logo_h.png` | Footer (versión blanca) | 400 × 100 (horizontal, fondo transparente) |
| `rncrlogo.png` | Pantalla de carga (loader) | 160 × 160 (cuadrado) |
| `ccrncrlogo_favicon.png` | Favicon (pestaña del navegador) | 512 × 512 (cuadrado) |

---

## Páginas que NO necesitan que subas imágenes
- **YouTube** (en `/en-vivo`): las miniaturas se traen **solas** del canal (RSS).
- **Instagram** (en `/en-vivo`): el feed lo trae **solo** el widget de Elfsight.
- **Facebook Live**: cuando transmiten, se incrusta el video; mientras tanto usa la foto `hero` como póster.

---

### Resumen de orientaciones (para juntar fotos rápido)
- **Verticales (3:4):** Hero, Visión, Intercesión, los 4 Servicios, los 3 Eventos.
- **Horizontales (16:9 / 3:2):** Manifiesto (video), Adoración, Alabanza, Familia, las 3 del Proceso, Sistema, Contacto.
- **Cuadradas (1:1):** Formación, Comunidad, RNCR Kids, Jóvenes, Multimedia.
