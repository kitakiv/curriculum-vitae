import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpInput } from './dto/signUp.input';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/login.input';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refreshToken.entity';
import * as uuid from 'uuid';
import { ChangePasswordInput } from './dto/changePassword.input';
import { Role } from '../roles/entities/role.entity';
import { AttachRoleInput } from './dto/attachRole.input';
import { UpdateUserInput } from './dto/updateAuth.input';
import { ConfigService } from '@nestjs/config';
import { errors } from '../errors/errors.config';
import { expiryDate } from '../common/constants';
import { DataSource } from 'typeorm';
import { REFRESH_TOKEN_EXPIRATION_DAYS } from '../common/constants';
import { CookiesData } from './entities/cookiesData.type';
import { Sign } from './entities/sign.type';
import { CreatePermissionInput } from '../roles/dto/create-role.input';
import { SignUpGoogleInput } from './dto/signUpGoogle';
import { randomBytes } from 'crypto';
import { UserProvider } from 'src/common/types/types';
import { LoginGoogleInput } from './dto/loginGoogle.input';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: Logger = new Logger(AuthService.name),
    private readonly emailService: EmailService
  ) {}
  async signUp(createAuthInput: SignUpInput): Promise<boolean> {
    const emailInUse = await this.userRepository.findOneBy({
      login: createAuthInput.login,
    });
    if (emailInUse) {
      throw new BadRequestException(errors.EMAIL_EXISTS);
    }
    try {
      const createdUser = await this.createUser(createAuthInput);
      await this.emailService.sendVerificationEmail(
        createdUser.login,
        createdUser.verificationToken,
        createdUser.name
      );
      return true;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_CREATED('User'));
    }
  }

  private async createUser(
    createAuthInput: SignUpInput | SignUpGoogleInput,
  ): Promise<User> {
    let password: string | null;
    let verificationToken: string | null;
    if (createAuthInput instanceof SignUpGoogleInput) {
      password = null;
      verificationToken = null
    } else if (createAuthInput instanceof SignUpInput) {
      password = await this.createHashPassword(createAuthInput.password);
      verificationToken = randomBytes(32).toString('hex');
    }
    try {
      const createdUser = await this.dataSource.transaction(async (manager) => {
        const user = await manager.create(User, {
          ...createAuthInput,
          password: password,
          verificationToken: verificationToken
        });
        await manager.save(User, user);
        return user;
      });
      return createdUser;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_CREATED('User'));
    }
  }

  private async createHashPassword(password: string): Promise<string> {
    const saltOrRound = 10;
    return await bcrypt.hash(password, saltOrRound);
  }

  async login(loginInput: LoginInput): Promise<CookiesData> {
    const { login, password } = loginInput;
    const user = await this.checkCredentials(login, password);
    const tokens = await this.generateToken(user);
    if (!tokens) {
      throw new BadRequestException(errors.NOT_CREATED('Tokens'));
    }
    return { user, tokens } as CookiesData;
  }

  async checkCredentials(login: string, password: string) {
    const user = await this.userRepository.findOneBy({ login });
    if (!user) {
      throw new UnauthorizedException(errors.SIGNUP(login));
    }
    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(errors.INVALID_CREDENTIALS('password'));
    }
    return user;
  }

  private async generateToken(user: User): Promise<Sign> {
    const accessToken = this.jwtService.sign({ userId: user.id });
    const refreshToken = uuid.v4();
    try {
      await this.storeRefreshToken(user, refreshToken);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return { accessToken, refreshToken } as Sign;
  }

  private async findUserByRefreshToken(userId: string) {
    return await this.refreshTokenRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  private async storeRefreshToken(user: User, token: string) {
    const refreshToken = await this.findUserByRefreshToken(user.id);
    if (refreshToken) {
      await this.updateRefreshToken(refreshToken.id, token);
      return;
    }
    await this.createRefreshToken(user, token);
    return;
  }

  private async createRefreshToken(user: User, token: string) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const refreshToken = await manager.create(RefreshToken, {
          user,
          token,
          expiryDate: expiryDate(REFRESH_TOKEN_EXPIRATION_DAYS),
        });
        await manager.save(RefreshToken, refreshToken);
        return refreshToken;
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_CREATED('Refresh token'));
    }
  }

  private async updateRefreshToken(tokenId: string, token: string) {
    try {
      return await this.refreshTokenRepository.update(tokenId, {
        token,
        expiryDate: expiryDate(REFRESH_TOKEN_EXPIRATION_DAYS),
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Refresh token'));
    }
  }

  async refreshToken(token: string): Promise<CookiesData> {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: {
        token,
        expiryDate: MoreThanOrEqual(new Date()),
      },
      relations: {
        user: true,
      },
    });
    if (!refreshToken) {
      throw new UnauthorizedException(
        errors.INVALID_CREDENTIALS('Refresh token'),
      );
    }
    const tokens = await this.generateToken(refreshToken.user);
    return { tokens, user: refreshToken.user };
  }

  async changePassword(
    changePasswordInput: ChangePasswordInput,
    userId: string,
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException(errors.NOT_FOUND('User'));
    const isPasswordValid = await bcrypt.compare(
      changePasswordInput.oldPassword,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException(errors.INVALID_CREDENTIALS('password'));
    const hashPassword = await this.createHashPassword(
      changePasswordInput.newPassword,
    );
    try {
      return await this.userRepository.update(user.id, {
        password: hashPassword,
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('User'), {
        cause: error,
      });
    }
  }
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(login: string) {
    const user = await this.userRepository.findOne({
      where: {
        login,
      },
    });
    if (!user)
      throw new NotFoundException(errors.NOT_FOUND(`user with login ${login}`));
    return user;
  }

  


  async findAllRoles(userId: string) {
    return this.dataSource.getRepository(Role).findOne({
      where: {
        users: {
          id: userId,
        },
      },
    });
  }

  async findAllRefreshToken(userId: string) {
    return await this.dataSource.getRepository(RefreshToken).findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async getUserPermissions(userId: string) {
    const user = await this.findUserById(userId);
    if (!user) throw new UnauthorizedException(errors.NOT_FOUND('User'));
    return user.role.permissions;
  }

  async attachRole(attachRoleInput: AttachRoleInput) {
    const { userId, roleId } = attachRoleInput;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user)
      throw new NotFoundException(errors.NOT_FOUND(`User with id ${userId}`));
    const role = await this.roleRepository.findOneBy({ id: roleId });
    if (!role)
      throw new NotFoundException(errors.NOT_FOUND(`Role with id ${roleId}`));
    try {
      await this.userRepository.update(user.id, { role });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('User'));
    }
    return await this.findUserById(userId);
  }

  async update(updateUserInput: UpdateUserInput, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException(errors.NOT_FOUND('User'));
    try {
      await this.userRepository.update(user.id, updateUserInput);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('User'));
    }
    return await this.findUserById(userId);
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(errors.NOT_FOUND(`User with id ${id}`));
    return user;
  }

  private async findUserById(userId: string) {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        role: {
          permissions: true,
        },
      },
    });
  }

  async getUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        role: {
          permissions: true
        }
      }
    });
    if (!user) throw new UnauthorizedException(errors.NOT_FOUND('User'));
    return user;
  }

  async onModuleInit() {
    const adminLogin = this.configService.get('ADMIN_LOGIN');
    const adminPassword = this.configService.get('ADMIN_PASSWORD');
    if (!adminLogin || !adminPassword) {
      this.logger.warn(
        'Admin credentials not configured - skipping admin creation',
      );
      return;
    }
    let admin: User = await this.userRepository.findOneBy({
      login: adminLogin,
    });
    if (admin && admin.isEmailVerified === false) {
      admin.isEmailVerified = true;
      admin.verificationToken = null;
      await this.userRepository.save(admin);
    }
    if (!admin) {
      admin = (await this.createUser({
        login: adminLogin,
        password: adminPassword,
        name: 'Admin',
        provider: UserProvider.LOCAL,
        isEmailVerified: true,
      })) as User;
      if (!admin) {
        this.logger.warn('Something went wrong check the errors in the logs');
        return;
      }
    }
  }

  async remove(userId: string) {
    const user = await this.findUserById(userId);
    if (!user) throw new UnauthorizedException(errors.NOT_FOUND('User'));
    try {
      await this.userRepository.delete(user.id);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('User'));
    }
    return userId;
  }

  async canActivateCurrentPermissions(
    userId: string,
    requiredRoutePermissions: CreatePermissionInput[],
  ) {
    try {
      const userPermission = await this.getUserPermissions(userId);
      for (const routePermission of requiredRoutePermissions) {
        const userHasPermission = userPermission.find(
          (permission) => routePermission.resource === permission.resource,
        );
        if (!userHasPermission)
          throw new ForbiddenException({
            message: `User does not have sufficient permissions to access "${routePermission.resource}" resource.`,
          });

        const allActionsAvailable = routePermission.actions.every((action) => {
          return userHasPermission.actions.includes(action);
        });
        if (!allActionsAvailable) {
          throw new ForbiddenException({
            message: `User does not have sufficient permissions to access "${routePermission.resource}" resource.`,
          });
        }
      }
      return true;
    } catch (error) {
      this.logger.error(error);
      throw new ForbiddenException(error.message);
    }
  }

  async validateGoogleUser(googleUser: SignUpInput) {
    const user = await this.userRepository.findOne({
      where: {
        login: googleUser.login,
      },
    });
    if (!user) {
      const newUser = await this.createUser(googleUser);
      return newUser;
    }
  }

  private async updateGoogleUser(
    existingUser: User,
    googleUserInput: SignUpGoogleInput,
  ) {
    // execlude password from googleUserInput
    const { password, ...googleUser } = googleUserInput;
    try {
      await this.userRepository.update(existingUser.id, {
        ...googleUser,
        provider: UserProvider.BOTH,
      });
      return await this.findOne(existingUser.id);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('User'));
    }
  }

  async createOrUpdateGoogleUser(googleUserInput: SignUpGoogleInput) {
    const user = await this.userRepository.findOne({
      where: {
        login: googleUserInput.login,
      },
    });
    if (!user) {
      const newUser = await this.createUser(googleUserInput);
      return newUser;
    } else if (!user.googleId) {
      const updatedUser = await this.updateGoogleUser(user, googleUserInput);
      return updatedUser;
    }
    return user;
  }

  async loginGoogle(loginGoogleInput: LoginGoogleInput) {
    const user = await this.findOne(loginGoogleInput.login);
    if (
      user.provider === UserProvider.GOOGLE ||
      user.provider === UserProvider.BOTH
    ) {
      const tokens = await this.generateToken(user);
      if (!tokens) {
        throw new BadRequestException(errors.NOT_CREATED('Tokens'));
      }
      return { user, tokens } as CookiesData;
    }
  }
}
