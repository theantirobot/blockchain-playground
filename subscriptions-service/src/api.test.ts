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
        updateSubscription(id: $id, input: $input) {
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

describe("Querying a subscriptions", () => {

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

        const { body: persistedBody, errors: persistedErrors } = await server.executeOperation({
            query: GET_SUBSCRIPTION_QUERY,
            variables: {id: subscribeResult.id}
        }) as any;

        expect(persistedErrors).toBeUndefined();
        const persistedResult = persistedBody?.singleResult?.data?.subscription
        expect(persistedResult).toMatchObject(subscription);
        expect(persistedResult.revisions?.edges.length).toBe(1 );

        await server.executeOperation({
            query: DELETE_SUBSCRIPTION_MUTATION,
            variables: {id: subscribeResult.id}
        }) as any;

        const errorResult = await server.executeOperation({
            query: GET_SUBSCRIPTION_QUERY,
            variables: {id: subscribeResult.id}
        }) as any;
        expect(errorResult?.body?.singleResult?.errors[0]?.message).toEqual("Subscription not found");
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
        const updateResult = updateBody?.singleResult?.data?.updateSubscription
        expect(updateResult).toMatchObject(updatedSubscription);
        expect(updateResult.revisions.edges.length).toBe(2);
        expect(updateResult.revisions.edges[0].node.changeSummary).toEqual("Changed Address, Confirmation Count");

        // reverting should cause the revision to be removed
        const { body: updateBody2, errors: updateErrors2 } = await server.executeOperation({
            query: UPDATE_SUBSCRIPTION_MUTATION,
            variables: {id: subscribeResult.id, input: subscription}
        }) as any;
        const updateResult2 = updateBody2?.singleResult?.data?.updateSubscription
        expect(updateResult2.revisions.edges.length).toBe(1);
    })

    test("update subscription that does not exist", async () => {

        const { body: updateBody } = await server.executeOperation({
            query: UPDATE_SUBSCRIPTION_MUTATION,
            variables: {id: "madeup", input: subscription}
        }) as any;
        expect(updateBody?.singleResult?.errors?.[0]?.message).toEqual("Subscription not found");
    })

});