import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctxType = context.getType<'graphql' | 'http'>();
    let request: Request;
    if (ctxType === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(context);
      const ctx = gqlCtx.getContext();
      // GraphQL context
      request = ctx.req;
    } else if (ctxType === 'http') {
      // HTTP context
      request = context.switchToHttp().getRequest();
    } else {
      // another context
      return null;
    }
    if (!request['userId']) {
      return null;
    }
    return request['userId'];
  },
);
