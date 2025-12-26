import { Logger, Module } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { SlidersResolver } from './sliders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slider } from './entities/slider.entity';
import { SliderImageService } from './sliderImage.service';
import { S3Service } from '../s3/s3.service';
import { AuthModule } from '../auth/auth.module';
import { RedisCacheModule } from '../cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([Slider]), AuthModule, RedisCacheModule],
  providers: [
    SlidersResolver,
    SlidersService,
    SliderImageService,
    S3Service,
    Logger,
  ],
})
export class SlidersModule {}
