import { Injectable, Logger } from '@nestjs/common';
import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';

@Injectable()
export class GraphQLLoggerPlugin implements ApolloServerPlugin {
  constructor(private readonly logger: Logger) {}

  private filterSensitiveData(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;
    const filtered = { ...obj };
    const sensitiveFields = ['password', 'refreshToken', 'secretKey', 'token'];
    for (const key in filtered) {
      if (sensitiveFields.includes(key)) {
        filtered[key] = '[FILTERED]';
      } else if (typeof filtered[key] === 'object') {
        filtered[key] = this.filterSensitiveData(filtered[key]);
      }
    }
    return filtered;
  }

  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    const startTime = Date.now();

    return {
      didResolveOperation: async (requestContext) => {
        const { request, contextValue } = requestContext;
        contextValue.startTime = startTime;
        contextValue.ip = contextValue.req?.ip || 'unknown';
        contextValue.operation = request.operationName || 'unknown';
      },

      didEncounterErrors: async (requestContext) => {
        const duration = Date.now() - requestContext.contextValue.startTime;
        const detailedErrors = requestContext.errors?.map((error) => ({
          message: error.message,
          path: error.path,
          locations: error.locations
        }));

        this.logger.error({
          ip: requestContext.contextValue.ip,
          duration: `${duration}ms`,
          operation: requestContext.contextValue.operation,
          query: requestContext.request.query,
          variables: this.filterSensitiveData(requestContext.request.variables),
          errors: detailedErrors,
          result: 'ERROR'
        });
      },

      willSendResponse: async (requestContext) => {
        const duration = Date.now() - requestContext.contextValue.startTime;
        const hasErrors =
          requestContext.errors && requestContext.errors.length > 0;

        if (!hasErrors) {
          this.logger.log(
            `GraphQL ${requestContext.contextValue.operation} - ${duration}ms - SUCCESS`,
          );
        }
      },
    };
  }
}
