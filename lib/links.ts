import { allLinks } from "@/src/graphql/queries";

import { sanityQuery } from "./sanity/client";

interface SanityLink {
  title: string | null;
  slug: { current: string } | null;
  description: string | null;
  category: string[] | null;
  url: string | null;
  date: string | null;
  body: string | null;
}

const toLink = (link: SanityLink): Link | null => {
  const slug = link.slug?.current;
  if (!slug) return null;

  return {
    content: link.body ?? "",
    meta: {
      slug,
      title: link.title ?? slug,
      description: link.description ?? "",
      category: link.category ?? [],
      url: link.url ?? "",
      date: link.date ? new Date(link.date).toString() : new Date().toString(),
    },
  };
};

/** Every link, newest first. Edited in Sanity; a publish expires the cache. */
export const getAllLinks = async (): Promise<Link[]> => {
  const { allLink } = await sanityQuery<{ allLink: SanityLink[] }>(allLinks);

  return allLink
    .map(toLink)
    .filter((link): link is Link => link !== null)
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime() ||
        // Same date: newest-slug-first keeps the order stable.
        b.meta.slug.localeCompare(a.meta.slug),
    );
};

export const getLinkSlugs = async (): Promise<string[]> =>
  (await getAllLinks()).map(({ meta }) => meta.slug);

export const getLinkFromSlug = async (slug: string): Promise<Link | null> =>
  (await getAllLinks()).find(({ meta }) => meta.slug === slug) ?? null;

interface Link {
  content: string;
  meta: LinkMeta;
}

export interface LinkMeta {
  slug: string;
  title: string;
  description: string;
  category: string[];
  url: string;
  date: string;
}
