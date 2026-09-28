# Testing & CI

- **Playwright** (`e2e/`) checks that every route loads with no console errors. It also tests the interactive parts: tabs, keyboard shortcuts, back navigation, theme toggle, code copy, the projects filter, the mobile menu and the API.
- **Visual regression**: every route has a screenshot in light and dark mode. The baselines are macOS-specific, so they run locally. After an intentional UI change, update them with `npx playwright test --update-snapshots=all`.
- **Pre-commit** (Husky): lint + typecheck.
- **GitHub Actions** (`.github/workflows/ci.yml`): lint, typecheck and Playwright on pushes and PRs to `master`, `main` and `dev`. Needs the `NEXT_PUBLIC_PORTFOLIO_GRAPHQL_ENDPOINT` repository secret.

Before committing, run the full gate:

```bash
npm run lint && npm run typecheck && npm run test:e2e
```
