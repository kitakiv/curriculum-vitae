import { CreateImageInput } from './create-image.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { UpdateSliderInput } from './update-slider.input';

@InputType()
export class UpdateImageInput extends PartialType(CreateImageInput) {
  @Field(() => String)
  id: string;

  @Field(() => UpdateSliderInput)
  sliderImage: UpdateSliderInput;
}