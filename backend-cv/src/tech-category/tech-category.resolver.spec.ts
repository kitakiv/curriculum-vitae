import { Test, TestingModule } from '@nestjs/testing';
import { TechCategoryResolver } from './tech-category.resolver';
import { TechCategoryService } from './tech-category.service';

describe('TechCategoryResolver', () => {
  let resolver: TechCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechCategoryResolver, TechCategoryService],
    }).compile();

    resolver = module.get<TechCategoryResolver>(TechCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
