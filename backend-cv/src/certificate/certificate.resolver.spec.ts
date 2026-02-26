import { Test, TestingModule } from '@nestjs/testing';
import { CertificateResolver } from './certificate.resolver';
import { CertificateService } from './certificate.service';

describe('CertificateResolver', () => {
  let resolver: CertificateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertificateResolver, CertificateService],
    }).compile();

    resolver = module.get<CertificateResolver>(CertificateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
