import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Action } from 'src/roles/enums/action.enum';
import { Resource } from 'src/roles/enums/resource.enum';
import { Role } from './role.entity';
@ObjectType()
@Entity()
export class Permission extends AbstractEntity<Permission> {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Column('enum', { enum: Resource })
  resource: string;

  @Field(() => [String])
  @Column('simple-array')
  actions: string[];

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.permissions)
  role: Role;
}
