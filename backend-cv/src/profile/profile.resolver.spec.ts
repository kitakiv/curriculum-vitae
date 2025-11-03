import { Test, TestingModule } from '@nestjs/testing';
import {
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { UpdateProfileInput } from './dto/update-profile.input';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { AuthService } from '../auth/auth.service';
import * as uuid from 'uuid';

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
  PermissionGuard: jest.fn(() => () => {}),
  IS_PERMISSION_KEY: 'permissions',
}));

jest.mock('./entities/profile.entity', () => ({
  Profile: jest.fn().mockImplementation((data) => ({
    id: uuid,
    name: 'John',
    surname: 'Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    location: 'New York',
    typingText: 'Software Developer',
    profilePhotos: ['photo1.jpg', 'photo2.jpg'],
    ...data,
  })),
}));
describe('ProfileResolver', () => {
  let resolver: ProfileResolver;
  let service: ProfileService;
  let authorizationGuard: AuthorizationGuard;

  const mockProfile = {
    id: '1',
    name: 'John',
    surname: 'Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    location: 'New York',
    typingText: 'Software Developer',
    profilePhotos: ['photo1.jpg', 'photo2.jpg'],
  };

  const mockProfileService = {
    find: jest.fn(),
    update: jest.fn(),
  };

  const mockAuthService = {
    getUserPermissions: jest.fn(),
  };

  const mockReflector = {
    getAllAndOverride: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileResolver,
        {
          provide: ProfileService,
          useValue: mockProfileService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: Reflector,
          useValue: mockReflector,
        },
        AuthorizationGuard,
      ],
    }).compile();

    resolver = module.get<ProfileResolver>(ProfileResolver);
    service = module.get<ProfileService>(ProfileService);
    authorizationGuard = module.get<AuthorizationGuard>(AuthorizationGuard);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should return a profile (public route)', async () => {
      mockProfileService.find.mockResolvedValue(mockProfile);

      const result = await resolver.find();

      expect(result).toEqual(mockProfile);
      expect(service.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateProfile', () => {
    it('should update and return a profile when authorized', async () => {
      const updateInput: UpdateProfileInput = {
        name: 'Jane',
        email: 'jane@example.com',
      };

      const updatedProfile = { ...mockProfile, ...updateInput };
      mockProfileService.update.mockResolvedValue(updatedProfile);

      const result = await resolver.updateProfile(updateInput);

      expect(result).toEqual(updatedProfile);
      expect(service.update).toHaveBeenCalledWith(updateInput);
    });
  });

  describe('AuthorizationGuard', () => {
    let mockExecutionContext: Partial<ExecutionContext>;

    beforeEach(() => {
      mockExecutionContext = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        getType: jest.fn().mockReturnValue('graphql'),
        getArgs: jest
          .fn()
          .mockReturnValue([{}, {}, { req: { userId: 'user123' } }]),
      };
    });

    it('should allow access when user has required permissions', async () => {
      mockReflector.getAllAndOverride.mockReturnValue([
        { resource: 'PROFILE', actions: ['UPDATE'] },
      ]);

      mockAuthService.getUserPermissions.mockResolvedValue([
        { resource: 'PROFILE', actions: ['UPDATE', 'READ'] },
      ]);

      const result = await authorizationGuard.canActivate(
        mockExecutionContext as ExecutionContext,
      );

      expect(result).toBe(true);
      expect(mockAuthService.getUserPermissions).toHaveBeenCalledWith(
        'user123',
      );
    });

    it('should deny access when user lacks required permissions', async () => {
      mockReflector.getAllAndOverride.mockReturnValue([
        { resource: 'PROFILE', actions: ['UPDATE'] },
      ]);

      mockAuthService.getUserPermissions.mockResolvedValue([
        { resource: 'PROFILE', actions: ['READ'] }, // Missing UPDATE permission
      ]);

      await expect(
        authorizationGuard.canActivate(
          mockExecutionContext as ExecutionContext,
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should deny access when user has no permissions for resource', async () => {
      mockReflector.getAllAndOverride.mockReturnValue([
        { resource: 'PROFILE', actions: ['UPDATE'] },
      ]);

      mockAuthService.getUserPermissions.mockResolvedValue([
        { resource: 'OTHER_RESOURCE', actions: ['UPDATE'] },
      ]);

      await expect(
        authorizationGuard.canActivate(
          mockExecutionContext as ExecutionContext,
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should allow access when no permissions required (public route)', async () => {
      mockReflector.getAllAndOverride.mockReturnValue(undefined);

      const result = await authorizationGuard.canActivate(
        mockExecutionContext as ExecutionContext,
      );

      expect(result).toBe(true);
    });

    it('should throw UnauthorizedException when userId is missing', async () => {
      mockExecutionContext.getArgs = jest
        .fn()
        .mockReturnValue([{}, {}, { req: {} }]);
      mockReflector.getAllAndOverride.mockReturnValue([
        { resource: 'PROFILE', actions: ['UPDATE'] },
      ]);

      await expect(
        authorizationGuard.canActivate(
          mockExecutionContext as ExecutionContext,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('Input Validation', () => {
    it('should handle valid update input', async () => {
      const validInput: UpdateProfileInput = {
        name: 'Valid Name',
        email: 'valid@email.com',
        phone: '+1234567890',
      };

      mockProfileService.update.mockResolvedValue({
        ...mockProfile,
        ...validInput,
      });

      const result = await resolver.updateProfile(validInput);

      expect(result.name).toBe('Valid Name');
      expect(result.email).toBe('valid@email.com');
    });

    it('should handle partial update input', async () => {
      const partialInput: UpdateProfileInput = {
        name: 'New Name Only',
      };

      mockProfileService.update.mockResolvedValue({
        ...mockProfile,
        name: 'New Name Only',
      });

      const result = await resolver.updateProfile(partialInput);

      expect(result.name).toBe('New Name Only');
      expect(service.update).toHaveBeenCalledWith(partialInput);
    });
  });

  describe('Input Validation', () => {
    it('should throw BadRequestException for invalid email', async () => {
      const invalidInput = new UpdateProfileInput();
      invalidInput.name = 'Valid Name';
      invalidInput.email = 'invalid-email'; // Invalid email format

      // Create validation pipe instance
      const validationPipe = new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      // Manually validate the input
      await expect(
        validationPipe.transform(invalidInput, {
          type: 'body',
          metatype: UpdateProfileInput,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
