import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { SliderImage } from './sliderImage.entity';

@ObjectType()
@Entity()
export class Slider extends AbstractEntity<Slider> {
  @Field(() => String)
  @Column()
  sliderName: string;

  @Field(() => String)
  @Column()
  sliderText: string;

  @Field(() => SliderImage)
  @JoinColumn()
  @OneToOne(() => SliderImage, {
    cascade: true,
  })
  sliderImage: SliderImage;

  @Field(() => ID)
  id: string;
}
