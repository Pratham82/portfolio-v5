import { ReactNode } from "react";

type WidgetProps = {
  id: string;
  title: string;
  icon: ReactNode;
  /** Where the data comes from, linked in the heading row. */
  source?: { label: string; url: string };
  children: ReactNode;
};

const Widget = ({ id, title, icon, source, children }: WidgetProps) => (
  <section aria-labelledby={`now-${id}`} className="mt-10">
    <div className="mb-3 flex items-baseline justify-between gap-2">
      <h2
        id={`now-${id}`}
        className="flex items-center gap-2 font-medium text-foreground"
      >
        <span aria-hidden className="text-muted-foreground [&>svg]:size-4">
          {icon}
        </span>
        {title}
      </h2>
      {source && (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          via {source.label}
        </a>
      )}
    </div>
    {children}
  </section>
);

export default Widget;
