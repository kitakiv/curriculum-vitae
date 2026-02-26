import { InputType, Field } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  MinLength,
  IsUrl,
  IsArray,
} from 'class-validator';
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

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  projects?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  techCategories?: string[];
}
