import { gql } from '@apollo/client';

const PROFILE_GET_QUERY = gql`
    query GetProfile {
        profile {
            id
            name
            surname
            profilePhotos
            typingText
            email
            phone
            location
        }
    }
`;


const PROFILE_UPDATE_MUTATION = gql`
    mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {
        updateProfile(updateProfileInput: $updateProfileInput) {
            id
            name
            surname
            profilePhotos
            typingText
            email
            phone
            location
        }
    }
`;



export { PROFILE_GET_QUERY, PROFILE_UPDATE_MUTATION };