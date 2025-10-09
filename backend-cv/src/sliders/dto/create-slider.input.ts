import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSliderInput {
  @Field(() => String)
  sliderName: string;
  @Field(() => String)
  sliderText: string;
  @Field(() => String)
  sliderImage: string;
}
