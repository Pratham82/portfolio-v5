import Link from "next/link";

import BlogCard from "@/components/BlogCard";
import PageAnimationContainer from "@/components/PageAnimationContainer";
import PageTitle from "@/components/PageTitle";
import type { PostMeta } from "@/lib/blogPosts";

export interface IBlogsProps {
  posts: {
    content: string;
    meta: PostMeta;
  }[];
}

const BlogList = (props: IBlogsProps) => {
  const { posts } = props;

  return (
    <PageAnimationContainer className="sm:w-[575px]">
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
