import { CreateTechStackInput } from './create-techstack.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
@InputType()
export class UpdateTechStackInput extends PartialType(CreateTechStackInput) {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  @Field(() => ID)
  id: string;
}

export class UpdateTechStackInputDto extends OmitType(UpdateTechStackInput, [
  'projects',
  'techCategories'
] as const) {}
