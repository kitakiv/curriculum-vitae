import { Entity, Column, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TechStack } from '../../techstack/entities/techstack.entity';

@ObjectType()
@Entity()
export class TechCategory extends AbstractEntity<TechCategory> {
  @Field(() => String, {
    description: 'Tech category name for example: Frontend',
  })
  @Column({ unique: true })
  categoryName: string;

  @Field(() => ID, { description: 'Tech category id' })
  id: string;

  @ManyToMany(() => TechStack, (techStack) => techStack.techCategories, {
    nullable: true,
  })
  techStacks?: TechStack[];
}

