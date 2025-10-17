import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from 'src/variables/upload.variables';

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
    if (!exist) throw new BadRequestException('Contact not found');
    await this.contactsRepository.update(id, { contactSvg: image });
    return { id, contactSvg: image };
  }

  async getImageKey(id: string) {
    const exist = await this.contactsRepository.existsBy({ id });
    if (!exist) throw new BadRequestException('Contact not found');
    const contact = await this.contactsRepository.findOneBy({ id });
    if (contact.contactSvg) {
      return decodeURIComponent(contact.contactSvg.split(`/`).at(-1));
    }
    return null;
  }
}

