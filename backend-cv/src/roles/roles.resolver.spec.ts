import { Test, TestingModule } from '@nestjs/testing';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { Action } from '../roles/enums/action.enum';
import { Resource } from '../roles/enums/resource.enum';
import {
  BadRequestException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { errors } from '../errors/errors.config';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import * as uuid from 'uuid';

const mockPermission = new Permission({
  resource: Resource.USER,
  actions: [Action.CREATE],
});
const mockRole = new Role({
  name: 'name',
  permissions: [mockPermission],
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

const mockRolesService = {
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

describe('RolesResolver', () => {
  let resolver: RolesResolver;
  let service: RolesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesResolver,
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
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

    resolver = module.get<RolesResolver>(RolesResolver);
    service = module.get<RolesService>(RolesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Private routes', () => {
    it('should be marked as private route', () => {
      const isPublicUpdate = Reflect.getMetadata(
        'isPublic',
        resolver.updateRole,
      );
      expect(isPublicUpdate).toBe(undefined);
      const isPublicDelete = Reflect.getMetadata(
        'isPublic',
        resolver.removeRole,
      );
      expect(isPublicDelete).toBe(undefined);
      const isPublicCreate = Reflect.getMetadata(
        'isPublic',
        resolver.createRole,
      );
      expect(isPublicCreate).toBe(undefined);
      const isPublicFindAll = Reflect.getMetadata('isPublic', resolver.findAll);
      expect(isPublicFindAll).toBe(undefined);
      const isPublicFindOne = Reflect.getMetadata('isPublic', resolver.findOne);
      expect(isPublicFindOne).toBe(undefined);
    });

    it('Private routes should have permissions decorator', () => {
      const methods = [
        {
          method: resolver.createRole,
          expectedResource: Resource.ROLE,
          expectedActions: [Action.CREATE],
        },
        {
          method: resolver.updateRole,
          expectedResource: Resource.ROLE,
          expectedActions: [Action.UPDATE],
        },
        {
          method: resolver.removeRole,
          expectedResource: Resource.ROLE,
          expectedActions: [Action.DELETE],
        },
      ];

      methods.forEach(({ method, expectedResource, expectedActions }) => {
        const permissions = Reflect.getMetadata('permissions', method);
        expect(permissions).toBeDefined();
        expect(permissions[0].resource).toBe(expectedResource);
        expect(permissions[0].actions).toContainEqual(expectedActions[0]);
        expectedActions.forEach((action) => {
          expect(permissions[0].actions).toContain(action);
        });
      });
    });
  });

  describe('Private routes', () => {
    it('should create role', async () => {
      const createRoleInput: CreateRoleInput = {
        ...mockRole,
      };
      mockRolesService.create.mockResolvedValue(mockRole);
      const result = await resolver.createRole(createRoleInput);
      expect(result).toEqual(mockRole);
      expect(service.create).toHaveBeenCalledWith(createRoleInput);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should update role', async () => {
      const updateRoleInput: UpdateRoleInput = {
        id: uuid.v4(),
        name: 'updated Name',
      };
      const updateMockRole = { ...mockRole, ...updateRoleInput };
      mockRolesService.update.mockResolvedValue(updateMockRole);
      const result = await resolver.updateRole(updateRoleInput);
      expect(result).toEqual(updateMockRole);
      expect(service.update).toHaveBeenCalledWith(
        updateRoleInput.id,
        updateRoleInput,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should remove role', async () => {
      const id = uuid.v4();
      mockRolesService.remove.mockResolvedValue({ id });
      const result = await resolver.removeRole(id);
      expect(result).toEqual({ id });
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });

    it('should find all roles', async () => {
      const roles = [mockRole];
      mockRolesService.findAll.mockResolvedValue(roles);
      const result = await resolver.findAll();
      expect(result).toEqual(roles);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should find one role by id', async () => {
      const id = uuid.v4();
      mockRolesService.findOne.mockResolvedValue(mockRole);
      const result = await resolver.findOne(id);
      expect(result).toEqual(mockRole);
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException error', async () => {
      const id = uuid.v4();
      mockRolesService.remove.mockResolvedValue(() => {
        throw new NotFoundException(errors.NOT_FOUND('Role'));
      });
      try {
        await resolver.removeRole(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(errors.NOT_FOUND('Role'));
      }
    });

    it('should throw NotFoundException error', async () => {
      const id = uuid.v4();
      mockRolesService.findOne.mockResolvedValue(() => {
        throw new NotFoundException(errors.NOT_FOUND('Role'));
      });
      try {
        await resolver.findOne(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(errors.NOT_FOUND('Role'));
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
      const validInput: CreateRoleInput = {
        ...mockRole,
      };
      const result = await validationPipe.transform(validInput, {
        type: 'body',
        metatype: CreateRoleInput,
      });
      expect(result).toEqual(validInput);

      const validUpdateInput: UpdateRoleInput = {
        id: uuid.v4(),
        name: 'updated Name',
      };

      const resultUpdate = await validationPipe.transform(validUpdateInput, {
        type: 'body',
        metatype: UpdateRoleInput,
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
      const invalidInput = {
        ...mockRole,
        name: 11,
      };
      try {
        await validationPipe.transform(invalidInput, {
          type: 'body',
          metatype: CreateRoleInput,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }

      const invalidUpdateInput = {
        id: uuid.v4(),
        name: 11,
        permissions: [
          {
            ...mockPermission,
            actions: ['hello'],
          },
        ],
      };

      try {
        await validationPipe.transform(invalidUpdateInput, {
          type: 'body',
          metatype: UpdateRoleInput,
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
