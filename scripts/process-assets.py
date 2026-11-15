"""Reproducible responsive assets. Never upscale or change project artwork."""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib
import json
import zipfile

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'assets/originals/google-maps'
OUT = ROOT / 'public/images'
OUT.mkdir(parents=True, exist_ok=True)
records = json.loads((SOURCE / 'sources_and_attribution.json').read_text())
manifest = []
for record in records:
    path = SOURCE / record['file']
    im = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    slug = path.stem[3:]
    # Listing logo is retained as source evidence; supplied transparent logo is used in UI.
    variants = []
    if 'brand-logo' not in slug:
        hero_thumbnails = ['cheezy-burger-and-shake-cutout-sign', 'scooter-pop-art-vinyl-wrap', 'colorful-world-map-wall-graphic']
        widths = sorted(set([480, 800, 1200, 1600] + ([im.width] if im.width < 1600 else []) + ([160] if slug in hero_thumbnails else [])))
        for width in widths:
            if width > im.width:
                continue
            dest = OUT / f'{slug}-{width}.webp'
            resized = im.resize((width, round(im.height * width / im.width)), Image.Resampling.LANCZOS)
            origin = json.dumps({'source': record['google_maps_source_url'], 'contributor': record['uploader_display_name']})
            resized.save(dest, 'WEBP', quality=84, method=6, xmp=origin.encode())
            variants.append({'file': dest.name, 'width': width, 'height': resized.height, 'bytes': dest.stat().st_size})
    manifest.append({**record, 'slug': slug, 'variants': variants})

logo = Image.open(ROOT / 'assets/originals/logo-transparent.png').convert('RGBA')
alpha_bounds = logo.getchannel('A').point(lambda value: 255 if value > 32 else 0).getbbox()
logo = logo.crop((max(0, alpha_bounds[0]-8), max(0, alpha_bounds[1]-8), min(logo.width, alpha_bounds[2]+8), min(logo.height, alpha_bounds[3]+8)))
for width in (240, 480):
    dest = OUT / f'logo-{width}.webp'
    logo.resize((width, round(logo.height * width / logo.width)), Image.Resampling.LANCZOS).save(dest, 'WEBP', quality=92, method=6, xmp=b'User-supplied transparent Stickers Corporation logo. Original preserved in assets/originals.')

(ROOT / 'src/lib/image-sources.json').write_text(json.dumps({r['slug']: {'url': r['google_maps_source_url'], 'contributor': r['uploader_display_name']} for r in manifest}, indent=2))
(ROOT / 'docs/asset-manifest.json').write_text(json.dumps(manifest, indent=2))
# Inventory every supplied image, including archive-only images deliberately omitted from UI.
inventory = []
for path in SOURCE.rglob('*'):
    if path.suffix.lower() in ('.jpg', '.png') and path.name != 'contact-sheet.jpg':
        im = Image.open(path)
        inventory.append({'file': str(path.relative_to(ROOT)), 'size': im.size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
with zipfile.ZipFile(ROOT / 'assets/originals/website-photos.zip') as archive:
    for info in archive.infolist():
        if not info.is_dir() and info.filename.lower().endswith(('.jpg', '.png')):
            import io
            data = archive.read(info)
            im = Image.open(io.BytesIO(data))
            inventory.append({'file': f'website-photos.zip/{info.filename}', 'size': im.size, 'sha256': hashlib.sha256(data).hexdigest()})
(ROOT / 'docs/asset-inventory.json').write_text(json.dumps(inventory, indent=2))
print(f'Inventoried {len(inventory)} source images plus supplied logo; wrote {sum(len(r["variants"]) for r in manifest)} responsive photo variants.')
