import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from '../variables/upload.variables';
import { errors } from '../errors/errors.config';
import { Logger } from '@nestjs/common';

@Injectable()
export class ContactsImageService {
  public name: string;
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
    private readonly logger: Logger = new Logger(ContactsImageService.name),
  ) {
    this.name = uploadVariables.contacts.name;
  }
  async uploadImage({ id, image }: { id: string; image: string }) {
    const exist = await this.contactsRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Contact'));
    try {
      await this.contactsRepository.update(id, {
        contactSvg: image,
      });
      return { contactSvg: image, id };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Contact'));
    }
  }

  async getImageKey(id: string) {
    const exist = await this.contactsRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Contact'));
    const contact = await this.contactsRepository.findOneBy({ id });
    if (contact.contactSvg) {
      return decodeURIComponent(contact.contactSvg.split(`/`).at(-1));
    }
    return null;
  }
}
