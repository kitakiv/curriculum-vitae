import { Field, ObjectType } from '@nestjs/graphql';
import { Sign } from './sign.type';
import { User } from './user.entity';

@ObjectType()
export class SignupData {
    @Field(() => String, { description: 'message of successful registration' })
    message: string;
    
    @Field(() => String, { description: 'User login' })
    login: string;

    @Field(() => Boolean, { description: 'registration status' })
    success: boolean;
}
