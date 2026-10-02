import type { Metadata } from "next";

import BlogList from "@/components/sections/BlogList";
import { getAllPosts } from "@/lib/blogPosts";

export const metadata: Metadata = { title: "Blogs" };

const BlogsPage = () => <BlogList posts={getAllPosts()} />;

export default BlogsPage;
