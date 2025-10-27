import { InputType, Field } from '@nestjs/graphql';
import { IsString, Matches, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-Z]*$/)
  name: string
}