// types.ts
export const types = `#graphql
 input createTweetData {
    content: String!
    imageURL: String
 }

 type Tweet {
    id: ID!
    content: String!
    imageURL: String
    author: User
    createdAt: String!
 }

 type Query {
    getAllTweets: [Tweet!]!
 }

 type Mutation {
    createTweet(payload: createTweetData!): Tweet!
 }
`;
