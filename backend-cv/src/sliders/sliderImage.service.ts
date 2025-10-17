import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Slider } from './entities/slider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from 'src/variables/upload.variables';

@Injectable()
export class SliderImageService {
  public name: string;
  constructor(
    @InjectRepository(Slider)
    private readonly slidersRepository: Repository<Slider>,
  ) {
    this.name = uploadVariables.sliders.name;
  }
  async uploadImage({ id, image }: { id: string; image: string }) {
    const exist = await this.slidersRepository.existsBy({ id });
    if (!exist) throw new BadRequestException('Slider not found');
    await this.slidersRepository.update(id, { sliderImage: image });
    return { id, sliderImage: image };
  }

  async getImageKey(id: string) {
    const exist = await this.slidersRepository.existsBy({ id });
    if (!exist) throw new BadRequestException('Slider not found');
    const slider = await this.slidersRepository.findOneBy({ id });
    if (slider.sliderImage) {
      return decodeURIComponent(slider.sliderImage.split(`/`).at(-1));
    }
    return null;
  }
}

