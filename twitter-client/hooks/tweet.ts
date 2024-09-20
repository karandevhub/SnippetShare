import { graphQLClient } from "@/client/api";
import { CreateTweetData } from "@/gql/graphql";
import { createTweet } from "@/graphql/mutation/tweet";
import { getAllTweetsQuery } from "@/graphql/query/tweets";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["get-all-Tweets"],
    queryFn: () => graphQLClient.request(getAllTweetsQuery),
    staleTime: 0, // Ensures data is always fresh
    refetchOnWindowFocus: true, // Refetch on window focus
  });
  return { ...query, tweets: query.data?.getAllTweets };
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      graphQLClient.request(createTweet, { payload }),
    onMutate: () => toast.loading("creating..."),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Tweet created successfully!");
      queryClient.invalidateQueries(["get-all-Tweets"]);
    },
  });
  return mutation;
};
