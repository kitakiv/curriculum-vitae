import { Entity, Column, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { ProfilePhoto } from './profilePhoto.entity';

@ObjectType()
@Entity()
export class Profile extends AbstractEntity<Profile> {
  @Field(() => String, { defaultValue: 'Victoria' })
  @Column({ default: 'Victoria' })
  name: string;

  @Field(() => String)
  @Column({ default: 'Surname' })
  surname: string;

  @Field(() => String)
  @Column({ default: 'kit@gmail.com' })
  email: string;

  @Field(() => String)
  @Column({ default: '+380501234567' })
  phone: string;

  @Field(() => String)
  @Column('varchar', {
    default:
      'I am a web developer and something else and something else and something long and longer',
    length: 200,
  })
  typingText: string;

  @Field(() => String)
  @Column({ default: 'Europe' })
  location: string;

  @Field(() => [ProfilePhoto])
  @OneToMany(() => ProfilePhoto, (profilePhoto) => profilePhoto.profile, {
    cascade: true,
  })
  profilePhoto: ProfilePhoto[];
}
