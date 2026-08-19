import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SlidersService } from './sliders.service';
import { Slider } from './entities/slider.entity';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';
import { SliderImageService } from './sliderImage.service';
import { S3Service } from '../s3/s3.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { Resource } from '../roles/enums/resource.enum';
import { PermissionGuard } from '../decorators/permission.decorator';
import { Action } from '../roles/enums/action.enum';
import { Public } from '../decorators/public.decorator';
import { errors } from '../errors/errors.config';
import uploadVariables from 'src/variables/upload.variables';


@UseGuards(AuthorizationGuard)
@Resolver(() => Slider)
export class SlidersResolver {

  private readonly serviceName = uploadVariables.sliders.name
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
      const url = await this.sliderImageService.getImageKey(id);
      await this.slidersService.remove(id);
      if (url) await this.s3Service.deleteFile(url, this.serviceName, id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_DELETED('Slider'), {
        cause: error,
      });
    }
    return id;
  }

   @PermissionGuard([
    { resource: Resource.SLIDER, actions: [Action.DELETE] },
  ])
  @Mutation(() => [ID])
  async removeSliders(@Args('ids', { type: () => [ID] }) ids: string[]) {
    try {
      const urls = await this.sliderImageService.getImageKeys(ids);
      await this.slidersService.removeMany(ids);
      await this.s3Service.deleteFileFromIds(this.serviceName, urls);
    } catch (error) {
      throw new BadRequestException(errors.NOT_DELETED('Sliders'), {
        cause: error,
      });
    }
    return ids;
  }
}
