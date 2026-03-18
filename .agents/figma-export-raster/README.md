# figma-export-raster

Export raster images from Figma with correct scale factor via REST API.

## Why

Figma stores original high-resolution images. When you export at 2x or 3x,
Figma renders FROM THE ORIGINAL — not by upscaling a 1x export.

NEVER download a 1x image and resize it to simulate 2x. That destroys quality
through interpolation. Always use the `scale` parameter in the Figma API.

## Setup

Same as figma-export-svg — needs `FIGMA_TOKEN` in environment.

## Usage

```bash
~/.claude/tools/figma-export-raster/figma-export-raster.sh "<figma-url>" output.webp [options]
```

### Options

| Flag | Values | Default | Description |
|------|--------|---------|-------------|
| `-s` | 0.5, 0.75, 1, 1.5, 2, 3, 4 | 2 | Scale factor |
| `-f` | png, jpg, webp | webp | Output format |
| `-q` | 1-100 | 80 | Quality (jpg/webp only) |

### Examples

```bash
# 2x WebP at 80% quality (default — best for web)
./figma-export-raster.sh "<url>" Assets/avatar.webp

# 1x PNG (lossless, for sprites or pixel-precise assets)
./figma-export-raster.sh "<url>" Assets/icon.png -s 1 -f png

# 3x JPG at 90% quality (for large hero images)
./figma-export-raster.sh "<url>" Assets/hero.jpg -s 3 -f jpg -q 90
```

## For Claude Code

When exporting raster images from Figma:

1. **ALWAYS ask the user** for scale factor before exporting
2. **Default to 2x WebP q80** unless told otherwise
3. **NEVER** download 1x and resize — use the `scale` parameter
4. For retina: export at 2x, display at 1x CSS size
5. Naming convention: `name.webp` (1x), `name@2x.webp` (2x), `name@3x.webp` (3x)

### Workflow

```
1. User gives Figma URL
2. Ask: "What scale? (1x, 2x, 3x) and format? (webp/png/jpg)"
3. Export using this script with the chosen parameters
4. Place in project Assets directory
```

## Dependencies

- Python3 with Pillow (for jpg/webp conversion)
- PNG export works without Pillow
