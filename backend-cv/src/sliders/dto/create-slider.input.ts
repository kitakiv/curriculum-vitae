import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

@InputType()
export class CreateSliderInput {
  @IsString()
  @MinLength(3)
  @Field(() => String)
  sliderName: string;

  @IsString()
  @MinLength(3)
  @Field(() => String)
  sliderText: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @IsUrl()
  @Field(() => String, { nullable: true })
  sliderImage?: string;
}
