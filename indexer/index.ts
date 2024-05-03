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
        const subs = await subscriptions.getSubscriptions();
        for (let i = 0; i < subs.length; i++) {
            console.log(`Subscription: ${subs[i].id} for address: ${subs[i].address}`);
            const confirmedBlockNumber = BigInt(block.number) - BigInt(subs[i].confirmationCount);
            if (confirmedBlockNumber < 1) {
                continue;
            }
            const confirmedBlock = await web3.eth.getBlock(confirmedBlockNumber);
            const transactions = []
            for (let i = 0; i < confirmedBlock.transactions.length; i++) {
                const tx = await web3.eth.getTransaction(confirmedBlock.transactions[i].toString());
                transactions.push(tx);
            }
            for (let j = 0; j < transactions.length; j++) {
                const tx = transactions[j];
                if (subs[i].address.toLowerCase() === tx.from.toLowerCase() || subs[i].address.toLowerCase() === tx.to?.toLowerCase()) {
                    // Send webhook
                    const serializeableTransaction = JSON.stringify(tx, bigIntReplacer, 2)
                    console.log(`Transaction: ${serializeableTransaction}`)
                    axios.post(subs[i].webhookUrl, {
                        transaction: JSON.parse(serializeableTransaction)
                    }).then(response => {
                        console.log(`Webhook sent successfully: ${response.status}`);
                    }).catch(error => {
                        console.error(`Error sending webhook: ${error.message}`);
                    });
                    console.log(`Sending webhook to ${subs[i].webhookUrl} for transaction ${tx.hash}`);
                }
            }
        }
    }
})

poller.startPolling(1000);