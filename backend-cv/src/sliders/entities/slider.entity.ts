import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
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

  @Field(() => String)
  @JoinColumn()
  @OneToOne(() => SliderImage, {
    cascade: true,
  })
  sliderImage: SliderImage;
}
