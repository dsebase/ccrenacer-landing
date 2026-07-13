"""
Genera un video de prueba abstracto (ondas de luz cyan/teal estilo agua/Espíritu)
para el fondo de la sección Manifiesto. Loop perfecto.

Uso:  python scripts/gen_manifiesto_video.py
Salida: public/video/manifiesto.mp4
Reemplazá este video por el oficial cuando lo tengas.
"""
import os
import numpy as np
import imageio.v2 as imageio

W, H = 1280, 720
FPS = 24
DURATION = 12          # segundos
N = FPS * DURATION     # frames (loop: usamos seno del tiempo)
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "video", "manifiesto.mp4")

# Paleta de marca (RGB 0-1)
INK = np.array([10, 15, 18]) / 255.0       # #0a0f12
SPIRIT = np.array([23, 156, 218]) / 255.0  # #179cda
TEAL = np.array([17, 160, 192]) / 255.0    # #11a0c0
MINT = np.array([200, 230, 229]) / 255.0   # #c8e6e5

# Coordenadas normalizadas
xs = np.linspace(0, 1, W, dtype=np.float32)
ys = np.linspace(0, 1, H, dtype=np.float32)
gx, gy = np.meshgrid(xs, ys)

def frame(t):
    """t en [0, 2*pi) para loop perfecto."""
    # Varias ondas diagonales que fluyen como caustics de agua
    w1 = np.sin((gx * 3.0 + gy * 2.0) * np.pi + t * 1.0)
    w2 = np.sin((gx * 5.0 - gy * 4.0) * np.pi - t * 1.3 + 1.7)
    w3 = np.sin((gx * 1.5 + gy * 6.0) * np.pi + t * 0.7 + 3.1)
    field = (w1 * 0.5 + w2 * 0.3 + w3 * 0.2)        # [-1, 1]
    field = (field + 1.0) * 0.5                      # [0, 1]

    # Bloom de luz que orbita (centro móvil en loop)
    cx = 0.5 + 0.28 * np.cos(t)
    cy = 0.45 + 0.18 * np.sin(t * 1.0)
    dist = np.sqrt((gx - cx) ** 2 + (gy - cy) ** 2)
    bloom = np.clip(1.0 - dist * 1.6, 0, 1) ** 2.2

    # Segundo bloom teal en contrafase
    cx2 = 0.5 - 0.30 * np.cos(t * 0.8 + 1.0)
    cy2 = 0.55 + 0.20 * np.sin(t * 0.8 + 2.0)
    dist2 = np.sqrt((gx - cx2) ** 2 + (gy - cy2) ** 2)
    bloom2 = np.clip(1.0 - dist2 * 1.8, 0, 1) ** 2.5

    # Mezcla de color: base oscura -> spirit segun field, + teal bloom
    base = INK[None, None, :] * (1 - field[..., None] * 0.55)
    col = base + SPIRIT[None, None, :] * (field[..., None] * 0.45)
    col = col + SPIRIT[None, None, :] * bloom[..., None] * 0.9
    col = col + TEAL[None, None, :] * bloom2[..., None] * 0.7

    # Destellos mint en crestas altas
    crest = np.clip((field - 0.82) / 0.18, 0, 1) ** 2
    col = col + MINT[None, None, :] * crest[..., None] * 0.5

    # Viñeta para foco central
    vdist = np.sqrt((gx - 0.5) ** 2 + (gy - 0.5) ** 2)
    vignette = np.clip(1.0 - vdist * 0.9, 0.25, 1.0)
    col = col * vignette[..., None]

    col = np.clip(col, 0, 1)
    return (col * 255).astype(np.uint8)

def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    writer = imageio.get_writer(
        OUT, fps=FPS, codec="libx264", quality=7,
        macro_block_size=16, ffmpeg_params=["-pix_fmt", "yuv420p", "-movflags", "+faststart"],
    )
    for i in range(N):
        t = (i / N) * 2 * np.pi   # loop perfecto
        writer.append_data(frame(t))
        if i % 24 == 0:
            print(f"frame {i}/{N}")
    writer.close()
    size = os.path.getsize(OUT) / 1024 / 1024
    print(f"OK -> {OUT}  ({size:.2f} MB)")

if __name__ == "__main__":
    main()
