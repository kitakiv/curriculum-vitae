import { Logger, Module } from '@nestjs/common';
import { TechCategoryService } from './tech-category.service';
import { TechCategoryResolver } from './tech-category.resolver';
import { RedisCacheModule } from '../cache/cache.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechStack } from '../techstack/entities/techstack.entity';
import { TechCategory } from './entities/tech-category.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([TechStack, TechCategory]),
    AuthModule,
    RedisCacheModule],
  providers: [TechCategoryResolver, TechCategoryService, Logger],
})
export class TechCategoryModule {}
