"""Détoure un logo posé sur un fond uni : fond -> transparent, recadrage serré, export PNG.
Usage : python3 scripts/logo.py source.png sortie.png [--white]   (--white : force le logo en blanc)"""
import sys
import numpy as np
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
white = "--white" in sys.argv
im = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
h, w, _ = im.shape
border = np.concatenate([im[:4].reshape(-1, 3), im[-4:].reshape(-1, 3), im[:, :4].reshape(-1, 3), im[:, -4:].reshape(-1, 3)])
bg = np.median(border, axis=0)
dist = np.linalg.norm(im - bg, axis=2)
alpha = np.clip((dist - 18) / 110, 0, 1)  # toute couleur nettement différente du fond est opaque
a = alpha[..., None]
fg = np.where(a > 0.02, (im - bg * (1 - a)) / np.maximum(a, 0.02), 0)
fg = np.clip(fg, 0, 255)
if white:
    fg[:] = 255
rgba = np.dstack([fg, alpha * 255]).astype(np.uint8)
out = Image.fromarray(rgba, "RGBA")
# Ignore les fines lignes parasites sur les bords de l'image source
edge = 8
alpha[:, :edge] = 0; alpha[:, -edge:] = 0; alpha[:edge] = 0; alpha[-edge:] = 0  # bords de capture d'écran
mask = alpha > 0.3
cols = np.where(mask.sum(axis=0) > max(3, h * 0.02))[0]
rows = np.where(mask.sum(axis=1) > max(3, w * 0.01))[0]
alpha[:, : cols.min()] = 0; alpha[:, cols.max() + 1 :] = 0
alpha[: rows.min()] = 0; alpha[rows.max() + 1 :] = 0
rgba = np.dstack([fg, alpha * 255]).astype(np.uint8)
out = Image.fromarray(rgba, "RGBA")
pad = 4
box = (max(cols.min() - pad, 0), max(rows.min() - pad, 0), min(cols.max() + pad + 1, w), min(rows.max() + pad + 1, h))
out = out.crop(box)
out = out.resize((out.width * 2, out.height * 2), Image.LANCZOS)
out.save(dst, optimize=True)
print(dst, out.size)
