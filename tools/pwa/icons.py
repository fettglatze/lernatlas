"""Erzeugt die App-Icons (PWA) aus dem Markenzeichen: schwarze Fläche, weißer Balken, weißes Quadrat.

Aufruf: python tools/pwa/icons.py  →  assets/icons/*.png
"""
from pathlib import Path
from PIL import Image, ImageDraw

INK, SIGNAL, PAPER = '#111111', '#ffffff', '#ffffff'
OUT = Path(__file__).resolve().parents[2] / 'assets' / 'icons'


def icon(size, pad):
    """pad: Anteil Rand je Seite. Das Zeichen ist auf ein 20×20-Raster gelegt (Favicon: 9 + 2 + 9 breit)."""
    img = Image.new('RGB', (size, size), INK)
    d = ImageDraw.Draw(img)
    u = size * (1 - 2 * pad) / 20
    x0 = y0 = size * pad
    d.rectangle([x0, y0, x0 + 9 * u, y0 + 20 * u], fill=SIGNAL)
    d.rectangle([x0 + 11 * u, y0, x0 + 20 * u, y0 + 9 * u], fill=PAPER)
    return img


OUT.mkdir(parents=True, exist_ok=True)
icon(192, 0.19).save(OUT / 'icon-192.png')
icon(512, 0.19).save(OUT / 'icon-512.png')
icon(512, 0.27).save(OUT / 'icon-maskable-512.png')   # Inhalt in der sicheren Zone (innere 80 %)
icon(180, 0.19).save(OUT / 'apple-touch-icon.png')
print('Icons geschrieben nach', OUT)
