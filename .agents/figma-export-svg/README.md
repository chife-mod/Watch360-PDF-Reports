# figma-export-svg

Export SVG icons from Figma with correct viewBox via REST API.

## Why

Figma MCP (`get_design_context`) exports only the vector path geometry without the parent frame.
An icon designed in a 20x20 frame exports as `viewBox="0 0 4.58 8.52"` — just the path bounds.

The Figma REST API (`GET /v1/images`) exports the **entire frame** as SVG:
`viewBox="0 0 20 20"` with the path correctly positioned inside.

## Setup

1. Get a Figma Personal Access Token:
   Figma → Settings → Personal access tokens

2. Add to your shell profile (`~/.zshrc`):
   ```bash
   export FIGMA_TOKEN="figd_..."
   ```

## Usage

```bash
# Export with explicit filename
~/.claude/tools/figma-export-svg/figma-export-svg.sh "<figma-url>" Assets/icon-name.svg

# Export with auto-name from Figma layer
~/.claude/tools/figma-export-svg/figma-export-svg.sh "<figma-url>" Assets/
```

### Getting the Figma URL

In Figma, select the **icon frame** (not the vector inside), right-click → "Copy link".

Important: select the frame (e.g. 20x20), not the nested vector path.

## How it works

1. Parses file key and node ID from the Figma URL
2. Calls `GET /v1/images/:file_key?ids=:node_id&format=svg`
3. Downloads the SVG from the returned S3 URL
4. Verifies the output is valid SVG with correct dimensions

## For Claude Code

When the user asks to export icons from Figma:
1. Use `figma-export-svg.sh` instead of downloading assets from MCP
2. The user needs to provide the Figma URL to the icon **frame** node
3. `FIGMA_TOKEN` must be set in the environment
4. Output goes to the project's Assets directory (or wherever specified)

## MCP vs REST API comparison

| Aspect       | MCP `get_design_context`          | REST API (this script)          |
|--------------|-----------------------------------|---------------------------------|
| viewBox      | Path bounds only (e.g. 4.58x8.52)| Frame bounds (e.g. 20x20)      |
| width/height | `100%`                            | Actual frame size               |
| path coords  | Relative to vector (from 0,0)    | Offset within frame             |
| fill         | `var(--fill-0, white)`            | Resolved color (`white`)        |
| Use case     | Layout/code reference             | Production SVG assets           |
