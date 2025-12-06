import { Test, TestingModule } from '@nestjs/testing';
import { ProfileImageService } from './profileImage.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';

const mockProfileRepository = {
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

const mockProfile = new Profile({});

const mockImagesInput = {
  id: mockUuid,
  profilePhotos: [
    `https://example.com/${mockUuid}-1.jpg`,
    `https://example.com/${mockUuid}-2.jpg`,
  ],
};

describe('ProfileImageService', () => {
  let serviceImage: ProfileImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileImageService,
        {
          provide: getRepositoryToken(Profile),
          useValue: mockProfileRepository,
        },
      ],
    }).compile();

    serviceImage = module.get<ProfileImageService>(ProfileImageService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(serviceImage).toBeDefined();
  });

  describe('uploadImages', () => {
    it('should upload images successfully', async () => {
      mockProfileRepository.existsBy.mockResolvedValue(true);
      mockProfileRepository.update.mockResolvedValue(mockImagesInput);
      const result = await serviceImage.uploadImages({
        id: mockUuid,
        images: mockImagesInput.profilePhotos,
      });
      expect(mockProfileRepository.update).toHaveBeenCalled();
      expect(mockProfileRepository.update).toHaveBeenCalledWith(mockUuid, {
        profilePhotos: mockImagesInput.profilePhotos,
      });
      expect(mockProfileRepository.existsBy).toHaveBeenCalled();
      expect(mockProfileRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(mockImagesInput);
    });

    it('should return NOT_FOUND when profile not found', async () => {
      mockProfileRepository.existsBy.mockResolvedValue(false);
      mockProfileRepository.update.mockResolvedValue(mockImagesInput);
      await expect(
        serviceImage.uploadImages({
          id: mockUuid,
          images: mockImagesInput.profilePhotos,
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when update fails', async () => {
      mockProfileRepository.existsBy.mockResolvedValue(true);
      mockProfileRepository.update.mockRejectedValue(new Error('DB Error'));
      await expect(
        serviceImage.uploadImages({
          id: mockUuid,
          images: mockImagesInput.profilePhotos,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('uploadImageIndex', () => {
    it('should add image with index successfully', async () => {
      mockProfileRepository.findOneBy.mockResolvedValue({
        ...mockProfile,
        profilePhotos: mockImagesInput.profilePhotos,
      });
      const url = `https://example/${mockUuid}-1.svg`;
      mockProfileRepository.update.mockResolvedValue({
        id: mockUuid,
        profilePhotos: [url, mockImagesInput.profilePhotos[1]],
      });
      const result = await serviceImage.uploadImageIndex({
        id: mockUuid,
        index: 1,
        url,
      });
      expect(mockProfileRepository.findOneBy).toHaveBeenCalled();
      expect(mockProfileRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockProfileRepository.update).toHaveBeenCalled();
      expect(mockProfileRepository.update).toHaveBeenCalledWith(mockUuid, {
        profilePhotos: [mockImagesInput.profilePhotos[1], url],
      })
      expect(result).toEqual({
        id: mockUuid,
        profilePhotos: [mockImagesInput.profilePhotos[1], url],
      });
    });

    it('should add image url if there isn`t image with the same index', async () => {
      const url = `https://example/${mockUuid}-3.svg`;
      mockProfileRepository.findOneBy.mockResolvedValue({
        ...mockProfile,
        profilePhotos: [],
      });
      mockProfileRepository.update.mockResolvedValue(mockImagesInput);
      const result = await serviceImage.uploadImageIndex({
        id: mockUuid,
        index: 2,
        url,
      });
      expect(mockProfileRepository.findOneBy).toHaveBeenCalled();
      expect(mockProfileRepository.update).toHaveBeenCalled();
      expect(mockProfileRepository.update).toHaveBeenCalledWith(mockUuid, {
        profilePhotos: [url],
      });
      expect(result).toEqual({
        id: mockUuid,
        profilePhotos: [url],
      });
    });

    it('should throw NotFoundException when profile not found', async () => {
      mockProfileRepository.findOneBy.mockResolvedValue(null);
      const url = `https://example/${mockUuid}-1.svg`;
      await expect(
        serviceImage.uploadImageIndex({
          id: mockUuid,
          index: 1,
          url,
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadException when update fails', async () => {
      mockProfileRepository.findOneBy.mockResolvedValue(mockProfile);
      mockProfileRepository.update.mockRejectedValue(new Error('DB Error'));
      const url = `https://example/${mockUuid}-1.svg`;
      await expect(
        serviceImage.uploadImageIndex({
          id: mockUuid,
          index: 1,
          url,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getImageKey', () => {
    const resolvedValue = {
      ...mockProfile,
      profilePhotos: mockImagesInput.profilePhotos,
    }
    it('should return key of image', async () => {
      mockProfileRepository.existsBy.mockResolvedValue(true);
      mockProfileRepository.findOneBy.mockResolvedValue(resolvedValue);
      const id = `${mockUuid}-1`;
      const expectedResult = mockImagesInput.profilePhotos[0].split('/').at(-1);
      const result = await serviceImage.getImageKey(id);
      expect(mockProfileRepository.existsBy).toHaveBeenCalled();
      expect(mockProfileRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockProfileRepository.findOneBy).toHaveBeenCalled();
      expect(mockProfileRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(expectedResult);
    });

    it('should return null if image not defined in projects images', async () => {
      mockProfileRepository.existsBy.mockResolvedValue(true);
      mockProfileRepository.findOneBy.mockResolvedValue({
        ...mockProfile,
      });
      const id = `${mockUuid}-1`;
      const result = await serviceImage.getImageKey(id);
      expect(result).toBeNull();
    });

    it('should throw NotFoundException when project not found', async () => {
      mockProfileRepository.existsBy.mockResolvedValue(false);
      const id = `${mockUuid}-1`;
      await expect(serviceImage.getImageKey(id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return decodeURIComponent of image', async () => {
      mockProfileRepository.existsBy.mockResolvedValue(true);
      mockProfileRepository.findOneBy.mockResolvedValue({
        ...mockProfile,
        profilePhotos: [
          `https://example/${encodeURIComponent(`${mockUuid}-1.svg$#`)}`,
        ]
      });
      const id = `${mockUuid}-1`;
      const expectedResult = decodeURIComponent(
        `https://example/${encodeURIComponent(`${mockUuid}-1.svg$#`)}`,
      )
        .split('/')
        .at(-1);
      const result = await serviceImage.getImageKey(id);
      expect(result).toEqual(expectedResult);
    })
  });

  describe('getImageKeys', () => {
    const resolvedValue = {
      ...mockProfile,
      profilePhotos: mockImagesInput.profilePhotos,
    };
    it('should return keys of images successfully', async () => {
      mockProfileRepository.existsBy.mockResolvedValue(true);
      mockProfileRepository.findOneBy.mockResolvedValue(resolvedValue);
      const expectedResult = mockImagesInput.profilePhotos.map((image) => {
        return image.split('/').at(-1);
      });
      const result = await serviceImage.getImageKeys(mockUuid);
      expect(mockProfileRepository.existsBy).toHaveBeenCalled();
      expect(mockProfileRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockProfileRepository.findOneBy).toHaveBeenCalled();
      expect(mockProfileRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(expectedResult);
    });

    it('should return null if no images in project', async () => {
      mockProfileRepository.existsBy.mockResolvedValue(true);
      mockProfileRepository.findOneBy.mockResolvedValue({
        ...mockProfile,
        profilePhotos: null,
      });
      const result = await serviceImage.getImageKeys(mockUuid);
      expect(mockProfileRepository.existsBy).toHaveBeenCalled();
      expect(mockProfileRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockProfileRepository.findOneBy).toHaveBeenCalled();
      expect(mockProfileRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toBeNull();
    });

    it('should throw NotFoundException when project not found', async () => {
      mockProfileRepository.existsBy.mockResolvedValue(false);
      await expect(serviceImage.getImageKeys(mockUuid)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
