import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
@InputType()
export class AttachRoleInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  roleId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
