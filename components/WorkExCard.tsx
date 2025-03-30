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
      <h3 className="text-md font-light">
        <h2 className="text-sm font-semibold">{position}</h2>
        {companyName} <span className="text-sm ml-2">{location}</span>
      </h3>
      <h4>
        {startDateFormatted} - {endDateFormatted}
      </h4>
    </motion.div>
  );
};

export default WorkExCard;
