import {
  Entity,
  Column,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Project } from './project.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { TagImage } from './projectImage.entity';

@ObjectType()
@Entity()
export class ProjectTag extends AbstractEntity<ProjectTag> {
  @Field(() => String)
  @Column()
  tagName: string;

  @Field(() => TagImage)
  @JoinColumn()
  @OneToOne(() => TagImage, {
    cascade: true,
  })
  tagImage: TagImage;
}
