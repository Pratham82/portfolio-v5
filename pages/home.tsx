import { useQuery } from "@apollo/client";
import { homePage } from "../src/graphql/queries";

const HomePage = () => {
  const { data, loading } = useQuery(homePage);
  console.log({ data });

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="w-100%">
      <h1 className="text-6xl">Home</h1>
    </div>
  );
};

export default HomePage;
