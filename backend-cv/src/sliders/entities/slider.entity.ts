import { Entity, Column } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { images as sliderImage } from 'src/variables/image.variables';

@ObjectType()
@Entity()
export class Slider extends AbstractEntity<Slider> {
  @Field(() => String)
  @Column()
  sliderName: string;

  @Field(() => String)
  @Column()
  sliderText: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  sliderImage?: string | null;

  @Field(() => ID)
  id: string;
}
