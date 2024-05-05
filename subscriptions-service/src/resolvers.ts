import { MyContext } from "./context";
import { Resolvers, Subscription, SubscriptionConnection, SubscriptionRevisionConnection, SubscriptionRevisionsArgs } from "./generated/graphql";
import { summarizeChanges } from "./revision-annotator";
import { cleanUpRevisions } from "./revision-janitor";
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
        subscriptions: async (_: any, { filter }): Promise<SubscriptionConnection> => {
            console.log("Subscriptions");
            return arrayToConnection(await SubscriptionStore.getSubscriptions(filter)) as SubscriptionConnection;
        },
        subscription: async (_: any, { id }: any) => {
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
    Subscription: {
        revisions: async (parent: Subscription, params: SubscriptionRevisionsArgs): Promise<SubscriptionRevisionConnection> => {
            console.log("Subscription revisions");
            const subRevisions = await SubscriptionStore.getSubscriptionRevisions("abc");
            const prunedRevisions = cleanUpRevisions(subRevisions);
            const annotatedRevisions = summarizeChanges(prunedRevisions);
            return arrayToConnection(annotatedRevisions) as SubscriptionRevisionConnection;
        }
    }
}
