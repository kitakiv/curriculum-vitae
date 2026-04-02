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


const USERS_GET_QUERY = gql`
    query GetUsers {
    users {
        id
        login
        name
        avatarPhoto
        isEmailVerified
        role {
            id
            name
            permissions {
                actions
                id
                resource
            }
        }
    }
}
`;


const USER_ATTACH_ROLE_MUTATION = gql`
    mutation AttachRoleToUser($attachRoleInput: AttachRoleInput!) {
    attachRole(attachRoleInput: $attachRoleInput) {
        id
        login
        name
        avatarPhoto
        isEmailVerified
        role {
            id
            name
            permissions {
                actions
                id
                resource
            }
        }
    }
}
`;

const USER_DELETE_QUERY = gql`
    mutation DeleteUser($id: ID!) {
    removeUser(id: $id) 
}
`;

const USER_GET_ONE_QUERY = gql`
    query GetOneUser($id: ID!) {
    userById(id: $id) {
        id
        login
        name
        avatarPhoto
        isEmailVerified
        role {
            id
            name
            permissions {
                actions
                id
                resource
            }
        }
    }
}
`;
    

export { SIGNUP_AUTH_QUERY,
     LOGIN_AUTH_QUERY,
      GET_ME_USER,
       REFRESH_TOKEN_QUERY,
        USERS_GET_QUERY,
         USER_ATTACH_ROLE_MUTATION,
        USER_DELETE_QUERY,
        USER_GET_ONE_QUERY
};