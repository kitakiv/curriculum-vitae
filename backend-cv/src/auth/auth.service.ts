import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { SingUpInput } from './dto/singUp.input';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/login.input';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refreshToken.entity';
import { v4 as uuid } from 'uuid';
import { ChangePasswordInput } from './dto/changePassword.input';
import { Role } from 'src/roles/entities/role.entity';
import { AttachRoleInput } from './dto/attachRole.input';
import { UpdateUserInput } from './dto/updateAuth.input';
import { ConfigService } from '@nestjs/config';
import { Action } from 'src/roles/enums/action.enum';
import { Resource } from 'src/roles/enums/resource.enum';
import { Permission } from 'src/roles/entities/permission.entity';
import { errors } from 'src/errors/errors.config';
import { expiryDate } from 'src/common/constants';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}
  async singUp(createAuthInput: SingUpInput) {
    const emailInUse = await this.userRepository.findOneBy({
      login: createAuthInput.login,
    });
    if (emailInUse) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: errors.EMAIL_EXISTS,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const user = await this.createUser(createAuthInput);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: errors.NOT_CREATED('User'),
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.generateToken(user);
  }

  private async createUser(createAuthInput: SingUpInput) {
    const { login, password, name } = createAuthInput;
    const hashPassword = await this.createHashPassword(password);
    try {
      await this.userRepository.create({
        login,
        password: hashPassword,
        name,
      });
      const user = await this.userRepository.save({
        login,
        password: hashPassword,
        name,
      });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  private async createHashPassword(password: string) {
    const saltOrRound = 10;
    return await bcrypt.hash(password, saltOrRound);
  }

  async login(loginInput: LoginInput) {
    const { login, password } = loginInput;
    const user = await this.userRepository.findOneBy({ login });
    if (!user) {
      throw new UnauthorizedException(errors.NOT_FOUND('User'));
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(errors.INVALID_CREDENTIALS('password'));
    }
    return await this.generateToken(user);
  }

  private async generateToken(user: User) {
    const accessToken = this.jwtService.sign({ userId: user.id });
    const refreshToken = uuid();
    try {
      await this.storeRefreshToken(user, refreshToken);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_CREATED('Refresh token'), {
        cause: error,
      });
    }
    return { accessToken, refreshToken };
  }

  private async storeRefreshToken(user: User, token: string) {
    const refreshToken = await this.refreshTokenRepository.findOneBy({ user });
    if (refreshToken) {
      await this.refreshTokenRepository.update(refreshToken.id, {
        token,
        expiryDate: expiryDate(3),
      });
      return;
    }
    const createRefreshToken = this.refreshTokenRepository.create({
      user,
      token,
      expiryDate: expiryDate(3),
    });
    const savedRefreshToken =
      await this.refreshTokenRepository.save(createRefreshToken);
    if (!savedRefreshToken) {
      throw new BadRequestException(errors.NOT_CREATED('Refresh token'));
    }
    return;
  }

  async refreshToken(token: string) {
    const refreshToken = await this.refreshTokenRepository.find({
      where: {
        token,
        expiryDate: MoreThanOrEqual(new Date()),
      },
      relations: {
        user: true,
      },
    });
    if (!refreshToken[0]) {
      throw new UnauthorizedException(
        errors.INVALID_CREDENTIALS('Refresh token'),
      );
    }
    return await this.generateToken(refreshToken[0].user);
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
    await this.userRepository.update(user.id, { password: hashPassword });
  }
  async findAll() {
    return await this.userRepository.find({
      relations: {
        role: {
          permissions: true,
        },
      },
    });
  }

  async findOne(login: string) {
    const user = await this.userRepository.find({
      where: {
        login,
      },
      relations: {
        role: {
          permissions: true,
        },
      },
    })[0];
    if (!user) throw new NotFoundException(errors.NOT_FOUND('User'));
    return user;
  }

  async getUserPermissions(userId: string) {
    const user = (
      await this.userRepository.find({
        where: {
          id: userId,
        },
        relations: {
          role: {
            permissions: true,
          },
        },
      })
    )[0];
    if (!user) throw new UnauthorizedException(errors.NOT_FOUND('User'));
    return user.role.permissions;
  }

  async attachRole(attachRoleInput: AttachRoleInput) {
    const { userId, roleId } = attachRoleInput;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(errors.NOT_FOUND('User'));
    const role = await this.roleRepository.findOneBy({ id: roleId });
    if (!role) throw new NotFoundException(errors.NOT_FOUND('Role'));
    try {
      await this.userRepository.update(user.id, { role });
    } catch (error) {
      throw new BadRequestException(errors.NOT_UPDATED('User'), {
        cause: error,
      });
    }
    return (
      await this.userRepository.find({
        where: {
          id: userId,
        },
        relations: {
          role: {
            permissions: true,
          },
        },
      })
    )[0];
  }

  async updateUser(updateUserInput: UpdateUserInput, userId: string) {
    const { name } = updateUserInput;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException(errors.NOT_FOUND('User'));
    await this.userRepository.update(user.id, { name });
    return await this.userRepository.find({
      where: {
        id: userId,
      },
      relations: {
        role: {
          permissions: true,
        },
      },
    })[0];
  }

  private async createAdminRole() {
    const actions = Object.values(Action);
    const permissions = Object.values(Resource).map((resource) => ({
      resource,
      actions,
    }));
    const name = 'admin';
    const roleExist = await this.roleRepository.findOneBy({ name });
    if (roleExist) await this.roleRepository.delete(roleExist.id);
    const permission = permissions.map(
      (permission) => new Permission(permission),
    );
    const role = await this.roleRepository.create(
      new Role({ name, permissions: permission }),
    );
    return await this.roleRepository.save(role);
  }

  async onModuleInit() {
    const adminLogin = this.configService.get('ADMIN_LOGIN');
    const adminPassword = this.configService.get('ADMIN_PASSWORD');
    if (!adminLogin || !adminPassword) return;
    const admin = await this.userRepository.findOneBy({
      login: adminLogin,
    });
    if (!admin) {
      const adminUser = await this.createUser({
        login: adminLogin,
        password: adminPassword,
        name: 'Admin',
      });
      if (!adminUser) return;
      const adminRole = await this.createAdminRole();
      if (!adminRole) return;
      await this.attachRole({ userId: adminUser.id, roleId: adminRole.id });
      this.logger.log('Admin created');
    }
  }
}
