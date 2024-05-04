import { GET_SUBSCRIPTIONS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

export const useSubscriptions = () => {
  const { loading, error, data } = useQuery(GET_SUBSCRIPTIONS, {
    variables: {
      first: 10, // Adjust based on how many items you want to fetch
    },
  });
  return {
    subscriptionsLoading: loading,
    subscriptionsError: error,
    subscriptionsData:
      data?.subscriptions?.edges.map(({ node }: { node: any }) => node) ||
      undefined,
  };
};
