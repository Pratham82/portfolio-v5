import PageAnimationContainer from "@/components/PageAnimationContainer";
import WorkExCard from "@/components/WorkExCard";
import { getExperiencePage } from "@/lib/sanity/queries";

// Keep in sync with SANITY_REVALIDATE (segment config must be a literal).
export const revalidate = 3600;

const AboutPage = async () => {
  const { workExperience } = await getExperiencePage();

  return (
    <PageAnimationContainer>
      <div className="flex items-start gap-4">
        <div className="flex w-full flex-col">
          {workExperience.map((workEx) => (
            <WorkExCard {...workEx} key={workEx?.companyName} />
          ))}
        </div>
      </div>
    </PageAnimationContainer>
  );
};

export default AboutPage;
