import { GET_SUBSCRIPTION_DETAILS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

export const useSubscription = (id: string) => {
    const { loading: subscriptionLoading, error: subscriptionError, data } = useQuery(GET_SUBSCRIPTION_DETAILS, {
        variables: {
            id
        },
    });
    return { subscriptionLoading, subscriptionError, subscriptionData: data?.subscription || undefined, webhookInvocationHistory: data?.webhookInvocationHistory }
}