import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SlidersService } from './sliders.service';
import { Slider } from './entities/slider.entity';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';
import { SliderImageService } from './sliderImage.service';
import { S3Service } from 'src/s3/s3.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Resource } from 'src/roles/enums/resource.enum';
import { PermissionGuard } from 'src/decorators/permission.decorator';
import { Action } from 'src/roles/enums/action.enum';
import { Public } from 'src/decorators/public.decorator';
import { errors } from 'src/errors/errors.config';


@UseGuards(AuthorizationGuard)
@Resolver(() => Slider)
export class SlidersResolver {
  constructor(
    private readonly slidersService: SlidersService,
    private readonly sliderImageService: SliderImageService,
    private readonly s3Service: S3Service,
  ) {}


  @PermissionGuard([{ resource: Resource.SLIDER, actions: [Action.CREATE] }])
  @Mutation(() => Slider)
  async createSlider(
    @Args('createSliderInput', { type: () => CreateSliderInput })
    createSliderInput: CreateSliderInput,
  ) {
    return await this.slidersService.create(createSliderInput);
  }

  @Public()
  @Query(() => [Slider], { name: 'sliders' })
  async findAll() {
    return await this.slidersService.findAll();
  }

  @Public()
  @Query(() => Slider, { name: 'slider' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.slidersService.findOne(id);
  }


  @PermissionGuard([{ resource: Resource.SLIDER, actions: [Action.UPDATE] }])
  @Mutation(() => Slider)
  async updateSlider(
    @Args('updateSliderInput', { type: () => UpdateSliderInput })
    updateSliderInput: UpdateSliderInput,
  ) {
    return this.slidersService.update(updateSliderInput.id, updateSliderInput);
  }

  @PermissionGuard([{ resource: Resource.SLIDER, actions: [Action.DELETE] }])
  @Mutation(() => ID)
  async removeSlider(@Args('id', { type: () => ID }) id: string) {
    try {
      const key = await this.sliderImageService.getImageKey(id);
      await this.slidersService.remove(id);
      if (key) await this.s3Service.deleteFile(key);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_DELETED('Slider'), {
        cause: error,
      });
    }
    return {
      id,
    };
  }
}
