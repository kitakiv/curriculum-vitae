import { Injectable } from '@nestjs/common';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';
import { EntityManager, Repository } from 'typeorm';
import { Slider } from './entities/slider.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SlidersService {

  constructor(
    @InjectRepository(Slider)
    private readonly slidersRepository: Repository<Slider>,
    private readonly entityManager: EntityManager
  ) {}
  async create(createSliderInput: CreateSliderInput) {
    const slider = this.slidersRepository.create(createSliderInput);
    return await this.slidersRepository.save(slider);
  }

  async findAll() {
    const sliders = await this.slidersRepository.find();
    return sliders;
  }

  async findOne(id: number) {
    const slider = await this.slidersRepository.findOneBy({ id });
    if (!slider) throw new Error('Slider not found');
    return slider;
  }

  async update(id: number, updateSliderInput: UpdateSliderInput) {
    await this.slidersRepository.update(id, updateSliderInput);
    const slider = await this.slidersRepository.findOneBy({ id });
    return slider;
  }

  async remove(id: number) {
    await this.slidersRepository.delete(id);
    return `Slider ${id} deleted`;
  }
}
