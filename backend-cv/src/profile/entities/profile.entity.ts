import { Entity, Column } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { defaultProfile } from '../../variables/profile.variables';
import { AbstractEntity } from '../../database/abstract.entity';

@ObjectType()
@Entity()
export class Profile extends AbstractEntity<Profile> {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    defaultValue: defaultProfile.profileName,
    description: 'Profile name',
  })
  @Column({ default: defaultProfile.profileName })
  name: string = defaultProfile.profileName;

  @Field(() => String, {
    defaultValue: defaultProfile.profileSurname,
    description: 'Profile surname',
  })
  @Column({ default: defaultProfile.profileSurname })
  surname: string = defaultProfile.profileSurname;

  @Field(() => String, {
    defaultValue: defaultProfile.profileEmail,
    description: 'Profile email',
  })
  @Column({ default: defaultProfile.profileEmail })
  email: string = defaultProfile.profileEmail;

  @Field(() => String, {
    defaultValue: defaultProfile.profilePhone,
    description: 'Profile phone',
  })
  @Column({ default: defaultProfile.profilePhone })
  phone: string = defaultProfile.profilePhone;

  @Field(() => String, {
    defaultValue: defaultProfile.profileTypingText,
    description: 'Profile text on main page',
  })
  @Column('varchar', {
    default: defaultProfile.profileTypingText,
    length: 200,
  })
  typingText: string = defaultProfile.profileTypingText;

  @Field(() => String, {
    defaultValue: defaultProfile.profileLocation,
    description: 'Profile location',
  })
  @Column({ default: defaultProfile.profileLocation })
  location: string = defaultProfile.profileLocation;

  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true, description: 'Profile photos' })
  profilePhotos?: string[];
}
