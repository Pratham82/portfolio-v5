import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { DownloadSimple } from "phosphor-react";

import EducationCard from "../components/EducationCard";
import SocialLinks from "../components/SocialLinks";
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
  const { title = "", subtitle = "", pageData } = useGetPageData(data);

  const { pageData: contactsPageData } = useGetPageData(contactsData);

  const { contactsLinks }: IAllContactsPageResponse = contactsPageData || {};

  const { link: linkedInLink } =
    contactsLinks?.find((item) => item.socialLink === "LinkedIn") || "";

  const {
    resume,
    education = [],
    workExperience = [],
  }: IAllAboutPageResponse = pageData;

  if (loading || contactsLoading) {
    return <AboutPageSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="w-100%"
    >
      <h1 className="text-3xl">{title}</h1>
      <h2 className="py-2">{subtitle}</h2>
      <h4 className="text-2xl mt-8 flex items-center">
        Work Experience{" "}
        <Link
          className="text-lg ml-8 flex items-center hover:text-blue-500"
          href={resume.resumeLink}
        >
          <DownloadSimple className="mr-2" size={24} /> {resume.resumeText}
        </Link>
      </h4>
      <div className="flex flex-col">
        {workExperience?.map((workEx) => (
          <Link
            href={linkedInLink || ""}
            target="_blank"
            key={workEx?.companyName}
          >
            <WorkExCard {...workEx} key={workEx?.companyName} />
          </Link>
        ))}
      </div>
      <h4 className="text-2xl mt-14">Education</h4>
      <div className="flex flex-col">
        {education?.map((educationData) => (
          <EducationCard {...educationData} key={educationData?.degree} />
        ))}
      </div>
      <h4 className="text-2xl mt-12">Connect with me</h4>
      <div className="mt-2">
        <SocialLinks align="left" />
      </div>
    </motion.div>
  );
};

export default About;
