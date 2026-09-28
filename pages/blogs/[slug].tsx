import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { ArrowLeftIcon } from "@phosphor-icons/react";
import "highlight.js/styles/night-owl.css";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useRef } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

import { PageAnimationContainer } from "@/components";
import { SANITY_REVALIDATE, getAuthorByUsername } from "@/lib/sanity/queries";

import { HomePageTabs } from "../../interface/home.interface";
import { Author } from "../../interface/post.interface";
import { PostMeta, getPostFromSlug, getSlugs } from "../../lib/blogPosts";
import useTabs from "../../src/hooks/useTabs";
import getFormattedDate from "../../src/utils/getFormattedDate";
import getReadTime from "../../src/utils/getReadTime";

interface IMDXPost {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: PostMeta;
  content: string;
}

const Post = ({ post, author }: { post: IMDXPost; author: Author | null }) => {
  const router = useRouter();
  // const { push } = router;

  const { handleTabChange } = useTabs();

  const authorImageUrl = author?.image?.asset?.url;

  const date = post?.meta?.date;
  const newPdDate = date ? getFormattedDate(date, "MMM dd, yyyy") : "";
  const readTime = getReadTime(post.content);

  const mdxRef = useRef<HTMLDivElement>(null);

  // ✅ Reapply copy buttons on every render
  useEffect(() => {
    const codeBlocks = mdxRef.current?.querySelectorAll("pre") || [];

    codeBlocks.forEach((block) => {
      if (block.querySelector(".copy-btn")) return;

      const button = document.createElement("button");
      button.textContent = "Copy";
      button.className =
        "copy-btn absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-sm hover:bg-gray-600 transition";

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
        <title>{post.meta.title}</title>
      </Head>

      <button
        type="button"
        className="flex items-center py-2 hover:scale-105 transition ease-in"
        onClick={() => {
          // push("/home");
          router.push("/home?from=blog");

          handleTabChange(HomePageTabs.BLOGS);
        }}
      >
        <ArrowLeftIcon />
        <span className="pl-2">back</span>
      </button>

      <h1 className="text-4xl">{post.meta?.title}</h1>

      <div className="flex items-center py-2">
        {authorImageUrl && (
          <Image
            src={authorImageUrl}
            alt="author"
            width={45}
            height={45}
            className="rounded-full"
          />
        )}
        <div className="flex flex-col pl-2">
          <span className="text-sm">{author?.name}</span>
          <span className="text-xs font-thin">
            {readTime} min read . {newPdDate}
          </span>
        </div>
      </div>

      <div ref={mdxRef} className="mt-8 prose dark:prose-invert max-w-none">
        <MDXRemote
          {...post.source}
          components={{
            img: (props: any) => (
              <Image
                src={
                  props.src?.startsWith("/")
                    ? props.src
                    : `/content/${props.src}`
                }
                alt={props.alt || ""}
                width={800}
                height={600}
                className="rounded-lg my-4"
                style={{ width: "auto", height: "auto" }}
              />
            ),
          }}
        />
      </div>
    </PageAnimationContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getSlugs().map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const { content, meta } = getPostFromSlug(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeHighlight as any,
      ],
    },
  });

  const author = await getAuthorByUsername(meta.author || "pratham82");

  return {
    props: { post: { source: mdxSource, meta, content }, author },
    revalidate: SANITY_REVALIDATE,
  };
};

export default Post;
