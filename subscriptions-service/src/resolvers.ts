import { Resolvers, Subscription, SubscriptionConnection } from "./generated/graphql";
import SubscriptionStore from "./subscription-store";

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
        subscriptions: async (): Promise<SubscriptionConnection> => {
            console.log("Subscriptions");
            return arrayToConnection(await SubscriptionStore.getSubsriptions()) as SubscriptionConnection;
        },
        subscription: async (_: any, { id }: any): Promise<Subscription> => {
            console.log("Subscription");
            const subscription = await SubscriptionStore.getSubscription(id);
            if (!subscription) {
                throw new Error("Subscription not found");
            }
            return subscription;
        }
    },
    Mutation: {
        subscribe: async (_: any, { input }: any): Promise<any> => {
            console.log("Creating new subscription");
            return SubscriptionStore.putSubscription(input);
        },
        updateSubscription: async (_: any, { id, input }: any): Promise<Subscription> => {
            console.log("Updating subscription");
            return SubscriptionStore.updateSubscription(id, input);
        
        },
        unsubscribe: async (_: any, { id }: any): Promise<boolean> => {
            console.log("Deleting subscription");
            return SubscriptionStore.deleteSubscription(id);
        }
    },

}
