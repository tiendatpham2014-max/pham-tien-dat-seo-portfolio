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
raw_a = cropped.split()[3]

# 1. BOLD ALPHA: Dilation of alpha channel to ensure handwriting strokes remain solid at small favicon dimensions
# In source (2119px), strokes are 18-24px. Dilating by 27px thickens lines to ~48px so that at 32-48px icon size, lines are ~1.5-2px solid.
bold_a = raw_a.filter(ImageFilter.MaxFilter(27))

# 2. GENERATE COLORED SIGNATURE MASTERS (Transparent background, NO background block):
# A. Pure Bright White (#FFFFFF) for Dark Themes (Dark browser tabs, Dark OS)
white_sig = Image.new('RGBA', (w, h), (255, 255, 255, 255))
white_sig.putalpha(bold_a)

# B. Pure Dark Navy (#101827) for Light Themes (Light browser tabs, Light OS)
dark_sig = Image.new('RGBA', (w, h), (16, 24, 39, 255))
dark_sig.putalpha(bold_a)

# C. Universal Dual-Contrast Signature (White core with crisp dark edge) for Google Search and fallback ICO
outline_a = bold_a.filter(ImageFilter.MaxFilter(9))
dark_edge = Image.new('RGBA', (w, h), (15, 23, 42, 235))
dark_edge.putalpha(outline_a)
universal_sig = Image.alpha_composite(dark_edge, white_sig)

# 3. GENERATE BROWSER TAB PNGs (Theme-specific and universal)
def make_icon(sig_image, canvas_size, padding_ratio=0.08):
    target_w = int(canvas_size * (1 - padding_ratio * 2))
    target_h = int(target_w * (h / w))
    x_off = (canvas_size - target_w) // 2
    y_off = (canvas_size - target_h) // 2
    resized = sig_image.resize((target_w, target_h), Image.Resampling.LANCZOS)
    canvas = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
    canvas.paste(resized, (x_off, y_off), resized)
    return canvas

# Theme-specific 32x32 and 16x16 PNGs
make_icon(white_sig, 32).save(os.path.join(public_dir, 'favicon-32x32-dark.png'), optimize=True)
make_icon(dark_sig, 32).save(os.path.join(public_dir, 'favicon-32x32-light.png'), optimize=True)
make_icon(white_sig, 16).save(os.path.join(public_dir, 'favicon-16x16-dark.png'), optimize=True)
make_icon(dark_sig, 16).save(os.path.join(public_dir, 'favicon-16x16-light.png'), optimize=True)
print('Saved theme-specific 32x32 and 16x16 PNGs (dark & light)')

# Standard Google-compliant PNGs (Universal contrast)
standard_sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'favicon-48x48.png': 48,
    'favicon-96x96.png': 96,
    'favicon-192x192.png': 192,
    'favicon-512x512.png': 512,
    'apple-touch-icon.png': 180,
}

for filename, sz in standard_sizes.items():
    icon_img = make_icon(universal_sig, sz)
    icon_img.save(os.path.join(public_dir, filename), optimize=True)
    print(f'Saved {filename} ({sz}x{sz})')

# Multi-resolution favicon.ico containing 16, 32, 48
make_icon(universal_sig, 48).save(
    os.path.join(public_dir, 'favicon.ico'),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)]
)
print('Saved universal favicon.ico (16, 32, 48)')

# 4. GENERATE HIGH-RES BASE64 STRINGS FOR SVG EMBEDDING
svg_w = 460
svg_h = int(svg_w * (h / w))
svg_x = (512 - svg_w) // 2
svg_y = (512 - svg_h) // 2

def to_base64(img):
    resized = img.resize((svg_w, svg_h), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    resized.save(buf, format='PNG')
    return base64.b64encode(buf.getvalue()).decode('utf-8')

b64_white = to_base64(white_sig)
b64_dark = to_base64(dark_sig)

# A. Adaptive favicon.svg (Switches natively between white and dark navy via CSS display)
# NO SVG filters used! This guarantees 100% rendering in Chrome/Safari/Firefox favicon contexts.
adaptive_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <style>
    .sig-light {{ display: none; }}
    .sig-dark {{ display: inline; }}
    @media (prefers-color-scheme: light) {{
      .sig-light {{ display: inline; }}
      .sig-dark {{ display: none; }}
    }}
    @media (prefers-color-scheme: dark) {{
      .sig-light {{ display: none; }}
      .sig-dark {{ display: inline; }}
    }}
  </style>
  <image class="sig-dark" href="data:image/png;base64,{b64_white}" x="{svg_x}" y="{svg_y}" width="{svg_w}" height="{svg_h}"/>
  <image class="sig-light" href="data:image/png;base64,{b64_dark}" x="{svg_x}" y="{svg_y}" width="{svg_w}" height="{svg_h}"/>
</svg>'''

with open(os.path.join(public_dir, 'favicon.svg'), 'w', encoding='utf-8') as f:
    f.write(adaptive_svg)
print('Saved adaptive favicon.svg (pure white for dark theme, pure dark navy for light theme)')

# B. Dedicated favicon-dark.svg (Always pure white signature)
dark_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,{b64_white}" x="{svg_x}" y="{svg_y}" width="{svg_w}" height="{svg_h}"/>
</svg>'''

with open(os.path.join(public_dir, 'favicon-dark.svg'), 'w', encoding='utf-8') as f:
    f.write(dark_svg)
print('Saved favicon-dark.svg (100% pure white signature)')

# C. Dedicated favicon-light.svg (Always pure dark navy signature)
light_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,{b64_dark}" x="{svg_x}" y="{svg_y}" width="{svg_w}" height="{svg_h}"/>
</svg>'''

with open(os.path.join(public_dir, 'favicon-light.svg'), 'w', encoding='utf-8') as f:
    f.write(light_svg)
print('Saved favicon-light.svg (100% pure dark navy signature)')
