import fs from "fs";
import path from "path";

import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "content/blogs");

export const getSlugs = (): string[] => {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((fileName) => /\.mdx?$/.test(fileName)) // Support both .md and .mdx
    .map((fileName) => fileName.replace(/\.mdx?$/, ""));
};

export const getPostFromSlug = (slug: string): Post => {
  const mdxPath = path.join(POSTS_PATH, `${slug}.mdx`);
  const mdPath = path.join(POSTS_PATH, `${slug}.md`);

  let source: string;
  if (fs.existsSync(mdxPath)) {
    source = fs.readFileSync(mdxPath, "utf-8");
  } else if (fs.existsSync(mdPath)) {
    source = fs.readFileSync(mdPath, "utf-8");
  } else {
    throw new Error(`Post file for slug "${slug}" not found`);
  }

  const { content, data } = matter(source);

  return {
    content,
    meta: {
      slug,
      excerpt: data.excerpt ?? "",
      title: data.title ?? slug,
      tags: (data.tags ?? []).sort(),
      date: (data.date ?? new Date()).toString(),
      readTime: data.readTime ?? "",
      description: data.description ?? "",
      subTitle: data.subTitle ?? "",
      author: data.author ?? "",
      authorImageUrl: data.authorImageUrl ?? "",
    },
  };
};

export const getAllPosts = (): Post[] => {
  return getSlugs()
    .map((slug) => getPostFromSlug(slug))
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime() ||
        // Same date: newest-slug-first keeps the order stable across filesystems.
        b.meta.slug.localeCompare(a.meta.slug),
    );
};

interface Post {
  content: string;
  meta: PostMeta;
}

export interface PostMeta {
  excerpt: string;
  slug: string;
  title: string;
  tags: string[];
  date: string;
  description: string;
  readTime: string;
  subTitle: string;
  author: string;
  authorImageUrl: string;
}
