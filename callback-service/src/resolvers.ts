import { Resolvers, Subscription, WebhookInvocationHistory, WebhookInvocationHistoryConnection } from "./generated/graphql";
import InvocationStore from "./invocation-store";

const arrayToConnection = (array: any[]) => {
    return {
        edges: array.map((node, index) => ({node, cursor:`${index}`})),
        pageInfo: {
            hasNextPage: false,
        },
    };
}
export const resolvers: Resolvers = {
    Query: {
        webhookInvocationHistory: async (_: any, { subscriptionId, first, after }): Promise<WebhookInvocationHistoryConnection> => {
            console.log("Fetching webhook history");
            const result = await InvocationStore.getWebhookInvocationHistory(subscriptionId);
            return arrayToConnection(result) as WebhookInvocationHistoryConnection;
        }
    },
    Mutation: {
        callback: async (_: any, { subscriptionId,  instructions }): Promise<WebhookInvocationHistory> => {
            console.log("Creating a new callback");
            return InvocationStore.invoke(subscriptionId, instructions);
        }
    },
}
