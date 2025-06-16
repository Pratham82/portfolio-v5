const HomepageSkeleton = () => (
  <div className="flex sm:w-[575px] animate-pulse flex-col items-center ">
    <div className="h-[110px] w-[110px] rounded-2xl bg-slate-700" />
    <h1 className="mb-2 mt-6 h-9 w-4/6 rounded-md bg-slate-700"> </h1>
    <h1 className="mt-2 h-7 w-full rounded-md bg-slate-700"> </h1>

    <h2 className="mb-2 mt-4 h-7 w-full rounded-md bg-slate-700 text-xl"> </h2>
    <h2 className="mb-2 h-6 w-full rounded-md bg-slate-700 text-xl "> </h2>

    <h2 className="mb-2 mt-4 h-6 w-full rounded-md bg-slate-700 text-xl"> </h2>
    <div className="h-[90px] w-full rounded-md bg-slate-700" />
    <div className="flex h-14 pt-8">
      {Array(2)
        .fill(0)
        ?.map(() => (
          <div
            key={Math.random()}
            className="mr-4 flex h-7 w-24 items-center rounded-md bg-slate-700"
          >
            {" "}
          </div>
        ))}
    </div>
  </div>
);

export default HomepageSkeleton;

// const HomepageSkeleton = () => (
//   <div className="flex flex-col animate-pulse">
//     <h1 className="mb-2 mt-6 h-7 w-2/5 rounded-md bg-slate-700" />
//     <h1 className="mt-2 h-6 w-3/5 rounded-md bg-slate-700" />

//     <div className="my-4 flex space-x-3">
//       {Array(4)
//         .fill(0)
//         .map((_, i) => (
//           <div key={i} className="h-8 w-8 rounded-full bg-slate-700" />
//         ))}
//     </div>

//     {/* Tech stack and contributions are commented out in your code, so omitted here */}

//     {/* SpotifyNowPlayingMonoChrome skeleton */}
//     <div className="mt-8 h-16 w-full rounded-md bg-slate-700" />
//   </div>
// );

// export default HomepageSkeleton;
