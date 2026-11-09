"""Normalise une slide en 2000x1125 et efface le numéro de page en haut à droite.
Usage : python3 clean_slide.py source destination.webp [--keep]  (--keep : page sans numéro)"""
import sys
from PIL import Image, ImageChops, ImageStat, ImageFilter

W, H = 2000, 1125
src, dst = sys.argv[1], sys.argv[2]
keep = '--keep' in sys.argv
im = Image.open(src).convert("RGB")
s = im.width / 2000
# Zone du numéro (sur une slide de 2000 px de large)
x0, y0, x1, y1 = int(1895 * s), int(48 * s), int(1965 * s), int(98 * s)
w, h = x1 - x0, y1 - y0

def ring_diff(patch):
    """Écart entre les bords du patch et les pixels qui entourent la zone."""
    test = im.copy(); test.paste(patch, (x0, y0))
    a = test.crop((x0 - 4, y0 - 4, x1 + 4, y1 + 4)); b = im.crop((x0 - 4, y0 - 4, x1 + 4, y1 + 4))
    inner = Image.new("L", a.size, 255); inner.paste(0, (8, 8, a.width - 8, a.height - 8))
    d = ImageChops.difference(a, b).convert("L")
    return ImageStat.Stat(d, mask=inner).mean[0] + ImageStat.Stat(patch).stddev[0] * 0.5

cands = []
for dx, dy in [(-w - 10, 0), (-2 * w - 20, 0), (0, h + 4), (-w // 2, h + 4), (-w - 10, h + 4)]:
    bx, by = x0 + dx, y0 + dy
    if bx >= 0 and by + h <= im.height:
        cands.append(im.crop((bx, by, bx + w, by + h)))
best = min(cands, key=ring_diff) if not keep else None
# Collage à bords adoucis pour que le raccord ne se voie pas
mask = Image.new("L", (w, h), 0); mask.paste(255, (6, 6, w - 6, h - 6))
mask = mask.filter(ImageFilter.GaussianBlur(4))
core = Image.new("L", (w, h), 0); core.paste(255, (14, 12, w - 14, h - 12))
mask = ImageChops.lighter(mask, core)
if best is not None:
    im.paste(best, (x0, y0), mask)

# Même format pour toutes les pages : 16:9, recadrage centré si besoin.
ratio = W / H
if im.width / im.height > ratio:
    nw = int(im.height * ratio); x = (im.width - nw) // 2; im = im.crop((x, 0, x + nw, im.height))
else:
    nh = int(im.width / ratio); y = (im.height - nh) // 2; im = im.crop((0, y, im.width, y + nh))
im.resize((W, H), Image.LANCZOS).save(dst, "WEBP", quality=88)
