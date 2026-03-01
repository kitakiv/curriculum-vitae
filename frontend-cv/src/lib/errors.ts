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

export interface ErrorOutPut { message: string; errors?: string[] }

export default class ErrorHandler {
    handleApiError(error: unknown): ErrorOutPut {
        // Check if it's a GraphQL error response
        if (this.isGraphQLError(error)) {
            const graphqlError = (error as any).errors?.[0];
            const originalError = graphqlError?.extensions?.originalError;
            
            if (originalError) {
                const messages = Array.isArray(originalError.message) 
                    ? originalError.message 
                    : [originalError.message];
                
                return {
                    message: originalError.error || 'Bad Request',
                    errors: messages
                };
            }
            
            return {
                message: graphqlError?.message || 'GraphQL Error'
            };
        }

        if (error instanceof Error) {
            return { message: error.message };
        }

        return { message: 'An unexpected error occurred' };
    }

    private isGraphQLError(error: unknown): boolean {
        return typeof error === 'object' && error !== null && 'errors' in error;
    }
}