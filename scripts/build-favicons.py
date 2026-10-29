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

# 1. Bold alpha at source resolution (dilation by 27px)
bold_a = raw_a.filter(ImageFilter.MaxFilter(27))
white_sig_src = Image.new('RGBA', (w, h), (255, 255, 255, 255))
white_sig_src.putalpha(bold_a)

# 2. FUNCTION TO BUILD DUAL-CONTRAST ICON AT EXACT CANVAS SIZE
# This ensures that the dark border contour is exactly 1-1.5px thick at the actual icon resolution,
# preventing it from disappearing during downsampling.
def make_dual_contrast_icon(canvas_size, padding_ratio=0.06):
    pad = max(1, int(canvas_size * padding_ratio))
    target_w = canvas_size - pad * 2
    target_h = int(target_w * (h / w))
    y_off = (canvas_size - target_h) // 2
    x_off = pad

    # Downscale white signature to target size
    resized_white = white_sig_src.resize((target_w, target_h), Image.Resampling.LANCZOS)

    alpha_at_sz = Image.new('L', (canvas_size, canvas_size), 0)
    alpha_at_sz.paste(resized_white.split()[3], (x_off, y_off))

    # 1px border at 16-32px, 2px border at 48-96px, 3px border at larger sizes
    border_filter_size = 3 if canvas_size <= 48 else 5
    border_alpha = alpha_at_sz.filter(ImageFilter.MaxFilter(border_filter_size))

    # Dark border layer (#080C18)
    dark_border = Image.new('RGBA', (canvas_size, canvas_size), (8, 12, 24, 255))
    dark_border.putalpha(border_alpha)

    # White core layer (#FFFFFF)
    white_core = Image.new('RGBA', (canvas_size, canvas_size), (255, 255, 255, 255))
    white_core.putalpha(alpha_at_sz)

    # Final composite: Radiant white signature with crisp dark edge
    return Image.alpha_composite(dark_border, white_core)

# Generate standard sizes
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
    icon_img = make_dual_contrast_icon(sz)
    icon_img.save(os.path.join(public_dir, filename), optimize=True)
    generated_images[sz] = icon_img
    print(f'Saved {filename} ({sz}x{sz})')

# Multi-resolution favicon.ico containing 16, 32, 48
make_dual_contrast_icon(48).save(
    os.path.join(public_dir, 'favicon.ico'),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)]
)
print('Saved universal favicon.ico (16, 32, 48)')

# Generate high-res base64 for SVG
svg_icon = make_dual_contrast_icon(512, padding_ratio=0.06)
buf = io.BytesIO()
svg_icon.save(buf, format='PNG')
svg_b64 = base64.b64encode(buf.getvalue()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,{svg_b64}" width="512" height="512"/>
</svg>'''

for svg_name in ['favicon.svg', 'favicon-dark.svg', 'favicon-light.svg']:
    with open(os.path.join(public_dir, svg_name), 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f'Saved {svg_name}')
