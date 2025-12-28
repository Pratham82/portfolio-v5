import Links from "../../components/Links";
import { getAllLinks } from "../../lib/links";

const LinksPage = ({ links }: { links: ReturnType<typeof getAllLinks> }) => {
  return <Links links={links} />;
};

export default LinksPage;

export async function getStaticProps() {
  const links = getAllLinks();

  return {
    props: {
      links,
    },
  };
}
