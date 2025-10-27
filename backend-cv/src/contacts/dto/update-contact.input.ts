import { CreateContactInput } from './create-contact.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateContactInput extends PartialType(CreateContactInput) {
  @Field(() => ID)
  id: string;
}
