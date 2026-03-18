#!/bin/bash
#
# figma-export-svg.sh — Export SVG icons from Figma via REST API
#
# Exports a Figma node (frame) as SVG with correct viewBox,
# preserving the frame dimensions (e.g. 20x20 icon grid).
#
# Usage:
#   ./figma-export-svg.sh <figma-url> <output-path>
#   ./figma-export-svg.sh <figma-url> <output-dir>/    # filename from Figma layer name
#
# Examples:
#   ./figma-export-svg.sh "https://www.figma.com/design/ABC123/File?node-id=1650-17872" Assets/chevron-right.svg
#   ./figma-export-svg.sh "https://www.figma.com/design/ABC123/File?node-id=1650-17872" Assets/
#
# Environment:
#   FIGMA_TOKEN — Personal Access Token (required)
#                 Create at: Figma → Settings → Personal access tokens
#
# Tip: add to your shell profile:
#   export FIGMA_TOKEN="figd_..."
#

set -euo pipefail

# ── Args ──────────────────────────────────────────────

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <figma-url> <output-path>"
  echo ""
  echo "  figma-url   — Link to a Figma node (right-click → Copy link)"
  echo "  output-path — File path (e.g. Assets/icon.svg) or directory (e.g. Assets/)"
  exit 1
fi

FIGMA_URL="$1"
OUTPUT="$2"

# ── Token ─────────────────────────────────────────────

if [[ -z "${FIGMA_TOKEN:-}" ]]; then
  echo "Error: FIGMA_TOKEN is not set."
  echo "  export FIGMA_TOKEN=\"figd_...\""
  exit 1
fi

# ── Parse Figma URL ───────────────────────────────────

# Extract file key: /design/<FILE_KEY>/...
FILE_KEY=$(echo "$FIGMA_URL" | sed -n 's|.*figma\.com/design/\([^/]*\)/.*|\1|p')
if [[ -z "$FILE_KEY" ]]; then
  echo "Error: Could not extract file key from URL."
  echo "  Expected: https://www.figma.com/design/<FILE_KEY>/..."
  exit 1
fi

# Extract node ID: node-id=1650-17872 → 1650:17872
NODE_ID=$(echo "$FIGMA_URL" | sed -n 's|.*node-id=\([0-9]*\)-\([0-9]*\).*|\1:\2|p')
if [[ -z "$NODE_ID" ]]; then
  echo "Error: Could not extract node-id from URL."
  echo "  Expected: ...?node-id=1234-5678"
  exit 1
fi

echo "File key: $FILE_KEY"
echo "Node ID:  $NODE_ID"

# ── Auto-name from Figma layer (if output is a directory) ──

if [[ "$OUTPUT" == */ ]]; then
  echo "Fetching node name from Figma..."
  NODE_NAME=$(curl -sf \
    -H "X-Figma-Token: $FIGMA_TOKEN" \
    "https://api.figma.com/v1/files/$FILE_KEY/nodes?ids=$NODE_ID" \
    | python3 -c "
import sys, json
data = json.load(sys.stdin)
node = data['nodes']['$NODE_ID']['document']
name = node.get('name', 'icon')
# Sanitize: lowercase, replace spaces/slashes with hyphens
import re
name = re.sub(r'[^a-zA-Z0-9]+', '-', name.lower()).strip('-')
print(name)
" 2>/dev/null || echo "icon")

  OUTPUT="${OUTPUT}${NODE_NAME}.svg"
  echo "Auto-named: $OUTPUT"
fi

# ── Create output directory if needed ─────────────────

OUTPUT_DIR=$(dirname "$OUTPUT")
mkdir -p "$OUTPUT_DIR"

# ── Export SVG via Figma REST API ─────────────────────

echo "Requesting SVG export..."

RESPONSE=$(curl -sf \
  -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/images/$FILE_KEY?ids=$NODE_ID&format=svg")

SVG_URL=$(echo "$RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
images = data.get('images', {})
url = images.get('$NODE_ID', '')
if not url:
    print('Error: No SVG URL returned', file=sys.stderr)
    sys.exit(1)
print(url)
")

if [[ -z "$SVG_URL" ]]; then
  echo "Error: Figma API did not return an SVG URL."
  echo "Response: $RESPONSE"
  exit 1
fi

# ── Download SVG ──────────────────────────────────────

curl -sf "$SVG_URL" -o "$OUTPUT"

# ── Verify ────────────────────────────────────────────

if head -1 "$OUTPUT" | grep -q '<svg'; then
  VIEWBOX=$(grep -o 'viewBox="[^"]*"' "$OUTPUT" | head -1)
  SIZE_W=$(grep -o 'width="[^"]*"' "$OUTPUT" | head -1)
  SIZE_H=$(grep -o 'height="[^"]*"' "$OUTPUT" | head -1)
  echo ""
  echo "Exported: $OUTPUT"
  echo "  $SIZE_W $SIZE_H $VIEWBOX"
  echo "Done."
else
  echo "Error: Downloaded file is not a valid SVG."
  exit 1
fi
