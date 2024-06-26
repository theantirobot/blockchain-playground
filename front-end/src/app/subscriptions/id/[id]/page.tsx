"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  UNSUBSCRIBE_MUTATION,
  UPDATE_SUBSCRIPTION_MUTATION,
} from "../../../../graphql/mutations";
import {
  GET_SUBSCRIPTIONS,
  GET_SUBSCRIPTION_DETAILS,
} from "../../../../graphql/queries"; // Ensure you import the query
import { useRouter, useParams } from "next/navigation";
import { useSubscription } from "@/hooks/use-subscription";

type Inputs = {
  address: string; // Corrected the typo here from 'ammount' to 'amount'
  webhookUrl: string;
  confirmationCount: string;
};

const Subscription = () => {
  const { id } = useParams();
  const form = useForm<Inputs>();
  const router = useRouter();

  const [unsubscribe, { loading: unsubLoading, error: unsubError }] =
    useMutation(UNSUBSCRIBE_MUTATION, {
      variables: { id },
      onCompleted: () => {
        // Redirect to /subscriptions after successful deletion
        router.push("/subscriptions/");
      },
      refetchQueries: [{ query: GET_SUBSCRIPTIONS, variables: { first: 10 } }],
    });

  // Hook to execute the mutation
  const [updateSubscription, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_SUBSCRIPTION_MUTATION);

  const {
    subscriptionLoading,
    subscriptionError,
    subscriptionData,
    webhookInvocationHistory,
  } = useSubscription(id as string);

  useEffect(() => {
    if (subscriptionData) {
      form.reset({
        address: subscriptionData.address,
        webhookUrl: subscriptionData.webhookUrl,
        confirmationCount: subscriptionData.confirmationCount,
      });
    }
  }, [subscriptionData, form.reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Updating subscription");
    updateSubscription({
      variables: {
        id,
        input: {
          address: data.address,
          webhookUrl: data.webhookUrl,
          confirmationCount: parseInt(data.confirmationCount),
        },
      },
      refetchQueries: [
        { query: GET_SUBSCRIPTIONS, variables: { first: 10 } },
        { query: GET_SUBSCRIPTION_DETAILS },
      ],
    });
  };

  return (
    <div className=" flex flex-col gap-2 h-full">
      { 
        // update / delete form
      }
      <div className="border rounded-lg space-y-8 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0xD5F46Ef9e3acdE9f4AAEBD37F37c4B2EC90D51F1"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We'll notify you when a transaction is sent to or from this
                    address.
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
                  <FormLabel>Confirmation Count</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="30" {...field} />
                  </FormControl>
                  <FormDescription>
                    We'll invoke your webhook after after this many blocks have
                    been confirmed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2 pt-2">
              <Button type="submit">Update</Button>
              <Button type="button" onClick={() => unsubscribe()}>
                Delete
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {
        // callback history
      }
      <div className="border rounded-lg flex-1 max-h-[50%] min-h-[30%] flex flex-col gap-2 p-4  overflow-hidden">
        <h2 className="text-lg font-semibold mb-2">Callback History</h2>

        <div className="flex-1 overflow-auto flex flex-col gap-2">
          {webhookInvocationHistory &&
            webhookInvocationHistory.edges.map(({ node }) => node).map((item, index) => CallbackHistoryItem(item, index))}
        </div>
      </div>

      <div className="border rounded-lg flex-1 max-h-[50%] min-h-[30%]flex flex-col gap-2 p-4 overflow-hidden">
        <h2 className="text-lg font-semibold mb-2">Audit History</h2>

        <div className="flex-1 overflow-auto flex flex-col gap-2">
          {subscriptionData?.revisions?.edges?.map(({ node }) => node).map((item) => (
            <div key={item.id} className="flex flex-row gap-2">
              <div>
                <p className="text-sm">
                  {new Date(parseInt(item.timestamp)).toLocaleDateString()}{" "}
                  {new Date(parseInt(item.timestamp)).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <p className="text-sm">{item.changeSummary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;

const CallbackHistoryItem = (item, index) => {
  const { webhookInvocation } = item;
  return (
    <div key={index} className="flex flex-row gap-2">
      <div>
        <p className="text-sm">
          {new Date(
            parseInt(webhookInvocation.startTimestamp),
          ).toLocaleDateString()}{" "}
          {new Date(
            parseInt(webhookInvocation.startTimestamp),
          ).toLocaleTimeString()}{" "}
        </p>
      </div>
      <div >
        <p className="text-sm text-gray-600">
          {webhookInvocation?.success ? "Success" : "Failed"}
        </p>
        <p className="text-sm text-gray-600">
          Duration:{" "}
          {parseInt(webhookInvocation.endTimestamp) -
            parseInt(webhookInvocation.startTimestamp)}
          ms
        </p>
      </div>
    </div>
  );
};
