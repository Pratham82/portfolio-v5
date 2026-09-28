import { MDXRemoteProps, compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

/** Compiles local MDX content on the server with the site's rehype plugins. */
export const renderMdx = async (
  source: string,
  components?: MDXRemoteProps["components"],
) => {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        rehypePlugins: [
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          rehypeHighlight as any,
        ],
      },
    },
  });

  return content;
};
