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

const FeedPage = () => {
    const [blocks, setBlocks ] = useState<Block[]>([]);
    const [transactions, setTransactions] = useState<Record<string, { tx: Transaction, block: Block, blockIndex: number }>>({});
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
    const { loading, error, data, refetch} = useQuery(GET_SUBSCRIPTIONS, {
        variables: {
            first: 10, // Adjust based on how many items you want to fetch
        },
        });
    const web3 = useMemo(() => {
        return new Web3('http://127.0.0.1:8545');
    }, [])
    useEffect(() => {
        const poller = new EthereumBlockPoller({
            web3, 
            onBlock: (block: Block) => {
                setBlocks((blocks => [...blocks, block]))
            }
        });
        poller.startPolling(1000);
        return () => {
            poller.stopPolling();
        }
    }, []);

    useEffect(() => {
        refetch();
        blocks.forEach(async block => {
            block?.transactions?.forEach((transaction, index) => {
                if (!transactions[transaction.toString()]) {
                    web3.eth.getTransaction(transaction.toString()).then(tx => {
                        setTransactions((txs) => ({...txs, [tx.hash]: { tx, block, blockIndex: index }}));
                        
                    });
                }
            })
        });
    }, [blocks])
    const sortedTransactions = useMemo(() => {
        return Object.entries(transactions).sort(([hashA, tA], [hashB, tB]) => {
            if (tA.block.number === tB.block.number) {
                return tA.blockIndex - tB.blockIndex;
            } else if (tB.block.number > tA.block.number) {
                return 1;
            } else if (tB.block.number < tA.block.number) {
                return -1;
            } else {
                return 0;
            }
        })
    }, [transactions])

    // group subscriptions by callback url
    const callbackStuff = useMemo(() => {
        if (!data?.subscriptions?.edges) return {};
        
        return data?.subscriptions?.edges.reduce((acc: Record<string, Subscription[]>, {node}: { node: Subscription} ) => {
            console.log("Doing node" + JSON.stringify(node));
            if (!acc[node.webhookUrl]) {
                acc[node.webhookUrl] = [];
            }
            acc[node.webhookUrl].push(node);
            return acc;
        }, {} as Record<string,  { node: any}>)
    }, [data])
    return (
        <div className="m-2 flex flex-col gap-2">
            {Object.keys(callbackStuff).map(url=> {
                return (<div>
                    {url}
                    {sortedTransactions.filter(([hash, { tx: transaction, block }]) => {
                        return callbackStuff[url].find((subscription: Subscription )=> {

                            return subscription.address.toLowerCase() === transaction.from?.toLowerCase() || subscription.address.toLowerCase() === transaction.to?.toLowerCase()});
                    }).map(([hash, { tx: transaction, block }]) => {
                        return (
                            <Card key={hash} className="p-2">
                                <CardTitle>{hash}</CardTitle>
                                <CardContent>{`${transaction.from} -> ${transaction.to} : ${web3.utils.fromWei(transaction.value!, "ether")}`}</CardContent>
                            </Card>
                        )
                    })}
                    </div>)
            })}

        </div>
    )
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
