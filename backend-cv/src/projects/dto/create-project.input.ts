import { InputType, Field } from '@nestjs/graphql';
import { CreateTagInput } from './create-tag.input';
import { CreateProjectImageInput } from './create-image.input';

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

  @Field(() => [CreateProjectImageInput])
  projectImages: CreateProjectImageInput[];

  @Field(() => [CreateTagInput])
  tags: CreateTagInput[];
}
