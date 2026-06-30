import { apiClient } from "@/lib/api";
import { DocumentNode } from "@apollo/client";
import { cache } from "react";

async function queryGraphQL<R, V extends object | undefined | null = undefined>(document: DocumentNode, variables?: V | undefined | null): Promise<R> {
  if (variables) {
    try {
      const res = await apiClient.fetchGraphQL<{ data: R }>(
        document,
        { variables }
      );
      return res.data.data;
    } catch (error) {
      console.error("Error ", error)
      throw error
    }
  } else {
    try {
      const res = await apiClient.fetchGraphQL<{ data: R }>(
        document
      );
      return res.data.data;
    } catch (error) {
      console.error("Error ", error)
      throw error
    }
  }
}

const cachedQueryGraphQl = cache(queryGraphQL);

export { queryGraphQL, cachedQueryGraphQl };