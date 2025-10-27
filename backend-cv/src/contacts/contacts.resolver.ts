import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { ContactsImageService } from './contactsImage.service';
import { S3Service } from 'src/s3/s3.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { PermissionGuard } from 'src/decorators/permission.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Resource } from 'src/roles/enums/resource.enum';
import { Action } from 'src/roles/enums/action.enum';

@UseGuards(AuthorizationGuard)
@Resolver(() => Contact)
export class ContactsResolver {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly s3Service: S3Service,
    private readonly contactsImageService: ContactsImageService,
  ) {}

  @PermissionGuard([{ resource: Resource.CONTACT, actions: [Action.CREATE] }])
  @Mutation(() => Contact)
  async createContact(
    @Args('createContactInput', { type: () => CreateContactInput })
    createContactInput: CreateContactInput,
  ) {
    return await this.contactsService.create(createContactInput);
  }

  @Public()
  @Query(() => [Contact], { name: 'contacts' })
  async findAll() {
    return await this.contactsService.findAll();
  }

  @Public()
  @Query(() => Contact, { name: 'contact' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.contactsService.findOne(id);
  }

  @PermissionGuard([{ resource: Resource.CONTACT, actions: [Action.UPDATE] }])
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

  @PermissionGuard([{ resource: Resource.CONTACT, actions: [Action.DELETE] }])
  @Mutation(() => ID)
  async removeContact(@Args('id', { type: () => ID }) id: string) {
    try {
      // some images exist on s3 bucket
      const key = await this.contactsImageService.getImageKey(id);
      // remove contact
      await this.contactsService.remove(id);
      // delete images from s3 with id of deleted contact
      if (key) await this.s3Service.deleteFile(key);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error deleting contact', {
        cause: error,
      });
    }
    return {
      id,
    };
  }
}
