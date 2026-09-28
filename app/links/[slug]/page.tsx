import type { Metadata } from "next";

import "highlight.js/styles/night-owl.css";

import BackButton from "@/components/BackButton";
import CodeCopyEnhancer from "@/components/CodeCopyEnhancer";
import PageAnimationContainer from "@/components/PageAnimationContainer";
import { getLinkFromSlug, getLinkSlugs } from "@/lib/links";
import { renderMdx } from "@/lib/mdx";

type LinkPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () =>
  getLinkSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: LinkPageProps): Promise<Metadata> => {
  const { meta } = getLinkFromSlug((await params).slug);

  return {
    title: `${meta.title} | Links`,
    description: meta.description || meta.title,
  };
};

const LinkPage = async ({ params }: LinkPageProps) => {
  const { content, meta } = getLinkFromSlug((await params).slug);
  const mdx = await renderMdx(content);

  return (
    <PageAnimationContainer className="sm:w-[575px]">
      <BackButton href="/home?from=links" className="mb-4">
        <span className="pl-2">← back to links</span>
      </BackButton>

      <h1 className="text-4xl mb-4">{meta?.title}</h1>

      {meta.url && (
        <a
          href={meta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 block"
        >
          {meta.url}
        </a>
      )}

      {meta.description && (
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {meta.description}
        </p>
      )}

      <CodeCopyEnhancer className="mt-8 prose dark:prose-invert max-w-none">
        {mdx}
      </CodeCopyEnhancer>
    </PageAnimationContainer>
  );
};

export default LinkPage;
