import { useQuery } from "@apollo/client";
import { contactsPage } from "../src/graphql/queries";

const Contacts = () => {
  const { data, loading } = useQuery(contactsPage);
  console.log({ data });

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="w-100%">
      <h1 className="text-6xl">Contact</h1>
    </div>
  );
};

export default Contacts;
