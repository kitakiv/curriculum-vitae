import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SingUpDto } from './dto/sing-up.input';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.input';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';
import { v4 as uuid } from 'uuid';
import { ChangePasswordDto } from './dto/change-password.input';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}
  async singUp(createAuthInput: SingUpDto) {
    const { login, password, name } = createAuthInput;
    const emailInUse = await this.userRepository.findOneBy({
      login: createAuthInput.login,
    });
    if (emailInUse) {
      throw new Error('Email already in use');
    }
    const hashPassword = await this.createHashPassword(password);
    await this.userRepository.create({
      login,
      password: hashPassword,
      name
    })
    const user = await this.userRepository.save({
      login,
      password: hashPassword,
      name
    });
    if (!user) {
      throw new Error('User not created');
    }
    return {
      login: user.login,
      name: user.name
    }
  }

  private async createHashPassword(password: string) {
    const saltOrRound = 10;
    return await bcrypt.hash(password, saltOrRound);
  }

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;
    const user = await this.userRepository.findOneBy({ login });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return await this.generateToken(user);
  }

  async generateToken(user: User) {
    const accessToken = this.jwtService.sign({ userId: user.id });
    const refreshToken = uuid();
    await this.storeRefreshToken(user, refreshToken);
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(user: User, token: string) {
    const refreshToken = await this.refreshTokenRepository.findOneBy({ user });
    if (refreshToken) {
      await this.refreshTokenRepository.update(refreshToken.id, {
        token,
        expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      });
      return;
    }
    const createdToken = this.refreshTokenRepository.create({
      user,
      token,
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    })
    await this.refreshTokenRepository.save(createdToken);
    return;
  }

  async refreshToken(token: string) {
    const refreshToken = await this.refreshTokenRepository.find({
      where: {
        token,
        expiryDate: MoreThanOrEqual(new Date()),
      },
      relations: {
        user: true
      },
    })
    if (!refreshToken[0]) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return await this.generateToken(refreshToken[0].user);
  }

  async changePassword(changePasswordDto: ChangePasswordDto, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException('User not found');
    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password,
    );
    if (!isPasswordValid) throw new UnauthorizedException('Wrong password');
    const hashPassword = await this.createHashPassword(
      changePasswordDto.newPassword,
    );
    await this.userRepository.update(user.id, { password: hashPassword });
  }
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(login: string) {
    return await this.userRepository.findOneBy({ login });
  }

  async getUserPermissions(userId: string) {
    const user = await this.userRepository.find({
      where: {
        id: userId,
      },
      relations: {
        role: {
          permissions: true,
        },
      },
    });
    if (!user[0]) throw new UnauthorizedException('User not found');
    return user[0].role.permissions;
  }

}
