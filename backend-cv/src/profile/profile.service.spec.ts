import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { BadRequestException } from '@nestjs/common';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Logger } from '@nestjs/common';
import * as uuid from 'uuid';
import { mock } from 'node:test';

const mockProfileRepository = {
  findOneBy: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
};

const mockLogger = {
  error: jest.fn(),
  log: jest.fn(),
};
const mockUuid = uuid.v4();

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getRepositoryToken(Profile),
          useValue: mockProfileRepository,
        },
        {
          provide: Logger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should create a profile if doesn`t exist', async () => {
      mockProfileRepository.findOneBy.mockResolvedValueOnce(null);
      const profile = new Profile({});
      mockProfileRepository.create.mockResolvedValue(profile);
      const result = await service.find();
      expect(mockProfileRepository.findOneBy).toHaveBeenCalledWith({});
      expect(mockProfileRepository.create).toHaveBeenCalled();
      expect(mockProfileRepository.save).toHaveBeenCalled();
      expect(mockProfileRepository.create).toHaveBeenCalledWith(profile);
      expect(result).toEqual(profile);
    });

    it('should return a default profile', async () => {
      const profile = new Profile({});
      mockProfileRepository.findOneBy.mockResolvedValue(profile);
      const result = await service.find();
      expect(mockProfileRepository.findOneBy).toHaveBeenCalledWith({});
      expect(mockProfileRepository.findOneBy).toHaveBeenCalledWith({});
      expect(result).toEqual(profile);
    });
  });

  describe('update', () => {
    const updateProfileInput: UpdateProfileInput = {
      name: 'UpdatedName',
      surname: 'UpdatedSurname',
    };

    it('should update a profile successfully', async () => {
      const profile = new Profile({});
      profile.id = mockUuid;
      const resultUpdate = {
        id: mockUuid,
        ...profile,
        ...updateProfileInput,
      };
      mockProfileRepository.findOneBy
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(resultUpdate);
      mockProfileRepository.create.mockReturnValue(profile);
      mockProfileRepository.save.mockResolvedValue(profile);
      mockProfileRepository.update.mockResolvedValue(resultUpdate);
      const result = await service.update(updateProfileInput);
      expect(mockProfileRepository.findOneBy).toHaveBeenCalledWith({});
      expect(mockProfileRepository.create).toHaveBeenCalled();
      expect(mockProfileRepository.save).toHaveBeenCalled();
      expect(mockProfileRepository.update).toHaveBeenCalledWith(
        mockUuid,
        updateProfileInput,
      );
      expect(mockProfileRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(resultUpdate);
    });

    it('should update profile if it exist', async () => {
      const updateProfileInput: UpdateProfileInput = {
        name: 'updated name',
      };
      const profile = new Profile({
        ...updateProfileInput,
      });
      profile.id = mockUuid;
      mockProfileRepository.findOneBy.mockResolvedValue(profile);
      mockProfileRepository.update.mockResolvedValue(profile);
      const result = await service.update(updateProfileInput);
      expect(mockProfileRepository.findOneBy).toHaveBeenCalled();
      expect(mockProfileRepository.findOneBy).toHaveBeenCalledWith({});
      expect(mockProfileRepository.update).toHaveBeenCalled();
      expect(mockProfileRepository.update).toHaveBeenCalledWith(
        profile.id,
        updateProfileInput,
      );
      expect(result).toEqual(profile);
    });

    it('should throw BadRequestException if update was wrong', async () => {
      mockProfileRepository.findOneBy.mockResolvedValue(null);
      const profile = new Profile({});
      mockProfileRepository.create.mockReturnValue({
        ...profile,
        id: mockUuid
      });
      mockProfileRepository.save.mockResolvedValue({
        ...profile,
        id: mockUuid,
      });
      mockProfileRepository.update.mockRejectedValue(new Error('Db error'));
      await expect(service.update(updateProfileInput)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockProfileRepository.findOneBy).toHaveBeenCalledWith({});
      expect(mockProfileRepository.create).toHaveBeenCalled();
      expect(mockProfileRepository.save).toHaveBeenCalled();
      expect(mockProfileRepository.update).toHaveBeenCalledWith(
        mockUuid,
        updateProfileInput,
      );
    });
    
  });
});
