/**
 * Shown in the tab content area while a tab's page loads. Next.js wraps each
 * page in `<Suspense fallback={<Loading />}>`, so the hero and tab bar in the
 * layout stay put.
 */
const Bar = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-md bg-muted ${className}`} />
);

const Loading = () => (
  <div role="status" aria-label="Loading" className="flex flex-col gap-6">
    <Bar className="h-7 w-32" />
    {[0, 1, 2].map((row) => (
      <div key={row} className="flex items-start gap-3">
        <Bar className="size-10 shrink-0" />
        <div className="flex flex-1 flex-col gap-2">
          <Bar className="h-4 w-2/3" />
          <Bar className="h-3 w-full" />
          <Bar className="h-3 w-5/6" />
        </div>
      </div>
    ))}
  </div>
);

export default Loading;
