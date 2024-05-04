"use client";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
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
import { SUBSCRIBE_MUTATION } from "../../../graphql/mutations";
import { GET_SUBSCRIPTIONS } from "../../../graphql/queries"; // Ensure you import the query
import { useRouter, useParams } from "next/navigation";

type Inputs = {
  address: string; // Corrected the typo here from 'ammount' to 'amount'
  webhookUrl: string;
  confirmationCount: string;
};

const CreateSubscriptionComponent = () => {
  const form = useForm<Inputs>();
  const [subscribe, { data, loading, error }] = useMutation(SUBSCRIBE_MUTATION);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    subscribe({
      variables: {
        input: {
          address: data.address,
          webhookUrl: data.webhookUrl,
          confirmationCount: parseInt(data.confirmationCount),
        },
      },
      onCompleted: ({ subscribe: { id } }) => {
        console.log(data);
        // Redirect to /subscriptions after successful deletion
        router.push(`/subscriptions/id/${id}`);
      },
      refetchQueries: [{ query: GET_SUBSCRIPTIONS, variables: { first: 10 } }],
    });
  };

  return (
    <div>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <FormLabel>Confirmation Cuont</FormLabel>
                  <FormControl>
                    <Input placeholder="30" {...field} />
                  </FormControl>
                  <FormDescription>
                    We'll invoke your webhook after after this many blocks have
                    been confirmed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create Subscription</Button>
          </form>
        </Form>
        {loading && "Loading..."}
        {error && "Error: " + error.message}
      </div>
    </div>
  );
};

export default CreateSubscriptionComponent;
