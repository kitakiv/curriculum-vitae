import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class ProjectImage extends AbstractEntity<ProjectImage> {
  @Field(() => String)
  @Column()
  imageLink: string;

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.projectImages, {
    onDelete: 'CASCADE',
  })
  project: Project;
}

@ObjectType()
@Entity()
export class TagImage extends AbstractEntity<TagImage> {
  @Field(() => String)
  @Column()
  imageLink: string;

  @Field(() => String)
  @Column()
  tagName: string;
}
