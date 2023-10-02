import { useQuery } from "@apollo/client";
// eslint-disable-next-line import/no-extraneous-dependencies
import "highlight.js/styles/atom-one-dark.css";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowLeft } from "phosphor-react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

import PageAnimationContainer from "../../components/PageAnimationContainer";
import BlogSinglePageSkeleton from "../../components/loadingPages/blog.skeleton";
import { AllAuthorResponse } from "../../interface/post.interface";
import { fetchAuthorByUserName } from "../../src/graphql/queries";
import getFormattedDate from "../../src/utils/getFormattedDate";
import getReadTime from "../../src/utils/getReadTime";
import { PostMeta, getPostFromSlug, getSlugs } from "../api/blogPosts";

interface IMDXPost {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: PostMeta;
  content: string;
}

const Post = ({ post }: { post: IMDXPost }) => {
  const router = useRouter();
  const { push } = router || {};

  const { loading, data: authorsData } = useQuery(fetchAuthorByUserName, {
    variables: { username: post.meta.author || "pratham82" },
  });

  const { allAuthor }: AllAuthorResponse = authorsData || {};

  const authorData = allAuthor?.[0];

  const date = post?.meta?.date;

  const newPdDate = date ? getFormattedDate(date, "MMM dd, yyyy") : "";

  const readTime = getReadTime(post.content);

  if (loading) {
    return <BlogSinglePageSkeleton />;
  }

  return (
    <PageAnimationContainer className="sm:w-[575px]">
      <Head>
        <title>{post.meta.title}</title>
      </Head>
      <button
        type="button"
        className="flex items-center py-2 hover:scale-105 transition ease-in"
        onClick={() => push("/blogs")}
      >
        <ArrowLeft />
        <span className="pl-2">back</span>
      </button>
      <h1 className="text-4xl">{post.meta?.title}</h1>
      <div className="flex items-center py-2">
        <Image
          src={authorData?.image?.asset?.url}
          alt="author"
          width={45}
          height={45}
          className="rounded-full"
        />
        <div className="flex flex-col pl-2">
          <span className="text-sm">{authorData?.name}</span>
          <span className="text-xs font-thin">
            {readTime} min read . {newPdDate}
          </span>
        </div>
      </div>
      <div className="mt-8 prose dark:prose-invert">
        <MDXRemote {...post.source} />
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
  return {
    props: { post: { source: mdxSource, meta, content } },
  };
};

export default Post;
