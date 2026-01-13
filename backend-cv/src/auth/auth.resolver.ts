import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { SignUpInput } from './dto/signUp.input';
import { LoginInput } from './dto/login.input';
import { Public } from '../decorators/public.decorator';
import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ChangePasswordInput } from './dto/changePassword.input';
import { AttachRoleInput } from './dto/attachRole.input';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { PermissionGuard } from '../decorators/permission.decorator';
import { Resource } from '../roles/enums/resource.enum';
import { Action } from '../roles/enums/action.enum';
import { errors } from '../errors/errors.config';
import { UpdateUserInput } from './dto/updateAuth.input';
import { CookiesService } from '../common/cookies/cookies.service';
import { CookiesData } from './entities/cookiesData.type';
import { Role } from '../roles/entities/role.entity';
import { RefreshToken } from './entities/refreshToken.entity';

@UseGuards(AuthorizationGuard)
@Resolver(() => User)
export class AuthResolver {
  private refreshTokenName = 'refreshToken';
  constructor(
    private readonly cookiesService: CookiesService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Mutation(() => CookiesData)
  async signup(
    @Args('signUpInput', { type: () => SignUpInput }) signUpInput: SignUpInput,
    @Context() { res }: { res: Response },
  ) {
    const result = await this.authService.signUp(signUpInput);
    this.cookiesService.setCookies(
      res,
      result.tokens.refreshToken,
      this.refreshTokenName,
    );
    return result;
  }

  @Public()
  @Mutation(() => CookiesData)
  async login(
    @Args('loginInput', { type: () => LoginInput }) loginInput: LoginInput,
    @Context() { res }: { res: Response },
  ) {
    const result = await this.authService.login(loginInput);
    this.cookiesService.setCookies(
      res,
      result.tokens.refreshToken,
      this.refreshTokenName,
    );
    return result;
  }

  @Public()
  @Mutation(() => CookiesData)
  async refreshTheTokens(@Context() { req }: { req: Request }) {
    const refreshToken = this.cookiesService.getCookie(
      req,
      this.refreshTokenName,
    );
    if (!refreshToken)
      throw new BadRequestException(errors.NOT_FOUND('Refresh token'));
    const result = await this.authService.refreshToken(refreshToken);
    this.cookiesService.setCookies(
      req.res,
      result.tokens.refreshToken,
      this.refreshTokenName,
    );
    return result;
  }

  @Mutation(() => Boolean)
  async logout(@Context() { req, res }: { req: Request; res: Response }) {
    if (!req['userId'])
      throw new UnauthorizedException(errors.NOT_FOUND('User'));
    this.cookiesService.clearCookies(res, this.refreshTokenName);
    return true;
  }

  @Mutation(() => User)
  async changePassword(
    @Args('changePasswordInput', { type: () => ChangePasswordInput })
    changePasswordInput: ChangePasswordInput,
    @Context() { req }: { req: Request },
  ) {
    if (!req['userId']) throw new BadRequestException(errors.NOT_FOUND('User'));
    return await this.authService.changePassword(
      changePasswordInput,
      req['userId'],
    );
  }

  @Mutation(() => User)
  async update(
    @Args('updateUserInput', { type: () => UpdateUserInput })
    updateUserInput: UpdateUserInput,
    @Context() { req }: { req: Request }
  ) {
    if (!req['userId'])
      throw new UnauthorizedException(errors.NOT_FOUND('User'));
    return await this.authService.update(updateUserInput, req['userId']);
  }

  @Mutation(() => User)
  async getUser(@Context() { req }: { req: Request }) {
    if (!req['userId'])
      throw new UnauthorizedException(errors.NOT_FOUND('User'));
    return await this.authService.getUser(req['userId']);
  }

  @PermissionGuard([
    { resource: Resource.USER, actions: [Action.DELETE] },
    { resource: Resource.REFRESH, actions: [Action.DELETE] },
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

  @PermissionGuard([
    { resource: Resource.USER, actions: [Action.READ] },
    { resource: Resource.ROLE, actions: [Action.READ] },
  ])
  @ResolveField(() => Role)
  async role(@Parent() user: User) {
    const { id } = user;
    return this.authService.findAllRoles(id);
  }

  @PermissionGuard([
    { resource: Resource.USER, actions: [Action.READ] },
    { resource: Resource.REFRESH, actions: [Action.READ] },
  ])
  @ResolveField(() => RefreshToken)
  async refreshToken(@Parent() user: User) {
    const { id } = user;
    return this.authService.findAllRefreshToken(id);
  }

  @PermissionGuard([{ resource: Resource.USER, actions: [Action.READ] }])
  @Query(() => User, { name: 'user' })
  async findOne(@Args('login', { type: () => String }) login: string) {
    return await this.authService.findOne(login);
  }
}
