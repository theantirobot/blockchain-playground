"use client";
import { useQuery } from "@apollo/client";
import { GET_SUBSCRIPTIONS } from "../../graphql/queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import React from "react";
import Link from "next/link";
import { useSubscriptions } from "@/hooks/use-subscriptions";

const SubscriptionsLayout = ({ children }) => {
  const { subscriptionsLoading, subscriptionsError, subscriptionsData } =
    useSubscriptions();

  const abbreviate = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength - 3) + "..."
      : text;
  };

  return (
    <div className="p-2 bg-background flex flex-row h-screen w-screen gap-3">
      <div className="pr-1 flex flex-col min-w-64">
        <div className="flex flex-row gap-1">
          <Input placeholder="Search" />
          <Button asChild>
            <Link href="/subscriptions/create/">+</Link>
          </Button>
        </div>
        <div className="border rounded-lg p-2 mt-2 pb-2 flex-1">
          <h2 className="border-b">Subscriptions</h2>
          {subscriptionsLoading && (
            <p className="italic font-light text-center mt-2">Loading...</p>
          )}
          {subscriptionsError && <p>Error: {subscriptionsError.message}</p>}

          {subscriptionsData &&
            subscriptionsData.map(({ id, address, webhookUrl }: any) => (
              <div
                className="hover:bg-accent hover:text-accent-foreground"
                key={id}
              >
                <Link
                  href={`/subscriptions/id\\${id}`}
                >{`${abbreviate(address, 14)}->${abbreviate(webhookUrl, 14)}`}</Link>
              </div>
            ))}
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
};
export default SubscriptionsLayout;
