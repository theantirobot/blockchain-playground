import { ApolloServer } from '@apollo/server';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone'
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'subscriptions', url: 'http://localhost:4001' },
    ],
  }),
});

const server = new ApolloServer({ gateway });

startStandaloneServer(server, {
  listen: {port: 4000 }
});

