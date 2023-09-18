const AboutPageSkeleton = () => (
  <div className="flex w-[575px] animate-pulse flex-col items-left ">
    <h1 className="mb-2 mt-2 h-9 w-2/6 rounded-md bg-slate-700"> </h1>
    <h2 className="mb-2 mt-2 h-14 w-full rounded-md bg-slate-700 text-xl"> </h2>

    <h1 className="mb-2 mt-8 h-9 w-3/6 rounded-md bg-slate-700"> </h1>
    <div className="flex flex-col">
      {Array(3)
        .fill(0)
        ?.map(() => (
          <div className="my-4" key={Math.random()}>
            <div className="my-1 flex w-3/6 h-6 items-center rounded-md bg-slate-700" />
            <div className="my-1 flex w-3/6 h-5 items-center rounded-md bg-slate-700" />

            <div className="my-1 flex w-3/6 h-4 items-center rounded-md bg-slate-700" />
          </div>
        ))}
    </div>

    <h1 className="mb-2 mt-8 h-9 w-2/6 rounded-md bg-slate-700"> </h1>

    <div className="flex flex-col">
      {Array(2)
        .fill(0)
        ?.map(() => (
          <div className="my-2" key={Math.random()}>
            <div className="my-1 flex w-3/6 h-5 items-center rounded-md bg-slate-700" />

            <div className="my-1 flex w-3/6 h-5 items-center rounded-md bg-slate-700" />
          </div>
        ))}
    </div>

    <h1 className="mb-2 mt-14 h-9 w-3/6 rounded-md bg-slate-700"> </h1>
  </div>
);

export default AboutPageSkeleton;
