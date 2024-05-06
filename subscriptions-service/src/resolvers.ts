import { MyContext } from "./context";
import { Resolvers, AddressSubscription, AddressSubscriptionConnection, AddressSubscriptionRevisionConnection, AddressSubscriptionRevisionsArgs } from "./generated/graphql";
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
        subscriptions: async (_: any, { filter }): Promise<AddressSubscriptionConnection> => {
            console.log("Subscriptions");
            return arrayToConnection(await SubscriptionStore.getSubscriptions(filter)) as AddressSubscriptionConnection;
        },
        subscription: async (_: any, { id }: any) => {
            console.log("Subscription");
            const subscription = await SubscriptionStore.getSubscription(id);
            if (!subscription) {
                throw new Error("Subscription not found");
            }            
            return subscription as AddressSubscription;
        }
    },
    Mutation: {
        subscribe: async (_: any, { input }: any): Promise<any> => {
            console.log("Creating new subscription");
            return SubscriptionStore.putSubscription(input);
        },
        updateAddressSubscription: async (_: any, { id, input }: any): Promise<AddressSubscription> => {
            console.log("Updating subscription");
            return SubscriptionStore.updateSubscription(id, input);
        
        },
        unsubscribe: async (_: any, { id }: any): Promise<boolean> => {
            console.log("Deleting subscription");
            return SubscriptionStore.deleteSubscription(id);
        }
    },
    AddressSubscription: {
        revisions: async (parent: AddressSubscription, params: AddressSubscriptionRevisionsArgs): Promise<AddressSubscriptionRevisionConnection> => {
            console.log("Subscription revisions");
            const subRevisions = await SubscriptionStore.getSubscriptionRevisions(parent.id);
            const prunedRevisions = cleanUpRevisions(subRevisions);
            const annotatedRevisions = summarizeChanges(prunedRevisions);
            return arrayToConnection(annotatedRevisions) as AddressSubscriptionRevisionConnection;
        }
    }
}
