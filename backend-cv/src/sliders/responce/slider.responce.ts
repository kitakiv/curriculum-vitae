import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class Slider {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  sliderTitle: string;
  @Field(() => String)
  sliderText: string;
  @Field(() => String)
  sliderImage: string;
}
