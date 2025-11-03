import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/abstract.entity';
import { Resource } from '../enums/resource.enum';
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
  @ManyToOne(() => Role, (role) => role.permissions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  role: Role;
}
