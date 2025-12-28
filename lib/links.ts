import fs from "fs";
import path from "path";

import { sync } from "glob";
import matter from "gray-matter";

const LINKS_PATH = path.join(process.cwd(), "content/links");

export const getLinkSlugs = (): string[] => {
  const paths = sync(`${LINKS_PATH}/*.{md,mdx}`); // Support both

  return paths.map((filePath) => {
    const parts = filePath.split("/");
    const fileName = parts[parts.length - 1];
    const slug = fileName.replace(/\.mdx?$/, ""); // Removes .md or .mdx
    return slug;
  });
};

export const getLinkFromSlug = (slug: string): Link => {
  const mdxPath = path.join(LINKS_PATH, `${slug}.mdx`);
  const mdPath = path.join(LINKS_PATH, `${slug}.md`);

  let source: string;
  if (fs.existsSync(mdxPath)) {
    source = fs.readFileSync(mdxPath, "utf-8");
  } else if (fs.existsSync(mdPath)) {
    source = fs.readFileSync(mdPath, "utf-8");
  } else {
    throw new Error(`Link file for slug "${slug}" not found`);
  }

  const { content, data } = matter(source);

  return {
    content,
    meta: {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      category: data.category ?? "",
      url: data.url ?? "",
      date: data.date ? new Date(data.date).toString() : new Date().toString(),
    },
  };
};

export const getAllLinks = (): Link[] => {
  return getLinkSlugs()
    .map((slug) => getLinkFromSlug(slug))
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
    );
};

interface Link {
  content: string;
  meta: LinkMeta;
}

export interface LinkMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  url: string;
  date: string;
}
