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

export { CONTACT_GET_QUERY };