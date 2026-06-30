import { registerEnumType } from '@nestjs/graphql';

export enum UserProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
  BOTH = 'both'
}

// Register it with GraphQL
registerEnumType(UserProvider, {
  name: 'UserProvider',
  description: 'Authentication provider type',
});