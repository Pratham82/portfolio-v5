import { motion } from "framer-motion";

import { WorkExperience } from "../interface/about.interface";
import getFormattedDate from "../src/utils/getFormattedDate";

const WorkExCard = (props: WorkExperience) => {
  const {
    position = "",
    companyName = "",
    location,
    startDate = "",
    endDate = "",
  } = props || {};
  const startDateFormatted = getFormattedDate(startDate, "MMMM yyyy");
  const endDateFormatted = endDate
    ? getFormattedDate(endDate, "MMMM yyyy")
    : "Present";
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col my-2 cursor-pointer"
    >
      <p className="text-md font-bold">{position}</p>
      <p className="text-sm">
        <span>{companyName}</span>
        <span className="ml-2">{location}</span>
      </p>
      <p className="text-sm font-light dark:text-slate-400 text-gray-700">
        {startDateFormatted} - {endDateFormatted}
      </p>
    </motion.div>
  );
};

export default WorkExCard;
