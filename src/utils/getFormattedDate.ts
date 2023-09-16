import { format } from "date-fns";

const getFormattedDate = (date: string, dateFormat: string) => {
  return format(new Date(date), dateFormat);
};

export default getFormattedDate;
