import { gql } from "@apollo/client";

const SIGNUP_AUTH_QUERY = gql`
    mutation Signup($signUpInput: SignUpInput!): CookiesData! {
    signup(signUpInput: $signUpInput) {
        tokens {
            accessToken
        }
    }
}
`;


const LOGIN_AUTH_QUERY = gql`
    mutation Login($loginInput: LoginInput!) : CookiesData!{
    login(loginInput: $loginInput) {
        tokens {
            accessToken
        }
    }
}
`;

export { SIGNUP_AUTH_QUERY, LOGIN_AUTH_QUERY};