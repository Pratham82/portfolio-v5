import { useQuery } from "@apollo/client";

import { contactsPage } from "../src/graphql/queries";

const Contacts = () => {
  const { loading } = useQuery(contactsPage);

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
