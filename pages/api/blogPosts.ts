/* eslint-disable import/no-extraneous-dependencies */
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
// eslint-disable-next-line import/order
import path from "path";

const POSTS_PATH = path.join(process.cwd(), "content/blogs");

export const getSlugs = (): string[] => {
  const paths = sync(`${POSTS_PATH}/*.mdx`);

  return paths.map((pathData) => {
    const parts = pathData.split("/");
    const fileName = parts[parts.length - 1];
    const [slug] = fileName.split(".");
    return slug;
  });
};

export const getPostFromSlug = (slug: string): Post => {
  const postPath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postPath, "utf-8");
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

export const getAllPosts = () => {
  const posts = getSlugs()
    .map((slug) => getPostFromSlug(slug))
    .sort((a, b) => {
      if (a.meta.date > b.meta.date) return 1;
      if (a.meta.date < b.meta.date) return -1;
      return 0;
    })
    .reverse();
  return posts;
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
