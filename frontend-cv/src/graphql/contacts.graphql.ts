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

export { CONTACT_GET_QUERY, CONTACT_CREATE_MUTATION };