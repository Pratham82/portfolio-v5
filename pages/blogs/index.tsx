import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import Link from "next/link";

import BlogCard from "../../components/BlogCard";
import BlogSkeleton from "../../components/loadingPages/blog.skeleton";
import { IBlogsPageResponse } from "../../interface/blogs.interface";
import { allBlogsPage } from "../../src/graphql/queries";
import useGetPageData from "../../src/hooks/useGetPageData";
import { PostMeta, getAllPosts } from "../api/blogPosts";

interface IBlogsProps {
  posts: {
    content: string;
    meta: PostMeta;
  }[];
}

const Blogs = (props: IBlogsProps) => {
  const { posts } = props;
  const { loading, data } = useQuery(allBlogsPage);
  const { pageData } = useGetPageData(data);
  const { pageName = "" }: IBlogsPageResponse = pageData || {};

  if (loading) {
    return <BlogSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="sm:w-[575px]"
    >
      <h1 className="text-3xl">{pageName}</h1>
      <div className="flex flex-col py-3 gap-2">
        {posts?.map(({ meta: blogData }) => (
          <Link href={`/blogs/${blogData.slug}`} key={blogData.title}>
            <BlogCard {...blogData} />
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Blogs;

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}
