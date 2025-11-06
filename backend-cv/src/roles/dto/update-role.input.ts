import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateRoleInput } from './create-role.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @Field(() => ID)
  id: string;
}
