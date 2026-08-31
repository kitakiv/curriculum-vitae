import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
@InputType()
export class AttachRoleInput {
  @Field(() => String)
  @IsOptional()
  @IsString()
  @IsUUID()
  roleId: string | null | undefined;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
