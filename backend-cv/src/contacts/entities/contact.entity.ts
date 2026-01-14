import { Entity, Column } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/abstract.entity';

@ObjectType()
@Entity()
export class Contact extends AbstractEntity<Contact> {
  @Field(() => String, { description: 'Contact name' })
  @Column()
  contactName: string;

  @Field(() => String, { description: 'Contact link' })
  @Column()
  contactLink: string;

  @Field(() => String, { nullable: true, description: 'Contact svg' })
  @Column('varchar', { length: 500, nullable: true })
  contactSvg?: string | null;

  @Field(() => ID, { description: 'Contact id' })
  id: string;
}

