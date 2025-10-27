import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @IsString()
  @Field(() => String)
  projectTitle: string;

  @IsString()
  @MinLength(3)
  @Field(() => String)
  projectDescription: string;

  @IsString()
  @IsUrl()
  @Field(() => String)
  projectGithubLink: string;


  @IsString()
  @IsUrl()
  @Field(() => String)
  projectDemoLink: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  projectImages?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  techStacks?: string[];
}
