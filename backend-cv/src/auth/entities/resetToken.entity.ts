import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/abstract.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class ResetToken extends AbstractEntity<ResetToken> {
  @Field(() => ID, { description: 'Refresh token id' })
  id: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'Reset token' })
  token: string;

  @Field(() => String, { description: 'Reset token expiry date' })
  @Column()
  expiryDate: Date;

  @OneToOne(() => User, (user) => user.resetToken, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
