import BlogList from "@/components/sections/BlogList";
import { getAllPosts } from "@/lib/blogPosts";

const BlogsPage = () => <BlogList posts={getAllPosts()} />;

export default BlogsPage;
