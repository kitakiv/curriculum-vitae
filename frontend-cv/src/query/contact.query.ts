import { cache } from "react";
import { apiClient } from "@/lib/api";
import { CONTACT_GET_QUERY, CONTACT_CREATE_MUTATION } from "@/graphql/contacts.graphql";
import { CreateContactMutation, CreateContactMutationVariables, GetContactsQuery } from "@/gql/graphql";

async function getContacts(): Promise<GetContactsQuery["contacts"]> {
  try {
    const res = await apiClient.fetchGraphQL<{ data: GetContactsQuery }>(CONTACT_GET_QUERY);
    return res.data.data.contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}

async function createContact(variables: CreateContactMutationVariables): Promise<CreateContactMutation['createContact']> {
  try {
    const res = await apiClient.fetchGraphQL<{ data: CreateContactMutation }>(
      CONTACT_CREATE_MUTATION,
      {variables}
    );
    return res.data.data.createContact;
  } catch(error) {
    console.error("Error fetching projects:", error)
    throw error
  }
}

export const getContactsCached = cache(getContacts);
export { createContact, getContacts };