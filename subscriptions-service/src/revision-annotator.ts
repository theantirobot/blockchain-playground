import { SubscriptionRevision as StoredSubscriptionRevision } from "./subscription-store";
import { SubscriptionRevision as ApiSubscriptionRevision } from "./generated/graphql";

const summarizeChange = (from: StoredSubscriptionRevision, to: StoredSubscriptionRevision): ApiSubscriptionRevision => {
    const changes: string[] = [];
    if (from.subscription.address !== to.subscription.address) {
        changes.push('Address');
    }
    if (from.subscription.webhookUrl !== to.subscription.webhookUrl) {
        changes.push(`Webhook URL`);
    }
    if (from.subscription.confirmationCount !== to.subscription.confirmationCount) {
        changes.push("Confirmation Count");
    }
    return {
        id: to.id,
        timestamp: to.timestamp,
        subscription: to.subscription,
        changeSummary: `Changed ${changes.join(", ")}`
    };
};

export const summarizeChanges = (revisions: StoredSubscriptionRevision[]): ApiSubscriptionRevision[] => {
    return revisions.map((revision, index) => {
        if (index === revisions.length - 1) {
            return {
                id: revision.id,
                timestamp: revision.timestamp,
                subscription: revision.subscription,
                changeSummary: "Created"
            };
        } else {
            return summarizeChange(revisions[index + 1], revision);
        }
    });
}