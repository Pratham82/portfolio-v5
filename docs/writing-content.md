# Writing Content

Blogs: add a `.md` or `.mdx` file to `content/blogs/`. It's picked up at build time.

Links and the Now page: edit them in Sanity Studio (**Links** list and the **Now** singleton). The body field is markdown and is rendered as MDX, so `{/* comments */}` work. Publishing calls the `/api/revalidate` webhook and the site updates on the next visit, without a deploy. A new link's URL is its slug.

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
