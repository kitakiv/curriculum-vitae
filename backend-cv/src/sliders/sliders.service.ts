import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';
import { Repository } from 'typeorm';
import { Slider } from './entities/slider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { errors } from 'src/errors/errors.config';
@Injectable()
export class SlidersService {
  constructor(
    @InjectRepository(Slider)
    private readonly slidersRepository: Repository<Slider>,
  ) {}
  async create(createSliderInput: CreateSliderInput) {
    const slider = new Slider(createSliderInput);
    try {
      const createdSlider = await this.slidersRepository.create(slider);
      return await this.slidersRepository.save(createdSlider);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_CREATED('Slider'), {
        cause: error,
      });
    }
  }

  async findAll() {
    return await this.slidersRepository.find();
  }

  async findOne(id: string) {
    const slider = await this.slidersRepository.findOneBy({ id });
    if (!slider) throw new NotFoundException(errors.NOT_FOUND('Slider'));
    return slider;
  }

  async update(id: string, updateSliderInput: UpdateSliderInput) {
    const exist = await this.slidersRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Slider'));
    try {
      await this.slidersRepository.update(id, updateSliderInput);
      return await this.findOne(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_UPDATED('Slider'), {
        cause: error,
      });
    }
  }

  async remove(id: string) {
    const exist = await this.slidersRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Slider'));
    await this.slidersRepository.delete(id);
    return { id };
  }
}
