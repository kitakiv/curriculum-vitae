import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Slider } from './entities/slider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from '../variables/upload.variables';
import { errors } from '../errors/errors.config';
import { SingleImage, SingleImageBaseClass } from 'src/upload/interface/singleImage.abstract';
import { SingleImagesFromIds } from '../upload/interface/singleImage.abstract';
@Injectable()
export class SliderImageService extends SingleImageBaseClass {
  public name: string;
  constructor(
    @InjectRepository(Slider)
    private readonly slidersRepository: Repository<Slider>,
    private readonly logger: Logger = new Logger(SliderImageService.name),
  ) {
    super();
    this.name = uploadVariables.sliders.name;
  }
  async uploadImage({ id, image }: { id: string; image: string }) {
    const exist = await this.slidersRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Slider'));
    try {
      await this.slidersRepository.update(id, { sliderImage: image });
      return { id, sliderImage: image };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Slider'));
    }
  }

  async getImageKey(id: string) {
    const exist = await this.slidersRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Slider'));
    const slider = await this.slidersRepository.findOneBy({ id });
    if (slider.sliderImage) {
      return slider.sliderImage;
    }
    return null;
  }

  async getImageKeys(ids: string[]): Promise<(SingleImagesFromIds)[]> {
    const sliders = await this.slidersRepository.findBy({ id: In(ids) });
    if (sliders.length === 0) throw new NotFoundException(errors.NOT_FOUND('Sliders'));
    const imageKeys = sliders.reduce((acc: (SingleImagesFromIds)[], slider) => {
      if (slider.sliderImage) {
        acc.push({ resourceId: slider.id, imageKey: slider.sliderImage });
      }
      return acc;
    }, []);
    return imageKeys;
  }
}
