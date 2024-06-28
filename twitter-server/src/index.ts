import express from 'express';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from "cors"

const typeDefs = `
    type Todo {
        id: ID!
        title: String!
        complete: Boolean
    }

    type Query {
        getTodos: [Todo]
    }
`;
const resolvers = {
  Query: {
    getTodos: () => [
      { id: "1", title: "Learn GraphQL", complete: false },
      { id: "2", title: "Build an app", complete: true },
    ],
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000/graphql`)
  );
}

startServer().catch((err) => console.error(err));
