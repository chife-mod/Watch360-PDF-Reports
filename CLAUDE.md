# Claude Code — Project Instructions

Read **[AGENTS.md](AGENTS.md)** first. It contains the full project context.

---

## Claude-Specific Notes

### Figma MCP
- Use `get_design_context` to inspect Figma nodes — **never `get_screenshot`**
- `get_screenshot` on large frames causes `400 "Could not process image"` and kills the session
- Figma file key: `V8XA0PVaAjxvPbq24stJXk`
- Cover slide node: `4-802` | Table slide node: `2-6`

### Memory
- Project memory: `~/.claude/projects/.../memory/`
- Log significant decisions and completed work in `history/history.md`

### Workflow
- After completing a feature → update `history/history.md`
- Before starting work → check `history/history.md` for current state
- Use `get_design_context` from Figma MCP to verify measurements before coding
