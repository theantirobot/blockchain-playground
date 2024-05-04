import { ApolloServer } from '@apollo/server';
import { resolvers } from "./resolvers"
import type { MyContext } from './context';
import { gql } from 'graphql-tag';
import { readFileSync } from "fs";
import { buildSubgraphSchema } from '@apollo/subgraph';

const typeDefs = gql(
  readFileSync("./src/schema.graphql", { encoding: "utf-8" })
);

const schema = buildSubgraphSchema({typeDefs, resolvers} as any);

export const server = new ApolloServer<MyContext>({ schema} );