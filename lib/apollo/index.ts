import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://sfjfod25.api.sanity.io/v1/graphql/production/default",
  cache: new InMemoryCache(),
});

export default apolloClient;
