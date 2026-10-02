import { notFound } from "next/navigation";

import type { Metadata } from "next";

import "highlight.js/styles/night-owl.css";

import BackButton from "@/components/BackButton";
import CodeCopyEnhancer from "@/components/CodeCopyEnhancer";
import PageAnimationContainer from "@/components/PageAnimationContainer";
import { getLinkFromSlug, getLinkSlugs } from "@/lib/links";
import { renderMdx } from "@/lib/mdx";

type LinkPageProps = { params: Promise<{ slug: string }> };

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;

// Links published in Sanity after a deploy render on first visit.
export const dynamicParams = true;

export const generateStaticParams = async () =>
  (await getLinkSlugs()).map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: LinkPageProps): Promise<Metadata> => {
  const link = await getLinkFromSlug((await params).slug);
  if (!link) return {};
  const { meta } = link;

  return {
    title: `${meta.title} | Links`,
    description: meta.description || meta.title,
  };
};

const LinkPage = async ({ params }: LinkPageProps) => {
  const link = await getLinkFromSlug((await params).slug);
  if (!link) notFound();
  const { content, meta } = link;
  const mdx = await renderMdx(content);

  return (
    <PageAnimationContainer>
      <BackButton href="/links">← back to links</BackButton>

      <h1 className="mb-4 mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {meta?.title}
      </h1>

      {meta.url && (
        <a
          href={meta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 block break-all font-mono text-sm text-foreground underline decoration-muted-foreground underline-offset-4 hover:decoration-foreground"
        >
          {meta.url}
        </a>
      )}

      {meta.description && (
        <p className="mb-6 text-muted-foreground">{meta.description}</p>
      )}

      <CodeCopyEnhancer className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:underline-offset-4">
        {mdx}
      </CodeCopyEnhancer>
    </PageAnimationContainer>
  );
};

export default LinkPage;
