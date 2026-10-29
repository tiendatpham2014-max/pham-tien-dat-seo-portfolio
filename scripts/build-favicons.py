import os
from PIL import Image, ImageFilter

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
source_path = os.path.join(root, 'public', 'branding', 'dat-pham-signature-source.png')
public_dir = os.path.join(root, 'public')

src = Image.open(source_path)
bbox = src.getbbox()
cropped = src.crop(bbox)
w, h = cropped.size

# High-res base canvas: 1024x1024 (transparent)
CANVAS_SIZE = 1024
target_w = 960  # fits safely inside circular crop radius (512px)
target_h = int(target_w * (h / w))
x_offset = (CANVAS_SIZE - target_w) // 2
y_offset = (CANVAS_SIZE - target_h) // 2

resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
alpha = resized.split()[3]

# Create dual-contrast transparent signature:
# 1. Subtle dark halo outline for crisp visibility on light/white backgrounds (Google Light SERP, white tabs)
halo_mask = alpha.filter(ImageFilter.MaxFilter(17)).filter(ImageFilter.GaussianBlur(3))
dark_halo = Image.new('RGBA', (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
dark_layer = Image.new('RGBA', (target_w, target_h), (12, 18, 30, 240))
dark_layer.putalpha(halo_mask)
dark_halo.paste(dark_layer, (x_offset, y_offset), dark_layer)

# 2. Luminous ivory core for crisp visibility on dark backgrounds (Google Dark SERP, dark tabs)
ivory_fg = Image.new('RGBA', (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
ivory_layer = Image.new('RGBA', (target_w, target_h), (248, 250, 252, 255))
ivory_layer.putalpha(alpha)
ivory_fg.paste(ivory_layer, (x_offset, y_offset), ivory_layer)

# Merge: 100% transparent background, dual-contrast signature
master_icon = Image.alpha_composite(dark_halo, ivory_fg)

# Generate standard PNG icons (100% transparent background)
sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'favicon-48x48.png': 48,
    'favicon-96x96.png': 96,
    'favicon-192x192.png': 192,
    'favicon-512x512.png': 512,
    'apple-touch-icon.png': 180,
}

generated_images = {}
for filename, sz in sizes.items():
    out_img = master_icon.resize((sz, sz), Image.Resampling.LANCZOS)
    out_path = os.path.join(public_dir, filename)
    out_img.save(out_path, format='PNG', optimize=True)
    generated_images[sz] = out_img
    print(f'Saved {filename} ({sz}x{sz})')

# Generate multi-size favicon.ico containing 16x16, 32x32, and 48x48
ico_path = os.path.join(public_dir, 'favicon.ico')
master_icon.save(
    ico_path,
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)]
)
print('Saved multi-resolution favicon.ico (16, 32, 48)')

# Generate SVG favicon (100% transparent, NO background rectangle)
# Scales cleanly and adapts dynamically via prefers-color-scheme
import base64
with open(os.path.join(public_dir, 'favicon-512x512.png'), 'rb') as f:
    png_b64 = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,{png_b64}" width="512" height="512"/>
</svg>'''

svg_path = os.path.join(public_dir, 'favicon.svg')
with open(svg_path, 'w', encoding='utf-8') as f:
    f.write(svg_content)
print('Saved transparent favicon.svg')
