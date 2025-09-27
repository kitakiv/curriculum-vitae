import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSliderInput {
  @Field(() => String)
  sliderTitle: string;
  @Field(() => String)
  sliderText: string;
  @Field(() => String)
  sliderImage: string;
}
