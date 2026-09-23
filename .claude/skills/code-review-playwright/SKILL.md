---
name: code-review-playwright
description: Review Playwright page objects, specs and fixtures against the AIAgentMCP-framework coding guidelines (coding-guidedlines.md). Use when asked to review, audit or check test code, a diff, a PR, or specific files for guideline compliance.
---

# Code Review: AIAgentMCP Playwright Guidelines

Review code strictly against `coding-guidedlines.md` in the repo root. Re-read that file at the start of each review; if it disagrees with this skill, the guidelines file wins.

## Scope

- If the user names files, a PR or a branch, review those.
- Otherwise review the current diff (`git diff` and `git diff --staged`), plus untracked `.ts` files.
- Only report violations in changed or newly added code. Mention pre-existing violations at most in a one-line note.

## Checklist

### 1. Page objects (`pages/**`)
- [ ] Extends `BasePage` and calls `super(page)` (except `BasePage` itself).
- [ ] All locators are `readonly` properties assigned in the constructor.
- [ ] Selector priority: `data-test` > `id` > ARIA role. No CSS class or xpath selectors.
- [ ] No `expect` calls anywhere in the page object.
- [ ] Methods exist only for multi-step interactions; no trivial one-line wrappers.
- [ ] Class is named `[Name]Page` and uses a named export (no default export).

### 2. Tests (`tests/**/*.spec.ts`)
- [ ] Title starts with a per-feature ID (`C01`, `C02`, ...) and includes `@regression`.
- [ ] New IDs are the highest existing ID in that file plus one, with no gaps or duplicates.
- [ ] Every `expect` has a custom message as its first argument.
- [ ] Arrange / Act / Assert structure; shared navigation and auth/setup live in `beforeEach`.
- [ ] Each test is self-contained for the data it creates or owns.
- [ ] Helpers or fixtures are extracted only when duplicated in 3 or more places (Rule of Three). Flag premature abstraction.
- [ ] Page objects come from custom fixtures (`../../fixtures`), never `new XPage(page)` in a test.
- [ ] Navigation uses the page object's `navigate()`, not raw `page.goto()`.

### 3. Banned patterns
| Pattern | Action |
|---|---|
| `page.waitForTimeout()` | Replace with a locator or state-based wait, e.g. `expect(locator).toBeVisible({ timeout })` |
| Hardcoded strings in tests | Import from `data/products.ts` or `data/users.ts` |
| CSS class or xpath selectors | Use `data-test` or `getByRole` |
| `page.locator(...)` / `page.getByRole(...)` inside `.spec.ts` | Move into a page object property or method |
| `expect` inside a page object | Move to the test file |

### 4. Flaky test policy
- [ ] No `test.skip`, `test.fixme` or silenced retries used to hide flakiness, unless explicitly quarantined.
- [ ] Timing-sensitive steps carry a flag comment, e.g. `// NOTE: waitForLoadState may be flaky under slow network — watch in CI`.

## Severity

- **Blocker**: banned patterns, assertions in page objects, missing `BasePage` inheritance, inline locators in specs, skipped or silenced flaky tests.
- **Major**: missing assertion messages, missing ID or `@regression` tag, manual page object instantiation, raw `page.goto()`, wrong selector priority.
- **Minor**: naming or export style, missing flaky-step comment, premature DRY extraction, wrong ID numbering.

## Output format

Start with a one-line verdict: `Approve`, `Approve with comments` or `Changes requested`.

Then list findings, most severe first, each as:

```
[Severity] path/to/file.ts:LINE — Rule (guideline section)
Problem: what is wrong, quoting the offending code.
Fix: the concrete replacement.
```

End with a short "Passed checks" line listing sections that were clean. If there are no findings, say so plainly rather than inventing nitpicks.

## Rules for the reviewer

- Cite the guideline section for every finding; do not enforce rules that are not in the guidelines.
- Show a corrected snippet when the fix is not obvious.
- Do not edit files unless the user asks for fixes. When asked, apply fixes and then re-run the checklist.
- Do not run `git commit` or push as part of a review.
