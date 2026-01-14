import { Entity, Column, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { images as techVariables } from '../../variables/image.variables';
import { Project } from '../../projects/entities/project.entity';

@ObjectType()
@Entity()
export class TechStack extends AbstractEntity<TechStack> {
  @Field(() => String, { description: 'Tech stack name for example: React' })
  @Column()
  techName: string;

  @Field(() => String, {
    nullable: true,
    description: 'Tech stack svg for example: React svg',
  })
  @Column('varchar', { nullable: true, length: techVariables.length })
  techSvg?: string;

  @Field(() => ID, { description: 'Tech stack id' })
  id: string;

  @ManyToMany(() => Project, (project) => project.techStacks)
  projects: Project[];
}
