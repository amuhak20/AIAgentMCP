# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npx playwright install chromium

npm test                          # run all tests (chromium only)
npm run test:headed
npm run test:ui
npm run report                    # open last HTML report

npx playwright test tests/ui-practice.spec.ts          # single file
npx playwright test -g "test title substring"          # single test by title
```

Containerized run (no local Node/browsers needed; reports land in `./playwright-report`):

```bash
docker compose run --rm playwright
docker compose run --rm playwright npx playwright test -g "title"   # subset
docker compose build --no-cache                                     # after bumping @playwright/test
```

The `Dockerfile` image tag (`v1.63.0-noble`) must match the `@playwright/test` version in `package-lock.json`.

There is no build or lint step. TypeScript is executed directly by Playwright.

## Architecture

A small Playwright Test project (`tests/*.spec.ts`) configured in [playwright.config.ts](playwright.config.ts): single `chromium` project, HTML reporter, fully parallel, `baseURL` is `https://playwright.dev`, and CI (`process.env.CI`) sets 2 retries, 1 worker and forbids `test.only`. Specs that target other sites (e.g. qaplayground.com in `ui-practice.spec.ts`) must use absolute URLs or a page object that overrides the base.

CI: [.github/workflows/playwright.yml](.github/workflows/playwright.yml) runs the full suite on every push to `main` and uploads the HTML report as an artifact.

The Playwright MCP server is configured in `.vscode/mcp.json` for Copilot Chat.

## Coding guidelines

All code must follow [coding-guidedlines.md](coding-guidedlines.md) (page objects extending `BasePage`, fixtures instead of manual page-object construction, `Cxx ... @regression` test titles, assertion messages on every `expect`, no `waitForTimeout`, no inline locators in specs). Note that the guidelines describe a `pages/`, `fixtures`, and `data/` layout that does not exist yet; existing specs are still flat and predate them.

Use the `code-review-playwright` skill (`.claude/skills/code-review-playwright/SKILL.md`) to check changes against these guidelines.
