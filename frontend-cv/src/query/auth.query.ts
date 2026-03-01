
import { GetUserMutation, LoginMutation, LoginMutationVariables, SignupMutation, SignupMutationVariables } from "@/gql/graphql";
import { apiClient } from "@/lib/api";
import { SIGNUP_AUTH_QUERY, LOGIN_AUTH_QUERY, GET_ME_USER } from "@/graphql/auth.graphql";


async function signUpUser(variables: SignupMutationVariables) {
  try {
    const res = await apiClient.fetchGraphQL<{data: SignupMutation}>(SIGNUP_AUTH_QUERY, {
        variables: variables
    });
    apiClient.setAuthTokens({
        tokenProvider: res.data.data.signup.tokens.accessToken
    });
    return true
  } catch (error) {
    console.error("Error while signUp", error);
    throw error;
  }
}

async function loginUser(variables: LoginMutationVariables) {
    try {
        const res = await apiClient.fetchGraphQL<{data: LoginMutation}>(LOGIN_AUTH_QUERY, {
            variables: variables
        });
        apiClient.setAuthTokens({
            tokenProvider: res.data.data.login.tokens.accessToken
        });
        return res.data.data.login;
    } catch (error) {
        console.error("Error loginning", error);
        throw error;
    }
}

export async function getMe() {
    try {
        const res = await apiClient.fetchGraphQL<{data: GetUserMutation}>(GET_ME_USER);
        return res.data.data.getUser;
    } catch (_) {
        return false
    }
}

export { signUpUser,  loginUser }