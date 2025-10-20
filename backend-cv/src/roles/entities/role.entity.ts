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
  @Column()
  name: string;

  @Field(() => [Permission])
  @Column('simple-array')
  permissions: Permission[];

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
