import { Entity, Column } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/abstract.entity';

@ObjectType()
@Entity()
export class Slider extends AbstractEntity<Slider> {
  @Field(() => String, { description: 'Slider title will be on main slider' })
  @Column()
  sliderName: string;

  @Field(() => String, { description: 'Slider text will be on main slider' })
  @Column()
  sliderText: string;

  @Field(() => String, {
    nullable: true,
    description: 'Slider image on which will be slider text',
  })
  @Column({ nullable: true })
  sliderImage?: string | null;

  @Field(() => ID, { description: 'Slider unique identifier' })
  id: string;
}
