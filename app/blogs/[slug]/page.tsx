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
    <PageAnimationContainer className="sm:w-[575px]">
      <BackButton href="/home?from=blog">
        <ArrowLeftIcon />
        <span className="pl-2">back</span>
      </BackButton>

      <h1 className="text-4xl">{meta.title}</h1>

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
            {readTime} min read . {publishedDate}
          </span>
        </div>
      </div>

      <CodeCopyEnhancer className="mt-8 prose dark:prose-invert max-w-none">
        {mdx}
      </CodeCopyEnhancer>
    </PageAnimationContainer>
  );
};

export default PostPage;
