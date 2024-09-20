import { graphQLClient } from "@/client/api";
import { getAllTweetsQuery } from "@/graphql/query/tweets";
import { useQuery } from "react-query";

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["get-all-Tweets"],
    queryFn: () => graphQLClient.request(getAllTweetsQuery),
    staleTime: 0, // Ensures data is always fresh
    refetchOnWindowFocus: true, // Refetch on window focus
  });
  return { ...query, tweets: query.data?.getAllTweets };
};
