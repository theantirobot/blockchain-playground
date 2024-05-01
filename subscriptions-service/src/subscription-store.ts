import { Subscription, SubscriptionFilter } from "./generated/graphql";

const subscriptions: Subscription[] = [
    // { id: "1", webhookUrl: "www.sqs.com", address: "0x123"},
    // { id: "2", webhookUrl: "www.sqs.com", address: "0x123"},
];

export interface SubscriptionInput {
    webhookUrl: string;
    address: string;
}

export default { 
    getSubsriptions: async (filter?: SubscriptionFilter | undefined | null) => {
        if (filter?.addresses && filter.addresses.length > 0) {
            return subscriptions.filter(sub => filter!.addresses!.includes(sub.address!));
        }
        return [...subscriptions]
    },
    getSubscription: async (id: string) => {
        return subscriptions.find(sub => sub.id === id);
    },
    deleteSubscription: async (id: string) => {
        const index = subscriptions.findIndex(sub => sub.id === id);
        if (index !== -1) {
            subscriptions.splice(index, 1);
            return true;
        }
        return false;
    },
    updateSubscription: async (id: string, input: SubscriptionInput) => {
        const subscription = subscriptions.find(sub => sub.id === id);
        if (!subscription) {
            throw new Error("Subscription not found");
        }
        subscription.webhookUrl = input.webhookUrl;
        subscription.address = input.address;
        return subscription;
    },
    putSubscription: async (input: SubscriptionInput): Promise<Subscription> => {
        console.log("Creating new subscription");
        const newSubscription:Subscription = {
            id: (subscriptions.length + 1).toString(),
            webhookUrl: input.webhookUrl,
            address: input.address,
        };
        subscriptions.push(newSubscription);
        return newSubscription;
    }
}