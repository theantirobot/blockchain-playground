import axios from "axios";
import { Subscription, WebhookInvocationHistory, CallbackInstructions, WebhookInvocation} from "./generated/graphql";

const invocationHistory: WebhookInvocationHistory[] = [];

const executeHistory = async (history: WebhookInvocationHistory): Promise<WebhookInvocationHistory> => {
    const { url, payload } = history.instructions!;
    let startTimestamp = Date.now().toString();
    let success = false;
    console.log(`Invoking POST on ${url} with payload ${payload}`)
    try {
        await axios.post(url, JSON.parse(payload));
        success = true;
    } catch (e) {
        success = false;
    }
    return {
        ...history,
        webhookInvocation: {
            startTimestamp,
            endTimestamp: Date.now().toString(),
            success
        }
    };
}

export default { 
    getWebhookInvocationHistory: async (subscriptionId: string) => {
        return invocationHistory.filter(sub => sub.subscriptionId === subscriptionId);
    },
    invoke: async (subscriptionId: string, instructions: CallbackInstructions): Promise<WebhookInvocationHistory> => {
        const newWebhookInvocationHistory:WebhookInvocationHistory = {
            id: (invocationHistory.length + 1).toString(),
            subscriptionId,
            instructions,
        };
        invocationHistory.push(newWebhookInvocationHistory);
        await executeHistory(newWebhookInvocationHistory);
        return newWebhookInvocationHistory;
    }
}