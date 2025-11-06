import { CreateTechStackInput } from './create-techstack.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
@InputType()
export class UpdateTechStackInput extends PartialType(CreateTechStackInput) {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  @Field(() => ID)
  id: string;
}
