import Link from "next/link";

import BlogCard from "@/components/BlogCard";
import PageAnimationContainer from "@/components/PageAnimationContainer";
import PageTitle from "@/components/PageTitle";
import { HoverItem, HoverList } from "@/components/ui/hover-list";
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
    <PageAnimationContainer>
      <PageTitle>Blogs</PageTitle>
      <HoverList className="mt-3 flex flex-col">
        {posts?.map(({ meta: blogData }) => (
          <HoverItem id={blogData.slug} key={blogData.slug}>
            <Link href={`/blogs/${blogData.slug}`} className="block">
              <BlogCard {...blogData} />
            </Link>
          </HoverItem>
        ))}
      </HoverList>
    </PageAnimationContainer>
  );
};

export default BlogList;
