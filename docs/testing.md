# Testing & CI

- **Playwright** (`e2e/`) checks that every route loads with no console errors, and that the browser never calls Sanity, PSN or the Now widget APIs. It also tests the interactive parts:
  - Home tabs as routes: clicking a tab updates the URL, direct loads like `/now` and `/skills` select the right group and tab, switching group restores the last tab, browser back returns to the previous tab, and keyboard shortcuts work.
  - Back buttons on blog and link pages, and the old `/home?from=` redirects.
  - Theme toggle, code copy, the projects filter, the mobile menu and the `/api/now-playing` response.
- **Fixtures** (`e2e/fixtures.ts`): an automatic fixture serves the GitHub contributions calendar fixed data, because every tab route shows it and parallel tests would otherwise be rate limited (429). Import `test` / `expect` from `./fixtures`, not `@playwright/test`.
- **Stable data**: the test server runs with `PSN_NPSSO=""` and `NOW_LIVE_WIDGETS=off`, so Games and Now render their fallbacks, and the screenshot tests mock `/api/now-playing`. Volatile bits (clock, calendar, scrambled title) are masked.
- **Selectors**: the selected tab link has `aria-current="page"`, the selected group has `aria-pressed`, and tab content is inside `data-testid="home-tab-content"`.
- **Visual regression**: every route has a screenshot in light and dark mode. The baselines are macOS-specific, so they run locally. After an intentional UI change, update them with `npx playwright test --update-snapshots=all`.
- **Pre-commit** (Husky): lint + typecheck.
- **GitHub Actions** (`.github/workflows/ci.yml`): lint, typecheck and Playwright on pushes and PRs to `master`, `main` and `dev`. Needs the `NEXT_PUBLIC_PORTFOLIO_GRAPHQL_ENDPOINT` repository secret.

Before committing, run the full gate:

```bash
npm run lint && npm run typecheck && npm run test:e2e
```
