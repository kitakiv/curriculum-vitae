import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation(() => Contact)
   async createContact(
    @Args('createContactInput', { type: () => CreateContactInput })
    createContactInput: CreateContactInput,
  ) {
    return await this.contactsService.create(createContactInput);
  }

  @Query(() => [Contact], { name: 'contacts' })
  async findAll() {
    return await this.contactsService.findAll();
  }

  @Query(() => Contact, { name: 'contact' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.contactsService.findOne(id);
  }

  @Mutation(() => Contact)
  async updateContact(
    @Args('updateContactInput', { type: () => UpdateContactInput })
    updateContactInput: UpdateContactInput,
  ) {
    return await this.contactsService.update(
      updateContactInput.id,
      updateContactInput,
    );
  }

  @Mutation(() => Contact)
  async removeContact(@Args('id', { type: () => String }) id: string) {
    return await this.contactsService.remove(id);
  }
}
