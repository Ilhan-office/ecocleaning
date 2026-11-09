# Codebase exploration

Use codebase-memory-mcp by default for codebase exploration in this project.
At the start of a coding task, check whether this repository is indexed and
refresh its index when needed. Use its graph and search tools to locate relevant
code and assess dependencies, then read the source before making changes.

If the MCP server is unavailable, use the local CLI in
`.tools/codebase-memory-mcp-bin/` when available. Otherwise fall back to `rg`
and direct file reads, and report the unavailable integration. Do not block
ordinary work solely because the server is unavailable.

The upstream repository is cloned in `.tools/codebase-memory-mcp/`.
Keep tool downloads, binaries, and the upstream clone out of the website assets.
