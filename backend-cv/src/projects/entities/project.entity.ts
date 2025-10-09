import { Entity, Column, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from 'src/database/abstract.entity';
import { ProjectImage } from './projectImage.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProjectTag } from './projectTags.entitiy';

@ObjectType()
@Entity()
export class Project extends AbstractEntity<Project> {
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
  @Column()
  projectDemoLink: string;

  @Field(() => [ProjectImage])
  @OneToMany(() => ProjectImage, (projectImage) => projectImage.project, {
    cascade: true,
  })
  projectImages: ProjectImage[];

  @Field(() => [ProjectTag])
  @JoinTable()
  @ManyToMany(() => ProjectTag)
  tags: ProjectTag[];
}
