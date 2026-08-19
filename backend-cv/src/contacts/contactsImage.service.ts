import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from '../variables/upload.variables';
import { errors } from '../errors/errors.config';
import { Logger } from '@nestjs/common';
import { SingleImage, SingleImageBaseClass } from 'src/upload/interface/singleImage.abstract';
import { SingleImagesFromIds } from '../upload/interface/singleImage.abstract';

@Injectable()
export class ContactsImageService extends SingleImageBaseClass {
  public name: string;
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
    private readonly logger: Logger = new Logger(ContactsImageService.name),
  ) {
    super();
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
      return contact.contactSvg;
    }
    return null;
  }

  async getImageKeys(ids: string[]): Promise<(SingleImagesFromIds)[]> {
    const contacts = await this.contactsRepository.findBy({ id: In(ids) });
    if (contacts.length === 0) throw new NotFoundException(errors.NOT_FOUND('Contacts'));
    const imageKeys = contacts.reduce((acc: (SingleImagesFromIds)[], contact) => {
      if (contact.contactSvg) {
        acc.push({ resourceId: contact.id, imageKey: contact.contactSvg });
      }
      return acc;
    }, []);
    return imageKeys;
  }
}
