import { gql } from '@apollo/client';

const PROFILE_GET_QUERY = gql`
    query GetProfile {
        profile {
            id
            name
            surname
            profilePhotos
            typingText
        }
    }
`;

export { PROFILE_GET_QUERY };