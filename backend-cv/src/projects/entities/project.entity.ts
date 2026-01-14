import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TechStack } from '../../techstack/entities/techstack.entity';

@ObjectType()
@Entity()
export class Project extends AbstractEntity<Project> {
  @Field(() => ID, { description: 'Project id' })
  id: string;

  @Field(() => String, { description: 'Project title' })
  @Column()
  projectTitle: string;

  @Field(() => String, { description: 'Project description' })
  @Column()
  projectDescription: string;

  @Field(() => String, {
    description: 'Project github link'})
  @Column()
  projectGithubLink: string;

  @Field(() => String, { description: 'Project demo link'})
  @Column('varchar', { length: 500 })
  projectDemoLink: string;

  @Field(() => [String], { nullable: true, description: 'Project images' })
  @Column('simple-array', { nullable: true })
  projectImages?: string[];

  @Field(() => [TechStack], {
    nullable: true,
    description: 'Project tech stacks',
  })
  @ManyToMany(() => TechStack, (techStack) => techStack.projects, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  techStacks?: TechStack[];
}
