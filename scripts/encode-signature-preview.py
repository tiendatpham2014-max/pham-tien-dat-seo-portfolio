"""Encode the SVG-rendered proof frames as a lightweight looping preview GIF."""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
FRAMES = sorted((ROOT / "out" / "signature-animation-frames").glob("*.png"))
if not FRAMES:
    raise SystemExit("Run: node scripts/build-signature-animation.mjs --frames")

with Image.open(FRAMES[-1]) as last:
    palette = last.convert("RGB").quantize(colors=48, method=Image.Quantize.MEDIANCUT)

images = []
for path in FRAMES:
    with Image.open(path) as frame:
        images.append(frame.convert("RGB").quantize(palette=palette))

destination = ROOT / "public" / "branding" / "dat-pham-signature-writing-preview.gif"
images[0].save(
    destination,
    save_all=True,
    append_images=images[1:],
    duration=40,
    loop=0,
    optimize=True,
    disposal=2,
)
print(destination)
