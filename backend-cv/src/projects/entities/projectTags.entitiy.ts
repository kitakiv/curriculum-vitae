import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
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

  @Field(() => ID)
  id: string;
}
