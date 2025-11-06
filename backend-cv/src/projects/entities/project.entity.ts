import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TechStack } from '../../techstack/entities/techstack.entity';

@ObjectType()
@Entity()
export class Project extends AbstractEntity<Project> {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Column()
  projectTitle: string;

  @Field(() => String)
  @Column()
  projectDescription: string;

  @Field(() => String)
  @Column()
  projectGithubLink: string;

  @Field(() => String)
  @Column('varchar', { length: 500 })
  projectDemoLink: string;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  projectImages?: string[];

  @Field(() => [TechStack], { nullable: true })
  @JoinTable()
  @ManyToMany(() => TechStack, { cascade: true, nullable: true })
  techStacks?: TechStack[];
}
