import { useQuery } from "@apollo/client";

import { AboutPageSkeleton } from "@/components";

import PageAnimationContainer from "../components/PageAnimationContainer";
import WorkExCard from "../components/WorkExCard";
import { IAllAboutPageResponse } from "../interface/about.interface";
import { allExperience } from "../src/graphql/queries";
import useGetPageData from "../src/hooks/useGetPageData";

const About = () => {
  const { data, loading } = useQuery(allExperience);
  // const { loading: contactsLoading } = useQuery(contactsPage);
  const { pageData } = useGetPageData(data);

  // const { pageData: contactsPageData } = useGetPageData(contactsData);

  const {
    // education = [],
    workExperience = [],
  }: IAllAboutPageResponse = pageData;

  if (loading) {
    return <AboutPageSkeleton />;
  }

  return (
    <PageAnimationContainer className="w-100%">
      <div className="flex gap-4 items-start">
        <div className="flex flex-col">
          {workExperience?.map((workEx) => (
            <WorkExCard {...workEx} key={workEx?.companyName} />
          ))}
        </div>
      </div>
    </PageAnimationContainer>
  );
};

export default About;
