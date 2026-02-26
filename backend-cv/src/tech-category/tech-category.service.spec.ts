import { Test, TestingModule } from '@nestjs/testing';
import { TechCategoryService } from './tech-category.service';

describe('TechCategoryService', () => {
  let service: TechCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechCategoryService],
    }).compile();

    service = module.get<TechCategoryService>(TechCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
