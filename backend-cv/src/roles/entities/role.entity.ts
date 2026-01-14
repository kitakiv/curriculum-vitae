import { Entity, Column, OneToMany } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/abstract.entity';
import { Permission } from './permission.entity';
import { User } from '../../auth/entities/user.entity';
@ObjectType()
@Entity()
export class Role extends AbstractEntity<Role> {
  @Field(() => ID, { description: 'Role id' })
  id: string;

  @Field(() => String, { description: 'Role name' })
  @Column({ unique: true })
  name: string;

  @Field(() => [User], { nullable: true, description: 'Role users' })
  @OneToMany(() => User, (user) => user.role, { nullable: true, cascade: true })
  users?: User[];

  @Field(() => [Permission], { description: 'Role permissions' })
  @OneToMany(() => Permission, (permission) => permission.role, {
    cascade: true,
  })
  permissions: Permission[];
}
