import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export async function fetchGraphQL<
  TResult,
  TVariables extends object | undefined = undefined,
>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
): Promise<TResult> {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: document.loc?.source.body,
      variables,
    }),
    cache: "no-store",
  });

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors.map((e: any) => e.message).join(", "));
  }

  return json.data;
}