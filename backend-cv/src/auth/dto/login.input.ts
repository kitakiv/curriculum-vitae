import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
@InputType()
export class LoginInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  login: string;


  @Field(() => String)
  @IsString()
  @IsNotEmpty()
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
  password: string;
}
