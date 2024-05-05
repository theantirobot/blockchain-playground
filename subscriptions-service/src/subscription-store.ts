import { nanoid } from "nanoid";
import { SubscribeInput, SubscriptionFilter } from "./generated/graphql";

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
        subscriptionRevisions[id].unshift({ id: nanoid(),  subscription });
        return subscription;
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
        subscriptionRevisions[newSubscription.id] = [{ id: nanoid(), subscription: newSubscription }];
        return newSubscription;
    }
}