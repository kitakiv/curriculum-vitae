import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTechCategoryInput {
  @IsString()
  @MinLength(3)
  @Field(() => String)
  categoryName: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  techStacks?: string[];
}
