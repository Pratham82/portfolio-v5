import Head from "next/head";
import { useRouter } from "next/router";

import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useRef } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/night-owl.css";

import { PageAnimationContainer } from "@/components";
import { HomePageTabs } from "@/interface/home.interface";
import useTabs from "@/src/hooks/useTabs";

import { LinkMeta, getLinkFromSlug, getLinkSlugs } from "../../lib/links";

interface IMDXLink {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: LinkMeta;
  content: string;
}

const LinkPage = ({ link }: { link: IMDXLink }) => {
  const router = useRouter();
  const { handleTabChange } = useTabs();

  const mdxRef = useRef<HTMLDivElement>(null);

  // Add copy buttons to code blocks
  useEffect(() => {
    const codeBlocks = mdxRef.current?.querySelectorAll("pre") || [];

    codeBlocks.forEach((block) => {
      if (block.querySelector(".copy-btn")) return;

      const button = document.createElement("button");
      button.textContent = "Copy";
      button.className =
        "copy-btn absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded hover:bg-gray-600 transition";

      button.addEventListener("click", () => {
        const code = block.querySelector("code");
        if (!code) return;

        navigator.clipboard.writeText(code.innerText).then(() => {
          button.textContent = "Copied!";
          setTimeout(() => {
            button.textContent = "Copy";
          }, 1500);
        });
      });

      block.classList.add("relative", "rounded-md", "overflow-hidden");
      block.appendChild(button);
    });
  });

  return (
    <PageAnimationContainer className="sm:w-[575px]">
      <Head>
        <title>{link.meta.title} | Links</title>
        <meta
          name="description"
          content={link.meta.description || link.meta.title}
        />
      </Head>

      <button
        type="button"
        className="flex items-center py-2 hover:scale-105 transition ease-in mb-4"
        onClick={() => {
          router.push("/home?from=links");

          handleTabChange(HomePageTabs.LINKS);
        }}
      >
        <span className="pl-2">← back to links</span>
      </button>

      <h1 className="text-4xl mb-4">{link.meta?.title}</h1>

      {link.meta.url && (
        <a
          href={link.meta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 block"
        >
          {link.meta.url}
        </a>
      )}

      {link.meta.description && (
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {link.meta.description}
        </p>
      )}

      <div ref={mdxRef} className="mt-8 prose dark:prose-invert max-w-none">
        <MDXRemote {...link.source} />
      </div>
    </PageAnimationContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getLinkSlugs().map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const { content, meta } = getLinkFromSlug(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeHighlight as any,
      ],
    },
  });

  return {
    props: { link: { source: mdxSource, meta, content } },
  };
};

export default LinkPage;
