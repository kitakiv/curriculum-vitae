import { gql } from "@apollo/client";

const SIGNUP_AUTH_QUERY = gql`
    mutation Signup($signUpInput: SignUpInput!) {
    signup(signUpInput: $signUpInput) {
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
    }
}`

export { SIGNUP_AUTH_QUERY, LOGIN_AUTH_QUERY, GET_ME_USER};