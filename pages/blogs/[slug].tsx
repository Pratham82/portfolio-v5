import { useQuery } from "@apollo/client";
// eslint-disable-next-line import/no-extraneous-dependencies
import "highlight.js/styles/atom-one-dark.css";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowLeft } from "phosphor-react";
import React from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

import { AllPostResponse } from "../../interface/post.interface";
import { fetchPostBySlug } from "../../src/graphql/queries";
import getFormattedDate from "../../src/utils/getFormattedDate";
import { PostMeta, getPostFromSlug, getSlugs } from "../api/blogPosts";

interface IMDXPost {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: PostMeta;
  content: any;
}

const Post = ({ post }: { post: IMDXPost }) => {
  const router = useRouter();
  const { query, back } = router || {};
  const { slug = "" } = query || {};

  const { loading, data } = useQuery(fetchPostBySlug, { variables: { slug } });

  const { allPost }: AllPostResponse = data || {};

  const blogData = allPost?.[0];

  const { author, readTime = "", publishedAt = "" } = blogData || {};

  const authorUrl =
    "https://cdn.sanity.io/images/sfjfod25/production/005e9e223e2628b34af0acfbc5c264ceecc70168-800x800.jpg";

  console.log({ blogData });

  const pbDate = publishedAt
    ? getFormattedDate(publishedAt, "MMM dd, yyyy")
    : "";

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="sm:w-[575px]">
      <button
        type="button"
        className="flex items-center py-2 hover:scale-105 transition ease-in"
        onClick={() => back()}
      >
        <ArrowLeft />
        <span className="pl-2">back</span>
      </button>
      <h1 className="text-4xl">{post.meta?.title}</h1>
      <div className="flex items-center py-2">
        <Image
          src={authorUrl}
          alt="author"
          width={45}
          height={45}
          className="rounded-full"
        />
        <div className="flex flex-col pl-2">
          <span className="text-sm">{author?.name}</span>
          <span className="text-xs font-thin">
            {readTime}. {pbDate}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <MDXRemote {...post.source} />
      </div>
    </div>
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

  console.log({ content });
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeHighlight,
      ],
    },
  });
  return { props: { post: { source: mdxSource, content, meta } } };
};

export default Post;
