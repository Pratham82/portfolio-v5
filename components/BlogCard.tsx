import { motion } from "framer-motion";
import { CalendarBlank } from "phosphor-react";
import React from "react";

import { Blog } from "../interface/blogs.interface";
import getFormattedDate from "../src/utils/getFormattedDate";

const BlogCard = (props: Blog) => {
  const { title = "", subTitle = "", date = "" } = props;

  const blogPublishedDate = getFormattedDate(date, "dd MMM yyyy");

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col cursor-pointer my-2 rounded-md gap-1"
    >
      <h2 className="text-lg dark:text-neutral-100 ">{title}</h2>
      <h3 className="text-sm font-light dark:text-neutral-400">{subTitle}</h3>
      <div className="flex">
        <div className="flex items-center">
          <CalendarBlank size={16} />
          <span className="pl-2 text-sm">{blogPublishedDate}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
