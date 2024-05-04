import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "YOUR_GRAPHQL_ENDPOINT", // replace this with your GraphQL endpoint
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
