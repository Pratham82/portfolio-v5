import { useQuery } from "@apollo/client";

import { aboutPage } from "../src/graphql/queries";
import useGetPageData from "../src/hooks/useGetPageData";

const About = () => {
  const { data, loading } = useQuery(aboutPage);
  const { title = "", subtitle = "" } = useGetPageData(data);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="w-100%">
      <h1 className="text-6xl">{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
};

export default About;
