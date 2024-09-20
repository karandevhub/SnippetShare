import { graphql } from "../../gql";

export const createTweet = graphql(`
  #graphql
  mutation CreateTweet($payload: createTweetData!) {
    createTweet(payload: $payload) {
      id
    }
  }
`);
