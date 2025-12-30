import { Resolver, Query, Mutation, Args, Context, ID } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { SignUpInput } from './dto/signUp.input';
import { LoginInput } from './dto/login.input';
import { RefreshTokenInput } from './dto/refreshToken.input';
import { Public } from '../decorators/public.decorator';
import {
  BadRequestException,
  ExecutionContext,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ChangePasswordInput } from './dto/changePassword.input';
import { AttachRoleInput } from './dto/attachRole.input';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { PermissionGuard } from '../decorators/permission.decorator';
import { Resource } from '../roles/enums/resource.enum';
import { Action } from '../roles/enums/action.enum';
import { errors } from '../errors/errors.config';
import { UpdateUserInput } from './dto/updateAuth.input';
import { UserData } from './entities/userData.type';

@UseGuards(AuthorizationGuard)
@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => UserData)
  async signup(
    @Args('signUpInput', { type: () => SignUpInput }) signUpInput: SignUpInput,
  ) {
    return await this.authService.signUp(signUpInput);
  }

  @Public()
  @Mutation(() => UserData)
  async login(
    @Args('loginInput', { type: () => LoginInput }) loginInput: LoginInput,
  ) {
    return await this.authService.login(loginInput);
  }

  @Public()
  @Mutation(() => UserData)
  async refreshToken(
    @Args('refreshTokenInput', { type: () => RefreshTokenInput })
    refreshTokenInput: RefreshTokenInput,
  ) {
    return await this.authService.refreshToken(refreshTokenInput.refreshToken);
  }

  @Mutation(() => User)
  async changePassword(
    @Args('changePasswordInput', { type: () => ChangePasswordInput })
    changePasswordInput: ChangePasswordInput,
    @Context() context: ExecutionContext,
  ) {
    const req = context.getArgs()[2].req;
    if (!req.userId) throw new BadRequestException(errors.NOT_FOUND('User'));
    return await this.authService.changePassword(
      changePasswordInput,
      req.userId,
    );
  }

  @Mutation(() => User)
  async update(
    @Args('updateUserInput', { type: () => UpdateUserInput })
    updateUserInput: UpdateUserInput,
    @Context() context: ExecutionContext,
  ) {
    const req = context.getArgs()[2].req;
    if (!req.userId) throw new UnauthorizedException(errors.NOT_FOUND('User'));
    return await this.authService.update(updateUserInput, req.userId);
  }

  @Mutation(() => User)
  async getUser(@Context() context: ExecutionContext) {
    const req = context.getArgs()[2].req;
    if (!req.userId) throw new UnauthorizedException(errors.NOT_FOUND('User'));
    return await this.authService.getUser(req.userId);
  }

  @PermissionGuard([
    { resource: Resource.USER, actions: [Action.DELETE] },
    { resource: Resource.REFRESH, actions: [Action.DELETE] }
  ])
  @Mutation(() => ID)
  async removeUser(@Args('id', { type: () => ID }) id: string) {
    return await this.authService.remove(id);
  }

  @PermissionGuard([
    { resource: Resource.USER, actions: [Action.UPDATE] },
    { resource: Resource.ROLE, actions: [Action.UPDATE] },
  ])
  @Mutation(() => User)
  async attachRole(
    @Args('attachRoleInput', { type: () => AttachRoleInput })
    attachRoleInput: AttachRoleInput,
  ) {
    return await this.authService.attachRole(attachRoleInput);
  }

  @PermissionGuard([{ resource: Resource.USER, actions: [Action.READ] }])
  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.authService.findAll();
  }

  @PermissionGuard([{ resource: Resource.USER, actions: [Action.READ] }])
  @Query(() => User, { name: 'user' })
  async findOne(@Args('login', { type: () => String }) login: string) {
    return await this.authService.findOne(login);
  }
}
