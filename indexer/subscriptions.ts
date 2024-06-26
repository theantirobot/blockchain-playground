import { ApolloClient, gql } from "@apollo/client/core";

export const GET_SUBSCRIPTIONS = gql`
    query GetSubscriptions {
        subscriptions {
            edges {
                cursor
                node {
                    id
                    address
                    webhookUrl
                    confirmationCount
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;

type SubscriptionsProps = {
    client: ApolloClient<unknown>;
}
export class Subscriptions {
    client: ApolloClient<unknown>;
    constructor(props: SubscriptionsProps) {
        this.client = props.client;
    }
    public async getSubscriptions(addresses?: string[]) {
        const { data } = await this.client.query({
            query: GET_SUBSCRIPTIONS,
            variables: { filter: addresses },
            fetchPolicy: "network-only"  // Ensure fresh data is fetched every time
        });
        return data.subscriptions.edges.map((edge: any) => edge.node);
    }
}