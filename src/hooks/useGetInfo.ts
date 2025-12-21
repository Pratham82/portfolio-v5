import { useQuery } from "@apollo/client";

import { IAllAboutPageResponse } from "../../interface/about.interface";
import { aboutPage, contactsPage } from "../graphql/queries";

import useGetPageData from "./useGetPageData";

const useGetInfo = () => {
  const { data } = useQuery(aboutPage);
  useQuery(contactsPage);
  const { pageData } = useGetPageData(data);

  const { resume }: IAllAboutPageResponse = pageData;

  return { resume };
};

export default useGetInfo;
