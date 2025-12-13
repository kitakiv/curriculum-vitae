import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { FileValidationPipe } from './pipe/upload.pipe';
import { OneFilePipe } from './pipe/onefile.pipe';
import { MultiFilePipe } from './pipe/multifile.pipe';
import { ServerExistPipe } from './pipe/serverexist.pipe';
import { MaxIndexPipe } from './pipe/maxindex.pipe';
import { Action } from '../roles/enums/action.enum';
import { Resource } from '../roles/enums/resource.enum';
import { Reflector } from '@nestjs/core';

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

describe('UploadController', () => {
  let controller: UploadController;
  let uploadService: UploadService;
  let fileValidationPipe: FileValidationPipe;
  let oneFilePipe: OneFilePipe;
  let multiFilePipe: MultiFilePipe;
  let serverExistPipe: ServerExistPipe;
  let maxIndexPipe: MaxIndexPipe;

  const mockUploadService = {
    uploadFile: jest.fn(),
    uploadFiles: jest.fn(),
    updateFile: jest.fn(),
  };

  const mockAuthService = {
    getUserPermissions: jest.fn(),
  };

  const mockReflector = {
    getAllAndOverride: jest.fn(),
  };

  const mockFile: Express.Multer.File = {
    fieldname: 'File',
    originalname: 'test.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    size: 1023,
    buffer: Buffer.from('test'),
    destination: '',
    filename: 'filename',
    path: '',
    stream: null,
  };

  const mockFiles: Express.Multer.File[] = [mockFile];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [
        {
          provide: UploadService,
          useValue: mockUploadService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: Reflector,
          useValue: mockReflector,
        }
      ],
    }).compile();

    controller = module.get<UploadController>(UploadController);
    uploadService = module.get<UploadService>(UploadService);
    jest.clearAllMocks();
    fileValidationPipe = new FileValidationPipe();
    oneFilePipe = new OneFilePipe();
    multiFilePipe = new MultiFilePipe();
    serverExistPipe = new ServerExistPipe();
    maxIndexPipe = new MaxIndexPipe();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('not public routes', () => {
    it('should be marked as public route', () => {
      const methods = [
        controller.uploadFile,
        controller.uploadFiles,
        controller.updateFile,
      ];
      methods.forEach((method) => {
        const isPublic = Reflect.getMetadata('isPublic', method);
        expect(isPublic).toBeUndefined();
      })
    });

    it('should be marked as permission route', () => {
      const methods = [
        {
          method: controller.updateFile,
          expectedResource: Resource.IMAGE,
          expectedActions: [Action.CREATE, Action.UPDATE, Action.DELETE],
        },
        {
          method: controller.uploadFiles,
          expectedResource: Resource.IMAGE,
          expectedActions: [Action.CREATE, Action.UPDATE, Action.DELETE],
        },
        {
          method: controller.uploadFile,
          expectedResource: Resource.IMAGE,
          expectedActions: [Action.CREATE, Action.UPDATE, Action.DELETE],
        },
      ];
      methods.forEach((route) => {
        const permissions = Reflect.getMetadata('permissions', route.method);
        expect(permissions).toBeDefined();
        expect(permissions).toEqual([
          {
            resource: route.expectedResource,
            actions: route.expectedActions,
          },
        ]);
      });
    });
  });


  describe('uploadFile', () => {
    it('should upload single file successfully', async () => {
      const mockResult = { url: 'https://example.com/image.jpg' };
      mockUploadService.uploadFile.mockResolvedValue(mockResult);

      const result = await controller.uploadFile(
        mockFile,
        'contacts',
        'test-uuid',
      );

      expect(uploadService.uploadFile).toHaveBeenCalledWith({
        file: mockFile,
        service: 'contacts',
        id: 'test-uuid',
      });
      expect(result).toEqual(mockResult);
    });

    it('should throw error when upload fails', async () => {
      mockUploadService.uploadFile.mockRejectedValue(
        new BadRequestException('Upload failed'),
      );

      await expect(
        controller.uploadFile(mockFile, 'contacts', 'test-uuid'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('uploadFiles', () => {
    it('should upload multiple files successfully', async () => {
      const mockResult = { urls: ['https://example.com/image1.jpg'] };
      mockUploadService.uploadFiles.mockResolvedValue(mockResult);

      const result = await controller.uploadFiles(
        mockFiles,
        'sliders',
        'test-uuid',
      );

      expect(uploadService.uploadFiles).toHaveBeenCalledWith({
        files: mockFiles,
        service: 'sliders',
        id: 'test-uuid',
      });
      expect(result).toEqual(mockResult);
    });

    it('should throw error when upload fails', async () => {
      mockUploadService.uploadFiles.mockRejectedValue(
        new BadRequestException('Upload failed'),
      );

      await expect(
        controller.uploadFiles(mockFiles, 'sliders', 'test-uuid'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateFile', () => {
    it('should update file with index successfully', async () => {
      const mockResult = { url: 'https://example.com/image-0.jpg' };
      mockUploadService.uploadFile.mockResolvedValue(mockResult);

      const result = await controller.updateFile(
        mockFile,
        'projects',
        'test-uuid',
        '0',
      );

      expect(uploadService.uploadFile).toHaveBeenCalledWith({
        file: mockFile,
        service: 'projects',
        id: 'test-uuid',
        index: 0,
      });
      expect(result).toEqual(mockResult);
    });

    it('should throw error when update fails', async () => {
      mockUploadService.uploadFile.mockRejectedValue(
        new BadRequestException('Update failed'),
      );

      await expect(
        controller.updateFile(mockFile, 'projects', 'test-uuid', '0'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('FileValidationPipe', () => {
    it('should validate single file successfully', () => {
      const result = fileValidationPipe.transform(mockFile);
      expect(result).toBe(mockFile);
    });

    it('should validate multiple files successfully', () => {
      const files = [mockFile, mockFile];
      const result = fileValidationPipe.transform(files);
      expect(result).toEqual(files);
    });

    it('should throw error for file too large', () => {
      const largeFile = { ...mockFile, size: 2000000 }; // 2MB > 1MB limit
      expect(() => fileValidationPipe.transform(largeFile)).toThrow(
        BadRequestException,
      );
    });

    it('should throw error for invalid file type', () => {
      const invalidFile = { ...mockFile, mimetype: 'text/plain' };
      expect(() => fileValidationPipe.transform(invalidFile)).toThrow(
        BadRequestException,
      );
    });

    it('should throw error for too many files', () => {
      const manyFiles = Array(6).fill(mockFile); // > MAX_FILE_IMAGES (5)
      expect(() => fileValidationPipe.transform(manyFiles)).toThrow(
        BadRequestException,
      );
    });

    it('should throw error for missing file', () => {
      expect(() => fileValidationPipe.transform(null)).toThrow(
        BadRequestException,
      );
    });
  });

  describe('OneFilePipe', () => {
    it('should allow single file services', () => {
      const result = oneFilePipe.transform('contacts');
      expect(result).toBe('contacts');
    });

    it('should throw error for multi-file services', () => {
      expect(() => oneFilePipe.transform('projects')).toThrow(
        BadRequestException,
      );
    });
  });

  describe('MultiFilePipe', () => {
    it('should allow multi-file services', () => {
      const result = multiFilePipe.transform('projects');
      expect(result).toBe('projects');
    });

    it('should throw error for single file services', () => {
      expect(() => multiFilePipe.transform('contacts')).toThrow(
        BadRequestException,
      );
    });
  });

  describe('ServerExistPipe', () => {
    const metadata: ArgumentMetadata = {
      type: 'param',
      metatype: String,
      data: 'service',
    };

    it('should allow existing services', () => {
      const result = serverExistPipe.transform('contacts', metadata);
      expect(result).toBe('contacts');
    });

    it('should throw error for non-existing services', () => {
      expect(() => serverExistPipe.transform('invalid', metadata)).toThrow(
        BadRequestException,
      );
    });

    it('should throw error for non-param metadata', () => {
      const nonParamMetadata = { ...metadata, type: 'body' as any };
      expect(() =>
        serverExistPipe.transform('contacts', nonParamMetadata),
      ).toThrow(BadRequestException);
    });
  });

  describe('MaxIndexPipe', () => {
    it('should allow valid index', () => {
      const result = maxIndexPipe.transform('2');
      expect(result).toBe('2');
    });

    it('should throw error for index >= MAX_FILE_IMAGES', () => {
      expect(() => maxIndexPipe.transform('5')).toThrow(BadRequestException);
    });

    it('should throw error for negative index', () => {
      expect(() => maxIndexPipe.transform('-1')).toThrow(BadRequestException);
    });

    it('should throw error for non-numeric index', () => {
      expect(() => maxIndexPipe.transform('abc')).toThrow(BadRequestException);
    });
  });
});