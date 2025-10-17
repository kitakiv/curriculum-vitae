import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SlidersService } from './sliders.service';
import { Slider } from './entities/slider.entity';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';
import { SliderImageService } from './sliderImage.service';
import { S3Service } from 'src/s3/s3.service';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => Slider)
export class SlidersResolver {
  constructor(
    private readonly slidersService: SlidersService,
    private readonly sliderImageService: SliderImageService,
    private readonly s3Service: S3Service
  ) {}

  @Mutation(() => Slider)
  async createSlider(
    @Args('createSliderInput', { type: () => CreateSliderInput })
    createSliderInput: CreateSliderInput,
  ) {
    return await this.slidersService.create(createSliderInput);
  }

  @Query(() => [Slider], { name: 'sliders' })
  async findAll() {
    return await this.slidersService.findAll();
  }

  @Query(() => Slider, { name: 'slider' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.slidersService.findOne(id);
  }

  @Mutation(() => Slider)
  async updateSlider(
    @Args('updateSliderInput', { type: () => UpdateSliderInput })
    updateSliderInput: UpdateSliderInput,
  ) {
    return this.slidersService.update(updateSliderInput.id, updateSliderInput);
  }

  @Mutation(() => Slider)
  async removeSlider(@Args('id', { type: () => String }) id: string) {
    try {
      const key = await this.sliderImageService.getImageKey(id);
      await this.slidersService.remove(id);
      if (key) await this.s3Service.deleteFile(key);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
    return `Slider ${id} deleted`;
  }
}
