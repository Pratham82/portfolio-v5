import Link from "next/link";

import { useQuery } from "@apollo/client";

import BlogCard from "@/components/BlogCard";
import BlogsPage from "@/components/loadingPages/blogspage.skeleton";
import PageAnimationContainer from "@/components/PageAnimationContainer";
import PageTitle from "@/components/PageTitle";
import { PostMeta } from "@/lib/blogPosts";
import { allBlogsPage } from "@/src/graphql/queries";

export interface IBlogsProps {
  posts: {
    content: string;
    meta: PostMeta;
  }[];
}

const BlogList = (props: IBlogsProps) => {
  const { posts } = props;
  const { loading } = useQuery(allBlogsPage);
  // const { pageName = "" }: IBlogsPageResponse = pageData || {};

  if (loading) {
    return <BlogsPage />;
  }

  return (
    <PageAnimationContainer className="sm:w-[575px]">
      {/* <h1 className="text-2xl font-bold">{pageName}</h1> */}

      <PageTitle>Blogs</PageTitle>
      <div className="flex flex-col py-3 gap-4">
        {posts?.map(({ meta: blogData }) => (
          <Link
            href={`/blogs/${blogData.slug}`}
            key={blogData.slug}
            className="block"
          >
            <BlogCard {...blogData} />
          </Link>
        ))}
      </div>
    </PageAnimationContainer>
  );
};

export default BlogList;
