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

## Server vs client rendering

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

## Project structure

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
