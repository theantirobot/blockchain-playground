import { ApolloServer } from '@apollo/server';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone'
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'subscriptions', url: 'http://subscription-service:4001' },
      { name: 'callback', url: 'http://callback-service:4002'}
    ],
  }),
});

const server = new ApolloServer({ gateway });

async function startServerWithExponentialBackoff(maxRetries:number, retryCount = 0) {
  const serverConfig = {
    listen: { port: 4000 }
  };

  let error: unknown;
  try {
    await startStandaloneServer(server, serverConfig);
  } catch (e) {
    error = e;
  }
  finally {
    if (error) {
      if (retryCount < maxRetries) {
        // Calculate the delay using exponential backoff with a base of 2
        const delay = Math.pow(2, retryCount) * 1000; // Delay in milliseconds
        console.error(`Failed to start server. Retrying in ${delay / 1000} seconds...`);
        
        setTimeout(() => {
          startServerWithExponentialBackoff(maxRetries, retryCount + 1);
        }, delay);
      } else {
        console.error('Reached maximum retry limit. Server cannot be started.');
      }
    } else {
      console.log('Server started successfully on port 4000.');
    }
  }
}

// Example usage: attempt to start the server with a maximum of 5 retries
startServerWithExponentialBackoff(5);
