import { CreateTechCategoryInput } from './create-tech-category.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateTechCategoryInput extends PartialType(
  CreateTechCategoryInput,
) {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  @Field(() => ID)
  id: string;
}

export class UpdateTechCategoryInputDto extends OmitType(
  UpdateTechCategoryInput,
  ['techStacks'] as const,
) {}
