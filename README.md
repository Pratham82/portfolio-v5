# Portfolio V5

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Pratham82/portfolio-v5)

Personal portfolio and blog of Prathamesh Mali, live at [pratham82.in](https://www.pratham82.in).

- Backend repo: [portfolio-api](https://github.com/Pratham82/portfolio-api) (Sanity Studio)
- [Portfolio API GraphQL URL](https://sfjfod25.api.sanity.io/v2024-01-01/graphql/production/default)

## Tech Stack

| Layer | Tools |
|-------|-------|
| Framework | Next.js 16 (App Router, React Server Components, ISR) |
| UI | React 19, Tailwind CSS 4, Motion, Phosphor Icons |
| Content | Sanity CMS (GraphQL), local MDX with `next-mdx-remote` |
| Integrations | Spotify Web API, GitHub contributions, Vercel Analytics |
| Tooling | TypeScript 6, ESLint 9, Prettier, Husky, Playwright |
| Hosting | Vercel (Node 24) |

## Architecture

### How the pieces connect

```mermaid
flowchart TB
    subgraph Browser["Browser"]
        UI["Client components<br/>HomeClient · tabs · widgets<br/>theme toggle · copy buttons"]
    end

    subgraph Direct["Loaded directly by the browser"]
        direction LR
        SanityCDN[("Sanity CDN<br/>images")]
        GitHub[("GitHub<br/>contributions API")]
        Analytics[("Vercel<br/>Analytics")]
    end

    subgraph Vercel["Vercel · Next.js 16 App Router"]
        direction LR
        Pages["Server Components<br/>app/**/page.tsx<br/>static + ISR (1h)"]
        API["Route handlers<br/>/api/now-playing<br/>/api/callback"]
        SanityLib["lib/sanity<br/>sanityQuery + typed loaders<br/>(src/graphql/*.graphql)"]
        MdxLib["lib/mdx<br/>lib/blogPosts · lib/links"]
        Pages --> SanityLib
        Pages --> MdxLib
    end

    subgraph Sources["Server-side data sources"]
        direction LR
        Sanity[("Sanity CMS<br/>GraphQL API")]
        Content[("content/blogs<br/>content/links<br/>.md / .mdx")]
        Spotify[("Spotify<br/>Web API")]
    end

    UI -- "HTML + RSC payload" --> Pages
    UI -- "poll every 60s" --> API
    UI -.-> SanityCDN
    UI -.-> GitHub
    UI -.-> Analytics
    SanityLib -- "GraphQL over fetch" --> Sanity
    MdxLib -- "fs read at build" --> Content
    API -- "refresh token → now playing" --> Spotify
```

The main rules:

- **The browser never talks to Sanity's API.** Pages fetch from Sanity on the server, at build time and then again at most once an hour through ISR. An e2e test checks this.
- **Local MDX** in `content/` is read from disk and compiled to React on the server. The browser gets finished HTML.
- **Spotify credentials stay on the server.** The browser calls `/api/now-playing`, and that route handler talks to Spotify.
- **Client components** only handle interactivity: tabs, keyboard shortcuts, the theme, animations, widgets and the code copy buttons.

### Request lifecycle

```mermaid
sequenceDiagram
    autonumber
    participant U as Visitor
    participant V as Vercel edge cache
    participant N as Next.js server
    participant S as Sanity GraphQL
    participant F as content/*.mdx

    Note over N,F: next build
    N->>S: getHomePage, getExperiencePage, getProjects, ...
    N->>F: getAllPosts, getAllLinks, renderMdx
    N->>V: Prerendered HTML for every route

    U->>V: GET /home
    V-->>U: Cached HTML (instant, content included)
    U->>U: Hydrate client components

    Note over V,N: After 1h (revalidate = 3600)
    U->>V: GET /home
    V-->>U: Stale HTML (still instant)
    V->>N: Regenerate in background
    N->>S: Re-fetch content
    N->>V: Fresh HTML replaces cache
```

If Sanity is down during a rebuild, visitors keep getting the last good page.

### Server vs client rendering

```mermaid
flowchart TB
    subgraph Server["Server Components (no JS shipped)"]
        HomePage["app/home/page.tsx<br/>loads Sanity data + posts + links in parallel"]
        BlogPage["app/blogs/[slug]/page.tsx<br/>MDX + author"]
        LinkPage["app/links/[slug]/page.tsx"]
        SectionPages["app/experience · projects · about · uses · blogs · links"]
    end

    subgraph Client["Client Components ('use client')"]
        HomeClient["components/home/HomeClient<br/>tabs · keyboard shortcuts · mobile menu"]
        Widgets["Spotify card · GitHub calendar · Skills"]
        Sections["components/sections/*<br/>Experience · Projects · BlogList · Uses"]
        Copy["CodeCopyEnhancer"]
        Back["BackButton"]
        Shell["Providers (theme) · Layout · AnimatedBackground"]
    end

    HomePage -- props --> HomeClient
    HomeClient --> Widgets
    HomeClient --> Sections
    SectionPages -- props --> Sections
    BlogPage --> Copy
    BlogPage --> Back
    LinkPage --> Copy
    LinkPage --> Back
```

The `components/sections/*` views are shared: each one renders both on its own route (like `/projects`) and inside the matching `/home` tab.

## Routes

| Route | Rendering | Data |
|-------|-----------|------|
| `/` | Redirects (308) to `/home` | `next.config.js` |
| `/home` | Static + ISR (1h) | Sanity + local posts/links |
| `/experience`, `/about` | Static + ISR (1h) | Sanity work experience |
| `/projects` | Static + ISR (1h) | Sanity projects |
| `/blogs` | Static | `content/blogs` |
| `/blogs/[slug]` | Static + ISR (1h) | MDX + Sanity author |
| `/links`, `/links/[slug]` | Static | `content/links` |
| `/uses`, `/guides/ai-guide` | Static | Hard-coded content |
| `/api/now-playing` | Dynamic | Spotify |
| `/api/callback` | Dynamic | One-time Spotify OAuth helper |

## Project Structure

```
app/                  Routes (App Router), layout, API route handlers
components/
  home/               HomeClient: interactive home page
  sections/           Views shared by routes and home tabs
  guides/             The AI engineering guide
lib/
  sanity/             Server-side Sanity client + typed loaders
  mdx.ts              Server MDX rendering (rehype highlight + autolink)
  blogPosts.ts        content/blogs parser
  links.ts            content/links parser
src/
  graphql/queries/    .graphql documents (loaded via graphql-tag/loader)
  hooks/              useTabs, useNowPlaying
  data/ · utils/      Static data and helpers
content/              Local blog posts and link collections (.md / .mdx)
interface/            TypeScript types
e2e/                  Playwright tests + screenshot baselines
styles/globals.css    Tailwind 4 config (@theme, dark variant) + fonts
```

## Getting Started

Requires **Node 24** (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

### Environment variables

| Variable | Used by | Notes |
|----------|---------|-------|
| `NEXT_PUBLIC_PORTFOLIO_GRAPHQL_ENDPOINT` | `lib/sanity` (server) | Required: the build fails without it |
| `SPOTIFY_CLIENT_ID` | `/api/now-playing` | Server-only |
| `SPOTIFY_CLIENT_SECRET` | `/api/now-playing` | Server-only |
| `SPOTIFY_REFRESH_TOKEN` | `/api/now-playing` | Get one using `/api/callback` |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` / `npm run lint:fix` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Build, start on port 3100, run Playwright |
| `npm test` | Typecheck + e2e |

## Testing & CI

- **Playwright** (`e2e/`) checks that every route loads with no console errors. It also tests the interactive parts: tabs, keyboard shortcuts, back navigation, theme toggle, code copy, the projects filter, the mobile menu and the API.
- **Visual regression**: every route has a screenshot in light and dark mode. The baselines are macOS-specific, so they run locally. After an intentional UI change, update them with `npx playwright test --update-snapshots=all`.
- **Pre-commit** (Husky): lint + typecheck.
- **GitHub Actions** (`.github/workflows/ci.yml`): lint, typecheck and Playwright on pushes and PRs to `master`, `main` and `dev`. Needs the `NEXT_PUBLIC_PORTFOLIO_GRAPHQL_ENDPOINT` repository secret.

## Writing Content

Add a `.md` or `.mdx` file to `content/blogs/` or `content/links/`. It's picked up at build time.

```md
---
title: My Post
date: 2025-01-01
description: Short summary
tags: [javascript, react]
author: pratham82
---
```

- Images: put files under `public/content/` and reference them as `/content/...`.
- Code blocks get syntax highlighting (`night-owl` theme) and a Copy button.
