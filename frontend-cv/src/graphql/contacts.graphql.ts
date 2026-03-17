import { gql } from "@apollo/client";

const CONTACT_GET_QUERY = gql`
    query GetContacts {
      contacts {
        contactLink
        contactName
        contactSvg
        id
        }
    }
`;

const CONTACT_GET_ONE_QUERY = gql`
    query GetContact($id: ID!) {
      contact(id: $id) {
        contactLink
        contactName
        contactSvg
        id
        }
    }
`;


const CONTACT_CREATE_MUTATION = gql`
    mutation CreateContact($createContactInput: CreateContactInput!) {
      createContact(createContactInput: $createContactInput) {
        contactLink
        contactName
        contactSvg
        id
      }
    }
`;

const CONTACT_REMOVE_MUTATION = gql`
    mutation RemoveContact($id: ID!) {
      removeContact(id: $id)
    }
`;

const CONTACT_UPDATE_MUTATION = gql`
    mutation UpdateContact($updateContactInput: UpdateContactInput!) {
      updateContact(updateContactInput: $updateContactInput) {
        contactLink
        contactName
        contactSvg
        id
      }
    }
`;

export { CONTACT_GET_QUERY, CONTACT_CREATE_MUTATION, CONTACT_UPDATE_MUTATION, CONTACT_GET_ONE_QUERY, CONTACT_REMOVE_MUTATION };