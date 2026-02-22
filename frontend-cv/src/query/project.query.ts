import { GetProjectsQuery } from "@/gql/graphql";
import { PROJECTS_GET_QUERY } from "@/graphql/project.graphql";
import { apiClient } from "@/lib/api";
import { cache } from "react";

async function getProjects() {
  try {
    const res = await apiClient.fetchGraphQL<{data: GetProjectsQuery}>(PROJECTS_GET_QUERY);
    return res.data.data.projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export const getProjectsCached = cache(getProjects);