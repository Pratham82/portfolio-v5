import PageAnimationContainer from "@/components/PageAnimationContainer";
import PageTitle from "@/components/PageTitle";
import WorkExCard from "@/components/WorkExCard";
import type { ExperiencePageData } from "@/lib/sanity/queries";

const Experience = ({ title, workExperience }: ExperiencePageData) => {
  return (
    <PageAnimationContainer className="w-100%">
      <PageTitle>{title}</PageTitle>

      <div className="flex gap-4 items-start">
        <div className="flex flex-col">
          {workExperience.map((workEx) => (
            <WorkExCard {...workEx} key={workEx?.companyName} />
          ))}
        </div>
      </div>
    </PageAnimationContainer>
  );
};

export default Experience;
