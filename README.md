# AIAgentMCP

## Install

```bash
npm install
npx playwright install chromium
```

## Run tests

```bash
npm test
npm run test:headed
npm run test:ui
```

## Run in Docker

```bash
docker compose run --rm playwright
```

Reports are written to `./playwright-report` and `./test-results`; open with `npm run report`.

The Playwright MCP server remains configured in `.vscode/mcp.json` for Copilot Chat.
