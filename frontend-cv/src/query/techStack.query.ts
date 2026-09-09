
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { TechStackPaginationResponse } from "@/gql/graphql";
import { TECHSTACK_GET_PAGINATED_QUERY } from "@/graphql/techStack.graphql";
import { TechstackPaginationQuery, TechstackPaginationQueryVariables } from "@/gql/graphql";
import { fetchGraphQL } from "./graphql";
import { GetTechStacksQuery, GetProjectsByTechStackQuery } from "@/gql/graphql";
import { apiClient } from "@/lib/api";
import { cache } from "react";
import { TECHSTACKS_GET_QUERY } from "@/graphql/techStack.graphql";



function getTechStacksAll({ limit, page, categoryId }: { limit: number, page: number, categoryId?: string }) {
  return queryOptions({
    queryKey: ['techstacks', { limit, page, categoryId }],
    queryFn: ({ queryKey }): Promise<TechStackPaginationResponse> => {
      const [_, { limit, page, categoryId }] = queryKey as [string, { limit: number, page: number, categoryId?: string }];
      return fetchTechStacks({ limit, page, categoryId });
    },
    placeholderData: keepPreviousData,
  })
}

const fetchTechStacks = async ({ limit, page, categoryId }: { limit: number, page: number, categoryId?: string }): Promise<TechStackPaginationResponse> => {
  const responce = await fetchGraphQL<TechstackPaginationQuery, TechstackPaginationQueryVariables>(TECHSTACK_GET_PAGINATED_QUERY, { variables: { limit, page, categoryId } });
  if (responce.data.techstackPagination) {
    return responce.data.techstackPagination;
  }
  throw new Error("Failed to fetch tech stacks");
}


async function getTechStacks() {
  try {
    const res = await apiClient.fetchGraphQL<{data: GetTechStacksQuery}>(TECHSTACKS_GET_QUERY);
    return res.data.data.techstacks || [];
  } catch (error) {
    console.error("Error fetching tech stacks:", error);
    throw error;
  }
}



const getTechStacksCached = cache(getTechStacks);

export { getTechStacksAll, getTechStacksCached, getTechStacks };

