import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/abstract.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class VerificationToken extends AbstractEntity<VerificationToken> {
  @Field(() => ID, { description: 'Verification token id' })
  id: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'Verification token' })
  token: string;

  @Field(() => String, { description: 'Verification token expiry date' })
  @Column()
  expiryDate: Date;

  @OneToOne(() => User, (user) => user.verificationToken, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  user?: User;
}