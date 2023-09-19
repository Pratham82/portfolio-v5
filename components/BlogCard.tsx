import { motion } from "framer-motion";
import { CalendarBlank, Clock } from "phosphor-react";
import React from "react";

import { Blog } from "../interface/blogs.interface";
import getFormattedDate from "../src/utils/getFormattedDate";

const BlogCard = (props: Blog) => {
  const { title = "", subTitle = "", readTime = "", date = "" } = props;

  const blogPublishedDate = getFormattedDate(date, "dd MMM yyyy");

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col cursor-pointer border dark:border-slate-100 border-slate-300 p-4 rounded-md shadow-sm dark:shadow-sm dark:shadow-slate-500 gap-1"
    >
      <h2 className="text-xl">{title}</h2>
      <h3 className="text-md">{subTitle}</h3>
      <div className="flex">
        <div className="flex items-center">
          <CalendarBlank size={19} />
          <span className="pl-2">{blogPublishedDate}</span>
        </div>
        {readTime && (
          <div className="flex items-center pl-4">
            <Clock />
            <span className="pl-2">{readTime}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogCard;
