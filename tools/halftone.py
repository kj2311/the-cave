"""Screens a photo into a newspaper halftone print for the archive.

    python3 tools/halftone.py photo.png img/codex/l-example

writes l-example.webp (960x640, for the article) and l-example-s.webp
(336x224, the thumbnail in the list). The photo is centre-cropped to 3:2,
tone-mapped for newsprint, and screened with a 45 degree dot screen in ink
on a transparent ground, so the paper shows through the dots. Every print
in the app goes through this, which is what keeps them one style whatever
the originals looked like. Needs Pillow and NumPy.
"""
import math
import sys

import numpy as np
from PIL import Image, ImageFilter

INK = 24


def crop32(img):
    w, h = img.size
    if w / h > 1.5:
        nw = round(h * 1.5)
        x0 = (w - nw) // 2
        return img.crop((x0, 0, x0 + nw, h))
    nh = round(w / 1.5)
    y0 = (h - nh) // 2
    return img.crop((0, y0, w, y0 + nh))


def tone(gray, lift=0.72):
    a = gray.astype(np.float64) / 255.0
    lo, hi = np.percentile(a, 0.8), np.percentile(a, 99.6)
    a = np.clip((a - lo) / max(1e-6, hi - lo), 0, 1)
    a = a ** lift                                 # lift the mid-tones (lower = lighter)
    k = 1.0 - a
    k = np.clip(0.5 + (k - 0.5) * 1.22, 0, 1)    # a little more snap
    return np.clip(0.02 + 0.88 * k, 0, 1)         # at most ~90% ink, as on cheap paper


def screen(k, cell, angle=45.0):
    h, w = k.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float64)
    t = math.radians(angle)
    u = (xx * math.cos(t) + yy * math.sin(t)) / cell
    v = (-xx * math.sin(t) + yy * math.cos(t)) / cell
    spot = 0.5 * (np.cos(2 * math.pi * u) + np.cos(2 * math.pi * v))
    return (spot > 1.0 - 2.0 * k).astype(np.float64)


def print_photo(src, w, h, cell, ss=3, lift=0.72):
    g = src.convert('L').resize((w * ss, h * ss), Image.LANCZOS)
    g = g.filter(ImageFilter.GaussianBlur(radius=ss * 0.6))
    g = g.filter(ImageFilter.UnsharpMask(radius=ss * 24, percent=45, threshold=0))
    g = g.filter(ImageFilter.UnsharpMask(radius=ss * 2, percent=80, threshold=2))
    ink = screen(tone(np.asarray(g), lift), cell * ss)
    im = Image.fromarray((ink * 255).astype(np.uint8), 'L').resize((w, h), Image.BOX)
    alpha = (np.round(np.asarray(im) / 127.5) * 127.5).clip(0, 255).astype(np.uint8)
    rgba = np.zeros((h, w, 4), np.uint8)
    rgba[..., 0] = INK
    rgba[..., 1] = INK
    rgba[..., 2] = INK + 2
    rgba[..., 3] = alpha
    return Image.fromarray(rgba, 'RGBA')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    src = crop32(Image.open(sys.argv[1]).convert('RGB'))
    out = sys.argv[2]
    print_photo(src, 960, 640, cell=8).save(f'{out}.webp', 'WEBP', lossless=True, method=6)
    print_photo(src, 336, 224, cell=4.5).save(f'{out}-s.webp', 'WEBP', lossless=True, method=6)
    print('wrote', f'{out}.webp', f'{out}-s.webp')
