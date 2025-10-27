import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class RefreshTokenInput {
  @Field(() => String)
  @IsString()
  @IsUUID()
  refreshToken: string;
}
