import os
import io
import base64
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
target_w = 960  # fits safely inside circular crop radius
target_h = int(target_w * (h / w))
x_offset = (CANVAS_SIZE - target_w) // 2
y_offset = (CANVAS_SIZE - target_h) // 2

resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
alpha = resized.split()[3]

# Create dual-contrast transparent signature for search engines and standard PNGs:
halo_mask = alpha.filter(ImageFilter.MaxFilter(17)).filter(ImageFilter.GaussianBlur(3))
dark_halo = Image.new('RGBA', (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
dark_layer = Image.new('RGBA', (target_w, target_h), (12, 18, 30, 240))
dark_layer.putalpha(halo_mask)
dark_halo.paste(dark_layer, (x_offset, y_offset), dark_layer)

ivory_fg = Image.new('RGBA', (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
ivory_layer = Image.new('RGBA', (target_w, target_h), (248, 250, 252, 255))
ivory_layer.putalpha(alpha)
ivory_fg.paste(ivory_layer, (x_offset, y_offset), ivory_layer)

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

# Multi-resolution favicon.ico containing 16x16, 32x32, and 48x48
ico_path = os.path.join(public_dir, 'favicon.ico')
master_icon.save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
print('Saved multi-resolution favicon.ico (16, 32, 48)')

# Prepare clean resized signature for SVG embedded data
svg_target_w = 460
svg_target_h = int(svg_target_w * (h / w))
svg_x = (512 - svg_target_w) // 2
svg_y = (512 - svg_target_h) // 2
svg_resized = cropped.resize((svg_target_w, svg_target_h), Image.Resampling.LANCZOS)

buf = io.BytesIO()
svg_resized.save(buf, format='PNG')
raw_b64 = base64.b64encode(buf.getvalue()).decode('utf-8')

# 1. Adaptive favicon.svg (changes automatically with browser/OS dark/light appearance)
adaptive_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <filter id="ink-dark" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0 0 0 0 0.95686  0 0 0 0 0.96078  0 0 0 0 0.94510  0 0 0 1 0"/>
    </filter>
    <filter id="ink-light" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0 0 0 0 0.06275  0 0 0 0 0.09412  0 0 0 0 0.15294  0 0 0 1 0"/>
    </filter>
    <image id="sig" href="data:image/png;base64,{raw_b64}" x="{svg_x}" y="{svg_y}" width="{svg_target_w}" height="{svg_target_h}"/>
  </defs>
  <style>
    .sig-mark {{
      filter: url(#ink-dark);
    }}
    @media (prefers-color-scheme: light) {{
      .sig-mark {{
        filter: url(#ink-light);
      }}
    }}
    @media (prefers-color-scheme: dark) {{
      .sig-mark {{
        filter: url(#ink-dark);
      }}
    }}
  </style>
  <use class="sig-mark" href="#sig"/>
</svg>'''

with open(os.path.join(public_dir, 'favicon.svg'), 'w', encoding='utf-8') as f:
    f.write(adaptive_svg)
print('Saved adaptive favicon.svg (auto-switches via prefers-color-scheme)')

# 2. Dedicated light-theme favicon.svg (dark navy ink #101827)
light_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <filter id="ink-light" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0 0 0 0 0.06275  0 0 0 0 0.09412  0 0 0 0 0.15294  0 0 0 1 0"/>
    </filter>
    <image id="sig" href="data:image/png;base64,{raw_b64}" x="{svg_x}" y="{svg_y}" width="{svg_target_w}" height="{svg_target_h}"/>
  </defs>
  <use href="#sig" filter="url(#ink-light)"/>
</svg>'''

with open(os.path.join(public_dir, 'favicon-light.svg'), 'w', encoding='utf-8') as f:
    f.write(light_svg)
print('Saved favicon-light.svg (dark ink for light theme)')

# 3. Dedicated dark-theme favicon.svg (ivory white ink #F4F5F1)
dark_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <filter id="ink-dark" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0 0 0 0 0.95686  0 0 0 0 0.96078  0 0 0 0 0.94510  0 0 0 1 0"/>
    </filter>
    <image id="sig" href="data:image/png;base64,{raw_b64}" x="{svg_x}" y="{svg_y}" width="{svg_target_w}" height="{svg_target_h}"/>
  </defs>
  <use href="#sig" filter="url(#ink-dark)"/>
</svg>'''

with open(os.path.join(public_dir, 'favicon-dark.svg'), 'w', encoding='utf-8') as f:
    f.write(dark_svg)
print('Saved favicon-dark.svg (ivory ink for dark theme)')
