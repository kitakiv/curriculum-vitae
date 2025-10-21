import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Action } from 'src/roles/enums/action.enum';
import { Resource } from 'src/roles/enums/resource.enum';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => CreatePermissionInput)
  @Field(() => [CreatePermissionInput])
  permissions: CreatePermissionInput[]
}

@InputType()
export class CreatePermissionInput {
  @IsEnum(Resource)
  @Field(() => String)
  resource: string;


  @Field(() => [String])
  @IsEnum(Action, { each: true })
  @ArrayUnique()
  actions: string[];
}
