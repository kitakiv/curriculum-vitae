import { Entity, Column, OneToOne, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { RefreshToken } from './refresh-token.entity';
import { Role } from 'src/roles/entities/role.entity';

@ObjectType()
@Entity()
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  @Field(() => String)
  login: string;

  @Field(() => String)
  @Column()
  name: string;

  @Column()
  password: string;

  @Field(() => RefreshToken)
  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: true,
  })
  refreshToken: RefreshToken;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
