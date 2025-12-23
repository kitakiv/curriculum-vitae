import { Logger, Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsResolver } from './contacts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactsImageService } from './contactsImage.service';
import { S3Service } from '../s3/s3.service';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Contact]), AuthModule],
  providers: [
    ContactsResolver,
    ContactsService,
    ContactsImageService,
    S3Service,
    Logger
  ],
})
export class ContactsModule {}
