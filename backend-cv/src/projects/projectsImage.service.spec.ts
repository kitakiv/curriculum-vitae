import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsImageService } from './projectsImage.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import * as uuid from 'uuid';

const mockProjectsRepository = {
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

const mockProject = new Project({
  projectDemoLink: 'https://google.com',
  projectDescription: 'description',
  projectGithubLink: 'https://github.com',
  projectImages: [`https://image/${mockUuid}-1.jpg`],
  projectTitle: 'title 1',
  techStacks: [],
});

const mockImagesInput = {
  id: mockUuid,
  projectImages: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
  ],
};

describe('ProjectsImageService', () => {
  let serviceImage: ProjectsImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsImageService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectsRepository,
        },
        {
          provide: Logger,
          useValue: mockLogger,
        }
      ],
    }).compile();

    serviceImage = module.get<ProjectsImageService>(ProjectsImageService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(serviceImage).toBeDefined();
  });

  describe('uploadImages', () => {
    it('should upload images successfully', async () => {
      mockProjectsRepository.existsBy.mockResolvedValue(true);
      mockProjectsRepository.update.mockResolvedValue(mockImagesInput);
      const result = await serviceImage.uploadImages({
        id: mockUuid,
        images: mockImagesInput.projectImages,
      });
      expect(mockProjectsRepository.update).toHaveBeenCalled();
      expect(mockProjectsRepository.update).toHaveBeenCalledWith(mockUuid, {
        projectImages: mockImagesInput.projectImages,
      });
      expect(mockProjectsRepository.existsBy).toHaveBeenCalled();
      expect(mockProjectsRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(mockImagesInput);
    });

    it('should return NOT_FOUND when project not found', async () => {
      mockProjectsRepository.existsBy.mockResolvedValue(false);
      mockProjectsRepository.update.mockResolvedValue(mockImagesInput);
      await expect(
        serviceImage.uploadImages({
          id: mockUuid,
          images: mockImagesInput.projectImages,
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when update fails', async () => {
      mockProjectsRepository.existsBy.mockResolvedValue(true);
      mockProjectsRepository.update.mockRejectedValue(new Error('DB Error'));
      await expect(
        serviceImage.uploadImages({
          id: mockUuid,
          images: mockImagesInput.projectImages,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('uploadImageIndex', () => {
    it('should add image with index successfully', async () => {
      mockProjectsRepository.findOneBy.mockResolvedValue(mockProject);
      mockProjectsRepository.update.mockResolvedValue(mockImagesInput);
      const url = `https://example/${mockUuid}-1.svg`;
      await serviceImage.uploadImageIndex({
        id: mockUuid,
        index: 1,
        url,
      });
      expect(mockProjectsRepository.findOneBy).toHaveBeenCalled();
      expect(mockProjectsRepository.update).toHaveBeenCalled();
      expect(mockProjectsRepository.update).toHaveBeenCalledWith(mockUuid, {
        projectImages: [url],
      });
    });

    it('should add image url if it not exits the same image with index', async () => {
      const url = `https://example/${mockUuid}-2.svg`;
      mockProjectsRepository.findOneBy.mockResolvedValue(mockProject);
      mockProjectsRepository.update.mockResolvedValue(mockImagesInput);
      await serviceImage.uploadImageIndex({
        id: mockUuid,
        index: 2,
        url,
      });
      expect(mockProjectsRepository.findOneBy).toHaveBeenCalled();
      expect(mockProjectsRepository.update).toHaveBeenCalled();
      expect(mockProjectsRepository.update).toHaveBeenCalledWith(mockUuid, {
        projectImages: [...mockProject.projectImages, url],
      });
    });

    it('should throw NotFoundException when project not found', async () => {
      mockProjectsRepository.findOneBy.mockResolvedValue(null);
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
      mockProjectsRepository.findOneBy.mockResolvedValue(mockProject);
      mockProjectsRepository.update.mockRejectedValue(new Error('DB Error'));
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
    it('should return key of image', async () => {
      mockProjectsRepository.existsBy.mockResolvedValue(true);
      mockProjectsRepository.findOneBy.mockResolvedValue(mockProject);
      const id = `${mockUuid}-1`;
      const expectedResult = mockProject.projectImages[0].split('/').at(-1);
      const result = await serviceImage.getImageKey(id);
      expect(mockProjectsRepository.existsBy).toHaveBeenCalled();
      expect(mockProjectsRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockProjectsRepository.findOneBy).toHaveBeenCalled();
      expect(mockProjectsRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(expectedResult);
    });

    it('should return null if image not defined in projects images', async () => {
      mockProjectsRepository.existsBy.mockResolvedValue(true);
      mockProjectsRepository.findOneBy.mockResolvedValue({
        ...mockProject,
      });
      const id = `${mockUuid}-2`;
      const result = await serviceImage.getImageKey(id);
      expect(result).toBeNull();
    });

    it('should throw NotFoundException when project not found', async () => {
      mockProjectsRepository.existsBy.mockResolvedValue(false);
      const id = `${mockUuid}-1`;
      await expect(serviceImage.getImageKey(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getImageKeys', () => {
    it('should return keys of images successfully', async () => {
      mockProjectsRepository.existsBy.mockResolvedValue(true);
      mockProjectsRepository.findOneBy.mockResolvedValue(mockProject);
      const expectedResult = mockProject.projectImages.map((image) => {
        return image.split('/').at(-1);
      });
      const result = await serviceImage.getImageKeys(mockUuid);
      expect(mockProjectsRepository.existsBy).toHaveBeenCalled();
      expect(mockProjectsRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockProjectsRepository.findOneBy).toHaveBeenCalled();
      expect(mockProjectsRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toEqual(expectedResult);
    });

    it('should return null if no images in project', async () => {
      mockProjectsRepository.existsBy.mockResolvedValue(true);
      mockProjectsRepository.findOneBy.mockResolvedValue({
        ...mockProject,
        projectImages: null,
      });
      const result = await serviceImage.getImageKeys(mockUuid);
      expect(mockProjectsRepository.existsBy).toHaveBeenCalled();
      expect(mockProjectsRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockProjectsRepository.findOneBy).toHaveBeenCalled();
      expect(mockProjectsRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(result).toBeNull();
    });

    it('should throw NotFoundException when project not found', async () => {
      mockProjectsRepository.existsBy.mockResolvedValue(false);
      await expect(serviceImage.getImageKeys(mockUuid)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
