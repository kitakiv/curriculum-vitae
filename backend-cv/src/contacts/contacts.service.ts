import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {}
  async create(createContactInput: CreateContactInput) {
    const contact = new Contact({
      contactName: createContactInput.contactName,
      contactLink: createContactInput.contactLink,
      contactSvg: createContactInput.contactSvg || null,
    });
    try {
      await this.contactsRepository.create(contact);
      await this.contactsRepository.save(contact);
      return contact;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll() {
    try {
      const contacts = await this.contactsRepository.find();
      return contacts;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOne(id: string) {
    const exist = await this.contactsRepository.existsBy({ id });
    if (!exist) throw new Error('Contact not found');
    return await this.contactsRepository.findOneBy({ id });
  }

  async update(id: string, updateContactInput: UpdateContactInput) {
    const exist = await this.contactsRepository.existsBy({ id });
    if (!exist) throw new Error('Contact not found');
    await this.contactsRepository.update(id, updateContactInput);
    const updatedContact = await this.contactsRepository.findOneBy({ id });
    return updatedContact;
  }

  async remove(id: string) {
    const exist = await this.contactsRepository.existsBy({ id });
    if (!exist) throw new Error('Contact not found');
    await this.contactsRepository.delete(id);
    return `Contact ${id} deleted`;
  }
}
