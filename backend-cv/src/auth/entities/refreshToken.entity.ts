import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/abstract.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class RefreshToken extends AbstractEntity<RefreshToken> {
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  token: string;

  @Field(() => String)
  @Column()
  expiryDate: Date;

  @OneToOne(() => User, (user) => user.refreshToken, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
