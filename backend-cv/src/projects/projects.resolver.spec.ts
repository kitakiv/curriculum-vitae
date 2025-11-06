import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { S3Service } from '../s3/s3.service';
import { ProjectsImageService } from './projectsImage.service';
import { AuthGuard } from '../guards/auth.guard';
import { Project } from './entities/project.entity';
import { TechStack } from '../techstack/entities/techstack.entity';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import {
  BadRequestException,
  ExecutionContext,
  ValidationPipe,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { errors } from '../errors/errors.config';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { mock } from 'node:test';

const mockTechStack: TechStack = new TechStack({
  techName: 'test TechStack',
  techSvg: 'test svg',
});

const mockProject: Project = new Project({
  projectDemoLink: 'https://google.com',
  projectDescription: 'description',
  projectGithubLink: 'https://github.com',
  projectImages: ['index1.jpg', 'index2.jpg', 'index3.jpg'],
  projectTitle: 'title 1',
  techStacks: [mockTechStack],
});

const mockProjectTwo: Project = new Project({
  projectDemoLink: 'https://google.com',
  projectDescription: 'description',
  projectGithubLink: 'https://github.com',
  projectImages: ['index1.jpg', 'index2.jpg', 'index3.jpg'],
  projectTitle: 'title 2',
  techStacks: [mockTechStack],
});

const projectsMock = [mockProject, mockProjectTwo];

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
    () =>
      (target: any, propertyName?: string, descriptor?: PropertyDescriptor) => {
        if (descriptor) {
          Reflect.defineMetadata('permissions', true, descriptor.value);
          return descriptor;
        }
        return target;
      },
  ),
  IS_PERMISSION_KEY: 'permissions',
}));

const mockProjectImage = {
  getImageKeys: jest.fn(),
};
const mockS3Service = {
  uploadFiles: jest.fn(),
  deleteFiles: jest.fn(),
  getFile: jest.fn(),
};

const mockProjectsService = {
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

describe('ProjectsResolver', () => {
  let resolver: ProjectsResolver;
  let service: ProjectsService;
  // let authorizationGuard: AuthorizationGuard;
  let projectImageService: ProjectsImageService;
  let s3Service: S3Service;
  let authGuard: AuthGuard;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsResolver,
        {
          provide: ProjectsService,
          useValue: mockProjectsService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
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
          provide: ProjectsImageService,
          useValue: mockProjectImage,
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

    resolver = module.get<ProjectsResolver>(ProjectsResolver);
    service = module.get<ProjectsService>(ProjectsService);
    // authorizationGuard = module.get<AuthorizationGuard>(AuthorizationGuard);
    projectImageService =
      module.get<ProjectsImageService>(ProjectsImageService);
    s3Service = module.get<S3Service>(S3Service);
    authGuard = module.get<AuthGuard>(AuthGuard);
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
    });

    it('should return a project (public route)', async () => {
      mockProjectsService.findAll.mockResolvedValue(projectsMock);

      const result = await resolver.findAll();

      expect(result).toEqual(projectsMock);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return a project by id (public route)', async () => {
      mockProjectsService.findOne.mockResolvedValue(mockProject);

      const result = await resolver.findOne(mockProject.id);
      expect(result).toEqual(mockProject);
      expect(service.findOne).toHaveBeenCalledWith(mockProject.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Private routes', () => {
    it('should be marked as private route', () => {
      const isPublicUpdate = Reflect.getMetadata(
        'isPublic',
        resolver.updateProject,
      );
      expect(isPublicUpdate).toBe(undefined);
      const isPublicDelete = Reflect.getMetadata(
        'isPublic',
        resolver.removeProject,
      );
      expect(isPublicDelete).toBe(undefined);
      const isPublicCreate = Reflect.getMetadata(
        'isPublic',
        resolver.createProject,
      );
      expect(isPublicCreate).toBe(undefined);
    });

    it('AuthGuard should be called', async () => {
      mockJwtService.verify.mockReturnValue({ id: 'user123' });
      const mockExecutionContext: Partial<ExecutionContext> = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        getType: jest.fn().mockReturnValue('graphql'),
        getArgs: jest.fn().mockReturnValue([
          {},
          {},
          {
            req: {
              headers: {
                authorization: 'Bearer token',
              },
            },
          },
        ]),
      };

      const result = await authGuard.canActivate(
        mockExecutionContext as ExecutionContext,
      );

      expect(result).toBe(true);
    });

    it('should return unauthorized', async () => {
      const mockExecutionContext: Partial<ExecutionContext> = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        getType: jest.fn().mockReturnValue('graphql'),
        getArgs: jest.fn().mockReturnValue([
          {},
          {},
          {
            req: {
              headers: {
                authorization: '',
              },
            },
          },
        ]),
      };
      try {
        await authGuard.canActivate(mockExecutionContext as ExecutionContext);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe('Token not found');
      }
    });

    it('should return unauthorized', async () => {
      mockJwtService.verify.mockReturnValue((error: Error) => {
        throw error;
      });
      const mockExecutionContext: Partial<ExecutionContext> = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        getType: jest.fn().mockReturnValue('graphql'),
        getArgs: jest.fn().mockReturnValue([
          {},
          {},
          {
            req: {
              headers: {
                authorization: 'Bearer token',
              },
            },
          },
        ]),
      };
      try {
        await authGuard.canActivate(mockExecutionContext as ExecutionContext);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe('Invalid token');
      }
    });
  });

  describe('Private route permissions', () => {
    it('should have such Permission', async () => {
      const permissions = Reflect.getMetadata(
        'permissions',
        resolver.createProject,
      );
      expect(permissions).toBe(true);
      const isPermissionUpdate = Reflect.getMetadata(
        'permissions',
        resolver.updateProject,
      );
      expect(isPermissionUpdate).toBe(true);
      const isPermissionRemove = Reflect.getMetadata(
        'permissions',
        resolver.removeProject,
      );
      expect(isPermissionRemove).toBe(true);
    });
  });

  describe('Private routes', () => {
    it('should create project', async () => {
      const createProjectInput: CreateProjectInput = {
        ...mockProject,
        techStacks: [mockTechStack.id],
      };
      mockProjectsService.create.mockResolvedValue(mockProject);
      const result = await resolver.createProject(createProjectInput);
      expect(result).toEqual(mockProject);
      expect(service.create).toHaveBeenCalledWith(createProjectInput);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should update project', async () => {
      const updateProjectInput: UpdateProjectInput = {
        id: mockProject.id,
        projectTitle: 'updated title',
      };
      const updateMockProject = { ...mockProject, ...updateProjectInput };
      mockProjectsService.update.mockResolvedValue(updateMockProject);
      const result = await resolver.updateProject(updateProjectInput);
      expect(result).toEqual(updateMockProject);
      expect(service.update).toHaveBeenCalledWith(
        updateProjectInput.id,
        updateProjectInput,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should remove project', async () => {
      const id = mockProject.id;
      mockProjectsService.remove.mockResolvedValue({ id });
      const result = await resolver.removeProject(id);
      expect(result).toEqual({ id });
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(service.remove).toHaveBeenCalledTimes(1);

      mockProjectImage.getImageKeys.mockResolvedValue(['key1', 'key2']);
      mockS3Service.deleteFiles.mockResolvedValue(true);
      await resolver.removeProject(id);
      expect(service.remove).toHaveBeenCalledTimes(2);
      expect(s3Service.deleteFiles).toHaveBeenCalledWith(['key1', 'key2']);
    });

    it('should throw BadException error', async () => {
      const id = mockProject.id;
      mockProjectsService.remove.mockResolvedValue({ id });
      mockProjectImage.getImageKeys.mockResolvedValue(['key1', 'key2']);
      mockS3Service.deleteFiles.mockResolvedValue(() => {
        throw new Error();
      });
      try {
        await resolver.removeProject(id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe(errors.NOT_DELETED('Project'));
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
      const validInput: CreateProjectInput = {
        ...mockProject,
        techStacks: [],
      };
      const result = await validationPipe.transform(validInput, {
        type: 'body',
        metatype: CreateProjectInput,
      });
      expect(result).toEqual(validInput);

      const validUpdateInput: UpdateProjectInput = {
        id: mockProject.id,
        projectTitle: 'updated title',
      };

      const resultUpdate = await validationPipe.transform(validUpdateInput, {
        type: 'body',
        metatype: UpdateProjectInput,
      });

      expect(resultUpdate).toEqual(validUpdateInput);

      const validRemoveInput = mockProject.id;

      const resultRemove = await validationPipe.transform(validRemoveInput, {
        type: 'body',
        metatype: UUID,
      });
      expect(resultRemove).toEqual(validRemoveInput);

      const validFindOneInput = mockProject.id;

      const resultFindOne = await validationPipe.transform(validFindOneInput, {
        type: 'body',
        metatype: UUID,
      });
      expect(resultFindOne).toEqual(validFindOneInput);
    });
    it('invalid input', async () => {
      const invalidInput: CreateProjectInput = {
        ...mockProject,
        techStacks: [mockTechStack.id],
        projectTitle: '',
      };
      try {
        await validationPipe.transform(invalidInput, {
          type: 'body',
          metatype: CreateProjectInput,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }

      const invalidUpdateInput: UpdateProjectInput = {
        id: mockProject.id,
        projectTitle: '',
      };

      try {
        await validationPipe.transform(invalidUpdateInput, {
          type: 'body',
          metatype: UpdateProjectInput,
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
