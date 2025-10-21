import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { SingUpDto } from './dto/sing-up.input';
import { LoginDto } from './dto/login.input';
import { Sing } from './entities/sing.type';
import { RefreshTokenDto } from './dto/refresh-token.input';
import { Public } from '../decorators/public.decorator';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';
import { ExecutionContext } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => User)
  async singup(
    @Args('singUpDto', { type: () => SingUpDto }) singUpDto: SingUpDto,
  ) {
    return await this.authService.singUp(singUpDto);
  }

  @Public()
  @Mutation(() => Sing)
  async login(@Args('loginDto', { type: () => LoginDto }) loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Public()
  @Mutation(() => Sing)
  async refreshToken(
    @Args('refreshTokenDto', { type: () => RefreshTokenDto })
    refreshTokenDto: RefreshTokenDto,
  ) {
    return await this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Mutation(() => User)
  async changePassword(
    @Args('changePasswordDto', { type: () => ChangePasswordDto })
    changePasswordDto: ChangePasswordDto,
    @Context() context: ExecutionContext,
  ) {
    const req = context.getArgs()[2].req;
    return await this.authService.changePassword(changePasswordDto, req.userId);
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.authService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('login', { type: () => String }) login: string) {
    return await this.authService.findOne(login);
  }
}
