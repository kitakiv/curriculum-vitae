import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateProjectInput } from './create-project.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;
}
