import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { GraphQLLoggerPlugin } from '../middleware/custorm.middleware';

export const graphqlOptions: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
  sortSchema: true,
  playground: true,
  plugins: [new GraphQLLoggerPlugin(new Logger())],
  context: ({ req, res }) => ({ req, res }),
  formatError: (error) => {
    if (process.env.NODE_ENV === 'production') {
      return {
        message: error.message,
        code: error.extensions?.code,
      };
    }
    return error;
  },
};
