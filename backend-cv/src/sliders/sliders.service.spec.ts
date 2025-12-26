import { Test, TestingModule } from '@nestjs/testing';
import { SlidersService } from './sliders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Slider } from './entities/slider.entity';
import { BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';
import * as uuid from 'uuid';
import { RedisCacheService } from '../cache/cache.service';
import uploadVariables from '../variables/upload.variables';

const mockSliderRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  existsBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockLogger = {
  error: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
};

const mockRedisCacheService = {
  set: jest.fn(),
  get: jest.fn(),
  getMany: jest.fn(),
};

const mockUuid = uuid.v4();

describe('SlidersService', () => {
  let service: SlidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlidersService,
        {
          provide: getRepositoryToken(Slider),
          useValue: mockSliderRepository,
        },
        {
          provide: Logger,
          useValue: mockLogger,
        },
        {
          provide: RedisCacheService,
          useValue: mockRedisCacheService,
        },
      ],
    }).compile();

    service = module.get<SlidersService>(SlidersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createSliderInput: CreateSliderInput = {
      sliderName: 'sliderName',
      sliderText: 'sliderText',
      sliderImage: 'sliderImage.svg',
    };

    it('should create a slider successfully', async () => {
      const expectedSlider = { id: mockUuid, ...createSliderInput };
      mockSliderRepository.save.mockResolvedValue(expectedSlider);

      const result = await service.create(createSliderInput);

      expect(mockSliderRepository.create).toHaveBeenCalled();
      expect(mockSliderRepository.save).toHaveBeenCalled();
      expect(mockSliderRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(createSliderInput),
      );
      expect(result).toEqual(expect.objectContaining(expectedSlider));
    });

    it('should throw BadRequestException when creation fails', async () => {
      mockSliderRepository.save.mockRejectedValue(new Error('DB Error'));

      await expect(service.create(createSliderInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all sliders', async () => {
      const expectedSliders = [
        {
          id: '1',
          sliderName: 'sliderName',
          sliderText: 'sliderText',
          sliderImage: 'sliderImage.svg',
        }
      ];
      mockSliderRepository.find.mockResolvedValue(expectedSliders);

      const result = await service.findAll();
      expect(mockSliderRepository.find).toHaveBeenCalled();
      expect(result).toEqual(expectedSliders);
    });

    it('should set the cache if no cache exists', async () => {
      const expectedSliders = [
        {
          id: '1',
          sliderName: 'sliderName',
          sliderText: 'sliderText',
          sliderImage: 'sliderImage.svg',
        }
      ];
      mockSliderRepository.find.mockResolvedValue(expectedSliders);
      mockRedisCacheService.get.mockResolvedValue(null);

      await service.findAll();
      expect(mockRedisCacheService.get).toHaveBeenCalledWith(
        uploadVariables.sliders.cacheKey,
      );
      expect(mockRedisCacheService.set).toHaveBeenCalled();
      expect(mockRedisCacheService.set).toHaveBeenCalledWith(
        uploadVariables.sliders.cacheKey,
        JSON.stringify(expectedSliders),
        uploadVariables.sliders.cacheTime,
      );
    });

    it('should return cache if exist', async () => {
      const expectedSliders = [
        {
          id: '1',
          sliderName: 'sliderName',
          sliderText: 'sliderText',
          sliderImage: 'sliderImage.svg',
        }
      ];
      mockSliderRepository.find.mockResolvedValue(expectedSliders);
      mockRedisCacheService.get.mockResolvedValue(
        JSON.stringify(expectedSliders),
      );

      await service.findAll();
      expect(mockRedisCacheService.get).toHaveBeenCalled();
      expect(mockRedisCacheService.get).toHaveBeenCalledWith(
        uploadVariables.sliders.cacheKey,
      );
      expect(mockSliderRepository.find).not.toHaveBeenCalled();
      expect(mockRedisCacheService.set).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a slider by id', async () => {
      const expectedSlider = { id: '1', sliderName: 'sliderName' };
      mockSliderRepository.findOneBy.mockResolvedValue(expectedSlider);

      const result = await service.findOne('1');

      expect(mockSliderRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(expectedSlider);
    });

    it('should throw NotFoundException when slider not found', async () => {
      mockSliderRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateSliderInput: UpdateSliderInput = {
      sliderName: 'Updated sliderName',
      id: mockUuid,
    };

    it('should update a slider successfully', async () => {
      const updatedSlider = { id: mockUuid, ...updateSliderInput };
      mockSliderRepository.existsBy.mockResolvedValue(true);
      mockSliderRepository.findOneBy.mockResolvedValue(updatedSlider);

      const result = await service.update(mockUuid, updateSliderInput);

      expect(mockSliderRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockSliderRepository.update).toHaveBeenCalledWith(
        mockUuid,
        updateSliderInput,
      );
      expect(result).toEqual(updatedSlider);
    });

    it('should throw NotFoundException when slider does not exist', async () => {
      mockSliderRepository.existsBy.mockResolvedValue(false);

      await expect(service.update(mockUuid, updateSliderInput)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when update fails', async () => {
      mockSliderRepository.existsBy.mockResolvedValue(true);
      mockSliderRepository.update.mockRejectedValue(new Error('DB Error'));

      await expect(service.update(mockUuid, updateSliderInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a slider successfully', async () => {
      mockSliderRepository.existsBy.mockResolvedValue(true);

      const result = await service.remove(mockUuid);

      expect(mockSliderRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockSliderRepository.delete).toHaveBeenCalledWith(mockUuid);
      expect(result).toEqual({ id: mockUuid });
    });

    it('should throw NotFoundException when slider does not exist', async () => {
      mockSliderRepository.existsBy.mockResolvedValue(false);
      await expect(service.remove(mockUuid)).rejects.toThrow(NotFoundException);
    });
  });
});
