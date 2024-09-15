import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";
export const graphQLClient = new GraphQLClient(
  "http://localhost:4000/graphql",
  {
    headers: {
      Authorization: isClient
        ? `Bearer ${window.localStorage.getItem("google_token")}`
        : "",
    },
  }
);
