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
      <h2 className="text-md font-bold">{position}</h2>
      <p className="text-sm">
        <span>{companyName}</span>
        <span className="ml-2">{location}</span>
      </p>
      <h3 className="text-sm font-light dark:text-slate-400 text-gray-700">
        {startDateFormatted} - {endDateFormatted}
      </h3>
    </motion.div>
  );
};

export default WorkExCard;
