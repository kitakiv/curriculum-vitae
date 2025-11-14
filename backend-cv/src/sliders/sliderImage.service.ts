import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Slider } from './entities/slider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from '../variables/upload.variables';
import { errors } from '../errors/errors.config';
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
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Slider'));
    try {
      await this.slidersRepository.update(id, { sliderImage: image });
      return { id, sliderImage: image };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_UPDATED('Slider'), {
        cause: error,
      });
    }
  }

  async getImageKey(id: string) {
    const exist = await this.slidersRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Slider'));
    const slider = await this.slidersRepository.findOneBy({ id });
    if (slider.sliderImage) {
      return decodeURIComponent(slider.sliderImage.split(`/`).at(-1));
    }
    return null;
  }
}
