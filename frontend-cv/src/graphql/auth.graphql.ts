import { gql } from "@apollo/client";

const SIGNUP_AUTH_QUERY = gql`
    mutation Signup($signUpInput: SignUpInput!) {
    signup(signUpInput: $signUpInput)
}
`;

const REFRESH_TOKEN_QUERY = gql`
mutation RefreshTheTokens {
    refreshTheTokens {
        tokens {
            accessToken
        }
    }
}
`;


const LOGIN_AUTH_QUERY = gql`
    mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
        tokens {
            accessToken
        }
        user {
            login
            name
        }
    }
}
`;

const GET_ME_USER = gql`
    mutation GetUser {
    getUser {
        id
        login
        name
        avatarPhoto
        role {
            permissions {
                actions
                resource
            }
        }
    }
}`

export { SIGNUP_AUTH_QUERY, LOGIN_AUTH_QUERY, GET_ME_USER, REFRESH_TOKEN_QUERY};