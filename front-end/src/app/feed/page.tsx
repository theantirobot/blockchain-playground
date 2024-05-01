"use client"
import Web3, { Block, Transaction } from "web3";
import { EthereumBlockPoller } from "./chain-processor";
import { useEffect, useState, useMemo } from "react";
import { useQuery } from '@apollo/client';
import { GET_SUBSCRIPTIONS } from '../../graphql/queries';

import {
    Card,
    CardContent,
    CardTitle,
  } from "@/components/ui/card"

  type TransactionData = Transaction & {
    blockNumber: number;
    transactionIndex: number;
    hash: string;
  }
  
const FeedPage = () => {
    const [transactions, setTransactions] = useState<TransactionData[]>([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3001');
        ws.onmessage = (event) => {
            const newTransactions = JSON.parse(event.data);
            setTransactions(newTransactions);
        };

        return () => {
            ws.close();
        };
    }, []);

    const sortedTransactions = useMemo(() => {
        return Object.entries(transactions).sort(([hashA, tA], [hashB, tB]) => {
            if (tA.blockNumber === tB.blockNumber) {
                return tA.transactionIndex - tB.transactionIndex;
            } else if (tB.blockNumber > tA.blockNumber) {
                return 1;
            } else if (tB.blockNumber < tA.blockNumber) {
                return -1;
            } else {
                return 0;
            }
        })
    }, [transactions])

    return (
        <div className="m-2 flex flex-col gap-2">
            {transactions.map((tx) => {
                        return (
                            <Card key={tx.hash} className="p-2">
                                <CardTitle>{tx.hash}</CardTitle>
                                <CardContent>{`${tx.from} -> ${tx.to} : ${Web3.utils.fromWei(tx.value!, "ether")}`}</CardContent>
                            </Card>
                        )
                    })}
                    </div>)

}
export default FeedPage;

// Assuming the structure of your GraphQL data based on the schema provided
type Subscription = {
    id: string;
    webhookUrl: string;
    address: string;
}

type SubscriptionEdge = {
    node: Subscription;
    cursor: string;
}

type SubscriptionData = {
    subscriptions: {
        edges: SubscriptionEdge[];
    }
}
