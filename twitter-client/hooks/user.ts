import { graphQLClient } from "@/client/api";
import { getCurrentUserQuery } from "@/graphql/query/user";
import { useQuery } from "react-query";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () => graphQLClient.request(getCurrentUserQuery),
  });

  return { ...query, user: query.data?.getCurrentUser };
};
