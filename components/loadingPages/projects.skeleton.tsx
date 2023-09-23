const ProjectsSkeleton = () => {
  return (
    <div className="flex w-[300px] sm:w-[575px] sm:border sm:border-red-300 animate-pulse flex-col items-left">
      <h1 className="mb-2 mt-2 h-9 w-2/6 rounded-md bg-slate-700"> </h1>
      <h2 className="mb-2 mt-2 h-7 w-full rounded-md bg-slate-700 text-xl">
        {" "}
      </h2>

      <div className="grid-cols-1 sm:grid-cols-2 grid gap-3">
        {Array(8)
          .fill(0)
          ?.map(() => (
            <div
              key={Math.random()}
              className="mr-4 flex w-[280px] h-[180px] items-center rounded-md bg-slate-700"
            />
          ))}
      </div>
    </div>
  );
};

export default ProjectsSkeleton;
