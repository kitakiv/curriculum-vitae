import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Profile } from './profile.entity';

@ObjectType()
@Entity()
export class ProfilePhoto extends AbstractEntity<ProfilePhoto> {
  @Field(() => String)
  @Column({ length: 500 })
  imageLink: string;

  @Field(() => Profile)
  @ManyToOne(() => Profile, (profile) => profile.profilePhoto)
  profile: Profile;
}
