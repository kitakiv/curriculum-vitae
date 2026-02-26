import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Certificate extends AbstractEntity<Certificate> {
  @Field(() => String, { description: 'Certificate title' })
  @Column()
  certificateTitle: string;

  @Field(() => String, { description: 'Certificate description' })
  @Column()
  certificateDescription: string;

  @Field(() => String, {
    nullable: true,
    description: 'Certificate image on which will be certificate text',
  })
  @Column({ nullable: true })
  certificateImage?: string | null;

  @Field(() => String, { description: 'Certificate link', nullable: true })
  @Column({ nullable: true })
  certificateLink?: string | null;

  @Field(() => Date, { description: 'Certificate period start date' })
  @Column('date')
  certificatePeriodStart: Date;

  @Field(() => Date, { description: 'Certificate period end date' })
  @Column('date')
  certificatePeriodEnd: Date;

  @Field(() => ID, { description: 'Certificate unique identifier' })
  id: string;
}
