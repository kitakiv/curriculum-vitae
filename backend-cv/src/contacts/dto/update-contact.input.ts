import { CreateContactInput } from './create-contact.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
@InputType()
export class UpdateContactInput extends PartialType(CreateContactInput) {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;
}
