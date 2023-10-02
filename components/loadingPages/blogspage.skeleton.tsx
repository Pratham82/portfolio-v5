const BlogsPage = () => (
  <div className="flex w-[300px] sm:w-[575px] animate-pulse flex-col items-left ">
    <h1 className="mb-2 mt-2 h-9 w-2/6 rounded-md bg-slate-700"> </h1>
    <div className="flex flex-col gap-3">
      {Array(4)
        .fill(0)
        ?.map(() => (
          <div
            key={Math.random()}
            className="mr-4 flex w-[300px] sm:w-[575px] h-[120px] items-center rounded-md bg-slate-700"
          />
        ))}
    </div>
  </div>
);

export default BlogsPage;
