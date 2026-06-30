import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { UserProvider } from 'src/common/types/types';
@InputType()
export class LoginGoogleInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  login: string;


  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  googleId: string;

  
  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  isEmailVerified: boolean;


  @IsEnum(UserProvider)
  @IsNotEmpty()
  @Field(() => UserProvider, {
    description: 'Auth provider',
  })
  provider: string
}
