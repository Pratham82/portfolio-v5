import { useQuery } from "@apollo/client";
import { aboutPage } from "../src/graphql/queries";

const Demo = () => {
  const { data, loading } = useQuery(aboutPage);
  console.log({ data });

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="w-100%">
      <h1 className="text-6xl">Demo </h1>
    </div>
  );
};

export default Demo;
