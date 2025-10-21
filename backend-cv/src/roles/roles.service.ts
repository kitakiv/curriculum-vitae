import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async create(createRoleInput: CreateRoleInput) {
    const { name, permissions } = createRoleInput;
    const roleExist = await this.roleRepository.findOneBy({ name });
    if (roleExist) throw new BadRequestException('Role already exist');
    const permission = permissions.map(
      (permission) => new Permission(permission),
    );
    const role = await this.roleRepository.create(
      new Role({ name, permissions: permission }),
    );
    return await this.roleRepository.save(role);
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: string) {
    const exist = await this.roleRepository.existsBy({ id });
    if (!exist) throw new BadRequestException('Role not found');
    return await this.roleRepository.findOneBy({ id });
  }

  // update(id: number, updateRoleInput: UpdateRoleInput) {
  //   return `This action updates a #${id} role`;
  // }

  async remove(id: string) {
    const exist = await this.roleRepository.existsBy({ id });
    if (!exist) throw new BadRequestException('Role not found');
    return await this.roleRepository.delete(id);
  }
}
