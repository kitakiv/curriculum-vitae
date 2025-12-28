import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateProjectInput } from './create-project.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/mapped-types';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;
}

export class UpdateProjectInputDto extends OmitType(UpdateProjectInput, [
  'techStacks',
] as const) {}
