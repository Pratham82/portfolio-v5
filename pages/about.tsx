import { useQuery } from "@apollo/client";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import Link from "next/link";

// import EducationCard from "../components/EducationCard";
import PageAnimationContainer from "../components/PageAnimationContainer";
import WorkExCard from "../components/WorkExCard";
import AboutPageSkeleton from "../components/loadingPages/about.skeleton";
import { IAllAboutPageResponse } from "../interface/about.interface";
import { IAllContactsPageResponse } from "../interface/contacts.interface";
import { aboutPage, contactsPage } from "../src/graphql/queries";
import useGetPageData from "../src/hooks/useGetPageData";

const About = () => {
  const { data, loading } = useQuery(aboutPage);
  const { data: contactsData, loading: contactsLoading } =
    useQuery(contactsPage);
  const { pageData } = useGetPageData(data);

  const { pageData: contactsPageData } = useGetPageData(contactsData);

  const { contactsLinks }: IAllContactsPageResponse = contactsPageData || {};

  const linkedIn = contactsLinks?.find(
    (item) => item?.socialLink === "LinkedIn",
  );

  const {
    resume,
    // education = [],
    workExperience = [],
  }: IAllAboutPageResponse = pageData;

  if (loading || contactsLoading) {
    return <AboutPageSkeleton />;
  }

  return (
    <PageAnimationContainer className="w-100%">
      {/* <h1 className="text-2xl font-bold">{title}</h1>
      <h2 className="py-2">{subtitle}</h2> */}

      <div className="flex gap-4 items-start">
        <div className="flex flex-col">
          {workExperience?.map((workEx) => (
            <Link
              href={linkedIn?.link || ""}
              target="_blank"
              key={workEx?.companyName}
            >
              <WorkExCard {...workEx} key={workEx?.companyName} />
            </Link>
          ))}
        </div>
        <Link
          className="text-md mt-2 flex items-center hover:text-gray-500"
          href={resume?.resumeLink}
        >
          <DownloadSimpleIcon className="mr-2" size={24} /> {resume?.resumeText}
        </Link>
      </div>
      {/* <h4 className="text-lg mt-14">Education</h4> */}
      {/* <div className="flex flex-col">
        {education?.map((educationData) => (
          <EducationCard {...educationData} key={educationData?.degree} />
        ))}
      </div> */}
    </PageAnimationContainer>
  );
};

export default About;
