import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { SlidersService } from './sliders.service';
import { Slider } from './entities/slider.entity';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';

@Resolver(() => Slider)
export class SlidersResolver {
  constructor(private readonly slidersService: SlidersService) {}

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
    return this.slidersService.remove(id);
  }

  // @ResolveField()
  // async sliderImage(@Parent() slider: Slider) {
  //   return await this.slidersService.findOneSliderImage(slider.sliderImage.id);
  // }
}
