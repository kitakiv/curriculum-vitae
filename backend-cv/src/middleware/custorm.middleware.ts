import { Injectable, Logger } from '@nestjs/common';
import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';

@Injectable()
export class GraphQLLoggerPlugin implements ApolloServerPlugin {
  constructor(private readonly logger: Logger) {}

  private filterSensitiveData(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;
    const filtered = { ...obj };
    const sensitiveFields = [
      'password',
      'refreshToken',
      'secretKey',
      'token',
      'accessToken',
    ];
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
          locations: error.locations,
        }));

        const dateLog = {
          ip: requestContext.contextValue.ip,
          duration: `${duration}ms`,
          operation: requestContext.contextValue.operation,
          query: this.filterSensitiveData(requestContext.request.query),
          variables: this.filterSensitiveData(requestContext.request.variables),
          errors: detailedErrors,
          result: 'ERROR',
        };
        this.logger.error(JSON.stringify(dateLog, null, 2));
      },

      willSendResponse: async (requestContext) => {
        const duration = Date.now() - requestContext.contextValue.startTime;
        const hasErrors =
          requestContext.errors && requestContext.errors.length > 0;
        if (!hasErrors) {
          const dateLog = {
            ip: requestContext.contextValue.ip,
            duration: `${duration}ms`,
            operation: requestContext.contextValue.operation,
            query: this.filterSensitiveData(requestContext.request.query),
            variables: this.filterSensitiveData(
              requestContext.request.variables,
            ),
            result: 'SUCCESS',
          };
          this.logger.log(JSON.stringify(dateLog, null, 2));
        }
      },
    };
  }
}
