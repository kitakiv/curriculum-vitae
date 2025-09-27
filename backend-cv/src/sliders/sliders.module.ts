import { Module } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { SlidersResolver } from './sliders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slider } from './entities/slider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Slider])],
  providers: [SlidersResolver, SlidersService],
})
export class SlidersModule {}
