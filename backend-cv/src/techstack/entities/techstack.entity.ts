import { Entity, Column } from 'typeorm';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { images as techVariables } from 'src/variables/image.variables';

@ObjectType()
@Entity()
export class TechStack extends AbstractEntity<TechStack> {
  @Field(() => String)
  @Column()
  techName: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true, length: techVariables.length })
  techSvg?: string;

  @Field(() => ID)
  id: string;
}
