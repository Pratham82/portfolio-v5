# Writing Content

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
