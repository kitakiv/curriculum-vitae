import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from 'src/variables/upload.variables';
import { errors } from 'src/errors/errors.config';

@Injectable()
export class ContactsImageService {
  public name: string;
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {
    this.name = uploadVariables.contacts.name;
  }
  async uploadImage({ id, image }: { id: string; image: string }) {
    const exist = await this.contactsRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Contact'));
    try {
      const contact = await this.contactsRepository.update(id, {
        contactSvg: image,
      });
      return contact;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_UPDATED('Contact'), {
        cause: error,
      });
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

