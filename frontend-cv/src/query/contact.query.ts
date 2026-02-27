import { cache } from "react";
import { apiClient } from "@/lib/api";
import { CONTACT_GET_QUERY } from "@/graphql/contacts.graphql";
import { GetContactsQuery } from "@/gql/graphql";

async function getContacts() {
  try {
    const res = await apiClient.fetchGraphQL<{data: GetContactsQuery["contacts"]}>(CONTACT_GET_QUERY);
    return res.data.data.contacts;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export const getContactsCached = cache(getContacts);