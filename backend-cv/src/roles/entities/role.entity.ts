import { Entity, Column, OneToMany } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Permission } from './permission.entity';
import { User } from 'src/auth/entities/user.entity';
@ObjectType()
@Entity()
export class Role extends AbstractEntity<Role> {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Column({ unique: true })
  name: string;

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.role, { nullable: true, cascade: true })
  users?: User[];

  @Field(() => [Permission])
  @OneToMany(() => Permission, (permission) => permission.role, {
    cascade: true,
  })
  permissions: Permission[];
}
