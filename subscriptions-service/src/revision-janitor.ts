import { SubscriptionRevision } from "./subscription-store"

/**
 * Compares the last revision in window to previous revisions in window
 * If the last revision is the same as a previous revision, revisions after previous matching one are removed.
 * 
 * @param window 
 */
export const cleanUpRevisions = (window: SubscriptionRevision[]): SubscriptionRevision[] => {
    if (window.length < 2) {
        return window;
    }
    const headRevision = window[window.length -1]
    for (let i = 0; i < window.length -1; i++) {
        if (revisionsAreEqual(headRevision, window[i])) {
            return window.slice(0, i + 1);
        }
    }
    return window;
}

const revisionsAreEqual = (a: SubscriptionRevision, b: SubscriptionRevision): boolean => {
    return a.subscription.address === b.subscription.address &&
        a.subscription.webhookUrl === b.subscription.webhookUrl &&
        a.subscription.confirmationCount === b.subscription.confirmationCount;
}