import { graphql } from "../../gql";  // This should be part of your codegen or gql-tag

// Typed query for fetching all tweets
export const getAllTweetsQuery = graphql(`#graphql
  query GetAllTweets {
    getAllTweets {
      id
      content
      imageURL
      author {
        firstName
        lastName
        profileImageURL
      }
    }
  }
`);
