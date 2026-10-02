import Image from "next/image";

import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";

import "highlight.js/styles/night-owl.css";

import BackButton from "@/components/BackButton";
import CodeCopyEnhancer from "@/components/CodeCopyEnhancer";
import PageAnimationContainer from "@/components/PageAnimationContainer";
import { getPostFromSlug, getSlugs } from "@/lib/blogPosts";
import { renderMdx } from "@/lib/mdx";
import { getAuthorByUsername } from "@/lib/sanity/queries";
import getFormattedDate from "@/src/utils/getFormattedDate";
import getReadTime from "@/src/utils/getReadTime";

type PostPageProps = { params: Promise<{ slug: string }> };

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;
export const dynamicParams = false;

export const generateStaticParams = () => getSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
  const { meta } = getPostFromSlug((await params).slug);

  return { title: meta.title };
};

const MdxImage = (props: { src?: string; alt?: string }) => (
  <Image
    src={props.src?.startsWith("/") ? props.src : `/content/${props.src}`}
    alt={props.alt || ""}
    width={800}
    height={600}
    className="rounded-lg my-4"
    style={{ width: "auto", height: "auto" }}
  />
);

const PostPage = async ({ params }: PostPageProps) => {
  const { content, meta } = getPostFromSlug((await params).slug);
  const [author, mdx] = await Promise.all([
    getAuthorByUsername(meta.author || "pratham82"),
    renderMdx(content, { img: MdxImage }),
  ]);

  const authorImageUrl = author?.image?.asset?.url;
  const publishedDate = meta.date
    ? getFormattedDate(meta.date, "MMM dd, yyyy")
    : "";
  const readTime = getReadTime(content);

  return (
    <PageAnimationContainer>
      <BackButton href="/blogs">
        <ArrowLeftIcon />
        back
      </BackButton>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {meta.title}
      </h1>

      <div className="mt-4 flex items-center gap-3">
        {authorImageUrl && (
          <Image
            src={authorImageUrl}
            alt="author"
            width={36}
            height={36}
            className="rounded-full"
          />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium">{author?.name}</span>
          <span className="font-mono text-xs text-muted-foreground">
            {readTime} min read · {publishedDate}
          </span>
        </div>
      </div>

      <CodeCopyEnhancer className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:underline-offset-4">
        {mdx}
      </CodeCopyEnhancer>
    </PageAnimationContainer>
  );
};

export default PostPage;
