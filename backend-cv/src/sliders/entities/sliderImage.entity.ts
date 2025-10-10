import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class SliderImage extends AbstractEntity<SliderImage> {
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  imageLink?: string | null;

  @Field(() => ID)
  id: string;
}
