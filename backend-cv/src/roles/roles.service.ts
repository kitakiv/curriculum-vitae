import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger
} from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UpdateRoleInput } from './dto/update-role.input';
import { errors } from '../errors/errors.config';


@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly logger: Logger = new Logger(RolesService.name),
  ) {}
  async create(createRoleInput: CreateRoleInput) {
    const { name, permissions } = createRoleInput;
    const roleExist = await this.roleRepository.findOneBy({ name });
    if (roleExist) throw new BadRequestException('Role already exist');
    const permission = permissions.map(
      (permission) => new Permission(permission),
    );
    try {
      const role = await this.roleRepository.create(
        new Role({ name, permissions: permission }),
      );
      return await this.roleRepository.save(role);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_CREATED('Role'));
    }
  }

  async findAll() {
    return await this.roleRepository.find({
      relations: {
        permissions: true,
      },
    });
  }

  async findOne(id: string) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: {
        permissions: true,
      },
    });
    if (!role) throw new NotFoundException(errors.NOT_FOUND('Role'));
    return role;
  }

  async update(id: string, updateRoleInput: UpdateRoleInput) {
    const exist = await this.roleRepository.existsBy({ id });
    if (!exist) throw new NotFoundException('Role not found');
    if (updateRoleInput.permissions) {
      const permissions = updateRoleInput.permissions.map(
        (permission) => new Permission(permission),
      );
      updateRoleInput.permissions = permissions;
    }
    try {
      await this.roleRepository.update(id, updateRoleInput);
      return await this.findOne(id);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Role'));
    }
  }

  async remove(id: string) {
    const exist = await this.roleRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Role'));
    return await this.roleRepository.delete(id);
  }
}
