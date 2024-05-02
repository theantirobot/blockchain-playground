import Web3 from "web3";
import { EthereumBlockPoller } from "./eth-block-poller";
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client/core';
import { Subscriptions } from "./subscriptions"
import axios from 'axios';

const subscriptions = new Subscriptions({
    client: new ApolloClient({
        link: new HttpLink({
            uri: 'http://subscription-service:4001', // Replace with your GraphQL server URL
        }),
        cache: new InMemoryCache()
        })
});
const web3 = new Web3('http://ethereum-node:8545');

// Custom replacer function to handle BigInt values
function bigIntReplacer(key: string, value: any): any {
    if (typeof value === 'bigint') {
        // Convert BigInt to string
        return value.toString();
    }
    return value;
}

const poller = new EthereumBlockPoller({
    web3,
    onBlock: async (block) => {
        console.log('Block!')
        if (!block.transactions || block.transactions.length ===  0) {
            console.log(`No transactions in block ${block.number}`)
            return;
        }
        const addresses = new Set<string>();
        const transactions = []
        for (let i = 0; i < block.transactions.length; i++) {
            const tx = await web3.eth.getTransaction(block.transactions[i].toString());
            addresses.add(tx.from);
            addresses.add(tx.to!);

            transactions.push(tx);
        }
        console.log(`Found ${addresses.size} unique addresses in block ${block.number}`)
        const matchingSubs = await subscriptions.getSubscriptions(Array.from(addresses));
        console.log("Matching subscriptions: " + JSON.stringify(matchingSubs, null, 2));
        for (let i =0; i < transactions.length; i++) {
            const tx = transactions[i];
            console.log("Checking transaction: " + tx.hash + " from: " + tx.from + " to: " + tx.to)
            const matchingSubsForTx = matchingSubs.filter((sub: any) => sub.address.toLowerCase() === tx.from.toLowerCase() || sub.address.toLowerCase() === tx.to?.toLowerCase());
            for (let j = 0; j < matchingSubsForTx.length; j++) {
                // Send webhook
                const serializeableTransaction = JSON.stringify(tx, bigIntReplacer)
                axios.post(matchingSubsForTx[j].webhookUrl, {
                    transaction: JSON.parse(serializeableTransaction)
                }).then(response => {
                    console.log(`Webhook sent successfully: ${response.status}`);
                }).catch(error => {
                    console.error(`Error sending webhook: ${error.message}`);
                });
                console.log(`Sending webhook to ${matchingSubsForTx[j].webhookUrl} for transaction ${tx.hash}`);
            }
        }
    }
})

poller.startPolling(1000);