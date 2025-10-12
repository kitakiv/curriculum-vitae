import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateSliderInput } from './create-slider.input';

@InputType()
export class UpdateSliderInput extends PartialType(CreateSliderInput) {
  @Field(() => ID)
  id: string;
}
