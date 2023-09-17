import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import React from "react";

import { Blog } from "../../interface/blogs.interface";
import { AllPostResponse } from "../../interface/post.interface";
import { fetchPostBySlug } from "../../src/graphql/queries";

const Post = () => {
  const router = useRouter();
  const { query, back } = router || {};
  const { slug = "" } = query || {};

  const { loading, data } = useQuery(fetchPostBySlug, { variables: { slug } });

  const { allPost }: AllPostResponse = data || {};

  const { title = "" } = allPost?.[0] || [];

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
      <h1 className="text-3xl">{title}</h1>
    </div>
  );
};

export default Post;
