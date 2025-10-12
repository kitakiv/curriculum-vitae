import { CreateContactInput } from './create-contact.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateContactInput extends PartialType(CreateContactInput) {
  @Field(() => String)
  id: string;
}
