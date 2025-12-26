import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { TechStack } from '../techstack/entities/techstack.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import * as uuid from 'uuid';
import { Logger } from '@nestjs/common';
import uploadVariables from '../variables/upload.variables';
import { RedisCacheService } from '../cache/cache.service';

const mockProjectRepository = {
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

const mockRedisCacheService = {
  set: jest.fn(),
  get: jest.fn(),
  getMany: jest.fn(),
};

const mockTechStackRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  existsBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockProject = new Project({
  projectDemoLink: 'https://example.com',
  projectGithubLink: 'https://example.com',
  projectTitle: 'projectTitle',
  projectDescription: 'long long description',
  projectImages: ['image.png', 'svg.svg'],
});

const mockTechStack = new TechStack({
  techName: 'techName',
  techSvg: 'https://some.img',
});

const mockUuid = uuid.v4();
const mockTechUuid = uuid.v4();

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectRepository,
        },
        {
          provide: getRepositoryToken(TechStack),
          useValue: mockTechStackRepository,
        },
        {
          provide: Logger,
          useValue: mockLogger
        },
        {
          provide: RedisCacheService,
          useValue: mockRedisCacheService
        }
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a project with techStack successfully', async () => {
      const createProjectInput: CreateProjectInput = {
        ...mockProject,
        techStacks: [mockTechUuid],
      };
      const expectedProject = { id: mockUuid, ...mockProject };
      mockProjectRepository.create.mockResolvedValue(expectedProject);
      mockProjectRepository.save.mockResolvedValue(expectedProject);
      mockTechStackRepository.findOneBy.mockResolvedValue(mockTechStack);
      const result = await service.create(createProjectInput);

      expect(mockProjectRepository.create).toHaveBeenCalled();
      expect(mockProjectRepository.save).toHaveBeenCalled();
      expect(mockProjectRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...createProjectInput,
          techStacks: [mockTechStack],
        }),
      );
      expect(mockTechStackRepository.findOneBy).toHaveBeenCalled();
      expect(mockTechStackRepository.findOneBy).toHaveBeenCalledWith({
        id: mockTechUuid,
      });
      expect(result).toEqual(expect.objectContaining(expectedProject));
    });

    it('should create project without techStack', async () => {
      const createProjectInput: CreateProjectInput = {
        ...mockProject,
        techStacks: [],
      };
      const expectedProject = { id: mockUuid, ...mockProject };
      mockProjectRepository.create.mockResolvedValue(expectedProject);
      mockProjectRepository.save.mockResolvedValue(expectedProject);
      const result = await service.create(createProjectInput);

      expect(mockProjectRepository.create).toHaveBeenCalled();
      expect(mockProjectRepository.save).toHaveBeenCalled();
      expect(mockProjectRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...createProjectInput,
          techStacks: [],
        }),
      );
      expect(result).toEqual(expect.objectContaining(expectedProject));
    });

    it('should throw BadRequestException when creation fails', async () => {
      mockProjectRepository.save.mockRejectedValue(new Error('DB Error'));
      const createProjectInput = {
        ...mockProject,
        techStacks: [],
      };
      await expect(service.create(createProjectInput)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    const createProjectInput: CreateProjectInput = {
      projectDemoLink: 'https://example.com',
      projectGithubLink: 'https://example.com',
      projectTitle: 'projectTitle',
      projectDescription: 'long long description',
      projectImages: ['image.png', 'svg.svg'],
    };
    it('should return all project', async () => {
      const expectProject = [
        {
          id: mockUuid,
          ...createProjectInput,
        },
      ];
      mockProjectRepository.find.mockResolvedValue(expectProject);

      const result = await service.findAll();
      expect(mockProjectRepository.find).toHaveBeenCalled();
      expect(mockProjectRepository.find).toHaveBeenCalledWith({
        relations: {
          techStacks: true,
        },
      });
      expect(result).toEqual(expectProject);
    });

    it('should return techStack if techStack in project exits', async () => {
      const expectProject = [
        {
          id: mockUuid,
          ...createProjectInput,
          techStacks: [{
              id: mockTechUuid,
              ...mockTechStack,
            }],
        },
      ];
      mockProjectRepository.find.mockResolvedValue(expectProject);

      const result = await service.findAll();
      expect(mockProjectRepository.find).toHaveBeenCalled();
      expect(mockProjectRepository.find).toHaveBeenCalledWith({
        relations: {
          techStacks: true,
        },
      });
      expect(result).toEqual(expect.arrayContaining(expectProject));
    });

    it('should set cache if not exist', async () => {
      const expectProject = [
        {
          id: mockUuid,
          ...createProjectInput,
        },
      ];
      mockProjectRepository.find.mockResolvedValue(expectProject);
      mockRedisCacheService.get.mockResolvedValue(null);

      const result = await service.findAll();
      expect(mockRedisCacheService.set).toHaveBeenCalled();
      expect(mockRedisCacheService.set).toHaveBeenCalledWith(
        uploadVariables.projects.cacheKey,
        JSON.stringify(expectProject),
        uploadVariables.projects.cacheTime,
      );
      expect(result).toEqual(expectProject);
    });

    it('should return cache if exist', async () => {
      const expectProject = [
        {
          id: mockUuid,
          ...createProjectInput,
        },
      ];
      mockProjectRepository.find.mockResolvedValue(expectProject);
      mockRedisCacheService.get.mockResolvedValue(
        JSON.stringify(expectProject),
      );
      await service.findAll();
      expect(mockRedisCacheService.get).toHaveBeenCalled();
      expect(mockRedisCacheService.get).toHaveBeenCalledWith(
        uploadVariables.projects.cacheKey,
      );
      expect(mockProjectRepository.find).not.toHaveBeenCalled();
      expect(mockRedisCacheService.set).not.toHaveBeenCalled();
    });
  });


  describe('findOne', () => {
    it('should return a project by id', async () => {
      const createProjectInput = {
        ...mockProject,
        techStack: [],
      };
      const expectedProject = { id: mockUuid, ...createProjectInput };
      mockProjectRepository.findOne.mockResolvedValue(expectedProject);

      const result = await service.findOne(mockUuid);

      expect(mockProjectRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUuid },
        relations: {
          techStacks: true,
        },
      });
      expect(result).toEqual(expectedProject);
    });

    it('should return techStack if techStack in project exits', async () => {
      const createProjectInput = {
        ...mockProject,
        techStack: [{
            id: mockTechUuid,
            ...mockTechStack,
          }],
      };
      const expectedProject = { id: mockUuid, ...createProjectInput };
      mockProjectRepository.findOne.mockResolvedValue(expectedProject);

      const result = await service.findOne(mockUuid);

      expect(mockProjectRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUuid },
        relations: {
          techStacks: true,
        },
      });
      expect(result).toEqual(expectedProject);
    });

    it('should throw NotFoundException when project not found', async () => {
      mockProjectRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(mockUuid)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateProjectInput: UpdateProjectInput = {
      projectTitle: 'project title',
      id: mockUuid,
    };

    it('should update a project successfully without techStack', async () => {
      const updatedProject = { id: mockUuid, ...updateProjectInput };
      mockProjectRepository.findOneBy.mockResolvedValue(updatedProject);

      const result = await service.update(mockUuid, updateProjectInput);

      expect(mockProjectRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockProjectRepository.update).toHaveBeenCalledWith(mockUuid, {
        ...updateProjectInput,
        techStacks: undefined,
      });
      expect(result).toEqual(updatedProject);
    });

    it('should update the project with techStack', async () => {
      const updatedProject = {
        id: mockUuid,
        ...updateProjectInput,
        techStacks: [mockTechStack],
      };
      const projectInputWithTechStack = {
        ...updateProjectInput,
        techStacks: [mockTechUuid],
      };
      mockProjectRepository.update.mockResolvedValue(updatedProject);
      mockProjectRepository.findOneBy.mockResolvedValue(updatedProject);
      mockTechStackRepository.findOneBy.mockResolvedValue({
        ...mockTechStack,
        id: mockTechUuid,
      });
      const result = await service.update(mockUuid, projectInputWithTechStack);
      expect(mockProjectRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockTechStackRepository.findOneBy).toHaveBeenCalled();
      expect(mockTechStackRepository.findOneBy).toHaveBeenCalledWith({
        id: mockTechUuid
      })
      expect(mockProjectRepository.update).toHaveBeenCalledWith(mockUuid, {
        ...updateProjectInput,
        techStacks: [
          {
            ...mockTechStack,
            id: mockTechUuid,
          },
        ],
      });
      expect(result).toEqual(updatedProject);
    });

    it('should throw NotFoundException when project does not exist', async () => {
      mockProjectRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.update(mockUuid, updateProjectInput),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when update fails', async () => {
      mockProjectRepository.findOneBy.mockResolvedValue(null);
      mockProjectRepository.update.mockRejectedValue(new Error('DB Error'));

      await expect(
        service.update(mockUuid, updateProjectInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a project successfully', async () => {
      mockProjectRepository.existsBy.mockResolvedValue(true);

      const result = await service.remove(mockUuid);

      expect(mockProjectRepository.existsBy).toHaveBeenCalledWith({
        id: mockUuid,
      });
      expect(mockProjectRepository.delete).toHaveBeenCalledWith(mockUuid);
      expect(result).toEqual({ id: mockUuid });
    });

    it('should throw NotFoundException when project does not exist', async () => {
      mockProjectRepository.existsBy.mockResolvedValue(false);
      await expect(service.remove(mockUuid)).rejects.toThrow(NotFoundException);
    });
  });
});
