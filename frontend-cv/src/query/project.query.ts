
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { PROJECTS_GET_PAGINATED_QUERY } from "@/graphql/project.graphql";
import {
  GetProjectsPaginationQuery,
  GetProjectsPaginationQueryVariables,
  ProjectPaginationResponse
} from "@/gql/graphql";
import { fetchGraphQL } from "./graphql";



function getProjectsAll({ limit, page, techId }: { limit: number, page: number, techId?: string }) {
  return queryOptions({
    queryKey: ['projects', { limit, page, techId }],
    queryFn: ({ queryKey }): Promise<ProjectPaginationResponse> => {
      const [_, { limit, page, techId }] = queryKey as [string, { limit: number, page: number, techId?: string }];
      return fetchProjects({ limit, page, techId });
    },
    placeholderData: keepPreviousData,
  })
}


const fetchProjects = async ({ limit, page, techId }: { limit: number, page: number, techId?: string }): Promise<ProjectPaginationResponse> => {
  const responce = await fetchGraphQL<GetProjectsPaginationQuery, GetProjectsPaginationQueryVariables>(PROJECTS_GET_PAGINATED_QUERY, { variables: { limit, page, techId } });
  if (responce.data.projectsPagination) {
    return responce.data.projectsPagination;
  }
  throw new Error("Failed to fetch projects");
}


export { getProjectsAll };