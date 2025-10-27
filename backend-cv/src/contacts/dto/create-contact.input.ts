import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

@InputType()
export class CreateContactInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  contactName: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  contactLink: string;

  @Field(() => String, { nullable: true })
  @IsUrl()
  @IsOptional()
  @IsString()
  contactSvg?: string | null;
}
