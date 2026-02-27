import { TECHCATEGORY_TECHSTACK_QUERY, TECHCATEGORIES_GET_QUERY } from "../graphql/techCategory.graphql";
import { GetTechCategoriesQuery, GetTechCategoryQuery } from "@/gql/graphql"
import { apiClient } from "@/lib/api";
import { cache } from "react";


async function getTechCategories() {
  try {
    const res = await apiClient.fetchGraphQL<{data: GetTechCategoriesQuery}>(TECHCATEGORIES_GET_QUERY);
    return res.data.data.techCategories || [];
  } catch (error) {
    console.error("Error fetching tech stacks:", error);
    throw error;
  }
}


async function getTechStackByTechCategory(id: string) {
  try {
    const res = await apiClient.fetchGraphQL<{data: GetTechCategoryQuery}>(TECHCATEGORY_TECHSTACK_QUERY, {variables: {id}});
    return res.data.data.techCategory.techStacks || [];
  } catch (error) {
    console.error("Error fetching projects by tech stack:", error);
    throw error;
  }
}

export const getTechCategoriesCached = cache(getTechCategories);
export const getTechStackByTechCategoryCached = cache(getTechStackByTechCategory);