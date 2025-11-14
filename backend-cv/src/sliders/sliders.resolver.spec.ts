import { Test, TestingModule } from '@nestjs/testing';
import { SlidersResolver } from './sliders.resolver';
import { SlidersService } from './sliders.service';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { S3Service } from '../s3/s3.service';
import { SliderImageService } from './sliderImage.service';
import { AuthGuard } from '../guards/auth.guard';
import { Slider } from './entities/slider.entity';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { Action } from '../roles/enums/action.enum';
import { Resource } from '../roles/enums/resource.enum';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';
import { errors } from '../errors/errors.config';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import * as uuid from 'uuid';

const mockSlider = new Slider({
  sliderImage: 'slider.svg',
  sliderName: 'name Slider',
  sliderText: 'text Slider',
})

jest.mock('../decorators/public.decorator', () => ({
  Public: jest.fn(
    () =>
      (target: any, propertyName?: string, descriptor?: PropertyDescriptor) => {
        if (descriptor) {
          Reflect.defineMetadata('isPublic', true, descriptor.value);
          return descriptor;
        }
        return target;
      },
  ),
  IS_PUBLIC_KEY: 'isPublic',
}));
jest.mock('../decorators/permission.decorator', () => ({
  PermissionGuard: jest.fn(
    (permissions: { resource: Resource; actions: Action[] }[]) =>
      (target: any, propertyName?: string, descriptor?: PropertyDescriptor) => {
        if (descriptor) {
          Reflect.defineMetadata('permissions', permissions, descriptor.value);
          return descriptor;
        }
        return target;
      },
  ),
  IS_PERMISSION_KEY: 'permissions',
}));

const mockSliderImage = {
  getImageKey: jest.fn(),
};
const mockS3Service = {
  uploadFiles: jest.fn(),
  deleteFiles: jest.fn(),
  getFile: jest.fn(),
  uploadFile: jest.fn(),
  deleteFile: jest.fn(),
};

const mockSlidersService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockJwtService = {
  verify: jest.fn(),
} as unknown as jest.Mocked<JwtService>;

const mockReflector = {
  getAllAndOverride: jest.fn(),
};
const mockAuthService = {
  getUserPermissions: jest.fn(),
};

describe('SlidersResolver', () => {
  let resolver: SlidersResolver;
  let service: SlidersService;
  let sliderImageService: SliderImageService;
  let s3Service: S3Service;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlidersResolver,
        {
          provide: SlidersService,
          useValue: mockSlidersService,
        },
        {
          provide: S3Service,
          useValue: mockS3Service,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: SliderImageService,
          useValue: mockSliderImage,
        },
        {
          provide: Reflector,
          useValue: mockReflector,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        AuthGuard,
        AuthorizationGuard,
      ],
    }).compile();

    resolver = module.get<SlidersResolver>(SlidersResolver);
    service = module.get<SlidersService>(SlidersService);
    sliderImageService = module.get<SliderImageService>(SliderImageService);
    s3Service = module.get<S3Service>(S3Service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Public routes', () => {
    it('should be marked as public route', () => {
      const isPublicFindAll = Reflect.getMetadata('isPublic', resolver.findAll);
      expect(isPublicFindAll).toBe(true);
      const isPublicFindOne = Reflect.getMetadata('isPublic', resolver.findOne);
      expect(isPublicFindOne).toBe(true);
      const publicMethods = [resolver.findAll, resolver.findOne];
      publicMethods.forEach((method) => {
        const permissions = Reflect.getMetadata('permissions', method);
        expect(permissions).toBeUndefined();
      });
    });

    it('should return sliders (public route)', async () => {
      mockSlidersService.findAll.mockResolvedValue([mockSlider]);
      const result = await resolver.findAll();
      expect(result).toEqual([mockSlider]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return a slider by id (public route)', async () => {
      mockSlidersService.findOne.mockResolvedValue(mockSlider);
      const result = await resolver.findOne(mockSlider.id);
      expect(result).toEqual(mockSlider);
      expect(service.findOne).toHaveBeenCalledWith(mockSlider.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Private routes', () => {
    it('should be marked as private route', () => {
      const isPublicUpdate = Reflect.getMetadata(
        'isPublic',
        resolver.updateSlider,
      );
      expect(isPublicUpdate).toBe(undefined);
      const isPublicDelete = Reflect.getMetadata(
        'isPublic',
        resolver.removeSlider,
      );
      expect(isPublicDelete).toBe(undefined);
      const isPublicCreate = Reflect.getMetadata(
        'isPublic',
        resolver.createSlider,
      );
      expect(isPublicCreate).toBe(undefined);
    });

    it('Private routes should have permissions decorator', () => {
      const methods = [
        {
          method: resolver.createSlider,
          expectedResource: Resource.SLIDER,
          expectedActions: [Action.CREATE],
        },
        {
          method: resolver.updateSlider,
          expectedResource: Resource.SLIDER,
          expectedActions: [Action.UPDATE],
        },
        {
          method: resolver.removeSlider,
          expectedResource: Resource.SLIDER,
          expectedActions: [Action.DELETE],
        },
      ];

      methods.forEach(({ method, expectedResource, expectedActions }) => {
        const permissions = Reflect.getMetadata('permissions', method);
        expect(permissions).toBeDefined();
        expect(permissions[0].resource).toBe(expectedResource);
        expect(permissions[0].actions).toEqual(expectedActions);
        expectedActions.forEach((action) => {
          expect(permissions[0].actions).toContain(action);
        });
      });
    });
  });

  describe('Private routes', () => {
    it('should create slider', async () => {
      const createSliderInput: CreateSliderInput = {
        ...mockSlider,
      };
      mockSlidersService.create.mockResolvedValue(mockSlider);
      const result = await resolver.createSlider(createSliderInput);
      expect(result).toEqual(mockSlider);
      expect(service.create).toHaveBeenCalledWith(createSliderInput);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should update slider', async () => {
      const updateSliderInput: UpdateSliderInput = {
        id: uuid.v4(),
        sliderName: 'updated Name',
      };
      const updateMockSlider = { ...mockSlider, ...updateSliderInput };
      mockSlidersService.update.mockResolvedValue(updateMockSlider);
      const result = await resolver.updateSlider(updateSliderInput);
      expect(result).toEqual(updateMockSlider);
      expect(service.update).toHaveBeenCalledWith(
        updateSliderInput.id,
        updateSliderInput,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should remove slider', async () => {
      const id = uuid.v4();
      mockSlidersService.remove.mockResolvedValue({ id });
      mockSliderImage.getImageKey.mockResolvedValue('key1');
      mockS3Service.deleteFile.mockResolvedValue(true);
      const result = await resolver.removeSlider(id);
      expect(result).toEqual({ id });
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(sliderImageService.getImageKey).toHaveBeenCalledTimes(1);
      expect(sliderImageService.getImageKey).toHaveBeenCalledWith(id);
      expect(s3Service.deleteFile).toHaveBeenCalledTimes(1);
      expect(s3Service.deleteFile).toHaveBeenCalledWith('key1');
    });

    it('should throw BadException error', async () => {
      const id = uuid.v4();
      mockSlidersService.remove.mockResolvedValue({ id });
      mockSliderImage.getImageKey.mockResolvedValue('key1');
      mockS3Service.deleteFile.mockResolvedValue(() => {
        throw new Error();
      });
      try {
        await resolver.removeSlider(id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe(errors.NOT_DELETED('Slider'));
      }
    });
  });

  describe('Validation Pipes', () => {
    let validationPipe: ValidationPipe;
    beforeEach(() => {
      validationPipe = new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });
    });

    it('valid input', async () => {
      const validInput: CreateSliderInput = {
        ...mockSlider,
      };
      const result = await validationPipe.transform(validInput, {
        type: 'body',
        metatype: CreateSliderInput,
      });
      expect(result).toEqual(validInput);

      const validUpdateInput: UpdateSliderInput = {
        id: uuid.v4(),
        sliderName: 'updated Name',
      };

      const resultUpdate = await validationPipe.transform(validUpdateInput, {
        type: 'body',
        metatype: UpdateSliderInput,
      });

      expect(resultUpdate).toEqual(validUpdateInput);

      const validRemoveInput = uuid.v4();

      const resultRemove = await validationPipe.transform(validRemoveInput, {
        type: 'body',
        metatype: UUID,
      });
      expect(resultRemove).toEqual(validRemoveInput);

      const validFindOneInput = uuid.v4();

      const resultFindOne = await validationPipe.transform(validFindOneInput, {
        type: 'body',
        metatype: UUID,
      });
      expect(resultFindOne).toEqual(validFindOneInput);
    });
    it('invalid input', async () => {
      const invalidInput: CreateSliderInput = {
        ...mockSlider,
        sliderName: '',
      };
      try {
        await validationPipe.transform(invalidInput, {
          type: 'body',
          metatype: CreateSliderInput,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }

      const invalidUpdateInput: UpdateSliderInput = {
        id: mockSlider.id,
        sliderName: '',
      };

      try {
        await validationPipe.transform(invalidUpdateInput, {
          type: 'body',
          metatype: UpdateSliderInput,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }

      const invalidRemoveInput = '';
      try {
        await validationPipe.transform(invalidRemoveInput, {
          type: 'body',
          metatype: UUID,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }

      const invalidFindOneInput = '';
      try {
        await validationPipe.transform(invalidFindOneInput, {
          type: 'body',
          metatype: UUID,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
