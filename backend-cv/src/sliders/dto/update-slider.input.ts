import { CreateSliderInput } from './create-slider.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSliderInput extends PartialType(CreateSliderInput) {
  @Field(() => String)
  id: string;
}
