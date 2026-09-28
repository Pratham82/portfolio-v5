import PageAnimationContainer from "@/components/PageAnimationContainer";
import PageTitle from "@/components/PageTitle";
import WorkExCard from "@/components/WorkExCard";
import type { ExperiencePageData } from "@/lib/sanity/queries";

const Experience = ({ title, workExperience }: ExperiencePageData) => {
  return (
    <PageAnimationContainer>
      <PageTitle>{title}</PageTitle>

      <div className="mt-3 flex items-start gap-4">
        <div className="flex w-full flex-col">
          {workExperience.map((workEx) => (
            <WorkExCard {...workEx} key={workEx?.companyName} />
          ))}
        </div>
      </div>
    </PageAnimationContainer>
  );
};

export default Experience;
