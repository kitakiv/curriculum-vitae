import { ObjectType, OmitType } from '@nestjs/graphql';
import { Sign } from './sign.type';

@ObjectType()
export class AccessToken extends OmitType(Sign, ['refreshToken']) {}