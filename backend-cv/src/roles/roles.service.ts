import { BadRequestException, Injectable, NotFoundException, Logger, OnModuleInit } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UpdateRoleInput } from './dto/update-role.input';
import { errors } from '../errors/errors.config';
import { DataSource } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Action } from './enums/action.enum';
import { Resource } from './enums/resource.enum';
import { ConfigService } from '@nestjs/config';
import { allPermission } from './entities/allPermission.object';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly logger: Logger = new Logger(RolesService.name),
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}
  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    const { name, permissions } = createRoleInput;
    const roleExist = await this.roleRepository.findOneBy({ name });
    if (roleExist) throw new BadRequestException('Role already exist');
    const permission = permissions.map(
      (permission) => new Permission(permission),
    );
    try {
      return await this.dataSource.transaction(async (manager) => {
        const role = await manager.create(
          Role,
          new Role({ name, permissions: permission }),
        );
        await manager.save(Role, role);
        return role;
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_CREATED('Role'));
    }
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
    });
    if (!role)
      throw new NotFoundException(errors.NOT_FOUND(`Role with id ${id}`));
    return role;
  }

  async findAllPermissions(id: string): Promise<Permission[]> {
    return await this.dataSource.getRepository(Permission).find({
      where: { role: { id } },
    });
  }
  async findAllUsers(id: string): Promise<User[]> {
    return this.dataSource.getRepository(User).find({
      where: { role: { id } },
    });
  }

  async update(id: string, updateRoleInput: UpdateRoleInput): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');
    if (updateRoleInput.name) {
      const roleExist = await this.roleRepository.findOne({
        where: { name: updateRoleInput.name },
      });
      if (roleExist && roleExist.id !== id)
        throw new BadRequestException('Role with this name already exist');
    }
    if (updateRoleInput.permissions) {
      const permissions = updateRoleInput.permissions.map(
        (permission) => new Permission(permission),
      );
      updateRoleInput.permissions = permissions;
    }
    updateRoleInput.id = id;
    try {
      await this.roleRepository.save({
        ...role,
        ...updateRoleInput,
        id,
      });
      return await this.findOne(id);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Role'));
    }
  }

  async remove(id: string): Promise<string> {
    const exist = await this.roleRepository.existsBy({ id });
    if (!exist)
      throw new NotFoundException(errors.NOT_FOUND(`Role with id ${id}`));
    try {
      await this.dataSource.transaction(async (manager) => {
        await manager
          .createQueryBuilder()
          .update(User)
          .set({ role: null })
          .where('role.id = :id', { id })
          .execute();
        await manager
          .createQueryBuilder()
          .delete()
          .from(Permission)
          .where('role.id = :id', { id })
          .execute();
        await manager
          .createQueryBuilder()
          .delete()
          .from(Role)
          .where('id = :id', { id })
          .execute();
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('Role'));
    }
    return id;
  }

  async removeMany(ids: string[]): Promise<string[]> {
    const roles = await this.roleRepository.findBy({ id: In(ids) });
    if (roles.length === 0)
      throw new NotFoundException(errors.NOT_FOUND('Roles'));
    if (roles.length !== ids.length) {
      const foundIds = roles.map((r) => r.id);
      const notFoundIds = ids.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(errors.NOT_FOUND('Role with id: ' + notFoundIds.join(', ')));
    }
    try {
      await this.dataSource.transaction(async (manager) => {
        await manager
          .createQueryBuilder()
          .update(User)
          .set({ role: null })
          .where('role.id IN (:...ids)', { ids })
          .execute();
        await manager
          .createQueryBuilder()
          .delete()
          .from(Permission)
          .where('role.id IN (:...ids)', { ids })
          .execute();
        await manager
          .createQueryBuilder()
          .delete()
          .from(Role)
          .where('id IN (:...ids)', { ids })
          .execute();
      });
      return ids;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('Roles with ids: ' + ids.join(', ')));
    }
  }

  async onModuleInit() {
    const actions = Object.values(Action);
    const permissions = Object.values(Resource).map((resource) => ({
      resource,
      actions,
    }));
    const name = 'admin';
    const roleExist = await this.roleRepository.findOneBy({ name });
    if (roleExist) await this.remove(roleExist.id);
    const adminRole = await this.create({ name, permissions });
    try {
      await this.dataSource.transaction(async (manager) => {
        await manager
          .createQueryBuilder()
          .update(User)
          .set({ role: adminRole })
          .where('login = :login', {
            login: this.configService.get('ADMIN_LOGIN'),
          })
          .execute();
      })
      this.logger.log('Admin created');
    } catch (error) {
      this.logger.error(error);
    }
  }

  findPermissions(): allPermission[] {
    const resources = Object.values(Resource);
    const actions = Object.values(Action);
    return resources.map((resource) => ({
      resource,
      actions,
    }));
  }

}
