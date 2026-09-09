
'use server'
import { GetUserMutation, LoginMutation, LoginMutationVariables, RefreshTheTokensMutation, SignupMutation, SignupMutationVariables } from "@/gql/graphql";
import { apiClient } from "@/lib/api";
import { SIGNUP_AUTH_QUERY, LOGIN_AUTH_QUERY, GET_ME_USER, REFRESH_TOKEN_QUERY } from "@/graphql/auth.graphql";
import { getRefreshToken } from "@/lib/auth";


async function signUpUser(variables: SignupMutationVariables): Promise<SignupMutation['signup']> {
  try {
    const res = await apiClient.fetchGraphQL<{data: SignupMutation}>(SIGNUP_AUTH_QUERY, {
        variables: variables
    });
    return res.data.data.signup as SignupMutation['signup'];
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
    'use server'
    try {
        const res = await apiClient.fetchGraphQL<{data: GetUserMutation}>(GET_ME_USER);
        return res.data.data.getUser;
    } catch (_) {
        return false
    }
}

async function setToken(token: string) {
    apiClient.setAuthTokens({
        tokenProvider: token
    })
}

async function refreshTokens() {
    'use server'
    try {
        console.log('Refreshing token...');
        const cookies = await getRefreshToken();
       const res = await apiClient.fetchGraphQL<{data: RefreshTheTokensMutation}>(REFRESH_TOKEN_QUERY, {
        headers: {
            "Cookie": `${cookies}`
        }
       });
       console.log('res', res.data.data);
       apiClient.setAuthTokens({
            tokenProvider: res.data.data.refreshTheTokens.tokens.accessToken
        });
    } catch (error) {
        console.error("Error refreshing token", error);
         throw error;
    }

}

// private async refreshToken() {
    //    try { 
    //         const cookies = await getRefreshToken();
    //         const response = await fetch(this.buildUrl(this.config.baseUrl), {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Cookie": `${cookies}`
    //             },
    //             body: JSON.stringify({
    //                 query: REFRESH_TOKEN_QUERY.loc?.source.body,
    //             }),
    //             cache: this.config.cache,
    //             credentials: 'include',
    //         });

    //         const data = await this.parseResponse<{data: RefreshTheTokensMutation}>(response);
    //         const errors = (data as  GraphQLResponse).errors;
    //         if (errors?.length) {
    //             throw new ApiError(`Failed to refresh token: ${errors[0].message}`, errors[0].extensions?.originalError?.statusCode || 500);
    //         }
    //         await setAccessToken(data.data.refreshTheTokens.tokens.accessToken || '');
    //         console.log('new access token set');  
    //         const refreshToken = response.headers.get('set-cookie');
    //         if (refreshToken) this.setRefreshToken(refreshToken);
            

    //    } catch (error) {
    //        console.error("Error ", error);
    //        throw error;
    //    }
    // }

export { signUpUser,  loginUser, setToken, refreshTokens }