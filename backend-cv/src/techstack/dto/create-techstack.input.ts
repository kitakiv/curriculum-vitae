import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreateTechStackInput {
  @Field(() => String)
  techName: string;

  @Field(() => String, { nullable: true })
  techSvg?: string;
}
