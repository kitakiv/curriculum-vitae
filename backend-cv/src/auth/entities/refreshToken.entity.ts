import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
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

  @JoinColumn()
  @OneToOne(() => User, (user) => user.refreshToken, {
    onDelete: 'CASCADE',
  })
  user: User;
}
