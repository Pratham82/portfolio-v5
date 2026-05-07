# Agent Notes for portfolio-v5

## Tech Stack

- Next.js 16 (Pages Router, not App Router)
- React 18 + TypeScript 5.8
- Tailwind CSS 3 with `darkMode: "class"`
- Node 24.x (enforced in `.nvmrc` and `package.json` engines)

## Project Structure

- **`pages/`** — Page routes (entrypoints). Root `/` redirects to `/home`.
- **`components/`** — Reusable React components; barrel export in `components/index.ts`.
- **`src/`** — Hooks, GraphQL queries, utilities, static JSON data.
- **`lib/`** — Apollo client setup and local-content parsers (`blogPosts.ts`, `links.ts`).
- **`content/blogs/`** — Local `.md` / `.mdx` posts parsed with `gray-matter` and rendered via `next-mdx-remote`.
- **`content/links/`** — Local `.md` / `.mdx` link collections, same parsing pipeline.
- **`interface/`** — TypeScript interfaces.
- **`styles/globals.css`** — Tailwind directives + custom `@font-face` declarations.

## Data Sources

1. **Sanity CMS** — GraphQL endpoint (`NEXT_PUBLIC_PORTFOLIO_GRAPHQL_ENDPOINT`). Queried via Apollo Client (`lib/apollo/index.ts`).
2. **Local MDX** — `content/blogs/` and `content/links/` are parsed at build time (`getStaticProps` / `getStaticPaths`).
3. **Spotify** — `/api/now-playing` fetches currently-playing track; requires `NEXT_PUBLIC_SPOTIFY_*` env vars.

## Developer Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check (flat config in `eslint.config.mjs`) |
| `npm run lint:fix` | Auto-fix ESLint issues |

## Lint & Style Rules

- **ESLint 9** flat config (`eslint.config.mjs`). Key rules:
  - Named components must be arrow functions (`react/function-component-definition`).
  - Double quotes enforced; Prettier integrated (`endOfLine: auto`, `singleQuote: false`).
  - Import order enforced: builtins → `next/**` → third-party → `@/**` → relative.
- **Prettier** config in `.prettierrc` (80 print width, trailing commas).
- Husky pre-commit hook runs `npm run lint`.

## Build & Config Quirks

- `next.config.js` configures **Turbopack** loaders for `*.graphql` / `*.gql` files (`graphql-tag/loader`).
- **Path aliases**: `@/*` → `./*`; `@/components` → `./components`.
- `next-env.d.ts` imports `.next/types/routes.d.ts` for typed routes.
- Remote images allowed from `cdn.sanity.io`, `ghchart.rshah.org`, `i.scdn.co`.

## CI & Testing

- **No test runner is configured** (`package.json` has no `test` script), yet `.github/workflows/ci.yml` runs `npm run test` and will fail if invoked.
- **CI Node mismatch**: the workflow matrix uses `node: [14]`, which is incompatible with `.nvmrc` / `package.json` engines (`24.x`).
- CI runs on `push`/`pull_request` to `main`, `master`, and `dev`.

## Env Variables

Stored in `.env.local`:

- `NEXT_PUBLIC_PORTFOLIO_GRAPHQL_ENDPOINT`
- `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`
- `NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET`
- `NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN`

## Content Conventions

- Blog and link frontmatter uses `gray-matter`. Common fields: `title`, `date`, `description`, `tags`, `author`.
- **Blog MDX images**: the `[slug].tsx` page remaps relative image `src`s to `/content/${src}`. Use absolute paths starting with `/content/` or rely on this remap.
- Code blocks use `rehype-highlight` with the `night-owl` theme; inline code gets custom dark styling.
