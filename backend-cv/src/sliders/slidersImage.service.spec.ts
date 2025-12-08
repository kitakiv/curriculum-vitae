import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import { Slider } from './entities/slider.entity';
import { SliderImageService } from './sliderImage.service';

const mockSlidersRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  existsBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
};

const mockUuid = uuid.v4();

const mockSlider = new Slider({
  sliderImage: `https://image/${mockUuid}.png`,
  sliderName: 'SliderName 1',
  sliderText: 'SliderText 1',
});
describe('SliderImageService', () => {
  let serviceImage: SliderImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SliderImageService,
        {
          provide: getRepositoryToken(Slider),
          useValue: mockSlidersRepository,
        },
      ],
    }).compile();

    serviceImage = module.get<SliderImageService>(SliderImageService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(serviceImage).toBeDefined();
  });

  describe('uploadImage', () => {
    const expectedValue = {
      id: mockUuid,
      sliderImage: mockSlider.sliderImage,
    };
    const inputSliderImage = {
      id: mockUuid,
      image: mockSlider.sliderImage,
    };
    it('should upload image successfully', async () => {
      mockSlidersRepository.existsBy.mockResolvedValue(true);
      mockSlidersRepository.update.mockResolvedValue(expectedValue);
      const result = await serviceImage.uploadImage(inputSliderImage);
      expect(mockSlidersRepository.update).toHaveBeenCalled();
      expect(mockSlidersRepository.update).toHaveBeenCalledWith(mockUuid, {
        sliderImage: mockSlider.sliderImage,
      });
      expect(mockSlidersRepository.existsBy).toHaveBeenCalled();
      expect(mockSlidersRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(expectedValue);
    });

    it('should return NOT_FOUND when slider not found', async () => {
      mockSlidersRepository.existsBy.mockResolvedValue(false);
      mockSlidersRepository.update.mockResolvedValue(expectedValue);
      await expect(serviceImage.uploadImage(inputSliderImage)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when update fails', async () => {
      mockSlidersRepository.existsBy.mockResolvedValue(true);
      mockSlidersRepository.update.mockRejectedValue(new Error('DB Error'));
      await expect(serviceImage.uploadImage(inputSliderImage)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getImageKey', () => {
    it('should return key of image', async () => {
      mockSlidersRepository.existsBy.mockResolvedValue(true);
      mockSlidersRepository.findOneBy.mockResolvedValue(mockSlider);
      const expectedResult = mockSlider.sliderImage.split('/').at(-1);
      const result = await serviceImage.getImageKey(mockUuid);
      expect(mockSlidersRepository.existsBy).toHaveBeenCalled();
      expect(mockSlidersRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockSlidersRepository.findOneBy).toHaveBeenCalled();
      expect(mockSlidersRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(expectedResult);
    });

    it('should return null if image not defined in slider', async () => {
      mockSlidersRepository.existsBy.mockResolvedValue(true);
      mockSlidersRepository.findOneBy.mockResolvedValue({
        ...mockSlider,
        sliderImage: null,
      });
      const result = await serviceImage.getImageKey(mockUuid);
      expect(result).toBeNull();
    });

    it('should throw NotFoundException when slider not found', async () => {
      mockSlidersRepository.existsBy.mockResolvedValue(false);
      await expect(serviceImage.getImageKey(mockUuid)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return the decodedUri key of image', async () => {
      mockSlidersRepository.existsBy.mockResolvedValue(true);
      mockSlidersRepository.findOneBy.mockResolvedValue({
        ...mockSlider,
        sliderImage: `https://image/${encodeURIComponent(`${mockUuid}.png%ndk`)}`,
      });
      const result = await serviceImage.getImageKey(mockUuid);
      const expectedResult = decodeURIComponent(
        encodeURIComponent(`${mockUuid}.png%ndk`),
      );
      expect(result).toBe(expectedResult);
    });
  });
});
