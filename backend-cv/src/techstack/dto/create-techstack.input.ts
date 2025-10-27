import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength, IsUrl } from 'class-validator';
@InputType()
export class CreateTechStackInput {
  @IsString()
  @MinLength(3)
  @Field(() => String)
  techName: string;

  @IsOptional()
  @IsUrl()
  @Field(() => String, { nullable: true })
  techSvg?: string;
}
