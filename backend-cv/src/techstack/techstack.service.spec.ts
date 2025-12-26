import { Test, TestingModule } from '@nestjs/testing';
import { TechStackService } from './techstack.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TechStack } from './entities/techstack.entity';
import { BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { CreateTechStackInput } from './dto/create-techstack.input';
import { UpdateTechStackInput } from './dto/update-techstack.input';
import * as uuid from 'uuid';
import { RedisCacheService } from '../cache/cache.service';
import uploadVariables from '../variables/upload.variables';

const mockTechStackRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  existsBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockRedisCacheService = {
  set: jest.fn(),
  get: jest.fn(),
  getMany: jest.fn(),
}

const mockLogger = {
  error: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
};

const mockUuid = uuid.v4();

describe('TechStackService', () => {
  let service: TechStackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechStackService,
        {
          provide: getRepositoryToken(TechStack),
          useValue: mockTechStackRepository,
        },
        {
          provide: Logger,
          useValue: mockLogger,
        },
        {
          provide: RedisCacheService,
          useValue: mockRedisCacheService
        }
      ],
    }).compile();

    service = module.get<TechStackService>(TechStackService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createTechStackInput: CreateTechStackInput = {
      techName: 'techName',
      techSvg: 'techSvg.svg',
    };

    it('should create a techStack successfully', async () => {
      const expectedTechStack = { id: mockUuid, ...createTechStackInput };
      mockTechStackRepository.create.mockResolvedValue(expectedTechStack);
      const result = await service.create(createTechStackInput);

      expect(mockTechStackRepository.create).toHaveBeenCalled();
      expect(mockTechStackRepository.save).toHaveBeenCalled();
      expect(mockTechStackRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(createTechStackInput),
      );
      expect(result).toEqual(expect.objectContaining(expectedTechStack));
    });

    it('should throw BadRequestException when creation fails', async () => {
      mockTechStackRepository.save.mockRejectedValue(new Error('DB Error'));

      await expect(service.create(createTechStackInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all techStack', async () => {
      const expectedTechStack = [
        {
          id: '1',
          techName: 'techName',
          techSvg: 'techSvg.svg',
        }
      ];
      mockTechStackRepository.find.mockResolvedValue(expectedTechStack);

      const result = await service.findAll();
      expect(mockTechStackRepository.find).toHaveBeenCalled();
      expect(result).toEqual(expectedTechStack);
    });

    it('should set the cache if no cache exists', async () => {
      const expectedTechStack = [
        {
          id: '1',
          techName: 'techName',
          techSvg: 'techSvg.svg',
        }
      ];
      mockTechStackRepository.find.mockResolvedValue(expectedTechStack);
      mockRedisCacheService.get.mockResolvedValue(null);

      await service.findAll();
      expect(mockRedisCacheService.set).toHaveBeenCalledWith(
        uploadVariables.techstack.cacheKey,
        JSON.stringify(expectedTechStack),
        uploadVariables.techstack.cacheTime
      );
      expect(mockTechStackRepository.find).toHaveBeenCalled();
      expect(mockRedisCacheService.get).toHaveBeenCalled();
    });

    it('should return cache if exist', async () => {
      const expectedTechStack = [
        {
          id: '1',
          techName: 'techName',
          techSvg: 'techSvg.svg',
        }
      ];
      mockTechStackRepository.find.mockResolvedValue(expectedTechStack);
      mockRedisCacheService.get.mockResolvedValue(
        JSON.stringify(expectedTechStack),
      );

      await service.findAll();
      expect(mockRedisCacheService.get).toHaveBeenCalled();
      expect(mockRedisCacheService.get).toHaveBeenCalledWith(
        uploadVariables.techstack.cacheKey,
      );
      expect(mockTechStackRepository.find).not.toHaveBeenCalled();
      expect(mockRedisCacheService.set).not.toHaveBeenCalled();
    })
  });

  describe('findOne', () => {
    it('should return a techStack by id', async () => {
      const expectedTechStack = {
        id: mockUuid,
        techName: 'techName',
      };
      mockTechStackRepository.findOneBy.mockResolvedValue(expectedTechStack);
      mockTechStackRepository.existsBy.mockResolvedValue(true);
      const result = await service.findOne(mockUuid);

      expect(mockTechStackRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(expectedTechStack);
    });

    it('should throw NotFoundException when techStack not found', async () => {
      mockTechStackRepository.findOneBy.mockResolvedValue(null);
      mockTechStackRepository.existsBy.mockResolvedValue(false);
      await expect(service.findOne(mockUuid)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    const updateTechStackInput: UpdateTechStackInput = {
      techName: 'Updated techName',
      id: mockUuid,
    };

    it('should update a techStack successfully', async () => {
      const updatedTechStack = { id: mockUuid, ...updateTechStackInput };
      mockTechStackRepository.existsBy.mockResolvedValue(true);
      mockTechStackRepository.findOneBy.mockResolvedValue(updatedTechStack);

      const result = await service.update(mockUuid, updateTechStackInput);

      expect(mockTechStackRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockTechStackRepository.update).toHaveBeenCalledWith(
        mockUuid,
        updateTechStackInput,
      );
      expect(result).toEqual(updatedTechStack);
    });

    it('should throw NotFoundException when techStack does not exist', async () => {
      mockTechStackRepository.existsBy.mockResolvedValue(false);

      await expect(
        service.update(mockUuid, updateTechStackInput),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when update fails', async () => {
      mockTechStackRepository.existsBy.mockResolvedValue(true);
      mockTechStackRepository.update.mockRejectedValue(new Error('DB Error'));

      await expect(
        service.update(mockUuid, updateTechStackInput),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove a techStack successfully', async () => {
      mockTechStackRepository.existsBy.mockResolvedValue(true);

      const result = await service.remove(mockUuid);

      expect(mockTechStackRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockTechStackRepository.delete).toHaveBeenCalledWith(mockUuid);
      expect(result).toEqual({ id: mockUuid });
    });

    it('should throw NotFoundException when techStack does not exist', async () => {
      mockTechStackRepository.existsBy.mockResolvedValue(false);
      await expect(service.remove(mockUuid)).rejects.toThrow(NotFoundException);
    });
  });
});
