import { Injectable } from '@nestjs/common';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';
import { Repository } from 'typeorm';
import { Slider } from './entities/slider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SliderImage } from './entities/sliderImage.entity';

@Injectable()
export class SlidersService {
  constructor(
    @InjectRepository(Slider)
    private readonly slidersRepository: Repository<Slider>,
    // private readonly sliderImageRepository: Repository<SliderImage>,
  ) {}
  async create(createSliderInput: CreateSliderInput) {
    const slImage = new SliderImage({
      imageLink: createSliderInput.sliderImage,
    });
    const slider = new Slider({
      sliderName: createSliderInput.sliderName,
      sliderText: createSliderInput.sliderText,
      sliderImage: slImage,
    });
    const createdSlider = await this.slidersRepository.create(slider);
    return await this.slidersRepository.save(createdSlider);
  }

  async findAll() {
    const sliders = await this.slidersRepository.find({
      relations: {
        sliderImage: true,
      },
    });
    return sliders;
  }

  async findOne(id: string) {
    const slider = await this.slidersRepository.find({
      where: { id },
      relations: {
        sliderImage: true,
      },
    });
    if (!slider) throw new Error('Slider not found');
    return slider;
  }

  async update(id: string, updateSliderInput: UpdateSliderInput) {
    const exist = await this.slidersRepository.existsBy({ id });
    if (!exist) throw new Error('Slider not found');
    const slider = await this.slidersRepository.findOneBy({ id });
    const slImage = new SliderImage({
      imageLink: updateSliderInput.sliderImage || slider.sliderImage.imageLink,
    });
    await this.slidersRepository.update(id, {
      sliderName: updateSliderInput.sliderName || slider.sliderName,
      sliderText: updateSliderInput.sliderText || slider.sliderText,
      sliderImage: slImage,
    });
    const updatedSlider = await this.slidersRepository.findOneBy({ id });
    return updatedSlider;
  }

  async remove(id: string) {
    const exist = await this.slidersRepository.existsBy({ id });
    if (!exist) throw new Error('Slider not found');
    await this.slidersRepository.delete(id);
    return `Slider ${id} deleted`;
  }
}
