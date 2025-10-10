import { InputType, Field } from '@nestjs/graphql';
import { CreateImageInput } from './create-image.input';

@InputType()
export class CreateSliderInput {
  @Field(() => String)
  sliderName: string;
  @Field(() => String)
  sliderText: string;
  @Field(() => CreateImageInput)
  sliderImage: CreateImageInput;
}
