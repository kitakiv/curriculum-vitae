import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { Resource } from '../roles/enums/resource.enum';
import { Action } from '../roles/enums/action.enum';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '../guards/auth.guard';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { SignUpInput } from './dto/signUp.input';
import { LoginInput } from './dto/login.input';
import { RefreshTokenInput } from './dto/refreshToken.input';
import { User } from './entities/user.entity';
import * as uuid from 'uuid';
import { ChangePasswordInput } from './dto/changePassword.input';
import {
  BadRequestException,
  ExecutionContext,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { RefreshToken } from './entities/refreshToken.entity';
import { AttachRoleInput } from './dto/attachRole.input';
import { UpdateUserInput } from './dto/updateAuth.input';
import { errors } from '../errors/errors.config';

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

const mockAuthService = {
  attachRole: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  login: jest.fn(),
  changePassword: jest.fn(),
  refreshToken: jest.fn(),
  signUp: jest.fn(),
  getUserPermissions: jest.fn(),
  update: jest.fn(),
  getUser: jest.fn(),
};

const mockJwtService = {
  verify: jest.fn(),
} as unknown as jest.Mocked<JwtService>;

const mockReflector = {
  getAllAndOverride: jest.fn(),
};
const mockUuid = uuid.v4();
const mockUser: User = {
  id: mockUuid,
  name: 'Name',
  login: 'email@gmail.com',
  password: '12345@Vika',
  role: { id: '1', name: 'admin', permissions: [] },
  refreshToken: new RefreshToken({
    token: uuid.v4(),
    expiryDate: new Date(),
  }),
};

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: Reflector,
          useValue: mockReflector,
        },
        AuthGuard,
        AuthorizationGuard,
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Public routes', () => {
    const inputSignUser: SignUpInput = {
      name: 'Name',
      login: 'email@gmail.com',
      password: '12345@Vika',
    };
    const inputLoginUser: LoginInput = {
      login: inputSignUser.login,
      password: inputSignUser.password,
    };
    const inputRefreshToken: RefreshTokenInput = {
      refreshToken: 'token',
    };
    it('should be marked as public route', () => {
      const publicMethods = [
        resolver.refreshToken,
        resolver.signup,
        resolver.login,
      ];
      publicMethods.forEach((method) => {
        const permissions = Reflect.getMetadata('permissions', method);
        expect(permissions).toBeUndefined();
      });
      publicMethods.forEach((method) => {
        const isPublic = Reflect.getMetadata('isPublic', method);
        expect(isPublic).toBe(true);
      });
    });

    it('should call signUp method', async () => {
      mockAuthService.signUp.mockResolvedValue({
        access_token: 'token',
        refresh_token: 'token',
      });
      const result = await resolver.signup(inputSignUser);
      expect(result).toEqual({
        access_token: 'token',
        refresh_token: 'token',
      });
      expect(service.signUp).toHaveBeenCalledWith(inputSignUser);
      expect(service.signUp).toHaveBeenCalledTimes(1);
    });

    it('should call login method', async () => {
      mockAuthService.login.mockResolvedValue({
        access_token: 'token',
        refresh_token: 'token',
      });
      const result = await resolver.login(inputLoginUser);
      expect(result).toEqual({
        access_token: 'token',
        refresh_token: 'token',
      });
      expect(service.login).toHaveBeenCalledWith(inputLoginUser);
      expect(service.login).toHaveBeenCalledTimes(1);
    });

    it('should call refreshToken method', async () => {
      mockAuthService.refreshToken.mockResolvedValue({
        access_token: 'token',
        refresh_token: 'token',
      });
      const result = await resolver.refreshToken(inputRefreshToken);
      expect(result).toEqual({
        access_token: 'token',
        refresh_token: 'token',
      });
      expect(service.refreshToken).toHaveBeenCalledWith('token');
      expect(service.refreshToken).toHaveBeenCalledTimes(1);
    });
  });

  describe('Private routes', () => {
    it('should be marked as private route', () => {
      const privateMethods = [
        resolver.changePassword,
        resolver.findAll,
        resolver.findOne,
        resolver.attachRole,
        resolver.update,
      ];
      privateMethods.forEach((method) => {
        const isPublic = Reflect.getMetadata('isPublic', method);
        expect(isPublic).toBeUndefined();
      });
    });

    it('Private routes should have permissions decorator', () => {
      const methods = [
        {
          method: resolver.attachRole,
          expectedResource: Resource.USER,
          expectedActions: [Action.UPDATE],
        },
        {
          method: resolver.findAll,
          expectedResource: Resource.USER,
          expectedActions: [Action.READ],
        },
        {
          method: resolver.findOne,
          expectedResource: Resource.USER,
          expectedActions: [Action.READ],
        },
      ];

      const isNotPublic = Reflect.getMetadata(
        'isPublic',
        resolver.changePassword,
      );
      expect(isNotPublic).toBeUndefined();
      const isNotPublic2 = Reflect.getMetadata('isPublic', resolver.update);
      expect(isNotPublic2).toBeUndefined();

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
    it('should find all users', async () => {
      mockAuthService.findAll.mockResolvedValue([mockUser]);
      const result = await resolver.findAll();
      expect(result).toEqual([mockUser]);
      expect(service.findAll).toHaveBeenCalledWith();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should find one user correctly', async () => {
      mockAuthService.findOne.mockResolvedValue(mockUser);
      const result = await resolver.findOne(mockUser.id);
      expect(result).toEqual(mockUser);
      expect(service.findOne).toHaveBeenCalledWith(mockUser.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const changePasswordInput: ChangePasswordInput = {
        oldPassword: 'oldPassword123',
        newPassword: 'newPassword456',
      };

      const mockUser = {
        id: 'user123',
        login: 'testuser',
        name: 'Test User',
      };

      const mockContext = {
        getArgs: jest.fn().mockReturnValue([
          {},
          {},
          { req: { userId: 'user123' } }, // context
        ]),
      } as unknown as ExecutionContext;

      mockAuthService.changePassword.mockResolvedValue(mockUser);

      const result = await resolver.changePassword(
        changePasswordInput,
        mockContext,
      );

      expect(result).toEqual(mockUser);
      expect(mockAuthService.changePassword).toHaveBeenCalledWith(
        changePasswordInput,
        'user123',
      );
      expect(mockAuthService.changePassword).toHaveBeenCalledTimes(1);
    });

    it('should throw error when userId is missign from context', async () => {
      const changePasswordInput: ChangePasswordInput = {
        oldPassword: 'oldPassword123',
        newPassword: 'newPassword456',
      };

      const mockContext = {
        getArgs: jest.fn().mockReturnValue([
          {}, // root
          {}, // args
          { req: {} }, // context without userId
        ]),
      } as unknown as ExecutionContext;

      await expect(
        resolver.changePassword(changePasswordInput, mockContext),
      ).rejects.toThrow();
    });

    it('should handle service errors', async () => {
      const changePasswordInput: ChangePasswordInput = {
        oldPassword: 'wrongPassword',
        newPassword: 'newPassword456',
      };

      const mockContext = {
        getArgs: jest.fn().mockReturnValue([
          {}, // root
          {}, // args
          { req: { userId: 'user123' } }, // context
        ]),
      } as unknown as ExecutionContext;

      const errorMessage = 'Invalid old password';
      mockAuthService.changePassword.mockRejectedValue(new Error(errorMessage));

      await expect(
        resolver.changePassword(changePasswordInput, mockContext),
      ).rejects.toThrow(errorMessage);

      expect(mockAuthService.changePassword).toHaveBeenCalledWith(
        changePasswordInput,
        'user123',
      );
    });

    it('should extract userId correctly from GraphQL context', async () => {
      const changePasswordInput: ChangePasswordInput = {
        oldPassword: 'oldPassword123',
        newPassword: 'newPassword456',
      };

      const mockUser = { id: 'user456', login: 'testuser2' };
      const mockContext = {
        getArgs: jest.fn().mockReturnValue([
          {}, // root
          {}, // args
          { req: { userId: 'user456' } }, // context with different userId
        ]),
      } as unknown as ExecutionContext;

      mockAuthService.changePassword.mockResolvedValue(mockUser);

      const result = await resolver.changePassword(
        changePasswordInput,
        mockContext,
      );
      expect(result).toEqual(mockUser);
      expect(mockAuthService.changePassword).toHaveBeenCalledWith(
        changePasswordInput,
        'user456', // Should use the userId from context
      );
    });
  });

  describe('attachRole', () => {
    it('should attach role successfully', async () => {
      const attachRoleInput: AttachRoleInput = {
        userId: 'user123',
        roleId: 'role123',
      };

      const mockUser = {
        id: 'user123',
        login: 'testuser',
        name: 'Test User',
        role: { id: 'role456', name: 'admin' },
      };

      mockAuthService.attachRole.mockResolvedValue(mockUser);

      const result = await resolver.attachRole(attachRoleInput);

      expect(result).toEqual(mockUser);
      expect(mockAuthService.attachRole).toHaveBeenCalledWith(attachRoleInput);
      expect(mockAuthService.attachRole).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors', async () => {
      const attachRoleInput: AttachRoleInput = {
        userId: 'XXXXXXX',
        roleId: 'XXXXXXX',
      };

      const errorMessage = 'Failed to attach role';
      mockAuthService.attachRole.mockRejectedValue(new Error(errorMessage));

      await expect(resolver.attachRole(attachRoleInput)).rejects.toThrow(
        errorMessage,
      );

      expect(mockAuthService.attachRole).toHaveBeenCalledWith(attachRoleInput);
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      const updateInput: UpdateUserInput = {
        name: 'UpdatedName',
      };
      const mockContext = {
        getArgs: jest.fn().mockReturnValue([
          {},
          {},
          { req: { userId: 'user123' } }, // context
        ]),
      } as unknown as ExecutionContext;
      const mockUser = {
        id: 'user123',
        login: 'testuser',
        name: 'UpdatedName',
        role: { id: 'role456', name: 'admin' },
      };

      mockAuthService.update.mockResolvedValue(mockUser);

      const result = await resolver.update(updateInput, mockContext);

      expect(result).toEqual(mockUser);
      expect(mockAuthService.update).toHaveBeenCalledWith(
        updateInput,
        'user123',
      );
      expect(mockAuthService.update).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors', async () => {
      const updateInput: UpdateUserInput = {
        name: 'UpdatedName',
      };
      const mockContext = {
        getArgs: jest.fn().mockReturnValue([
          {},
          {},
          { req: { userId: 'user123' } }, // context
        ]),
      } as unknown as ExecutionContext;

      const errorMessage = 'Failed to update user';
      mockAuthService.update.mockRejectedValue(new Error(errorMessage));

      await expect(resolver.update(updateInput, mockContext)).rejects.toThrow(
        errorMessage,
      );
    });

    it('should pass BadRequestException if userId is not found', async () => {
      const updateInput: UpdateUserInput = {
        name: 'UpdatedName',
      };
      const mockContext = {
        getArgs: jest.fn().mockReturnValue([
          {},
          {},
          { req: {} }, // context
        ]),
      } as unknown as ExecutionContext;

      mockAuthService.update.mockResolvedValue(mockUser);

      await expect(resolver.update(updateInput, mockContext)).rejects.toThrow(
        new BadRequestException(errors.NOT_FOUND('User')),
      );
    });
  });

  describe('getUser', () => {
    it('should get user successfully', async () => {
      const mockContext = {
        getArgs: jest.fn().mockReturnValue([
          {},
          {},
          { req: { userId: 'user123' } }, // context
        ]),
      } as unknown as ExecutionContext;
      const mockUser = {
        id: 'user123',
        login: 'testuser',
        name: 'Test User',
        role: { id: 'role456', name: 'admin' },
      };

      mockAuthService.getUser.mockResolvedValue(mockUser);
      const result = await resolver.getUser(mockContext);
    });

    it('should pass unauthorized exception if user is not found', async () => {
      const mockContext = {
        getArgs: jest.fn().mockReturnValue([
          {},
          {},
          { req: {} }, // context
        ]),
      } as unknown as ExecutionContext;
      mockAuthService.getUser.mockResolvedValue(mockUser);
      await expect(resolver.getUser(mockContext)).rejects.toThrow(
        new UnauthorizedException(errors.NOT_FOUND('User')),
      );
    });

    it('should return error if smth happen in server', async () => {
      const mockContext = {
        getArgs: jest.fn().mockReturnValue([
          {},
          {},
          { req: { userId: 'user123' } }, // context
        ]),
      } as unknown as ExecutionContext;
      const errorMessage = 'Failed to get user';
      mockAuthService.getUser.mockRejectedValue(new Error(errorMessage));
      await expect(resolver.getUser(mockContext)).rejects.toThrow(
        errorMessage,
      );
    })
  })

  describe('Validation Pipes', () => {
    let validationPipe: ValidationPipe;
    beforeEach(() => {
      validationPipe = new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });
    });

    it('valid signup input', async () => {
      const validInput: SignUpInput = {
        name: 'Victoria',
        login: 'testuser@gmail.com',
        password: '123Password#',
      };
      const result = await validationPipe.transform(validInput, {
        type: 'body',
        metatype: SignUpInput,
      });
      expect(result).toEqual(validInput);
    });
    it('invalid signup input', async () => {
      const invalidInput: SignUpInput = {
        name: '',
        login: '',
        password: '',
      };
      try {
        await validationPipe.transform(invalidInput, {
          type: 'body',
          metatype: SignUpInput,
        });
      } catch (error) {
        const messages = error.response.message;
        const expectedMessages = [
          'login should not be empty',
          'login must be an email',
          'name must be longer than or equal to 3 characters',
          'name should not be empty',
          'Password must contain at least one number',
          'password must be longer than or equal to 8 characters',
          'password should not be empty',
        ];
        expect(messages).toEqual(expectedMessages);
      }
    });

    it('valid login input', async () => {
      const validInput: LoginInput = {
        login: 'testuser@gmail.com',
        password: '123Password#',
      };
      const result = await validationPipe.transform(validInput, {
        type: 'body',
        metatype: LoginInput,
      });
      expect(result).toEqual(validInput);
    });

    it('invalid login input', async () => {
      const invalidInput: LoginInput = {
        login: '',
        password: '',
      };
      try {
        await validationPipe.transform(invalidInput, {
          type: 'body',
          metatype: LoginInput,
        });
      } catch (error) {
        const messages = error.response.message;
        const expectedMessages = [
          'login should not be empty',
          'login must be an email',
          'Password must contain at least one number',
          'password must be longer than or equal to 8 characters',
          'password should not be empty',
        ];
        expect(messages).toEqual(expectedMessages);
      }
    });

    it('valid refresh token input', async () => {
      const validInput: RefreshTokenInput = {
        refreshToken: uuid.v4(),
      };
      const result = await validationPipe.transform(validInput, {
        type: 'body',
        metatype: RefreshTokenInput,
      });
      expect(result).toEqual(validInput);
    });

    it('invalid refresh token input', async () => {
      const invalidInput = {
        refresToken: 'someString',
      };

      try {
        await validationPipe.transform(invalidInput, {
          type: 'body',
          metatype: RefreshTokenInput,
        });
      } catch (error) {
        const message = error.response.message;
        const expectedMessage = [
          'property refresToken should not exist',
          'refreshToken must be a UUID',
          'refreshToken must be a string',
        ];
        expect(message).toEqual(expectedMessage);
      }
    });

    it('valid change password input', async () => {
      const validInput: ChangePasswordInput = {
        oldPassword: 'oldPassword123!',
        newPassword: 'newPassword456!',
      };
      const result = await validationPipe.transform(validInput, {
        type: 'body',
        metatype: ChangePasswordInput,
      });
      expect(result).toEqual(validInput);
    });

    it('invalid change password input', async () => {
      const invalidInput = {
        oldPassword: 'oldPassword123',
        newPassword: 'newPassword456',
      };
      const invalidInput2 = {
        oldPassword: 'oldPassword',
        newPassword: 'newPassword',
      };
      const invalidInput3 = {
        oldPassword: '123',
        newPassword: '456',
      };
      try {
        await validationPipe.transform(invalidInput, {
          type: 'body',
          metatype: ChangePasswordInput,
        });
      } catch (error) {
        const message = error.response.message;
        const expectedMessage = [
          'Password must contain at least one special character',
        ];
        expect(message).toEqual(expectedMessage);
      }
      try {
        await validationPipe.transform(invalidInput2, {
          type: 'body',
          metatype: ChangePasswordInput,
        });
      } catch (error) {
        const message = error.response.message;
        const expectedMessage = ['Password must contain at least one number'];
        expect(message).toEqual(expectedMessage);
      }
      try {
        await validationPipe.transform(invalidInput3, {
          type: 'body',
          metatype: ChangePasswordInput,
        });
      } catch (error) {
        const message = error.response.message;
        const expectedMessage = [
          'oldPassword must be longer than or equal to 8 characters',
          'Password must contain at least one lowercase letter',
          'newPassword must be longer than or equal to 8 characters',
        ];
        expect(message).toEqual(expectedMessage);
      }
    });

    it('valid attach role input', async () => {
      const validInput: AttachRoleInput = {
        userId: uuid.v4(),
        roleId: uuid.v4(),
      };
      const result = await validationPipe.transform(validInput, {
        type: 'body',
        metatype: AttachRoleInput,
      });
      expect(result).toEqual(validInput);
    });

    it('invalid attach role input', async () => {
      const invalidInput = {
        userId: 'someString',
        roleId: 'someString',
      };
      try {
        await validationPipe.transform(invalidInput, {
          type: 'body',
          metatype: AttachRoleInput,
        });
      } catch (error) {
        const message = error.response.message;
        const expectedMessage = [
          'roleId must be a UUID',
          'userId must be a UUID',
        ];
        expect(message).toEqual(expectedMessage);
      }
    });

    it('valid user input', async () => {
      const validInput: UpdateUserInput = {
        name: 'ValidName',
      };
      const result = await validationPipe.transform(validInput, {
        type: 'body',
        metatype: UpdateUserInput,
      });
      expect(result).toEqual(validInput);
    });

    it('invalid user input', async () => {
      const invalidInput = {
        name: '',
      };
      try {
        await validationPipe.transform(invalidInput, {
          type: 'body',
          metatype: UpdateUserInput,
        });
      } catch (error) {
        const message = error.response.message;
        const expectedMessage = [
          'name must be longer than or equal to 3 characters',
        ];
        expect(message).toEqual(expectedMessage);
      }
    });
  });
});
