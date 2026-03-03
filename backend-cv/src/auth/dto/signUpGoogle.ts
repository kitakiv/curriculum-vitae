import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsUrl,
  IsOptional,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { UserProvider } from 'src/common/types/types';
@InputType()
export class SignUpGoogleInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  login: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/^(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/^(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-])/, {
    message: 'Password must contain at least one special character',
  })
  password?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @IsUrl({ require_protocol: true })
  avatarPhoto?: string;

  @IsEnum(UserProvider)
  @IsNotEmpty()
  @Field(() => UserProvider, {
    description: 'Auth provider',
    defaultValue: UserProvider.GOOGLE,
  })
  provider: UserProvider;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  googleId: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  isEmailVerified: boolean;

}
