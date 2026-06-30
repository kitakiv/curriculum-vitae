import { Test, TestingModule } from '@nestjs/testing';
import { GoogleauthController } from './googleauth.controller';
import { GoogleauthService } from './googleauth.service';

describe('GoogleauthController', () => {
  let controller: GoogleauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleauthController],
      providers: [GoogleauthService],
    }).compile();

    controller = module.get<GoogleauthController>(GoogleauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
