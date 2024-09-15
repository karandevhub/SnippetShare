import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import { User } from "./user";

const typeDefs = `
      ${User.types}
      type Query {
        ${User.queries}
      }
`;

const resolvers = {
  Query: {
      ...User.resolvers.queries
  },
};





export async function startServer() {
  const app = express();

  // Initialize and start Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.use(bodyParser.json());
  app.use(cors());


  await server.start();
  app.use("/graphql", expressMiddleware(server));

  return app;
}
