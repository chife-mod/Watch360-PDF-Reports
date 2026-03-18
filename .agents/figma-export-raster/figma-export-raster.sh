#!/bin/bash
#
# figma-export-raster.sh — Export raster images from Figma via REST API
#
# Exports a Figma node (frame) as a raster image with:
#   - Correct scale factor (1x, 1.5x, 2x, 3x, 4x)
#   - Format choice (png, jpg, webp)
#   - Quality/compression control
#
# Figma renders from the ORIGINAL source image at the requested scale,
# NOT by upscaling a 1x export. This preserves full quality.
#
# Usage:
#   ./figma-export-raster.sh <figma-url> <output-path> [options]
#
# Options:
#   -s, --scale     Scale factor: 1, 1.5, 2, 3, 4 (default: 2)
#   -f, --format    Output format: png, jpg, webp (default: webp)
#   -q, --quality   Compression quality 1-100 (default: 80, only for jpg/webp)
#
# Examples:
#   ./figma-export-raster.sh "<url>" Assets/avatar.webp
#   ./figma-export-raster.sh "<url>" Assets/avatar.webp -s 2 -f webp -q 80
#   ./figma-export-raster.sh "<url>" Assets/hero.jpg -s 3 -f jpg -q 90
#   ./figma-export-raster.sh "<url>" Assets/icon.png -s 1 -f png
#
# Environment:
#   FIGMA_TOKEN — Personal Access Token (required)
#
# Note: WebP and JPG conversion requires Python3 with Pillow.
#       PNG export works without Pillow (native from Figma API).
#

set -euo pipefail

# ── Defaults ──────────────────────────────────────────

SCALE="2"
FORMAT="webp"
QUALITY="80"

# ── Parse args ────────────────────────────────────────

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <figma-url> <output-path> [options]"
  echo ""
  echo "Options:"
  echo "  -s, --scale     Scale factor: 1, 1.5, 2, 3, 4 (default: 2)"
  echo "  -f, --format    Output format: png, jpg, webp (default: webp)"
  echo "  -q, --quality   Quality 1-100 for jpg/webp (default: 80)"
  exit 1
fi

FIGMA_URL="$1"
OUTPUT="$2"
shift 2

while [[ $# -gt 0 ]]; do
  case "$1" in
    -s|--scale)  SCALE="$2"; shift 2 ;;
    -f|--format) FORMAT="$2"; shift 2 ;;
    -q|--quality) QUALITY="$2"; shift 2 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

# ── Validate ──────────────────────────────────────────

if ! echo "$SCALE" | grep -qE '^(0\.5|0\.75|1|1\.5|2|3|4)$'; then
  echo "Error: Scale must be one of: 0.5, 0.75, 1, 1.5, 2, 3, 4"
  exit 1
fi

if ! echo "$FORMAT" | grep -qE '^(png|jpg|webp)$'; then
  echo "Error: Format must be one of: png, jpg, webp"
  exit 1
fi

# ── Token ─────────────────────────────────────────────

if [[ -z "${FIGMA_TOKEN:-}" ]]; then
  echo "Error: FIGMA_TOKEN is not set."
  echo "  export FIGMA_TOKEN=\"figd_...\""
  exit 1
fi

# ── Parse Figma URL ───────────────────────────────────

FILE_KEY=$(echo "$FIGMA_URL" | sed -n 's|.*figma\.com/design/\([^/]*\)/.*|\1|p')
if [[ -z "$FILE_KEY" ]]; then
  echo "Error: Could not extract file key from URL."
  exit 1
fi

NODE_ID=$(echo "$FIGMA_URL" | sed -n 's|.*node-id=\([0-9]*\)-\([0-9]*\).*|\1:\2|p')
if [[ -z "$NODE_ID" ]]; then
  echo "Error: Could not extract node-id from URL."
  exit 1
fi

echo "File key: $FILE_KEY"
echo "Node ID:  $NODE_ID"
echo "Scale:    ${SCALE}x"
echo "Format:   $FORMAT"
[[ "$FORMAT" != "png" ]] && echo "Quality:  $QUALITY%"

# ── Create output directory ───────────────────────────

mkdir -p "$(dirname "$OUTPUT")"

# ── Figma API always exports as PNG, we convert after ─

# Figma image API supports: jpg, png, svg, pdf
# For best quality: export as PNG from Figma, convert locally
FIGMA_FORMAT="png"

echo ""
echo "Requesting ${SCALE}x export from Figma..."

RESPONSE=$(curl -sf \
  -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/images/$FILE_KEY?ids=$NODE_ID&format=$FIGMA_FORMAT&scale=$SCALE")

IMG_URL=$(echo "$RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
url = data.get('images', {}).get('$NODE_ID', '')
if not url:
    sys.exit(1)
print(url)
")

if [[ -z "$IMG_URL" ]]; then
  echo "Error: Figma API did not return an image URL."
  exit 1
fi

# ── Download ──────────────────────────────────────────

TEMP_PNG=$(mktemp /tmp/figma-export-XXXX.png)
curl -sf "$IMG_URL" -o "$TEMP_PNG"

# ── Get dimensions ────────────────────────────────────

DIMENSIONS=$(python3 -c "
from PIL import Image
img = Image.open('$TEMP_PNG')
print(f'{img.size[0]}x{img.size[1]}')
")

echo "Downloaded: ${DIMENSIONS}px"

# ── Convert to target format ──────────────────────────

if [[ "$FORMAT" == "png" ]]; then
  mv "$TEMP_PNG" "$OUTPUT"
else
  python3 -c "
from PIL import Image
img = Image.open('$TEMP_PNG')
if '$FORMAT' == 'jpg':
    img = img.convert('RGB')
    img.save('$OUTPUT', 'JPEG', quality=$QUALITY, optimize=True)
elif '$FORMAT' == 'webp':
    img.save('$OUTPUT', 'WEBP', quality=$QUALITY)
"
  rm -f "$TEMP_PNG"
fi

# ── Report ────────────────────────────────────────────

FILE_SIZE=$(python3 -c "import os; s=os.path.getsize('$OUTPUT'); print(f'{s//1024}KB' if s>=1024 else f'{s}B')")

echo ""
echo "Exported: $OUTPUT"
QUALITY_INFO=""
[[ "$FORMAT" != "png" ]] && QUALITY_INFO=" q${QUALITY}"
echo "  ${DIMENSIONS}px, ${FILE_SIZE}, ${FORMAT}${QUALITY_INFO}"
echo "Done."
