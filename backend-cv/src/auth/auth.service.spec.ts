import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refreshToken.entity';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { signUpInput } from './dto/signUp.input';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { LoginInput } from './dto/login.input';
import { ChangePasswordInput } from './dto/changePassword.input';
import { Permission } from '../roles/entities/permission.entity';
import { Resource } from '../roles/enums/resource.enum';
import { Action } from '../roles/enums/action.enum';
import { AttachRoleInput } from './dto/attachRole.input';
import { UpdateUserInput } from './dto/updateAuth.input';
import { errors } from '../errors/errors.config';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));
const mockedUuid = uuid as jest.Mocked<typeof uuid>;
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  existsBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
};

const mockRoleRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  existsBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockRefreshTokenRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  existsBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockLogger = {
  log: jest.fn(),
  error: jest.fn(),
} as unknown as jest.Mocked<Logger>;

const mockJwtService = {
  sign: jest.fn(),
} as unknown as jest.Mocked<JwtService>;

const mockConfigService = {
  get: jest.fn(),
} as unknown as jest.Mocked<ConfigService>;

const mockUuid = uuid.v4();

const mockUser: User = {
  id: mockUuid,
  login: 'email@gmail.com',
  password: '12345@Vika',
  name: 'Name',
  role: null,
  refreshToken: null,
};

const mockPermission: Permission = new Permission({
  resource: Resource.USER,
  actions: [Action.CREATE],
});

const mockRole: Role = {
  id: mockUuid,
  name: 'admin',
  permissions: [mockPermission],
};
const mockUuidRefreshToken = uuid.v4();
const mockRefreshToken: RefreshToken = new RefreshToken({
  id: mockUuidRefreshToken,
  token: mockUuid,
  expiryDate: new Date(),
});

const hashedPassword = 'hashedPassword';
const accessToken = 'access-token';
const refreshToken = 'refresh-token';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
        {
          provide: getRepositoryToken(RefreshToken),
          useValue: mockRefreshTokenRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: Logger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    const signUpInput: signUpInput = {
      name: 'Name',
      login: 'email@gmail.com',
      password: '12345@Vika',
    };
    it('should create a new user and return a token', async () => {
      // check if user with the same login already exists
      mockUserRepository.findOneBy.mockResolvedValueOnce(null);
      // create hash password
      mockedBcrypt.hash.mockResolvedValue(hashedPassword as never);
      // create save user with hashed password
      mockUserRepository.save.mockResolvedValue({
        ...signUpInput,
        password: hashedPassword,
        id: mockUuid,
      });
      const createdUser = {
        ...signUpInput,
        password: hashedPassword,
        id: mockUuid,
      };
      mockUserRepository.create.mockResolvedValue(createdUser);
      // create access token each time
      mockJwtService.sign.mockReturnValue(accessToken as never);
      // create refresh token
      mockedUuid.v4.mockReturnValue(refreshToken);
      // store refresh token for the user for the first time
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(null);
      // for the first time we need create and save to the DB for such user
      mockRefreshTokenRepository.create.mockReturnValue({
        token: refreshToken,
        expiryDate: new Date(),
      });
      mockRefreshTokenRepository.save.mockResolvedValue({
        token: refreshToken,
        expiryDate: new Date(),
      });
      const result = await service.signUp(signUpInput);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        login: signUpInput.login,
      });
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...signUpInput,
        password: hashedPassword,
      });
      expect(mockedBcrypt.hash).toHaveBeenCalledWith(signUpInput.password, 10);
      expect(mockJwtService.sign).toHaveBeenCalledWith({ userId: mockUuid });
      expect(mockedUuid.v4).toHaveBeenCalled();
      expect(mockRefreshTokenRepository.create).toHaveBeenCalledWith({
        token: refreshToken,
        expiryDate: expect.any(Date),
        user: {
          ...signUpInput,
          id: mockUuid,
          password: hashedPassword,
        },
      });
      expect(mockRefreshTokenRepository.save).toHaveBeenCalled();
      expect(result).toEqual({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    });

    it('should throw HttpException if user already exists', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      const promise = service.signUp(signUpInput);
      await expect(promise).rejects.toThrow(errors.EMAIL_EXISTS);
      await expect(promise).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should throw bad request exception if something went wrong in the DB', async () => {
      mockUserRepository.findOneBy.mockResolvedValueOnce(null);
      mockedBcrypt.hash.mockResolvedValue(hashedPassword as never);
      mockUserRepository.save.mockRejectedValue(new Error('DB Error'));
      const promise = service.signUp(signUpInput);
      await expect(promise).rejects.toThrow(errors.NOT_CREATED('User'));
      await expect(promise).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should hash password and save in database', async () => {
      mockUserRepository.findOneBy.mockResolvedValueOnce(null);
      mockedBcrypt.hash.mockResolvedValue(hashedPassword as never);
      mockUserRepository.save.mockResolvedValue({
        ...mockUser,
        password: hashedPassword,
      });
      const createdUser = {
        ...signUpInput,
        password: hashedPassword,
        id: mockUuid,
      };
      mockUserRepository.create.mockResolvedValue(createdUser);
      // create access token each time
      mockJwtService.sign.mockReturnValue(accessToken as never);
      // create refresh token
      mockedUuid.v4.mockReturnValue(refreshToken);
      // store refresh token for the user for the first time
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(null);
      // for the first time we need create and save to the DB for such user
      mockRefreshTokenRepository.create.mockReturnValue({
        token: refreshToken,
        expiryDate: new Date(),
      });
      mockRefreshTokenRepository.save.mockResolvedValue({
        token: refreshToken,
        expiryDate: new Date(),
      });
      await service.signUp(signUpInput);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...signUpInput,
        password: hashedPassword,
      });
    });

    it('should throw error if token isn`t stored in DB', async () => {
      mockUserRepository.findOneBy.mockResolvedValueOnce(null);
      mockedBcrypt.hash.mockResolvedValue(hashedPassword as never);
      mockUserRepository.save.mockResolvedValue({
        ...mockUser,
        password: hashedPassword,
      });
      const createdUser = {
        ...signUpInput,
        password: hashedPassword,
        id: mockUuid,
      };
      mockUserRepository.create.mockResolvedValue(createdUser);
      mockJwtService.sign.mockReturnValue(accessToken as never);
      mockedUuid.v4.mockReturnValue(refreshToken);
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(null);
      mockRefreshTokenRepository.create.mockReturnValue({
        token: refreshToken,
        expiryDate: new Date(),
      });
      mockRefreshTokenRepository.save.mockRejectedValue(new Error('DB Error'));
      await expect(service.signUp(signUpInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('login', () => {
    const loginInput: LoginInput = {
      login: mockUser.login,
      password: mockUser.password,
    };

    it('should user login correctly with valid credentials', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue(accessToken as never);
      mockedUuid.v4.mockReturnValue(refreshToken);
      mockedBcrypt.compare.mockReturnValue(true as never);
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(null);
      mockRefreshTokenRepository.create.mockReturnValue({
        token: refreshToken,
        expiryDate: new Date(),
      });
      mockRefreshTokenRepository.save.mockResolvedValue({
        token: refreshToken,
        expiryDate: new Date(),
      });

      const result = await service.login(loginInput);

      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        login: loginInput.login,
      });
      expect(mockUserRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockJwtService.sign).toHaveBeenCalledWith({ userId: mockUser.id });
      expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
      expect(mockedUuid.v4).toHaveBeenCalledTimes(1);
      expect(mockRefreshTokenRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockRefreshTokenRepository.findOneBy).toHaveBeenCalledWith({
        user: mockUser,
      });
      expect(mockRefreshTokenRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRefreshTokenRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    });

    it('should return unauthorized error if user not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);
      await expect(service.login(loginInput)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return unauthorized error if password is invalid', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      mockedBcrypt.compare.mockReturnValue(false as never);
      await expect(service.login(loginInput)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return bad request error if token isn`t stored in DB', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      mockedBcrypt.compare.mockReturnValue(true as never);
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(null);
      mockRefreshTokenRepository.save.mockRejectedValue(
        new Error('DB Error'),
      );
      await expect(service.login(loginInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('storeRefreshToken', () => {
    const loginInput: LoginInput = {
      login: mockUser.login,
      password: mockUser.password,
    };
    beforeEach(() => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue(accessToken as never);
      mockedUuid.v4.mockReturnValue(refreshToken);
      mockedBcrypt.compare.mockResolvedValue(true as never);
    });

    it('should store refresh token for the user if not exist', async () => {
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(null);
      mockRefreshTokenRepository.create.mockReturnValue({
        token: refreshToken,
        expiryDate: new Date(),
      });
      mockRefreshTokenRepository.save.mockResolvedValue({
        token: refreshToken,
        expiryDate: new Date(),
      });

      await service.login(loginInput);

      expect(mockRefreshTokenRepository.findOneBy).toHaveBeenCalledWith({
        user: mockUser,
      });
      expect(mockRefreshTokenRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRefreshTokenRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should update token if it exist', async () => {
      mockedUuid.v4.mockReturnValue('refresh-uuid-token-updated');
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(mockRefreshToken);
      mockRefreshTokenRepository.update.mockResolvedValue({
        token: 'refresh-uuid-token-updated',
        expiryDate: new Date(),
      });
      await service.login(loginInput);
      expect(mockRefreshTokenRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRefreshTokenRepository.update).toHaveBeenCalledWith(
        mockRefreshToken.id,
        {
          token: 'refresh-uuid-token-updated',
          expiryDate: expect.any(Date),
        },
      );
    });

    it('should return bad request error if token isn`t stored in DB', async () => {
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(null);
      mockRefreshTokenRepository.save.mockRejectedValue(new Error('DB Error'));
      const promise = service.login(loginInput);
      await expect(promise).rejects.toThrow(
        errors.NOT_CREATED('Refresh token'),
      );
      await expect(promise).rejects.toBeInstanceOf(BadRequestException);
      expect(mockRefreshTokenRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('changePassword', () => {
    const changePasswordInput: ChangePasswordInput = {
      oldPassword: 'XXXXXXXXXXX',
      newPassword: 'XXXXXXXXXXX',
    };
    const userId = mockUuid;
    it('should change password successfully', async () => {
      mockUserRepository.findOneBy.mockResolvedValue({
        ...mockUser,
        password: hashedPassword,
        id: mockUuid,
      });
      mockedBcrypt.compare.mockReturnValue(true as never);
      mockedBcrypt.hash.mockReturnValue('hashedPassword-new-hashed' as never);
      mockUserRepository.update.mockResolvedValue({
        ...mockUser,
        password: 'hashedPassword-new-hashed',
        id: mockUuid,
      });
      await service.changePassword(changePasswordInput, userId);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: userId,
      });
      expect(mockedBcrypt.compare).toHaveBeenCalledTimes(1);
      expect(mockedBcrypt.compare).toHaveBeenCalledWith(
        changePasswordInput.oldPassword,
        hashedPassword,
      );
      expect(mockedBcrypt.hash).toHaveBeenCalledTimes(1);
      expect(mockedBcrypt.hash).toHaveBeenCalledWith(
        changePasswordInput.newPassword,
        10,
      );
      expect(mockUserRepository.update).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.update).toHaveBeenCalledWith(mockUser.id, {
        password: 'hashedPassword-new-hashed',
      });
    });

    it('should throw error if user not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);
      await expect(
        service.changePassword(changePasswordInput, userId),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw error if old password is invalid', async () => {
      mockUserRepository.findOneBy.mockResolvedValue({
        ...mockUser,
        password: hashedPassword,
        id: mockUuid,
      });
      mockedBcrypt.compare.mockReturnValue(false as never);
      await expect(
        service.changePassword(changePasswordInput, userId),
      ).rejects.toThrow(UnauthorizedException);
      expect(mockedBcrypt.compare).toHaveBeenCalledTimes(1);
      expect(mockedBcrypt.compare).toHaveBeenCalledWith(
        changePasswordInput.oldPassword,
        hashedPassword,
      );
    });

    it('should throw error if something went wrong while updating', async () => {
      mockUserRepository.findOneBy.mockResolvedValue({
        ...mockUser,
        password: 'XXXXXXXXXXXXXX',
        id: mockUuid,
      });
      mockedBcrypt.compare.mockResolvedValue(true as never);
      mockedBcrypt.hash.mockReturnValue('hashedPassword-new-hashed' as never);
      mockUserRepository.update.mockRejectedValue(new Error('DB Error'));
      await expect(
        service.changePassword(changePasswordInput, userId),
      ).rejects.toThrow(BadRequestException);
      expect(mockedBcrypt.compare).toHaveBeenCalledTimes(1);
      expect(mockedBcrypt.hash).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.update).toHaveBeenCalledWith(mockUser.id, {
        password: 'hashedPassword-new-hashed',
      });
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      mockUserRepository.find.mockResolvedValue([mockUser]);
      const result = await service.findAll();
      expect(result).toEqual([mockUser]);
      expect(mockUserRepository.find).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.find).toHaveBeenCalledWith({
        relations: {
          role: {
            permissions: true,
          },
        },
      });
    });
  });

  describe('findOne', () => {
    it('should find one user', async () => {
      mockUserRepository.findOne.mockResolvedValue({
        ...mockUser,
        id: mockUuid,
      });
      const result = await service.findOne(mockUser.login);
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: {
          login: mockUser.login,
        },
        relations: {
          role: {
            permissions: true,
          },
        },
      });
    });

    it('should throw error if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(mockUser.login)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: {
          login: mockUser.login,
        },
        relations: {
          role: {
            permissions: true,
          },
        },
      });
    });
  });

  describe('getUserPermissions', () => {
    it('should get user permissions', async () => {
      mockUserRepository.findOne.mockResolvedValue({
        ...mockUser,
        id: mockUuid,
        role: mockRole,
      });
      const result = await service.getUserPermissions(mockUuid);
      expect(result).toEqual(mockRole.permissions);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: mockUuid,
        },
        relations: {
          role: {
            permissions: true,
          },
        },
      });
    });

    it('should throw error if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.getUserPermissions(mockUuid)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: mockUuid,
        },
        relations: {
          role: {
            permissions: true,
          },
        },
      });
    });
  });

  describe('attachRole', () => {
    const attachRoleInput: AttachRoleInput = {
      userId: 'user-uuid',
      roleId: 'role-uuid',
    };
    it('should attach role successfully', async () => {
      mockUserRepository.findOneBy.mockResolvedValue({
        ...mockUser,
        id: 'user-uuid',
      });
      mockRoleRepository.findOneBy.mockResolvedValue({
        ...mockRole,
        id: 'role-uuid',
      });
      mockUserRepository.update.mockResolvedValue({
        ...mockUser,
        role: {
          ...mockRole,
          id: 'role-uuid',
        },
      });
      mockUserRepository.findOne.mockResolvedValue({
        ...mockUser,
        id: 'user-uuid',
        role: {
          ...mockRole,
          id: 'role-uuid',
        },
      });
      const result = await service.attachRole(attachRoleInput);
      expect(result).toEqual({
        ...mockUser,
        id: 'user-uuid',
        role: {
          ...mockRole,
          id: 'role-uuid',
        },
      });

      expect(mockUserRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: 'user-uuid',
      });
      expect(mockRoleRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockRoleRepository.findOneBy).toHaveBeenCalledWith({
        id: 'role-uuid',
      });
      expect(mockUserRepository.update).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.update).toHaveBeenCalledWith('user-uuid', {
        role: {
          ...mockRole,
          id: 'role-uuid',
        },
      });
    });

    it('should throw error if user not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);
      await expect(service.attachRole(attachRoleInput)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: 'user-uuid',
      });
    });

    it('should throw error if role not found', async () => {
      mockRoleRepository.findOneBy.mockResolvedValue(null);
      mockUserRepository.findOneBy.mockResolvedValue({
        ...mockUser,
        id: 'user-uuid',
      });
      await expect(service.attachRole(attachRoleInput)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockRoleRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockRoleRepository.findOneBy).toHaveBeenCalledWith({
        id: 'role-uuid',
      });
    });

    it('should throw error if something went wrong', async () => {
      mockUserRepository.findOneBy.mockResolvedValue({
        ...mockUser,
        id: 'user-uuid',
      });
      mockRoleRepository.findOneBy.mockResolvedValue({
        ...mockRole,
        id: 'role-uuid',
      });
      mockUserRepository.update.mockRejectedValue(new Error('DB Error'));
      await expect(service.attachRole(attachRoleInput)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockUserRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: 'user-uuid',
      });
      expect(mockRoleRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockRoleRepository.findOneBy).toHaveBeenCalledWith({
        id: 'role-uuid',
      });
      expect(mockUserRepository.update).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.update).toHaveBeenCalledWith('user-uuid', {
        role: {
          ...mockRole,
          id: 'role-uuid',
        },
      });
    });
  });

  describe('update', () => {
    const updateUserInput: UpdateUserInput = {
      name: 'new-name',
    };
    const userId = 'user-uuid';
    it('should update user successfully', async () => {
      mockUserRepository.findOneBy.mockResolvedValue({
        ...mockUser,
        id: userId,
      });
      mockUserRepository.update.mockResolvedValue({
        ...mockUser,
        name: 'new-name',
      });
      mockUserRepository.findOne.mockResolvedValue({
        ...mockUser,
        id: userId,
        name: 'new-name',
      });
      const result = await service.update(updateUserInput, userId);
      expect(result).toEqual({
        ...mockUser,
        id: userId,
        name: 'new-name',
      });
      expect(mockUserRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: userId,
      });
      expect(mockUserRepository.update).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.update).toHaveBeenCalledWith(userId, {
        name: 'new-name',
      });
    });

    it('should throw error if user not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);
      await expect(service.update(updateUserInput, userId)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockUserRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: userId,
      });
    });

    it('should throw error if something went wrong', async () => {
      mockUserRepository.findOneBy.mockResolvedValue({
        ...mockUser,
        id: userId,
      });
      mockUserRepository.update.mockRejectedValue(new Error('DB Error'));
      await expect(service.update(updateUserInput, userId)).rejects.toThrow(
        errors.NOT_UPDATED('User'),
      );
      await expect(
        service.update(updateUserInput, userId),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('createAdminRole', () => {
    it('should create admin role successfully', async () => {
      mockRoleRepository.create.mockReturnValue(mockRole);
      mockRoleRepository.save.mockResolvedValue(mockRole);
      const result = await service['createAdminRole']();
      expect(result).toEqual(mockRole);
      expect(mockRoleRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRoleRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should delete existing admin role and create new one', async () => {
      mockRoleRepository.create.mockReturnValue(mockRole);
      mockRoleRepository.save.mockResolvedValue(mockRole);
      mockRoleRepository.findOneBy.mockResolvedValue(mockRole);
      mockRoleRepository.delete.mockResolvedValue(null);
      const result = await service['createAdminRole']();
      expect(result).toEqual(mockRole);
      expect(mockRoleRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRoleRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRoleRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockRoleRepository.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('onModuleInit', () => {
    const mockAdminUser = {
      login: 'admin',
      password: 'admin-password',
    };
    const passwordHashed = hashedPassword;
    const userUuid = 'user-uuid';
    const roleUuid = 'role-uuid';
    it('should create admin user if not exists', async () => {
      mockConfigService.get.mockReturnValueOnce(mockAdminUser.login);
      mockConfigService.get.mockReturnValueOnce(mockAdminUser.password);
      mockUserRepository.findOneBy
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          name: expect.any(String),
          login: mockAdminUser.login,
          id: userUuid,
          role: {
            id: roleUuid,
            ...mockRole,
          },
        });
      mockedBcrypt.hash.mockResolvedValue(passwordHashed as never);
      mockUserRepository.create.mockReturnValue({
        login: mockAdminUser.login,
        name: expect.any(String),
        password: passwordHashed,
        id: userUuid,
      });
      mockUserRepository.save.mockResolvedValue({
        login: mockAdminUser.login,
        name: expect.any(String),
        password: passwordHashed,
        id: userUuid,
      });
      mockRoleRepository.findOneBy.mockResolvedValue(null);
      mockRoleRepository.create.mockReturnValue({
        ...mockRole,
        id: roleUuid,
      });
      mockRoleRepository.save.mockResolvedValue({
        ...mockRole,
        id: roleUuid,
      });
      mockRoleRepository.findOneBy.mockResolvedValue({
        ...mockRole,
        id: roleUuid,
      });
      mockUserRepository.update.mockResolvedValue({
        login: mockAdminUser.login,
        name: expect.any(String),
        id: userUuid,
        role: {
          id: roleUuid,
          ...mockRole,
        },
      });
      await service.onModuleInit();
      expect(mockConfigService.get).toHaveBeenCalledTimes(2);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledTimes(2);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        login: mockAdminUser.login,
      });
      expect(mockRoleRepository.findOneBy).toHaveBeenCalledWith({
        name: expect.any(String),
      });
      expect(mockedBcrypt.hash).toHaveBeenCalledTimes(1);
      expect(mockedBcrypt.hash).toHaveBeenCalledWith(
        mockAdminUser.password,
        expect.any(Number),
      );
      expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...mockAdminUser,
        name: expect.any(String),
        password: passwordHashed,
      });
      expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.save).toHaveBeenCalledWith({
        ...mockAdminUser,
        name: expect.any(String),
        password: passwordHashed,
      });
      expect(mockRoleRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRoleRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRoleRepository.findOneBy).toHaveBeenCalledTimes(2);
      expect(mockRoleRepository.findOneBy).toHaveBeenCalledWith({
        id: roleUuid,
      });
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: userUuid,
      });
      expect(mockUserRepository.update).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.update).toHaveBeenCalledWith(userUuid, {
        role: {
          ...mockRole,
          id: roleUuid,
        },
      });
    });

    it('should not create admin user if exists', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      mockConfigService.get.mockReturnValueOnce('admin');
      mockConfigService.get.mockReturnValueOnce('admin-password');
      await service.onModuleInit();
      expect(mockUserRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        login: 'admin',
      });
    });
  });

  describe('getUser', () => {
    it('should return user correctly by id', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      const result = await service.getUser(mockUser.id);
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: mockUser.id,
        },
      });
    });

    it('should throw error if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.getUser(mockUser.id)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: mockUser.id,
        },
      });
    })
  });
});
