import Web3 from "web3";
import { EthereumBlockPoller } from "./eth-block-poller";
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:4001', // Replace with your GraphQL server URL
    }),
    cache: new InMemoryCache()
  });

const poller = new EthereumBlockPoller({
    web3: new Web3('http://127.0.0.1:8545'),
    onBlock: () => { console.log('Block!') }
})

poller.startPolling(1000);