import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { DataSource, Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { errors } from '../errors/errors.config';
import { Logger } from '@nestjs/common';
import { RedisCacheService } from '../cache/cache.service';
import uploadVariables from '../variables/upload.variables';

@Injectable()
export class ContactsService {
  private readonly CONTACT_CACHE_KEY = uploadVariables.contacts.cacheKey;
  private readonly CONTACT_CACHE_TIME = uploadVariables.contacts.cacheTime;
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
    private readonly logger: Logger = new Logger(ContactsService.name),
    private readonly redisCacheService: RedisCacheService,
    private readonly dataSource: DataSource,
  ) {}
  async create(createContactInput: CreateContactInput) {
    const contact = new Contact(createContactInput);
    try {
      return await this.dataSource.transaction(async (manager) => {
        const createdContact = await manager.create(Contact, contact);
        await manager.save(Contact, createdContact);
        return createdContact;
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_CREATED('Contact'));
    }
  }

  async findAll() {
    const contacts = await this.redisCacheService.get(this.CONTACT_CACHE_KEY);
    if (contacts) return JSON.parse(contacts);
    const newContacts = await this.contactsRepository.find();
    await this.redisCacheService.set(
      this.CONTACT_CACHE_KEY,
      JSON.stringify(newContacts),
      this.CONTACT_CACHE_TIME,
    );
    return newContacts;
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
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Contact'));
    }
    const updatedContact = await this.contactsRepository.findOneBy({ id });
    return updatedContact;
  }

  async remove(id: string) {
    const exist = await this.contactsRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Contact'));
    try {
      await this.contactsRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('Contact'));
    }
    return { id };
  }
}
