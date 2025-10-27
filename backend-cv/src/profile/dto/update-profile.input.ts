import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-Z]*$/)
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-Z]*$/)
  @Field(() => String, { nullable: true })
  surname?: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsPhoneNumber('UA')
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  phone?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  typingText?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  location?: string;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  profilePhoto?: string[];
}
