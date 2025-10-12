import { Injectable } from '@nestjs/common';
import { CreateTechStackInput } from './dto/create-techstack.input';
import { UpdateTechStackInput } from './dto/update-techstack.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechStack } from './entities/techstack.entity';

@Injectable()
export class TechStackService {
  constructor(
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
  ) {}
  async create(createTechStackInput: CreateTechStackInput) {
    const techStack = await this.techStackRepository.create(
      new TechStack(createTechStackInput),
    );
    await this.techStackRepository.save(techStack);
    return techStack;
  }

  async findAll() {
    return await this.techStackRepository.find();
  }

  async findOne(id: string) {
    const exist = await this.techStackRepository.existsBy({ id });
    if (!exist) throw new Error('TechStack not found');
    return await this.techStackRepository.findOneBy({ id });
  }

  async update(id: string, updateTechStackInput: UpdateTechStackInput) {
    const exist = await this.techStackRepository.existsBy({ id });
    if (!exist) throw new Error('TechStack not found');
    return await this.techStackRepository.update(id, updateTechStackInput);
  }
  async remove(id: string) {
    const exist = await this.techStackRepository.existsBy({ id });
    if (!exist) throw new Error('TechStack not found');
    await this.techStackRepository.delete(id)
    return `TechStack ${id} deleted`;
  }
}
