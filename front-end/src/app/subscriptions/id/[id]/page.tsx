"use client"
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { UNSUBSCRIBE_MUTATION, UPDATE_SUBSCRIPTION_MUTATION } from '../../../../graphql/mutations';
import { GET_SUBSCRIPTIONS, GET_SUBSCRIPTION_DETAILS } from '../../../../graphql/queries';  // Ensure you import the query
import { useRouter, useParams } from 'next/navigation';
import { useSubscription } from '@/hooks/use-subscription';

type Inputs = {
    address: string; // Corrected the typo here from 'ammount' to 'amount'
    webhookUrl: string;
    confirmationCount: string;
};

const Subscription = () => {
    const { id } = useParams()
    const form = useForm<Inputs>()
    const router = useRouter()

    const [unsubscribe, { loading: unsubLoading, error: unsubError }] = useMutation(UNSUBSCRIBE_MUTATION, {
        variables: { id },
        onCompleted: () => {
            // Redirect to /subscriptions after successful deletion
            router.push('/subscriptions/');
        },
        refetchQueries: [{ query: GET_SUBSCRIPTIONS, variables: { first: 10 } }],
    });

    // Hook to execute the mutation
    const [updateSubscription, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_SUBSCRIPTION_MUTATION)
        
    const { subscriptionLoading, subscriptionError, subscriptionData, webhookInvocationHistory } = useSubscription(id as string);

    useEffect(() => {
        if (subscriptionData) {
            form.reset({
                address: subscriptionData.address,
                webhookUrl: subscriptionData.webhookUrl,
                confirmationCount: subscriptionData.confirmationCount
            });
        }
    }, [subscriptionData, form.reset]);

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log("Updating subscription")
        updateSubscription({
          variables: {
            id,
            input: {
              address: data.address,
              webhookUrl: data.webhookUrl,
              confirmationCount: parseInt(data.confirmationCount)
            }
          },
          refetchQueries: [{ query: GET_SUBSCRIPTIONS, variables: { first: 10 }}, { query: GET_SUBSCRIPTION_DETAILS }],
        });
      };
  

  return (
    <div className=''>
      { !subscriptionError && (
      <div className="flex flex-col gap-2">
      <Form {...form} >
        
        <form className="border rounded-lg space-y-8 p-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="0xD5F46Ef9e3acdE9f4AAEBD37F37c4B2EC90D51F1" {...field} />
                </FormControl>
                <FormDescription>
                  We'll notify you when a transaction is sent to or from this address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="webhookUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Webhook Url</FormLabel>
                <FormControl>
                  <Input placeholder="http://yourdomain.com" {...field} />
                </FormControl>
                <FormDescription>
                  We'll notify this url when matching transaction is received
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmationCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmation Cuont</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="30" {...field} />
                </FormControl>
                <FormDescription>
                  We'll invoke your webhook after after this many blocks have been confirmed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-2">
          <Button type="submit">Update</Button>
          <Button type="button" onClick={() => unsubscribe()}>Delete</Button>

          </div>
        </form>
      </Form>
      { subscriptionData && subscriptionData.webhookInvocationHistory && 
         <pre>{JSON.stringify(subscriptionData.webhookInvocationHistory, null, 2)} </pre>
      }
                {webhookInvocationHistory && <CallbackHistory history={webhookInvocationHistory.edges.map(({node}) => node)} />}

      </div>)}
      { subscriptionLoading && "Loading..."}
      { subscriptionError && "Error: " + subscriptionError.message}
    </div>
  )
};

export default Subscription;



const CallbackHistory = ({ history }: { history: any[]} ) => {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Callback History</h2>
      <div className="space-y-4">

        {history.map((item, index) => {
          const { webhookInvocation } = item;
          return (
          <div key={index} className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div>
              <p className="font-semibold">{new Date(parseInt(webhookInvocation.startTimestamp)).toLocaleDateString()} {new Date(parseInt(webhookInvocation.startTimestamp)).toLocaleTimeString()} </p>
            </div>
            <div className="mt-2 md:mt-0">
              <p className="text-sm text-gray-600">{webhookInvocation?.success ? "Success" : "Failed"}</p>
              <p className="text-sm text-gray-600">Duration: {parseInt(webhookInvocation.endTimestamp) - parseInt(webhookInvocation.startTimestamp)}ms</p>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

