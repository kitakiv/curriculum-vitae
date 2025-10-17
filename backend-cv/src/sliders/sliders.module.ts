import { Module } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { SlidersResolver } from './sliders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slider } from './entities/slider.entity';
import { SliderImageService } from './sliderImage.service';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Slider])],
  providers: [SlidersResolver, SlidersService, SliderImageService, S3Service],
})
export class SlidersModule {}
