import fs from "fs";
import path from "path";

import { sync } from "glob";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "content/blogs");

export const getSlugs = (): string[] => {
  const paths = sync(`${POSTS_PATH}/*.{md,mdx}`); // Support both

  return paths.map((filePath) => {
    const parts = filePath.split("/");
    const fileName = parts[parts.length - 1];
    const slug = fileName.replace(/\.mdx?$/, ""); // Removes .md or .mdx
    return slug;
  });
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
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
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
