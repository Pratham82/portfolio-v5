import Experience from "@/components/sections/Experience";
import {
  ExperiencePageData,
  SANITY_REVALIDATE,
  getExperiencePage,
} from "@/lib/sanity/queries";

const ExperiencePage = (props: ExperiencePageData) => <Experience {...props} />;

export default ExperiencePage;

export async function getStaticProps() {
  return {
    props: await getExperiencePage(),
    revalidate: SANITY_REVALIDATE,
  };
}
