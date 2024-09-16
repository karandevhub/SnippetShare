import { Tweet } from "@prisma/client";
import { prismaClient } from "../../client/db";
import { GraphqlContext } from "../../interfaces";

interface createTweetData {
  content: string;
  imageURL?: string;
}

const mutations = {
  createTweet: async (
    parent: any,
    { payload }: { payload: createTweetData },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("your are not authenticated");

    const tweet = await prismaClient.tweet.create({
      data: {
        content: payload.content,
        imageURL: payload.imageURL,
        author: { connect: { id: ctx.user.id } },
      },
    });
    return tweet;
  },
};

const extraResolvers = {
  Tweet: {
    author: (parent: Tweet) =>
      prismaClient.user.findUnique({ where: { id: parent.authorId } }),
  },
};

const queries = {
  getAllTweets: () => {
    return prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } });
  },
};

export const resolvers = { queries, mutations, extraResolvers };
