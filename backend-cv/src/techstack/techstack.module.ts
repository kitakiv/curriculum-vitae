import { Module } from '@nestjs/common';
import { TechStackService } from './techstack.service';
import { TechStackResolver } from './techstack.resolver';
import { TechStack } from './entities/techstack.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TechStack])],
  providers: [TechStackResolver, TechStackService],
  exports: [TypeOrmModule.forFeature([TechStack])]
})
export class TechStackModule {}
