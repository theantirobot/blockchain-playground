import { startStandaloneServer } from '@apollo/server/standalone'
import { server } from "./server";

console.log("Starting server");

startStandaloneServer(server, {
    listen: { port: 4001 }
  });
