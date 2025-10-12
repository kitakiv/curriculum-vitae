import { Test, TestingModule } from '@nestjs/testing';
import { TechstackResolver } from './techstack.resolver';
import { TechstackService } from './techstack.service';

describe('TechstackResolver', () => {
  let resolver: TechstackResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechstackResolver, TechstackService],
    }).compile();

    resolver = module.get<TechstackResolver>(TechstackResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
