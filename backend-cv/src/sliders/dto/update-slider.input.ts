import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateSliderInput } from './create-slider.input';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
@InputType()
export class UpdateSliderInput extends PartialType(CreateSliderInput) {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;
}
