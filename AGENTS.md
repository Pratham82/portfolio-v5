# Agent Notes for portfolio-v5

## Tech Stack

- Next.js 16 (App Router; there is no `pages/` directory)
- React 19 + TypeScript 6.0
- Tailwind CSS 4 (CSS-first config in `styles/globals.css`, class-based dark mode)
- Node 24.x (enforced in `.nvmrc` and `package.json` engines)

## Project Structure

- **`app/`**: Routes. `layout.tsx` is the only shell (fonts, theme, animated background, analytics). Root `/` redirects to `/home` (`next.config.js`).
- **`components/`**: React components. Import each file directly; there is no barrel, because `@/components` resolves to `components.json` before the directory index.
  - `components/ui/`: shadcn/ui primitives (`button`, `badge`, `card`, `separator`, `tabs`, `tooltip`) plus Aceternity-style accents (`hover-list`, `spotlight`).
  - `components/SiteHeader.tsx`: the header on every page except `/guides`. It holds the theme toggle.
  - `components/sections/`: the Experience / Projects / Blogs / Uses views, shared by their own routes and the `/home` tabs.
  - `components/home/HomeClient.tsx`: the interactive home page (tabs, keyboard shortcuts, widgets).
- **`src/`**: Hooks, GraphQL queries (`src/graphql/queries/*.graphql`), utilities, static data.
- **`lib/`**: Server-side data access, plus `lib/utils.ts` (`cn()`). `cn()` is pure, so client components can import it.
  - `lib/sanity/client.ts`: `sanityQuery()` runs a `.graphql` document against Sanity with `fetch`.
  - `lib/sanity/queries.ts`: typed loaders (`getHomePage`, `getExperiencePage`, `getProjects`, `getResumeLink`, `getAuthorByUsername`).
  - `lib/mdx.ts`: `renderMdx()` compiles local MDX with the site's rehype plugins.
  - `lib/resume.ts`: fetches the resume PDF (the Sanity resume link) and parses its Experience section into jobs and bullets.
  - `lib/blogPosts.ts`, `lib/links.ts`: local content parsers.
- **`content/blogs/`**, **`content/links/`**: local `.md` / `.mdx` parsed with `gray-matter`.
- **`interface/`**: TypeScript interfaces.
- **`e2e/`**: Playwright tests and screenshot baselines.

## Design System

- **Colors:** use the semantic tokens defined in `styles/globals.css` (`bg-background`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-accent`, and so on), not raw palette classes like `gray-*` or `slate-*`. The `/guides/ai-guide` page is the one exception; it keeps its own hardcoded dark theme.
- **Theme:** dark is the default (`defaultTheme="dark"` in `app/providers.tsx`). It is a neutral gray-dark, not pure black. Read `resolvedTheme` from `useTheme()`, never `theme`, because `theme` can be `"system"`.
- **Fonts:** Geist Sans for text (`font-sans`) and Geist Mono for accents like dates, tags and labels (`font-mono`). Both load through the `geist` package in `app/layout.tsx`.
- **Code blocks** stay dark in both themes (the `--code` token), because night-owl assumes a dark background.
- **Adding shadcn components:** run `npx shadcn@latest add <name>`, then `npx eslint --fix components/ui`, which converts the output to arrow functions and double quotes. Check that the CLI imported `cn` from `@/lib/utils`: it has rewritten the import to a `cn` npm package before.
- **Test hooks:** the selected home tab and the selected project filter are marked with `aria-pressed`, and the e2e tests assert on it.

## Server vs Client Components

- Pages in `app/` are Server Components. They fetch data and pass it to components as props.
- Anything with state, effects, `motion`, or browser APIs needs `"use client"`. The build fails if a Server Component uses hooks.
- Phosphor icons need context. In Server Components, import from `@phosphor-icons/react/ssr`.
- In client components, import server-only modules (`lib/blogPosts`, `lib/links`, `lib/sanity/*`) with `import type` only, because they use `fs` or secrets.

## Data Sources

1. **Sanity CMS**: GraphQL endpoint (`NEXT_PUBLIC_PORTFOLIO_GRAPHQL_ENDPOINT`), queried **only on the server** through `lib/sanity`. Pages use ISR (`export const revalidate = 3600`, which must be a literal and should match `SANITY_REVALIDATE`). The build fails if Sanity is unreachable or the endpoint is missing. The browser never calls Sanity, and an e2e test enforces this.
2. **Local MDX**: rendered on the server with `next-mdx-remote/rsc`. Slug routes use `generateStaticParams` with `dynamicParams = false`.
3. **Resume PDF**: `getExperiencePage()` takes roles, dates, locations and bullets from the resume that the Sanity resume link points to (a public Google Drive file works). Sanity still supplies the company logos, matched by company name. The PDF is re-downloaded at most once a day (`RESUME_REVALIDATE`), and on every build. If the resume can't be fetched or parsed, it logs and falls back to the Sanity work experience. The parser expects job headers like `Company · Title Month YYYY – Month YYYY (Location)` and bullets starting with `·`.
4. **Spotify**: the `app/api/now-playing/route.ts` route handler. Needs the server-only `SPOTIFY_*` env vars (it falls back to the old `NEXT_PUBLIC_SPOTIFY_*` names until Vercel is updated).

## Developer Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` / `npm run lint:fix` | ESLint check / auto-fix (flat config in `eslint.config.mjs`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Playwright: builds and starts the app on port 3100, then runs `e2e/` |
| `npm test` | typecheck + e2e |

## Verification Gate

Before committing a change, run `npm run lint && npm run typecheck && npm run test:e2e`.

- Screenshot baselines live in `e2e/routes.spec.ts-snapshots/` and are **macOS-specific**. CI runs `--ignore-snapshots`, so visual checks are local only.
- If a visual change is intentional, review the diff images in `test-results/`, then run `npx playwright test --update-snapshots=all`.

## Lint & Style Rules

- **ESLint 9** flat config. It stays on 9 because `eslint-plugin-import` and `eslint-plugin-react` don't support ESLint 10 yet. Key rules:
  - Named components must be arrow functions (`react/function-component-definition`).
  - Double quotes; Prettier integrated (`endOfLine: auto`, `singleQuote: false`).
  - Import order: builtins → `next/**` → third-party → `@/**` → relative.
  - `@next/next` core-web-vitals rules and `react-hooks` rules are enabled.
- **Prettier** config in `.prettierrc` (80 print width, trailing commas). No Prettier plugins.
- **TypeScript** stays on 6.0 because typescript-eslint supports `<6.1`. Revisit TS 7 when it does.
- Husky 9 pre-commit hook runs `npm run lint && npm run typecheck`.

## Build & Config Quirks

- `next.config.js` configures **Turbopack** loaders for `*.graphql` / `*.gql` files (`graphql-tag/loader`).
- **Path alias**: `@/*` → `./*`.
- `next-env.d.ts` is regenerated by `next dev` / `next build` (the dev and build variants differ). Don't commit changes to it.
- If `tsc` reports missing modules under `.next/types` after routes move, delete `.next/`. It's a stale build cache.
- Remote images allowed from `cdn.sanity.io`, `ghchart.rshah.org`, `i.scdn.co`.

## CI

- `.github/workflows/ci.yml`: Node from `.nvmrc`, `npm ci`, lint, typecheck, Playwright (`--ignore-snapshots`).
- Needs the `NEXT_PUBLIC_PORTFOLIO_GRAPHQL_ENDPOINT` repository secret, because the build fetches from Sanity.
- Runs on `push` / `pull_request` to `main`, `master`, and `dev`.

## Env Variables

Stored in `.env` / `.env.local` (see `.env.example`):

- `NEXT_PUBLIC_PORTFOLIO_GRAPHQL_ENDPOINT`
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

## Content Conventions

- Blog and link frontmatter uses `gray-matter`. Common fields: `title`, `date`, `description`, `tags`, `author`.
- Lists are sorted newest first. Items with the same date are ordered by slug, descending.
- **Blog MDX images**: `app/blogs/[slug]/page.tsx` remaps `src`s that don't start with `/` to `/content/${src}`. Use paths starting with `/content/`. Absolute `https://` URLs are currently broken by this remap.
- Code blocks use `rehype-highlight` with the `night-owl` theme. `CodeCopyEnhancer` adds the Copy buttons.
