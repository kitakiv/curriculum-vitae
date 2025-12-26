import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger
} from '@nestjs/common';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';
import { Repository } from 'typeorm';
import { Slider } from './entities/slider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { errors } from '../errors/errors.config';
import { RedisCacheService } from '../cache/cache.service';
import uploadVariables from '../variables/upload.variables';
@Injectable()
export class SlidersService {
  private readonly SLIDER_CACHE_KEY = uploadVariables.sliders.cacheKey;
  private readonly SLIDER_CACHE_TIME = uploadVariables.sliders.cacheTime;
  constructor(
    @InjectRepository(Slider)
    private readonly slidersRepository: Repository<Slider>,
    private readonly logger: Logger = new Logger(SlidersService.name),
    private readonly redisCacheService: RedisCacheService,
  ) {}
  async create(createSliderInput: CreateSliderInput) {
    const slider = new Slider(createSliderInput);
    try {
      const createdSlider = await this.slidersRepository.create(slider);
      return await this.slidersRepository.save(createdSlider);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_CREATED('Slider'));
    }
  }

  async findAll() {
    const sliders = await this.redisCacheService.get(this.SLIDER_CACHE_KEY);
    if (sliders) return JSON.parse(sliders);
    const newSliders = await this.slidersRepository.find();
    await this.redisCacheService.set(
      this.SLIDER_CACHE_KEY,
      JSON.stringify(newSliders),
      this.SLIDER_CACHE_TIME,
    );
    return newSliders;
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
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Slider'));
    }
  }

  async remove(id: string) {
    const exist = await this.slidersRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Slider'));
    try {
      await this.slidersRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('Slider'));
    }
    return { id };
  }
}
