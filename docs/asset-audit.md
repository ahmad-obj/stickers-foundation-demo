# Asset audit

Supplied sources: Maps archive (10 images: 9 photographs + 1 brand graphic), website archive (53 images), and transparent logo. Full inventory and hashes: `asset-inventory.json`. Original archives and attribution files remain in `assets/originals/`; the source Downloads were never altered. The Maps archive's contact sheet and a website contact sheet were visually inspected.

## Selection and treatment

| Asset | Quality / purpose | Presentation |
| --- | --- | --- |
| Cheezy cutout sign | 3024 × 4032, sharp portrait; workshop lighting and a fluorescent reflection are authentic | Hero and signage gallery. Portrait framing preserves the complete sign; uncropped enlargement. |
| Pop-art scooter | 1200 × 1600, good front detail, busy shop context | Portrait vehicle example; fully contained service preview. No invented vehicle project details. |
| World map | 4032 × 3024, colourful, some glare and perspective | Large landscape gallery opener for interiors. |
| Science wall | 4032 × 3024, clear linework, neutral wall | Large landscape gallery counterpart. |
| Coding wall | 4032 × 3024, dimmer and quieter | Additional interior gallery, behind the full-gallery action or category filter. |
| Focus lettering | 4032 × 3024, darker, office furniture | Secondary interior gallery. |
| Solid samples | 1200 × 795, colour range and visible material detail | Primary material preview, contained without distortion. |
| Pattern rolls | 640 × 640, smallest source | Secondary material tab, max intrinsic 640px; no fabricated detail or upscale file. |
| Marble rolls | 1600 × 1200, range of stone-like finishes | Secondary material tab; descriptive rather than simulated. |
| Supplied transparent logo | Original includes large transparent margins and low-alpha edge noise | Crop to meaningful alpha bounds with padding; no redraw or alteration of lettering. |
| Maps brand graphic | 1536 × 1024 rendered brand graphic | Preserved as evidence; not used as a completed project. |
| Website images | Mix of promo graphics, mockups, brand marks and some material photos | Retained in original archive. Not presented as completed projects. |

No exact duplicates among the ten Maps items. Archive-wide perceptual screening identified website images 032 and 035 as the same S Creations mark at different resolutions; both omitted. Other promotional repetitions (flags, vinyl) were inspected in the contact sheet and omitted with the rest of the website collection. Hash inventory preserves all inputs; near-duplicate candidates are saved separately.

`scripts/process-assets.py` exports 480/800/1200/1600px WebP variants, bounded by source width, plus the native 640px pattern image. No photograph color edits, replacements, fabricated before/after, stock imagery or AI project imagery. Responsive `srcset`, native width/height and lazy loading below the hero. Originals remain outside the public output. Optimized images retain origin/contributor XMP metadata; detailed provenance is in `asset-manifest.json` and the original JSON/CSV.

Website photo captions describe visible content only. The image viewer links to each source and credits Stickers Corporation on Google Maps. Attribution does not establish a reuse license. Obtain business/rightsholder permission before public deployment. The supplied transparent logo was described by the asset pack as recreated; verify its fidelity/approval with the business.

Social share image is a typography composition using the supplied logo and authentic Cheezy image; reproducible with `scripts/capture-social.mjs`. It is not a new project photograph.
