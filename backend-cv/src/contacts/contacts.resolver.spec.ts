import { Test, TestingModule } from '@nestjs/testing';
import { ContactsResolver } from './contacts.resolver';
import { ContactsService } from './contacts.service';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { S3Service } from '../s3/s3.service';
import { ContactsImageService } from './contactsImage.service';
import { AuthGuard } from '../guards/auth.guard';
import { Contact } from './entities/contact.entity';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { Action } from '../roles/enums/action.enum';
import { Resource } from '../roles/enums/resource.enum';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { errors } from '../errors/errors.config';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import * as uuid from 'uuid';

const mockContact = new Contact({
  contactSvg: 'contact.svg',
  contactLink: 'https://google.com',
  contactName: 'name',
});

jest.mock('../decorators/public.decorator', () => ({
  Public: jest.fn(
    () =>
      (target: any, propertyName?: string, descriptor?: PropertyDescriptor) => {
        if (descriptor) {
          Reflect.defineMetadata('isPublic', true, descriptor.value);
          return descriptor;
        }
        return target;
      },
  ),
  IS_PUBLIC_KEY: 'isPublic',
}));
jest.mock('../decorators/permission.decorator', () => ({
  PermissionGuard: jest.fn(
    (permissions: { resource: Resource; actions: Action[] }[]) =>
      (target: any, propertyName?: string, descriptor?: PropertyDescriptor) => {
        if (descriptor) {
          Reflect.defineMetadata('permissions', permissions, descriptor.value);
          return descriptor;
        }
        return target;
      },
  ),
  IS_PERMISSION_KEY: 'permissions',
}));

const mockContactImage = {
  getImageKey: jest.fn(),
};
const mockS3Service = {
  uploadFiles: jest.fn(),
  deleteFiles: jest.fn(),
  getFile: jest.fn(),
  uploadFile: jest.fn(),
  deleteFile: jest.fn(),
};

const mockContactsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockJwtService = {
  verify: jest.fn(),
} as unknown as jest.Mocked<JwtService>;

const mockReflector = {
  getAllAndOverride: jest.fn(),
};
const mockAuthService = {
  getUserPermissions: jest.fn(),
};

describe('ContactsResolver', () => {
  let resolver: ContactsResolver;
  let service: ContactsService;
  let contactImageService: ContactsImageService;
  let s3Service: S3Service;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsResolver,
        {
          provide: ContactsService,
          useValue: mockContactsService,
        },
        {
          provide: S3Service,
          useValue: mockS3Service,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ContactsImageService,
          useValue: mockContactImage,
        },
        {
          provide: Reflector,
          useValue: mockReflector,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        AuthGuard,
        AuthorizationGuard,
      ],
    }).compile();

    resolver = module.get<ContactsResolver>(ContactsResolver);
    service = module.get<ContactsService>(ContactsService);
    contactImageService =
      module.get<ContactsImageService>(ContactsImageService);
    s3Service = module.get<S3Service>(S3Service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Public routes', () => {
    it('should be marked as public route', () => {
      const isPublicFindAll = Reflect.getMetadata('isPublic', resolver.findAll);
      expect(isPublicFindAll).toBe(true);
      const isPublicFindOne = Reflect.getMetadata('isPublic', resolver.findOne);
      expect(isPublicFindOne).toBe(true);
      const publicMethods = [resolver.findAll, resolver.findOne];
      publicMethods.forEach((method) => {
        const permissions = Reflect.getMetadata('permissions', method);
        expect(permissions).toBeUndefined();
      });
    });

    it('should return contacts (public route)', async () => {
      mockContactsService.findAll.mockResolvedValue([mockContact]);
      const result = await resolver.findAll();
      expect(result).toEqual([mockContact]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return a contact by id (public route)', async () => {
      mockContactsService.findOne.mockResolvedValue(mockContact);
      const result = await resolver.findOne(mockContact.id);
      expect(result).toEqual(mockContact);
      expect(service.findOne).toHaveBeenCalledWith(mockContact.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Private routes', () => {
    it('should be marked as private route', () => {
      const isPublicUpdate = Reflect.getMetadata(
        'isPublic',
        resolver.updateContact,
      );
      expect(isPublicUpdate).toBe(undefined);
      const isPublicDelete = Reflect.getMetadata(
        'isPublic',
        resolver.removeContact,
      );
      expect(isPublicDelete).toBe(undefined);
      const isPublicCreate = Reflect.getMetadata(
        'isPublic',
        resolver.createContact,
      );
      expect(isPublicCreate).toBe(undefined);
    });

    it('Private routes should have permissions decorator', () => {
      const methods = [
        {
          method: resolver.createContact,
          expectedResource: Resource.CONTACT,
          expectedActions: [Action.CREATE],
        },
        {
          method: resolver.updateContact,
          expectedResource: Resource.CONTACT,
          expectedActions: [Action.UPDATE],
        },
        {
          method: resolver.removeContact,
          expectedResource: Resource.CONTACT,
          expectedActions: [Action.DELETE],
        },
      ];

      methods.forEach(({ method, expectedResource, expectedActions }) => {
        const permissions = Reflect.getMetadata('permissions', method);
        expect(permissions).toBeDefined();
        expect(permissions[0].resource).toBe(expectedResource);
        expect(permissions[0].actions).toEqual(expectedActions);
        expectedActions.forEach((action) => {
          expect(permissions[0].actions).toContain(action);
        });
      });
    });
  });

  describe('Private routes', () => {
    it('should create contact', async () => {
      const createContactInput: CreateContactInput = {
        ...mockContact,
      };
      mockContactsService.create.mockResolvedValue(mockContact);
      const result = await resolver.createContact(createContactInput);
      expect(result).toEqual(mockContact);
      expect(service.create).toHaveBeenCalledWith(createContactInput);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should update contact', async () => {
      const updateContactInput: UpdateContactInput = {
        id: uuid.v4(),
        contactName: 'updated Contact Name',
      };
      const updateMockContact = { ...mockContact, ...updateContactInput };
      mockContactsService.update.mockResolvedValue(updateMockContact);
      const result = await resolver.updateContact(updateContactInput);
      expect(result).toEqual(updateMockContact);
      expect(service.update).toHaveBeenCalledWith(
        updateContactInput.id,
        updateContactInput,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should remove contact', async () => {
      const id = mockContact.id;
      mockContactsService.remove.mockResolvedValue({ id });
      mockContactImage.getImageKey.mockResolvedValue('key1');
      mockS3Service.deleteFile.mockResolvedValue(true);
      const result = await resolver.removeContact(id);
      expect(result).toEqual({ id });
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(contactImageService.getImageKey).toHaveBeenCalledTimes(1);
      expect(contactImageService.getImageKey).toHaveBeenCalledWith(id);
      expect(s3Service.deleteFile).toHaveBeenCalledTimes(1);
      expect(s3Service.deleteFile).toHaveBeenCalledWith('key1');
    });

    it('should throw BadException error', async () => {
      const id = mockContact.id;
      mockContactsService.remove.mockResolvedValue({ id });
      mockContactImage.getImageKey.mockResolvedValue('key1');
      mockS3Service.deleteFile.mockResolvedValue(() => {
        throw new Error();
      });
      try {
        await resolver.removeContact(id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe(errors.NOT_DELETED('Project'));
      }
    });
  });

  describe('Validation Pipes', () => {
    let validationPipe: ValidationPipe;
    beforeEach(() => {
      validationPipe = new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });
    });

    it('valid input', async () => {
      const validInput: CreateContactInput = {
        ...mockContact,
      };
      const result = await validationPipe.transform(validInput, {
        type: 'body',
        metatype: CreateContactInput,
      });
      expect(result).toEqual(validInput);

      const validUpdateInput: UpdateContactInput = {
        id: uuid.v4(),
        contactName: 'updated Contact Name',
      };

      const resultUpdate = await validationPipe.transform(validUpdateInput, {
        type: 'body',
        metatype: UpdateContactInput,
      });

      expect(resultUpdate).toEqual(validUpdateInput);

      const validRemoveInput = uuid.v4();

      const resultRemove = await validationPipe.transform(validRemoveInput, {
        type: 'body',
        metatype: UUID,
      });
      expect(resultRemove).toEqual(validRemoveInput);

      const validFindOneInput = uuid.v4();

      const resultFindOne = await validationPipe.transform(validFindOneInput, {
        type: 'body',
        metatype: UUID,
      });
      expect(resultFindOne).toEqual(validFindOneInput);
    });
    it('invalid input', async () => {
      const invalidInput: CreateContactInput = {
        ...mockContact,
        contactName: '',
      };
      try {
        await validationPipe.transform(invalidInput, {
          type: 'body',
          metatype: CreateContactInput,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }

      const invalidUpdateInput: UpdateContactInput = {
        id: mockContact.id,
        contactName: '',
      };

      try {
        await validationPipe.transform(invalidUpdateInput, {
          type: 'body',
          metatype: UpdateContactInput,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }

      const invalidRemoveInput = '';
      try {
        await validationPipe.transform(invalidRemoveInput, {
          type: 'body',
          metatype: UUID,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }

      const invalidFindOneInput = '';
      try {
        await validationPipe.transform(invalidFindOneInput, {
          type: 'body',
          metatype: UUID,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
