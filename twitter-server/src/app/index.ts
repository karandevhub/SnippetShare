import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import { User } from "./user";
import { GraphqlContext } from "../interfaces";
import JWTService from "../services/jwt";

const typeDefs = `
      ${User.types}
      type Query {
        ${User.queries}
      }
`;

const resolvers = {
  Query: {
    ...User.resolvers.queries,
  },
};

export async function startServer() {
  const app = express();

  // Initialize and start Apollo server
  const server = new ApolloServer<GraphqlContext>({
    typeDefs,
    resolvers,
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        console.log(req.headers)
        return {
          user: req.headers.authorization
            ? JWTService.decodeToken(
                req.headers.authorization.split("Bearer ")[1]
              )
            : undefined,
        };
      },
    })
  );

  return app;
}
