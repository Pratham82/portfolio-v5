import { CalendarBlankIcon, TagIcon } from "@phosphor-icons/react";
import React from "react";

import { Blog } from "../interface/blogs.interface";
import getFormattedDate from "../src/utils/getFormattedDate";

const BlogCard = (props: Blog) => {
  const { title = "", subTitle = "", date = "", tags } = props;

  const blogPublishedDate = getFormattedDate(date, "dd MMM yyyy");

  return (
    <div className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
      <h2 className="text-l font-semibold mb-2">{title}</h2>
      {subTitle && (
        <p className="text-gray-600 dark:text-gray-400 mb-2">{subTitle}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-2">
        {tags?.map((tag, index) => (
          <div key={index} className="flex items-center">
            <TagIcon size={16} className="text-gray-500 dark:text-gray-400" />
            <span className="pl-1 text-xs text-gray-500 dark:text-gray-400">
              {tag}
            </span>
          </div>
        ))}
      </div>

      {date && (
        <div className="flex items-center">
          <CalendarBlankIcon
            size={16}
            className="text-gray-500 dark:text-gray-400"
          />
          <span className="pl-1 text-xs text-gray-500 dark:text-gray-400">
            {blogPublishedDate}
          </span>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
