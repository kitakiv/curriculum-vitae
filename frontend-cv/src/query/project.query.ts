import { GetProjectsQuery } from "@/gql/graphql";
import { PROJECTS_GET_QUERY } from "@/graphql/project.graphql";
import { apiClient } from "@/lib/api";
import { cache } from "react";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { queryGraphQL } from "./graphql";
import { PROJECTS_GET_PAGINATED_QUERY, PROJECTS_GET_BY_TECH_QUERY } from "@/graphql/project.graphql";
import {
  GetProjectsPaginationQuery,
  ProjectsByTechStackQueryVariables,
  GetProjectsPaginationQueryVariables,
  ProjectsByTechStackQuery,
  ProjectPaginationResponse
} from "@/gql/graphql";
import { TypedDocumentNode } from "@apollo/client";



function getProjectsAll({ limit, page, techId }: { limit: number, page: number, techId?: string }) {
  return queryOptions({
    queryKey: ['projects', { limit, page, techId }],
    queryFn: ({ queryKey }): Promise<ProjectPaginationResponse> => {
      const [_, { limit, page, techId }] = queryKey as [string, { limit: number, page: number, techId?: string }];
      return getProjectsQuery({ limit, page, techId });
    },
    placeholderData: keepPreviousData,
  })
}






function fetchGraphQL<
  TResult,
  TVariables extends object | undefined = undefined,
>(
  document: TypedDocumentNode<TResult, TVariables>,
  options?: {
    variables?: object;
    headers?: Record<string, string>;
  }) {
  const fetcher = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: document.loc?.source.body,
        variables: options?.variables,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }
    return res.json();
  };
  return fetcher();
}

const fetchProjects = async ({ limit, page }: { limit: number, page: number }): Promise<ProjectPaginationResponse> => {
  const responce = await fetchGraphQL<GetProjectsPaginationQuery, GetProjectsPaginationQueryVariables>(PROJECTS_GET_PAGINATED_QUERY, { variables: { limit, page } });
  if (responce.data.projectsPagination) {
    return responce.data.projectsPagination;
  }
  throw new Error("Failed to fetch projects");
}

const fetchProjectsByTechStack = async ({ limit, page, techId }: { limit: number, page: number, techId: string }): Promise<ProjectPaginationResponse> => {
  const responce = await fetchGraphQL<ProjectsByTechStackQuery, ProjectsByTechStackQueryVariables>(PROJECTS_GET_BY_TECH_QUERY, { variables: { limit, page, techId } });
  if (responce.data.projectsByTechStack) {
    return responce.data.projectsByTechStack;
  }
  throw new Error("Failed to fetch projects");
}

// const fetchProjects = async ({limit, page}: GetProjectsPaginationQueryVariables) => {
//   const responce = await queryGraphQL<GetProjectsPaginationQuery, GetProjectsPaginationQueryVariables>(PROJECTS_GET_PAGINATED_QUERY, { limit, page });
//   return responce.projectsPagination;
// }

// async function getProjects() {
//   try {
//     const res = await apiClient.fetchGraphQL<{data: GetProjectsQuery}>(PROJECTS_GET_QUERY);
//     return res.data.data.projects;
//   } catch (error) {
//     console.error("Error fetching projects:", error);
//     throw error;
//   }
// }
async function getProjectsQuery({ limit, page, techId }: { limit: number, page: number, techId?: string }): Promise<ProjectPaginationResponse> {
  if (techId) {
    return await fetchProjectsByTechStack({ limit, page, techId });
  }
  return await fetchProjects({ limit, page });
}

export { getProjectsQuery, getProjectsAll };