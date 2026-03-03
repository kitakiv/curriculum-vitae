import { PartialType } from '@nestjs/mapped-types';
import { CreateGoogleauthDto } from './create-googleauth.dto';

export class UpdateGoogleauthDto extends PartialType(CreateGoogleauthDto) {}
