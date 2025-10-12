import { CreateTechStackInput } from './create-techstack.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTechStackInput extends PartialType(CreateTechStackInput) {
  @Field(() => ID)
  id: string;
}
