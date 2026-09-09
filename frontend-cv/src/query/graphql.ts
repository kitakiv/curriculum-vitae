import { apiClient } from "@/lib/api";
import { DocumentNode, TypedDocumentNode } from "@apollo/client";
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

export async function fetchGraphQL<
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

const cachedQueryGraphQl = cache(queryGraphQL);

export { queryGraphQL, cachedQueryGraphQl };