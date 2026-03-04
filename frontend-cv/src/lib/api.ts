import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { getAccessToken, setAccessToken } from './auth';
import ErrorHandler from "@/lib/errors";
import { GraphQLResponse } from "./errors";

interface ApiConfig {
    baseUrl?: string;
    defaultHeaders?: Record<string, string>;
    timeout?: number;
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

class GraphQlClient {
    private config: Required<ApiConfig>;
    private authConfig: AuthConfig;
    private errorHandler = new ErrorHandler();

    constructor(config: ApiConfig = {}, authConfig: AuthConfig = {}) {
        this.config = {
            baseUrl: config.baseUrl || `${process.env.BACKEND_URL}/graphql` || '',
            defaultHeaders: {
                'Content-Type': 'application/json',
                ...config.defaultHeaders,
            },
            timeout: config.timeout || 10000,
        };
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
            });


            clearTimeout(timeoutId);

            if (!res.ok) {
                throw new ApiError(
                    `GraphQL error ${res.status}: ${res.statusText}`,
                    res.status,
                    res
                );
            }

            const data = await this.parseResponse<TResult>(res);
            const errors = (data as  GraphQLResponse).errors;
            if (errors?.length) {
                this.handleError(data)
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

    private async buildRequestOptions<TVariables extends object | undefined = undefined>(
        document: TypedDocumentNode<any, TVariables>,
        options: {
            variables?: TVariables;
            headers?: Record<string, string>;
        }): Promise<RequestInit> {

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...options?.headers,
        };

        const token = await getAccessToken();
        if (token) {
            headers[this.authConfig.tokenHeader || 'Authorization'] = `${this.authConfig.tokenPrefix || 'Bearer'} ${token}`;
        }

        return {
            method: "POST",
            headers,
            body: JSON.stringify({
                query: document.loc?.source.body,
                variables: options?.variables,
            }),
            cache: "no-store",
        }
    }

    private buildUrl(endpoint: string): string {
        if (endpoint.startsWith('http')) {
            return endpoint;
        }
        return `${this.config.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    }

    setAuthTokens(authConfig: AuthConfig) {
        if (authConfig.tokenProvider) {
            setAccessToken(authConfig.tokenProvider as string);
        }
    }

    private handleError(data: GraphQLResponse, statusCode: number) {
       
            const errorMessage = this.errorHandler.handleApiError(data);
            if (errorMessage.errors && errorMessage.errors.length > 0) {
                console.error(`GraphQL Error: ${errorMessage.message}`, errorMessage.errors);
                throw new ApiError(`GraphQL Error: ${errorMessage.message}
                    ${errorMessage.errors.join('\n')}`, statusCode)
            } else {
                throw new ApiError(`GraphQL Error: ${errorMessage.message}`, statusCode)
            }
    }
}

export const apiClient = new GraphQlClient();