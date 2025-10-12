import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactInput {
  @Field(() => String)
  contactName: string;

  @Field(() => String)
  contactLink: string;

  @Field(() => String, { nullable: true })
  contactSvg?: string | null;
}
