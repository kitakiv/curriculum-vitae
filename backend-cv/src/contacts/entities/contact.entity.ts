import { Entity, Column } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/abstract.entity';

@ObjectType()
@Entity()
export class Contact extends AbstractEntity<Contact> {
  @Field(() => String)
  @Column()
  contactName: string;

  @Field(() => String)
  @Column()
  contactLink: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 500, nullable: true })
  contactSvg?: string | null;

  @Field(() => ID)
  id: string;
}

