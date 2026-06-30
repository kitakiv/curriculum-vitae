import { TECHSTACK_PROJECTS_QUERY, TECHSTACKS_GET_QUERY } from "@/graphql/techStack.graphql";
import { GetTechStacksQuery, GetProjectsByTechStackQuery } from "@/gql/graphql";
import { apiClient } from "@/lib/api";
import { cache } from "react";


async function getTechStacks() {
  try {
    const res = await apiClient.fetchGraphQL<{data: GetTechStacksQuery}>(TECHSTACKS_GET_QUERY);
    return res.data.data.techstacks || [];
  } catch (error) {
    console.error("Error fetching tech stacks:", error);
    throw error;
  }
}


async function getProjectsByTechStack(id: string) {
  try {
    const res = await apiClient.fetchGraphQL<{data: GetProjectsByTechStackQuery}>(TECHSTACK_PROJECTS_QUERY, {variables: {id}});
    return res.data.data.techstack?.projects || [];
  } catch (error) {
    console.error("Error fetching projects by tech stack:", error);
    throw error;
  }
}

export const getTechStacksCached = cache(getTechStacks);
export const getProjectsByTechStackCached = cache(getProjectsByTechStack);