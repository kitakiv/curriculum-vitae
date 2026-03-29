import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from './auth';
import ErrorHandler from "@/lib/errors";
import { GraphQLResponse } from "./errors";
import { UPLOADTYPE, UPLOADSERVICE, HTTPMETHOD, uploadVariables } from "@/variables/upload/upload";
import { queryGraphQL } from "@/query/graphql";
import { RefreshTheTokensMutation, RefreshTheTokensMutationVariables } from "@/gql/graphql";
import { REFRESH_TOKEN_QUERY } from "@/graphql/auth.graphql";
import { refreshTokens } from "@/query/auth.query";


interface ApiConfig {
    baseUrl?: string;
    defaultHeaders?: Record<string, string>;
    timeout?: number;
    cache?: RequestCache;
}

interface ResponseHttp {
    statusCode: number;
    error: string;
    message: string;
}

interface ApiResponse<T = any> {
    data: T;
    status: number;
    headers: Headers;
}

interface AuthConfig {
    tokenProvider?: Promise<string | null> | string | null;
    tokenHeader?: string;
    tokenPrefix?: string;
}

class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public response?: Response
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

class RequestClient {
    private config: Required<ApiConfig>;
    private configUpload: Required<ApiConfig>;
    private authConfig: AuthConfig;
    private errorHandler = new ErrorHandler();

    constructor(config: ApiConfig = {}, authConfig: AuthConfig = {}, configUpload: ApiConfig = {}) {
        this.config = {
            baseUrl: config.baseUrl || `${process.env.BACKEND_URL}/graphql` || '',
            defaultHeaders: {
                'Content-Type': 'application/json',
                ...config.defaultHeaders,
            },
            timeout: config.timeout || 10000,
            cache: config.cache || 'no-cache'
        };
        this.configUpload = {
            baseUrl: configUpload.baseUrl || `${process.env.BACKEND_URL}/upload` || '',
            defaultHeaders: {
                ...configUpload.defaultHeaders,
            },
            timeout: configUpload.timeout || 10000,
            cache: configUpload.cache || 'no-cache'
        }
        this.authConfig = {
            tokenHeader: 'Authorization',
            tokenPrefix: 'Bearer',
            ...authConfig,
        };
    }

    async fetchGraphQL<
        TResult,
        TVariables extends object | undefined = undefined,
    >(
        document: TypedDocumentNode<TResult, TVariables>,
        options?: {
            variables?: object;
            headers?: Record<string, string>;
        }
    ): Promise<ApiResponse<TResult>> {
        const url = this.buildUrl(this.config.baseUrl);
        const requestOptions = await this.buildRequestOptions(document, options as object);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

            const res = await fetch(url, {
                ...requestOptions,
                signal: controller.signal,
                credentials: 'include',
            });
           const refreshToken = res.headers.get('set-cookie');
            if (refreshToken) this.setRefreshToken(refreshToken);

            clearTimeout(timeoutId);

            if (!res.ok) {
                throw new ApiError(
                    `${res.status}: ${res.statusText}`,
                    res.status,
                    res
                );
            }

            const data = await this.parseResponse<TResult>(res);
            const errors = (data as  GraphQLResponse).errors;

            if (errors?.length) {
                
                this.handleError(data as GraphQLResponse);

            }
            return {
                data,
                status: res.status,
                headers: res.headers,
            };
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else if (error instanceof Error && error.name === 'AbortError') {
                throw new ApiError('Request timed out', 408);
            } else {
                throw new ApiError(error instanceof Error ? error.message : 'Unknown error', 500);
            }
        }
    }

    async fetchHttp({
        method,
        body,
        headers,
        url
    }: {
        method: HTTPMETHOD;
        body: FormData | string;
        headers?: Record<string, string> | undefined;
        url: string
    }) {
        const checkUrl = this.buildUrl(url, this.configUpload);
        const requestOptions = await this.buildRequestOptionsHttp({
            method,
            body,
            headers
        });
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
            const res = await fetch(checkUrl, {
                ...requestOptions,
                signal: controller.signal,
                credentials: 'include',
            });
            clearTimeout(timeoutId);
            if (!res.ok) {
                throw new ApiError(
                    `${res.status}: ${res.statusText}`,
                    res.status,
                    res
                );
            }

            const data = await this.parseResponse(res);
            const errors = (data as ResponseHttp).error;
            if (errors?.length) {
                this.handleErrorHttp(data as ResponseHttp, res.status)
            }
            return {
                data,
                status: res.status,
                headers: res.headers,
            };
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else if (error instanceof Error && error.name === 'AbortError') {
                throw new ApiError('Request timed out', 408);
            } else {
                throw new ApiError(error instanceof Error ? error.message : 'Unknown error', 500);
            }
        }
    }

     async refreshToken() {
            const cookies = await getRefreshToken();
            const response = await fetch(this.buildUrl(this.config.baseUrl), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `${cookies}`
                },
                body: JSON.stringify({
                    query: REFRESH_TOKEN_QUERY.loc?.source.body,
                }),
                cache: this.config.cache,
                credentials: 'include',
            });

            const data = await this.parseResponse<{data: RefreshTheTokensMutation}>(response);
            console.log('refresh token response', data.data);
            const errors = (data as  GraphQLResponse).errors;
            if (errors?.length) {
                return false;
            }
            await setAccessToken(data.data.refreshTheTokens.tokens.accessToken || '');
            console.log('new access token set');  
            const refreshToken = response.headers.get('set-cookie');
            if (refreshToken) this.setRefreshToken(refreshToken);
            return true;
    }

    private async parseResponse<T>(response: Response): Promise<T> {
        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/json')) {
            try {
                return await response.json();
            } catch (_) {
                return (await response.text()) as unknown as T;
            }
        }
        return (await response.text()) as unknown as T;
    }


    private async AuthHeader({
        headers
    }: {
        headers: Record<string, string>;
    }) {
        const headersAuth: Record<string, string> = {
            ...headers,
        };

        const token = await getAccessToken();
        if (token) {
            headersAuth[this.authConfig.tokenHeader || 'Authorization'] = `${this.authConfig.tokenPrefix || 'Bearer'} ${token}`;
        }

        return headersAuth;
    }

     private async buildRequestOptionsHttp({
        method,
        body,
        headers
     }: {
        method: HTTPMETHOD;
        body: FormData | string;
        headers?: Record<string, string> | undefined;
     }) : Promise<RequestInit>{
        const headersAuth = await this.AuthHeader({
            headers: headers || this.configUpload.defaultHeaders,
        });
        return {
            method:  method,
            headers: headersAuth,
            body,
            cache: this.configUpload.cache,
        }

     }


    private async buildRequestOptions<TVariables extends object | undefined = undefined>(
        document: TypedDocumentNode<any, TVariables>,
        options: {
            variables?: TVariables;
            headers?: Record<string, string>;
        }): Promise<RequestInit> {

        const headers = await this.AuthHeader({
            headers: {
                ...this.config.defaultHeaders,
                ...options?.headers,
            }
        });

        return {
            method: "POST",
            headers,
            body: JSON.stringify({
                query: document.loc?.source.body,
                variables: options?.variables,
            }),
            cache: this.config.cache,
        }
    }

    private buildUrl(endpoint: string, config?: ApiConfig): string {
        if (endpoint.startsWith('http')) {
            return endpoint;
        }
        return `${config?.baseUrl || this.config.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    }

   async setAuthTokens(authConfig: AuthConfig) {
        if (authConfig.tokenProvider) {
             await setAccessToken(authConfig.tokenProvider as string);
        }
    }

    private handleError(data: GraphQLResponse) {
       
            const errorMessage = this.errorHandler.handleApiError(data);
            if (errorMessage.errors && errorMessage.errors.length > 0) {
                console.error(`GraphQL Error: ${errorMessage.message}`, errorMessage.errors);
                throw new ApiError(`GraphQL Error: ${errorMessage.message}
                    ${errorMessage.errors.join('\n')}`, errorMessage.statusCode? errorMessage.statusCode: 500);
            } else {
                throw new ApiError(`GraphQL Error: ${errorMessage.message}`, errorMessage.statusCode ? errorMessage.statusCode : 500);
            }
    }

    private handleErrorHttp(data: ResponseHttp, statusCode: number) {
        throw new ApiError(`Http Error: ${data.error}`, statusCode)
    }

    private async setRefreshToken(cookies: string) {
       if (cookies.startsWith('refresh_token')) {
            await setRefreshToken(cookies);
       }
    }
}


class ServerApi extends RequestClient {
    constructor() {
        super();
    }

    async uploadFile(resource: UPLOADSERVICE, body: FormData, id: string, index?: number) {
        const url = this.createUrl(resource, id, index)
        return await this.fetchHttp({ method: HTTPMETHOD.POST, body, url });
    }

    async uploadFiles(resource: UPLOADSERVICE, body: FormData, id: string) {
        const url = this.createUrl(resource, id)
        return await this.fetchHttp({ method: HTTPMETHOD.POST, body, url });
    }

    private createUrl(resource: UPLOADSERVICE, id: string, index?: number) {
        if (index || index === 0) {
            return `${UPLOADTYPE.FILE.toLocaleLowerCase()}/${resource}/${id}/${index}`;
        } else {
           return uploadVariables[resource].multiFile ? `${UPLOADTYPE.FILES.toLocaleLowerCase()}/${resource}/${id}` : `${UPLOADTYPE.FILE.toLocaleLowerCase()}/${resource}/${id}`
        }
    }
}

export const apiClient = new ServerApi();