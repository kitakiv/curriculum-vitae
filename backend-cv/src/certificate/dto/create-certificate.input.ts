import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsDate,
  IsOptional,
  IsString,
  IsUrl,
  MaxDate,
  MinDate,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateCertificateInput {
  @IsString()
  @MinLength(3)
  @Field(() => String, { description: 'Certificate title' })
  certificateTitle: string;

  @IsString()
  @MinLength(3)
  @Field(() => String, { description: 'Certificate description' })
  certificateDescription: string;

  @IsString()
  @MinLength(3)
  @IsUrl()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'Certificate image on which will be certificate text',
  })
  certificateImage?: string;

  @IsString()
  @MinLength(3)
  @IsUrl()
  @IsOptional()
  @Field(() => String, { description: 'Certificate link', nullable: true })
  certificateLink?: string;

  @IsDate()
  @MaxDate(new Date(Date.now()))
  @MinDate(new Date('1900-01-01'))
  @Field(() => Date, { description: 'Certificate period start date' })
  certificatePeriodStart: Date;

  @IsDate()
  @MaxDate(new Date(Date.now()))
  @MinDate(new Date('1900-01-01'))
  @Field(() => Date, { description: 'Certificate period end date' })
  certificatePeriodEnd: Date;
}
