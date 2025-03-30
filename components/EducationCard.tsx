import { motion } from "framer-motion";

import { Education } from "../interface/about.interface";
import getFormattedDate from "../src/utils/getFormattedDate";

const EducationCard = (props: Education) => {
  const { degree = "", institution: institutionData } = props;
  const {
    institution = "",
    startYear = "",
    endYear = "",
  } = institutionData || {};
  const formattedStartYear = getFormattedDate(startYear, "yyyy");
  const formattedEndYear = getFormattedDate(endYear, "yyyy");
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col my-2 cursor-pointer"
    >
      <h2 className="text-md">{degree}</h2>
      <h2 className="text-sm">
        {institution}{" "}
        <span className="pl-2">
          ({formattedStartYear} - {formattedEndYear})
        </span>
      </h2>
    </motion.div>
  );
};

export default EducationCard;
