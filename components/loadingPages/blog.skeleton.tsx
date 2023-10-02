const BlogSinglePageSkeleton = () => (
  <div className="flex w-[300px] sm:w-[575px] animate-pulse flex-col items-left ">
    <h1 className="mb-2 mt-2 h-10 w-2/6 rounded-md bg-slate-700"> </h1>
    <div className="mr-4 my-2 flex w-[300px] sm:w-[575px] h-[80px] items-center rounded-md bg-slate-700" />
    <div className="flex">
      <div className="mr-4 my-2 flex h-[45px] w-[45px] items-center rounded-full bg-slate-700" />
      <div className="mr-4 my-2 flex h-[45px] w-2/6 items-center rounded-full bg-slate-700" />
    </div>
  </div>
);

export default BlogSinglePageSkeleton;
