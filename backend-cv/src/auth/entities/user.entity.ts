import { Entity, Column, OneToOne, ManyToOne } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/abstract.entity';
import { RefreshToken } from './refreshToken.entity';
import { Role } from '../../roles/entities/role.entity';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class User extends AbstractEntity<User> {
  @Field(() => ID, { description: 'User id' })
  id: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'User login' })
  login: string;

  @Field(() => String, { description: 'User name' })
  @Column()
  name: string;

  @Exclude()
  @Column()
  @Field(() => String, { description: 'User password', nullable: true })
  password: string;

  @Field(() => RefreshToken, { description: 'Refresh token', nullable: true })
  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: RefreshToken;

  @Field(() => Role, { nullable: true, description: 'User role' })
  @ManyToOne(() => Role, (role) => role.users, {
    nullable: true,
  })
  role?: Role;
}
