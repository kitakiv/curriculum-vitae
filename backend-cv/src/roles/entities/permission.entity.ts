import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/abstract.entity';
import { Resource } from '../enums/resource.enum';
import { Role } from './role.entity';
@ObjectType()
@Entity()
export class Permission extends AbstractEntity<Permission> {
  @Field(() => ID, {
    description: 'Permission id',})
  id: string;

  @Field(() => String, { description: 'Permission resource example: user' })
  @Column('enum', { enum: Resource })
  resource: string;

  @Field(() => [String], {
    description: 'Permission actions example: [create, read, update, delete]',
  })
  @Column('simple-array')
  actions: string[];

  @Field(() => Role, { description: 'Permission role' })
  @ManyToOne(() => Role, (role) => role.permissions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  role: Role;
}
