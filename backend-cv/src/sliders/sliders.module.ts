import { Module } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { SlidersResolver } from './sliders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slider } from './entities/slider.entity';
import { SliderImage } from './entities/sliderImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Slider, SliderImage])],
  providers: [SlidersResolver, SlidersService],
})
export class SlidersModule {}
