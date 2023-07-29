import { useQuery } from "@apollo/client";
import { allProjects } from "../src/graphql/queries";

const Projects = () => {
  const { data, loading } = useQuery(allProjects);
  console.log({ data });

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="w-100%">
      <h1 className="text-6xl">Projects</h1>
    </div>
  );
};

export default Projects;
