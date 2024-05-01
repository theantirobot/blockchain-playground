import { ApolloClient } from "@apollo/client";

export const GET_SUBSCRIPTIONS = gql`
    query GetSubscriptions {
        subscriptions {
            edges {
                cursor
                node {
                    id
                    address
                    firstBlock {
                        id
                    }
                    webhookUrl
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
class Subscriptions {
    constructor(props: SubscriptionsProps) {
        this.client = props.client;
    }
    async getSubscriptions() {

    }
}