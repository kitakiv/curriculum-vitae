import { InputType, Int, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayUnique, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Action } from 'src/roles/enums/action.enum';
import { Resource } from 'src/roles/enums/resource.enum';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => Permission)
  @Field(() => Permission)
  permissions: Permission
}

@InputType()
export class Permission {
  @IsEnum(Resource)
  @Field(() => Resource)
  resource: Resource;


  @Field(() => [Action])
  @IsEnum(Action, { each: true })
  @ArrayUnique()
  actions: Action[];
}
