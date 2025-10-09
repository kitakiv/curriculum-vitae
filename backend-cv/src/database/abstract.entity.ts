import { PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID } from '@nestjs/graphql';

export class AbstractEntity<T> {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
