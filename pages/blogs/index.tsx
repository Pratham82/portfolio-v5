import BlogList, { IBlogsProps } from "@/components/sections/BlogList";
import { getAllPosts } from "@/lib/blogPosts";

const BlogsPage = ({ posts }: IBlogsProps) => <BlogList posts={posts} />;

export default BlogsPage;

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}
