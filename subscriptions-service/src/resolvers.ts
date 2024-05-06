import { Resolvers, Sub, SubRevisionsArgs, SubscriptionConnection, SubscriptionRevisionConnection } from "./generated/graphql";
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
            return subscription as Sub;
        }
    },
    Mutation: {
        subscribe: async (_: any, { input }: any): Promise<any> => {
            console.log("Creating new subscription");
            return SubscriptionStore.putSubscription(input);
        },
        updateSubscription: async (_: any, { id, input }: any): Promise<Sub> => {
            console.log("Updating subscription");
            return SubscriptionStore.updateSubscription(id, input);
        
        },
        unsubscribe: async (_: any, { id }: any): Promise<boolean> => {
            console.log("Deleting subscription");
            return SubscriptionStore.deleteSubscription(id);
        }
    },
    Sub: {
        revisions: async (parent: Sub, params: SubRevisionsArgs): Promise<SubscriptionRevisionConnection> => {
            console.log("Subscription revisions");
            const subRevisions = await SubscriptionStore.getSubscriptionRevisions(parent.id);
            const prunedRevisions = cleanUpRevisions(subRevisions);
            const annotatedRevisions = summarizeChanges(prunedRevisions);
            return arrayToConnection(annotatedRevisions) as SubscriptionRevisionConnection;
        }
    }
}
