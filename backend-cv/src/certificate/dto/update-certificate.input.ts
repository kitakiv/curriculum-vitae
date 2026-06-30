import { CreateCertificateInput } from './create-certificate.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateCertificateInput extends PartialType(
  CreateCertificateInput,
) {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @Field(() => ID)
  id: string;
}
