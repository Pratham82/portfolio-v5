import PageAnimationContainer from "@/components/PageAnimationContainer";
import WorkExCard from "@/components/WorkExCard";
import {
  ExperiencePageData,
  SANITY_REVALIDATE,
  getExperiencePage,
} from "@/lib/sanity/queries";

const About = ({ workExperience }: ExperiencePageData) => {
  return (
    <PageAnimationContainer className="w-100%">
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

export default About;

export async function getStaticProps() {
  return {
    props: await getExperiencePage(),
    revalidate: SANITY_REVALIDATE,
  };
}
