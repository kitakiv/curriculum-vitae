

interface GraphQLError {
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
    extensions?: {
        originalError?: {
            message: string | string[];
            error: string;
            statusCode: number;
        };
    };
}

 export interface GraphQLResponse {
    errors?: GraphQLError[];
}

export interface ErrorOutPut { message: string; errors?: string[], statusCode?: number }

export default class ErrorHandler {
    handleApiError(data: unknown): ErrorOutPut {
        // Check if it's a GraphQL error response
        if (this.isGraphQLError(data)) {
            const graphqlError = (data as GraphQLResponse).errors?.[0];
            const originalError = graphqlError?.extensions?.originalError;
            
            if (originalError) {
                const messages = Array.isArray(originalError.message) 
                    ? originalError.message 
                    : [originalError.message];
                
                return {
                    message: originalError.error || 'Bad Request',
                    errors: messages,
                    statusCode: originalError.statusCode
                };
            }
            
            return {
                message: graphqlError?.message || 'GraphQL Error'
            };
        }

        if (data instanceof Error) {
            return { message: data.message };
        }

        return { message: 'An unexpected error occurred' };
    }

    private isGraphQLError(data: unknown): boolean {
        return typeof data === 'object' && data !== null && 'errors' in data;
    }
}