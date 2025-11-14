import { Test, TestingModule } from '@nestjs/testing';
import { TechStackResolver } from './techstack.resolver';
import { TechStackService } from './techstack.service';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { S3Service } from '../s3/s3.service';
import { TechStackImageService } from './tachstackImage.service';
import { AuthGuard } from '../guards/auth.guard';
import { TechStack } from './entities/techstack.entity';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { Action } from '../roles/enums/action.enum';
import { Resource } from '../roles/enums/resource.enum';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { CreateTechStackInput } from './dto/create-techstack.input';
import { UpdateTechStackInput } from './dto/update-techstack.input';
import { errors } from '../errors/errors.config';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import * as uuid from 'uuid';

const mockTechStack = new TechStack({
  techName: 'techName',
  techSvg: 'techSvg.svg',
})

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

const mockTechStackImage = {
  getImageKey: jest.fn(),
};
const mockS3Service = {
  uploadFiles: jest.fn(),
  deleteFiles: jest.fn(),
  getFile: jest.fn(),
  uploadFile: jest.fn(),
  deleteFile: jest.fn(),
};

const mockTechStackService = {
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

describe('TechStackResolver', () => {
  let resolver: TechStackResolver;
  let service: TechStackService;
  let techStackImageService: TechStackImageService;
  let s3Service: S3Service;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechStackResolver,
        {
          provide: TechStackService,
          useValue: mockTechStackService,
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
          provide: TechStackImageService,
          useValue: mockTechStackImage,
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

    resolver = module.get<TechStackResolver>(TechStackResolver);
    service = module.get<TechStackService>(TechStackService);
    techStackImageService = module.get<TechStackImageService>(
      TechStackImageService,
    );
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

    it('should return techstacks (public route)', async () => {
      mockTechStackService.findAll.mockResolvedValue([mockTechStack]);
      const result = await resolver.findAll();
      expect(result).toEqual([mockTechStack]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return a techstack by id (public route)', async () => {
      mockTechStackService.findOne.mockResolvedValue(mockTechStack);
      const result = await resolver.findOne(mockTechStack.id);
      expect(result).toEqual(mockTechStack);
      expect(service.findOne).toHaveBeenCalledWith(mockTechStack.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Private routes', () => {
    it('should be marked as private route', () => {
      const isPublicUpdate = Reflect.getMetadata(
        'isPublic',
        resolver.updateTechStack,
      );
      expect(isPublicUpdate).toBe(undefined);
      const isPublicDelete = Reflect.getMetadata(
        'isPublic',
        resolver.removeTechStack,
      );
      expect(isPublicDelete).toBe(undefined);
      const isPublicCreate = Reflect.getMetadata(
        'isPublic',
        resolver.createTechStack,
      );
      expect(isPublicCreate).toBe(undefined);
    });

    it('Private routes should have permissions decorator', () => {
      const methods = [
        {
          method: resolver.createTechStack,
          expectedResource: Resource.TECHSTACK,
          expectedActions: [Action.CREATE],
        },
        {
          method: resolver.updateTechStack,
          expectedResource: Resource.TECHSTACK,
          expectedActions: [Action.UPDATE],
        },
        {
          method: resolver.removeTechStack,
          expectedResource: Resource.TECHSTACK,
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
    it('should create techStack', async () => {
      const createTechStackInput: CreateTechStackInput = {
        ...mockTechStack,
      };
      mockTechStackService.create.mockResolvedValue(mockTechStack);
      const result = await resolver.createTechStack(createTechStackInput);
      expect(result).toEqual(mockTechStack);
      expect(service.create).toHaveBeenCalledWith(createTechStackInput);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should update techStack', async () => {
      const updateTechStackInput: UpdateTechStackInput = {
        id: uuid.v4(),
        techName: 'updated Name',
      };
      const updateMockTechStack = { ...mockTechStack, ...updateTechStackInput };
      mockTechStackService.update.mockResolvedValue(updateMockTechStack);
      const result = await resolver.updateTechStack(updateTechStackInput);
      expect(result).toEqual(updateMockTechStack);
      expect(service.update).toHaveBeenCalledWith(
        updateTechStackInput.id,
        updateTechStackInput,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should remove techStack', async () => {
      const id = uuid.v4();
      mockTechStackService.remove.mockResolvedValue({ id });
      mockTechStackImage.getImageKey.mockResolvedValue('key1');
      mockS3Service.deleteFile.mockResolvedValue(true);
      const result = await resolver.removeTechStack(id);
      expect(result).toEqual({ id });
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(techStackImageService.getImageKey).toHaveBeenCalledTimes(1);
      expect(techStackImageService.getImageKey).toHaveBeenCalledWith(id);
      expect(s3Service.deleteFile).toHaveBeenCalledTimes(1);
      expect(s3Service.deleteFile).toHaveBeenCalledWith('key1');
    });

    it('should throw BadException error', async () => {
      const id = uuid.v4();
      mockTechStackService.remove.mockResolvedValue({ id });
      mockTechStackImage.getImageKey.mockResolvedValue('key1');
      mockS3Service.deleteFile.mockResolvedValue(() => {
        throw new Error();
      });
      try {
        await resolver.removeTechStack(id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe(errors.NOT_DELETED('TechStack'));
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
      const validInput: CreateTechStackInput = {
        ...mockTechStack,
      };
      const result = await validationPipe.transform(validInput, {
        type: 'body',
        metatype: CreateTechStackInput,
      });
      expect(result).toEqual(validInput);

      const validUpdateInput: UpdateTechStackInput = {
        id: uuid.v4(),
        techName: 'updated Name',
      };

      const resultUpdate = await validationPipe.transform(validUpdateInput, {
        type: 'body',
        metatype: UpdateTechStackInput,
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
      const invalidInput: CreateTechStackInput = {
        ...mockTechStack,
        techName: '',
      };
      try {
        await validationPipe.transform(invalidInput, {
          type: 'body',
          metatype: CreateTechStackInput,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }

      const invalidInputSvg: CreateTechStackInput = {
        ...mockTechStack,
        techSvg: 'not image'
      };
      try {
        await validationPipe.transform(invalidInput, {
          type: 'body',
          metatype: CreateTechStackInput,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }

      const invalidUpdateInput: UpdateTechStackInput = {
        id: uuid.v4(),
        techName: '',
      };

      try {
        await validationPipe.transform(invalidUpdateInput, {
          type: 'body',
          metatype: UpdateTechStackInput,
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

