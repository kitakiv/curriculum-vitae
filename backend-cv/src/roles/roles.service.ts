import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

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
    const role = await this.roleRepository.create(
      new Role({ name, permissions }),
    );
    return await this.roleRepository.save(role);
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: string) {
    return await this.roleRepository.findOneBy({ id });
  }

  // update(id: number, updateRoleInput: UpdateRoleInput) {
  //   return `This action updates a #${id} role`;
  // }

  async remove(id: string) {
    return await this.roleRepository.delete(id);
  }
}
