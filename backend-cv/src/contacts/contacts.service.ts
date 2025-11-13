import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { errors } from '../errors/errors.config';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {}
  async create(createContactInput: CreateContactInput) {
    const contact = new Contact(createContactInput);
    try {
      await this.contactsRepository.create(contact);
      await this.contactsRepository.save(contact);
      return contact;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_CREATED('Contact'), {
        cause: error,
      });
    }
  }

  async findAll() {
    return await this.contactsRepository.find();
  }

  async findOne(id: string) {
    const contact = await this.contactsRepository.findOneBy({ id });
    if (!contact) throw new NotFoundException(errors.NOT_FOUND('Contact'));
    return contact;
  }

  async update(id: string, updateContactInput: UpdateContactInput) {
    const exist = await this.contactsRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Contact'));
    try {
      await this.contactsRepository.update(id, updateContactInput);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_UPDATED('Contact'), {
        cause: error,
      });
    }
    const updatedContact = await this.contactsRepository.findOneBy({ id });
    return updatedContact;
  }

  async remove(id: string) {
    const exist = await this.contactsRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Contact'));
    await this.contactsRepository.delete(id);
    return { id };
  }
}
