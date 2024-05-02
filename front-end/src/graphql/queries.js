import { gql } from '@apollo/client';

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

export const GET_SUBSCRIPTION_DETAILS = gql`
    query GetSubscription($id: ID!) {
        subscription(id: $id) {
            id
            address
            webhookUrl
            confirmationCount
        }
    }
`;