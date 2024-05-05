import { server } from './server';

describe("Subscription Service", () => {
    it("Stores the subscription", async () => {
        const createSubscriptionResponse = await server.executeOperation({
            query: `
                mutation Subscribe($input: SubscribeInput!) {
                    subscribe(input: $input) {
                        id
                        webhookUrl
                        address
                        confirmationCount
                    }
                }`,
            variables: {
                address: '0x123',
                webhookUrl: 'http://example.com',
                confirmationCount: 3,
            }
        })
        expect(createSubscriptionResponse).toEqual("");
    });
});