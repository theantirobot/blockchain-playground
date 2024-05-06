import { SubscribeInput, AddressSubscriptionFilter as SubscriptionFilter } from "./generated/graphql";

const subscriptions: { [id: string]: Subscription }= {}

const subscriptionRevisions: { [id: string]: SubscriptionRevision[] } = {};

export type Subscription = {
    id: string;
    webhookUrl: string;
    address: string;
    confirmationCount: number;
}

export type SubscriptionRevision = {
    id: string;
    subscription: Subscription;
}

export default { 
    getSubscriptions: async (filter?: SubscriptionFilter | undefined | null) => {
        const filteredSubscriptions = filter?.addresses?.map(id => subscriptions[id!]).filter(e => !!e) || Object.values(subscriptions)
        return filteredSubscriptions.map(subscription => ({ ...subscription, revisions: subscriptionRevisions[subscription.id] }));
    },
    getSubscriptionRevisions: async (id: string) => subscriptionRevisions[id] || [],

    getSubscription: async (id: string) => {
        return { ...subscriptions[id], revisions: subscriptionRevisions[id] };
    },
    deleteSubscription: async (id: string) => {
        try {
            return !!subscriptions[id];
        }
        finally {
            delete subscriptions[id];
        }
    },
    updateSubscription: async (id: string, input: SubscribeInput) => {
        const subscription = subscriptions[id];
        if (!subscription) {
            throw new Error("Subscription not found");
        }
        subscriptions[id] = { id, ...input };
        const revision: SubscriptionRevision = { id: `${subscriptionRevisions[id].length}`, subscription: { id, ...input } };
        subscriptionRevisions[id].unshift(revision);
        return subscriptions[id];
    },
    putSubscription: async (input: SubscribeInput): Promise<Subscription> => {
        console.log("Creating new subscription");
        const newSubscription:Subscription = {
            id: (Object.values(subscriptions).length + 1).toString(),
            webhookUrl: input.webhookUrl,
            address: input.address,
            confirmationCount: input.confirmationCount
        };
        subscriptions[newSubscription.id] = newSubscription;
        console.log("New subscription id" + newSubscription.id)
        subscriptionRevisions[newSubscription.id] = [{ id: '0', subscription: newSubscription }];
        return newSubscription;
    }
}