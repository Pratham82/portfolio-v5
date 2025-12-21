import Link from "next/link";

import { useQuery } from "@apollo/client";

import BlogsPage from "@/components/loadingPages/blogspage.skeleton";

import BlogCard from "../../components/BlogCard";
import PageAnimationContainer from "../../components/PageAnimationContainer";
import { PostMeta, getAllPosts } from "../../lib/blogPosts";
import { allBlogsPage } from "../../src/graphql/queries";

interface IBlogsProps {
  posts: {
    content: string;
    meta: PostMeta;
  }[];
}

const Blogs = (props: IBlogsProps) => {
  const { posts } = props;
  const { loading } = useQuery(allBlogsPage);
  // const { pageData } = useGetPageData(data);
  // const { pageName = "" }: IBlogsPageResponse = pageData || {};

  if (loading) {
    return <BlogsPage />;
  }

  return (
    <PageAnimationContainer className="sm:w-[575px]">
      {/* <h1 className="text-2xl font-bold">{pageName}</h1> */}
      <div className="flex flex-col py-3 gap-2">
        {posts?.map(({ meta: blogData }) => (
          <Link href={`/blogs/${blogData.slug}`} key={blogData.title}>
            <BlogCard {...blogData} />
          </Link>
        ))}
      </div>
    </PageAnimationContainer>
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
