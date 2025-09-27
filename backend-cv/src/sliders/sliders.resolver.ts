import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SlidersService } from './sliders.service';
import { Slider } from './responce/slider.responce';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';

@Resolver(() => Slider)
export class SlidersResolver {
  constructor(private readonly slidersService: SlidersService) {}

  @Mutation(() => Slider)
  async createSlider(
    @Args('createSliderInput') createSliderInput: CreateSliderInput,
  ) {
    return await this.slidersService.create(createSliderInput);
  }

  @Query(() => String)
  helloWorld() {
    return `Hello World`;
  }

  @Query(() => [Slider], { name: 'sliders' })
  async findAll() {
    return await this.slidersService.findAll();
  }

  @Query(() => Slider, { name: 'slider' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.slidersService.findOne(id);
  }

  @Mutation(() => Slider)
  async updateSlider(
    @Args('updateSliderInput') updateSliderInput: UpdateSliderInput,
  ) {
    return this.slidersService.update(updateSliderInput.id, updateSliderInput);
  }

  @Mutation(() => Slider)
  async removeSlider(@Args('id', { type: () => String }) id: number) {
    return this.slidersService.remove(id);
  }
}
