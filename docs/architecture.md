# Architecture

This page goes into detail on how the site is built. For the high-level diagram of how the pieces connect, see the [README](../README.md#architecture).

## Request lifecycle

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

    U->>V: GET /now
    V-->>U: Cached HTML (instant, content included)
    U->>U: Hydrate client components

    Note over V,N: After 1h (revalidate = 3600)
    U->>V: GET /now
    V-->>U: Stale HTML (still instant)
    V->>N: Regenerate in background
    N->>S: Re-fetch content
    N->>V: Fresh HTML replaces cache
```

If Sanity is down during a rebuild, visitors keep getting the last good page.

Publishing in Sanity doesn't have to wait for the hour. A Sanity webhook POSTs to `/api/revalidate`, which checks the `sanity-webhook-signature` header against `SANITY_REVALIDATE_SECRET` and expires the `sanity` cache tag that every Sanity fetch carries. The next visit to a Sanity-backed page then re-renders with fresh content.

Webhook setup (sanity.io/manage → API → Webhooks):

- URL: `https://<site>/api/revalidate`, method POST
- Trigger on create, update and delete; the filter can be left empty
- Secret: the same value as `SANITY_REVALIDATE_SECRET` in Vercel

## Server vs client rendering

```mermaid
flowchart TB
    subgraph Server["Server Components (no JS shipped)"]
        HomeLayout["app/(home)/layout.tsx<br/>hero data: Sanity home page + resume link"]
        BlogPage["app/blogs/[slug]/page.tsx<br/>MDX + author"]
        LinkPage["app/links/[slug]/page.tsx"]
        SectionPages["app/(home)/experience · projects · skills · blogs<br/>now · games · uses · links · about<br/>one route per tab, each loads its own data"]
    end

    subgraph Client["Client Components ('use client')"]
        HomeShell["components/home/HomeShell<br/>hero · tab links · keyboard shortcuts · mobile menu"]
        Widgets["Spotify card · GitHub calendar · Skills"]
        Sections["components/sections/*<br/>Experience · Projects · BlogList · Uses · Games · Now"]
        Copy["CodeCopyEnhancer"]
        Back["BackButton"]
        Shell["Providers (theme) · Layout · AnimatedBackground"]
    end

    HomeLayout -- props --> HomeShell
    HomeShell --> Widgets
    SectionPages -- "props (children of HomeShell)" --> Sections
    BlogPage --> Copy
    BlogPage --> Back
    LinkPage --> Copy
    LinkPage --> Back
```

Each home tab is a route in the `app/(home)` group. Its layout renders `HomeShell` (hero + tab bar) once and keeps it mounted, so switching tabs only swaps the page below it, keeps the scroll position, and updates the URL. A tab URL like `/now` can be shared, and back/forward move between tabs.

## Routes

| Route | Rendering | Data |
|-------|-----------|------|
| `/`, `/home` | Static + ISR (1h) | Hero + Experience tab. `/home` is the old landing URL; it renders the same view with a canonical of `/` |
| `/home?from=blog\|links` | Redirects (308) to `/blogs` / `/links` | `next.config.js` (old back-button links) |
| `/experience` | Static + ISR (1h) | Resume PDF + Sanity logos |
| `/skills`, `/about` | Static | Hard-coded content |
| `/projects` | Static + ISR (1h) | Sanity projects |
| `/blogs` | Static | `content/blogs` |
| `/blogs/[slug]` | Static + ISR (1h) | MDX + Sanity author |
| `/links`, `/links/[slug]` | Static + ISR (1h) | Sanity `link` documents (new slugs render on demand) |
| `/uses`, `/guides/ai-guide` | Static | Hard-coded content |
| `/games` | Static + ISR (1h) | PSN (`lib/psn.ts`) + `src/data/games.json` |
| `/now` | Static + ISR (1h) | Sanity `nowPage` + Spotify, WakaTime, FotMob, Letterboxd (`lib/now.ts`) |
| `/api/now-playing` | Dynamic | Spotify |
| `/api/callback` | Dynamic | One-time Spotify OAuth helper |
| `/api/revalidate` | Dynamic | Sanity publish webhook (expires the `sanity` cache tag) |

## Project structure

```
app/                  Routes (App Router), layout, API route handlers
components/
  home/               HomeShell: hero, tab bar, mobile menu (via app/(home)/layout)
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
