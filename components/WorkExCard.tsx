import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";
import { CaretRight } from "phosphor-react";
import { useState } from "react";

import { WorkExperience } from "../interface/about.interface";
import getFormattedDate from "../src/utils/getFormattedDate";

const WorkExCard = (props: WorkExperience) => {
  const {
    position = "",
    companyName = "",
    location,
    startDate = "",
    endDate = "",
    companyLogo,
    description,
  } = props || {};

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const startDateFormatted = getFormattedDate(startDate, "MMMM yyyy");
  const endDateFormatted = endDate
    ? getFormattedDate(endDate, "MMMM yyyy")
    : "Present";
  return (
    <motion.article
      className="rounded-xl p-2 my-2 shadow-sm bg-white dark:bg-slate-950"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full text-left focus:outline-none"
      >
        <motion.header
          whileHover={{ scale: 1.01 }}
          className="flex gap-4 items-start cursor-pointer"
        >
          <Image
            src={companyLogo?.asset?.url || ""}
            alt={companyLogo?.asset?.label || companyName || "Company logo"}
            width={45}
            height={45}
            className="rounded-md mt-1"
          />
          <div>
            <div className="flex gap-2 items-center">
              <h3 className="text-md font-bold">{position}</h3>
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    key="arrow"
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl"
                  >
                    <CaretRight size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <p className="text-sm">
              <span>{companyName}</span>
              <span className="ml-2">{location}</span>
            </p>
            <time
              className="block text-sm font-light dark:text-slate-400 text-gray-700"
              dateTime={startDateFormatted}
            >
              {startDateFormatted} – {endDateFormatted}
            </time>
          </div>
        </motion.header>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-3 text-sm text-gray-800 dark:text-slate-200"
          >
            <p>{description && description}</p>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default WorkExCard;
