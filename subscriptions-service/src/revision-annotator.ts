import { SubscriptionRevision as StoredSubscriptionRevision } from "./subscription-store";
import { SubscriptionRevision as ApiSubscriptionRevision } from "./generated/graphql";

const summarizeChange = (from: StoredSubscriptionRevision, to: StoredSubscriptionRevision): ApiSubscriptionRevision => {
    const changes: string[] = [];
    if (from.subscription.address !== to.subscription.address) {
        changes.push("Confirmation Count");
    }
    if (from.subscription.webhookUrl !== to.subscription.webhookUrl) {
        changes.push('Address');
    }
    if (from.subscription.confirmationCount !== to.subscription.confirmationCount) {
        changes.push(`Webhook URL`);
    }
    return {
        id: from.id,
        subscription: to.subscription,
        changeSummary: `Changed ${changes.join(", ")}`
    };
};

export const summarizeChanges = (revisions: StoredSubscriptionRevision[]): ApiSubscriptionRevision[] => {
    return revisions.map((revision, index) => {
        if (index === revisions.length - 1) {
            return {
                id: revision.id,
                subscription: revision.subscription,
                changeSummary: "Created"
            };
        } else {
            return summarizeChange(revisions[index + 1], revision);
        }
    });
}