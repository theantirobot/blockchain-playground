import { gql } from '@apollo/client';

export const SUBSCRIBE_MUTATION = gql`
  mutation Subscribe($input: SubscribeInput!) {
    subscribe(input: $input) {
      id
      webhookUrl
      address
    }
  }
`;

export const UNSUBSCRIBE_MUTATION = gql`
    mutation Unsubscribe($id: ID!) {
        unsubscribe(id: $id)
    }
`;

export const UPDATE_SUBSCRIPTION_MUTATION = gql`
    mutation UpdateSubscription($id: ID!, $input: SubscribeInput!) {
        updateSubscription(id: $id, input: $input) {
            id
            webhookUrl
            address
        }
    }
`;