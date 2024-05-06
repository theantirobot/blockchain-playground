import { server } from './server';

const CREATE_SUBSCRIPTION_MUTATION = `
    mutation Subscribe($input: SubscribeInput!) {
        subscribe(input: $input) {
            id
            webhookUrl
            address
            confirmationCount
            revisions(first: 10) {
                edges {
                    node {
                        id
                        changeSummary
                        subscription {
                            id
                            webhookUrl
                            address
                            confirmationCount
                        }
                    }
                }
            
            }
        }
    }`

const DELETE_SUBSCRIPTION_MUTATION = `
    mutation Delete($id: ID!) {
        unsubscribe(id: $id) 
    }`

const GET_SUBSCRIPTION_QUERY = `
    query Subscription($id: ID!) {
        subscription(id: $id) {
            id
            webhookUrl
            address
            confirmationCount
            revisions(first: 10) {
                edges {
                    node {
                        id
                        changeSummary
                        subscription {
                            id
                            webhookUrl
                            address
                            confirmationCount
                        }
                    }
                }
            
            }
        }
    }`

const UPDATE_SUBSCRIPTION_MUTATION = `
    mutation UpdateSubscription($id: ID!, $input: SubscribeInput!) {
        updateAddressSubscription(id: $id, input: $input) {
            id
            webhookUrl
            address
            confirmationCount
            revisions(first: 10) {
                edges {
                    node {
                        id
                        changeSummary
                        subscription {
                            id
                            webhookUrl
                            address
                            confirmationCount
                        }
                    }
                }
            
            }
        }
    }`

const subscription = {
    address: '0x123',
    webhookUrl: 'http://example.com',
    confirmationCount: 3,
}

describe("Subscription Service", () => {

    test("creating a subscription", async () => {
        const createSubscriptionResponse = await server.executeOperation({
            query: CREATE_SUBSCRIPTION_MUTATION,
            variables: {input: subscription}
        }) as any;
        const { body, errors } = createSubscriptionResponse;
        expect(errors).toBeUndefined();
        const subscribeResult = body?.singleResult?.data?.subscribe
        expect(subscribeResult).toMatchObject(subscription);

        const { persistedBody, persistedErrors } = await server.executeOperation({
            query: GET_SUBSCRIPTION_QUERY,
            variables: {id: subscribeResult.id}
        }) as any;

        expect(persistedErrors).toBeUndefined();
        const persistedResult = body?.singleResult?.data?.subscribe
        expect(persistedResult).toMatchObject(subscription);
        expect(persistedResult.revisions?.edges.length).toBe(1 );
    });


    test("delete a subscription", async () => {
        const createSubscriptionResponse = await server.executeOperation({
            query: CREATE_SUBSCRIPTION_MUTATION,
            variables: {input: subscription}
        }) as any;
        const { body, errors } = createSubscriptionResponse;
        expect(errors).toBeUndefined();
        const subscribeResult = body?.singleResult?.data?.subscribe
        expect(subscribeResult).toMatchObject(subscription);

        const { persistedBody, persistedErrors } = await server.executeOperation({
            query: GET_SUBSCRIPTION_QUERY,
            variables: {id: subscribeResult.id}
        }) as any;

        console
        expect(persistedErrors).toBeUndefined();
        const persistedResult = persistedBody?.singleResult?.data?.subscription
        expect(persistedResult).toMatchObject(subscription);
        expect(persistedResult.revisions?.edges.length).toBe(1 );

        await server.executeOperation({
            query: DELETE_SUBSCRIPTION_MUTATION,
            variables: {id: subscribeResult.id}
        }) as any;

        await server.executeOperation({
            query: GET_SUBSCRIPTION_QUERY,
            variables: {id: subscribeResult.id}
        }) as any;

    });

    test("update subscription", async () => {
        const createSubscriptionResponse = await server.executeOperation({
            query: CREATE_SUBSCRIPTION_MUTATION,
            variables: {input: subscription}
        }) as any;
        const { body, errors } = createSubscriptionResponse;
        expect(errors).toBeUndefined();
        const subscribeResult = body?.singleResult?.data?.subscribe
        expect(subscribeResult).toMatchObject(subscription);
        expect(subscribeResult.revisions?.edges.length).toBe(1);
        const updatedSubscription = {
            ...subscription,
            address: '0x456',
            confirmationCount: 10
        }

        const { body: updateBody, errors: updateErrors } = await server.executeOperation({
            query: UPDATE_SUBSCRIPTION_MUTATION,
            variables: {id: subscribeResult.id, input: updatedSubscription}
        }) as any;
        expect(updateErrors).toBeUndefined();
        const updateResult = updateBody?.singleResult?.data?.updateAddressSubscription
        expect(updateResult).toMatchObject(updatedSubscription);
        expect(updateResult.revisions.edges.length).toBe(2);
    })

    test("Subscription revisions", async () => {

    });
});