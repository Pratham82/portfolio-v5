import React from "react";

import { Blog } from "../interface/blogs.interface";
import getFormattedDate from "../src/utils/getFormattedDate";

const BlogCard = (props: Blog) => {
  const { title = "", subTitle = "", date = "", tags } = props;

  const blogPublishedDate = getFormattedDate(date, "dd MMM yyyy");

  return (
    <div className="px-3 py-3">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-medium text-foreground">{title}</h2>
        {date && (
          <time
            dateTime={date}
            className="shrink-0 font-mono text-xs text-muted-foreground"
          >
            {blogPublishedDate}
          </time>
        )}
      </div>
      {subTitle && (
        <p className="mt-1 text-sm text-muted-foreground">{subTitle}</p>
      )}
      {tags?.length ? (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground/80">
          {tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default BlogCard;
