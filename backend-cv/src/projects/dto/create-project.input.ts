import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field(() => String)
  projectTitle: string;

  @Field(() => String)
  projectDescription: string;

  @Field(() => String)
  projectGithubLink: string;

  @Field(() => String)
  projectDemoLink: string;

  @Field(() => [String], { nullable: true })
  projectImages?: string[];

  @Field(() => [String], { nullable: true })
  techStacks?: string[];
}
