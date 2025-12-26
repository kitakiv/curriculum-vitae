import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import { TechStack } from './entities/techstack.entity';
import { TechStackImageService } from './tachstackImage.service';
const mockTechStackRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  existsBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
};

const mockLogger = {
  error: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
};

const mockUuid = uuid.v4();

const mockTechStack = new TechStack({
  techName: 'techName',
  techSvg: `https://image/${mockUuid}.svg`,
});
describe('TechStackImageService', () => {
  let serviceImage: TechStackImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechStackImageService,
        {
          provide: getRepositoryToken(TechStack),
          useValue: mockTechStackRepository,
        },
        {
          provide: Logger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    serviceImage = module.get<TechStackImageService>(TechStackImageService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(serviceImage).toBeDefined();
  });

  describe('uploadImage', () => {
    const expectedValue = {
      id: mockUuid,
      techSvg: mockTechStack.techSvg,
    };
    const inputTechStackImage = {
      id: mockUuid,
      image: mockTechStack.techSvg,
    };
    it('should upload image successfully', async () => {
      mockTechStackRepository.existsBy.mockResolvedValue(true);
      mockTechStackRepository.update.mockResolvedValue(expectedValue);
      const result = await serviceImage.uploadImage(inputTechStackImage);
      expect(mockTechStackRepository.update).toHaveBeenCalled();
      expect(mockTechStackRepository.update).toHaveBeenCalledWith(mockUuid, {
        techSvg: mockTechStack.techSvg,
      });
      expect(mockTechStackRepository.existsBy).toHaveBeenCalled();
      expect(mockTechStackRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(expectedValue);
    });

    it('should return NOT_FOUND when techStack not found', async () => {
      mockTechStackRepository.existsBy.mockResolvedValue(false);
      mockTechStackRepository.update.mockResolvedValue(expectedValue);
      await expect(
        serviceImage.uploadImage(inputTechStackImage),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when update fails', async () => {
      mockTechStackRepository.existsBy.mockResolvedValue(true);
      mockTechStackRepository.update.mockRejectedValue(new Error('DB Error'));
      await expect(
        serviceImage.uploadImage(inputTechStackImage),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getImageKey', () => {
    it('should return key of image', async () => {
      mockTechStackRepository.existsBy.mockResolvedValue(true);
      mockTechStackRepository.findOneBy.mockResolvedValue(mockTechStack);
      const expectedResult = mockTechStack.techSvg.split('/').at(-1);
      const result = await serviceImage.getImageKey(mockUuid);
      expect(mockTechStackRepository.existsBy).toHaveBeenCalled();
      expect(mockTechStackRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockTechStackRepository.findOneBy).toHaveBeenCalled();
      expect(mockTechStackRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(expectedResult);
    });

    it('should return null if image not defined in slider', async () => {
      mockTechStackRepository.existsBy.mockResolvedValue(true);
      mockTechStackRepository.findOneBy.mockResolvedValue({
        ...mockTechStack,
        techSvg: null,
      });
      const result = await serviceImage.getImageKey(mockUuid);
      expect(result).toBeNull();
    });

    it('should throw NotFoundException when techStack not found', async () => {
      mockTechStackRepository.existsBy.mockResolvedValue(false);
      await expect(serviceImage.getImageKey(mockUuid)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return the decodedUri key of image', async () => {
      mockTechStackRepository.existsBy.mockResolvedValue(true);
      mockTechStackRepository.findOneBy.mockResolvedValue({
        ...mockTechStack,
        techSvg: `https://image/${encodeURIComponent(`${mockUuid}.svg%ndk`)}`,
      });
      const result = await serviceImage.getImageKey(mockUuid);
      const expectedResult = decodeURIComponent(
        encodeURIComponent(`${mockUuid}.svg%ndk`),
      );
      expect(result).toBe(expectedResult);
    });
  });
});
