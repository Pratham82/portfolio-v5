# Writing Content

Blogs: add a `.md` or `.mdx` file to `content/blogs/`. It's picked up at build time.

Links, the Now page and favourite films are edited in Sanity Studio. Publishing calls the `/api/revalidate` webhook, and the site updates on the next visit, without a deploy.

- **Links** (Studio → Links): title, slug, description, categories, URL, date and a markdown body (rendered as MDX). A new link's page is `/links/<slug>` and works as soon as it's published.
- **Now text** (Studio → Now → Body): markdown rendered as MDX, so `{/* comments */}` work. Bump **Updated** when you change it.
- **Favourite films** (Studio → Now → Favourite films): up to 4 films, in display order, each with a title, release year and Letterboxd film URL. Posters are looked up on TMDB by title and year, so set the year to get the right film.

Blog frontmatter:

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
