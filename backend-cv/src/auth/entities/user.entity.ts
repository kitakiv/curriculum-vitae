import { Entity, Column, OneToOne, ManyToOne } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/abstract.entity';
import { RefreshToken } from './refreshToken.entity';
import { Role } from '../../roles/entities/role.entity';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class User extends AbstractEntity<User> {
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  login: string;

  @Field(() => String)
  @Column()
  name: string;

  @Exclude()
  @Column()
  password: string;

  @Field(() => RefreshToken)
  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: RefreshToken;

  @Field(() => Role, { nullable: true })
  @ManyToOne(() => Role, (role) => role.users, {
    nullable: true,
  })
  role?: Role;
}
