import { UploadService } from './upload.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { S3Service } from '../s3/s3.service';
import { ContactsImageService } from '../contacts/contactsImage.service';
import { SliderImageService } from '../sliders/sliderImage.service';
import { TechStackImageService } from '../techstack/tachstackImage.service';
import { ProjectsImageService } from '../projects/projectsImage.service';
import { ProfileImageService } from '../profile/profileImage.service';
import uploadVariables from '../variables/upload.variables';
import { BadRequestException } from '@nestjs/common';
import { mock } from 'node:test';

const mockUploadController = {
  uploadFile: jest.fn(),
  uploadFiles: jest.fn(),
  updateFile: jest.fn(),
};

const mockS3Service = {
  uploadFile: jest.fn(),
  uploadFiles: jest.fn(),
  deleteFile: jest.fn(),
  deleteFiles: jest.fn(),
};

const mockContactImageService = {
  getImageKey: jest.fn(),
  uploadImage: jest.fn(),
};

const mockSliderImageService = {
  getImageKey: jest.fn(),
  uploadImage: jest.fn(),
};

const mockTechStackImageService = {
  getImageKey: jest.fn(),
  uploadImage: jest.fn(),
};

const mockProjectsImageService = {
  getImageKey: jest.fn(),
  uploadImageIndex: jest.fn(),
  uploadImages: jest.fn(),
  getImageKeys: jest.fn(),
};

const mockProfileImageService = {
  getImageKey: jest.fn(),
  getImageKeys: jest.fn(),
  uploadImageIndex: jest.fn(),
  uploadImages: jest.fn(),
};

const mockFile: Express.Multer.File = {
  fieldname: 'File',
  originalname: 'test.jpg',
  encoding: '7bit',
  mimetype: 'image/jpg',
  size: 1023,
  buffer: Buffer.from('test'),
  destination: '',
  filename: 'filename',
  path: '',
  stream: null,
};

const mockUUid = 'test-uuid';
const mockLink = 'https://example.com/image.jpg';

describe('UploadService', () => {
  let service: UploadService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: UploadController,
          useValue: mockUploadController,
        },
        {
          provide: S3Service,
          useValue: mockS3Service,
        },
        {
          provide: ContactsImageService,
          useValue: mockContactImageService,
        },
        {
          provide: SliderImageService,
          useValue: mockSliderImageService,
        },
        {
          provide: TechStackImageService,
          useValue: mockTechStackImageService,
        },
        {
          provide: ProjectsImageService,
          useValue: mockProjectsImageService,
        },
        {
          provide: ProfileImageService,
          useValue: mockProfileImageService,
        },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
    jest.clearAllMocks();
  });

  describe('server exists', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('uploadFile', () => {
    it('should be defined', () => {
      expect(service.uploadFile).toBeDefined();
    });

    it('should upload file image successfully if not exist', async () => {
      const serversMock = [
        {
          name: uploadVariables.contacts.name,
          server: mockContactImageService,
        },
        {
          name: uploadVariables.sliders.name,
          server: mockSliderImageService,
        },
        {
          name: uploadVariables.techstack.name,
          server: mockTechStackImageService,
        },
      ];
      for (const serverMock of serversMock) {
        serverMock.server.getImageKey.mockResolvedValue(null);
        mockS3Service.uploadFile.mockResolvedValue(mockLink);
        serverMock.server.uploadImage.mockResolvedValue({
          id: mockUUid,
          contactSvg: mockLink,
        });
        const mockIdFile = `${mockUUid}.${mockLink.split('.').at(-1)}`;
        const result = await service.uploadFile({
          id: mockUUid,
          file: mockFile,
          service: serverMock.name,
        });
        expect(result).toEqual({
          id: mockUUid,
          contactSvg: mockLink,
        });
        expect(serverMock.server.getImageKey).toHaveBeenCalledWith(mockUUid);
        expect(mockS3Service.uploadFile).toHaveBeenCalledWith(
          mockFile,
          mockIdFile,
        );
        expect(mockS3Service.deleteFile).not.toHaveBeenCalled();
        expect(serverMock.server.uploadImage).toHaveBeenCalledWith({
          id: mockUUid,
          image: mockLink,
        });
      }
    });

    it('should upload file image successfully if exist', async () => {
      const serversMock = [
        {
          name: uploadVariables.contacts.name,
          server: mockContactImageService,
        },
        {
          name: uploadVariables.sliders.name,
          server: mockSliderImageService,
        },
        {
          name: uploadVariables.techstack.name,
          server: mockTechStackImageService,
        },
      ];
      for (const serverMock of serversMock) {
        serverMock.server.getImageKey.mockResolvedValue(`${mockUUid}.svg`);
        mockS3Service.uploadFile.mockResolvedValue(mockLink);
        mockS3Service.deleteFile.mockResolvedValue(null);
        serverMock.server.uploadImage.mockResolvedValue({
          id: mockUUid,
          image: mockLink,
        });
        const mockIdFile = `${mockUUid}.${mockLink.split('.').at(-1)}`;
        const result = await service.uploadFile({
          id: mockUUid,
          file: mockFile,
          service: serverMock.name,
        });
        expect(result).toEqual({
          id: mockUUid,
          image: mockLink,
        });
        expect(serverMock.server.getImageKey).toHaveBeenCalledWith(mockUUid);
        expect(mockS3Service.uploadFile).toHaveBeenCalledWith(
          mockFile,
          mockIdFile,
        );
        expect(mockS3Service.deleteFile).toHaveBeenCalledWith(
          `${mockUUid}.svg`,
        );
        expect(serverMock.server.uploadImage).toHaveBeenCalledWith({
          id: mockUUid,
          image: mockLink,
        });
      }
    });

    it('should upload file by index successfully if not exist', async () => {
      const serversMock = [
        {
          name: uploadVariables.profile.name,
          server: mockProfileImageService,
        },
        {
          name: uploadVariables.projects.name,
          server: mockProjectsImageService,
        },
      ];
      for (const serverMock of serversMock) {
        serverMock.server.getImageKey.mockResolvedValue(null);
        mockS3Service.uploadFile.mockResolvedValue(mockLink);
        serverMock.server.uploadImageIndex.mockResolvedValue({
          id: mockUUid,
          image: mockLink,
        });
        const mockIdFile = `${mockUUid}-0.${mockLink.split('.').at(-1)}`;
        const mockId = `${mockUUid}-0`;
        const result = await service.uploadFile({
          id: mockUUid,
          file: mockFile,
          service: serverMock.name,
          index: 0,
        });
        expect(result).toEqual({
          id: mockUUid,
          image: mockLink,
        });
        expect(serverMock.server.getImageKey).toHaveBeenCalledWith(mockId);
        expect(serverMock.server.uploadImageIndex).toHaveBeenCalledWith({
          id: mockUUid,
          index: 0,
          url: mockLink,
        });
        expect(mockS3Service.uploadFile).toHaveBeenCalledWith(
          mockFile,
          mockIdFile,
        );
        expect(mockS3Service.deleteFile).not.toHaveBeenCalled();
      }
    });

    it('should upload file by index successfully if exist', async () => {
      const serversMock = [
        {
          name: uploadVariables.profile.name,
          server: mockProfileImageService,
        },
        {
          name: uploadVariables.projects.name,
          server: mockProjectsImageService,
        },
      ];

      for (const serverMock of serversMock) {
        serverMock.server.getImageKey.mockResolvedValue(`${mockUUid}-0.svg`);
        mockS3Service.uploadFile.mockResolvedValue(mockLink);
        mockS3Service.deleteFile.mockResolvedValue(null);
        serverMock.server.uploadImageIndex.mockResolvedValue({
          id: mockUUid,
          profileImage: mockLink,
        });
        const mockIdFile = `${mockUUid}-0.${mockLink.split('.').at(-1)}`;
        const mockId = `${mockUUid}-0`;
        const result = await service.uploadFile({
          id: mockUUid,
          file: mockFile,
          service: serverMock.name,
          index: 0,
        });
        expect(result).toEqual({
          id: mockUUid,
          profileImage: mockLink,
        });
        expect(serverMock.server.getImageKey).toHaveBeenCalledWith(mockId);
        expect(serverMock.server.uploadImageIndex).toHaveBeenCalledWith({
          id: mockUUid,
          index: 0,
          url: mockLink,
        });
        expect(mockS3Service.uploadFile).toHaveBeenCalledWith(
          mockFile,
          mockIdFile,
        );
        expect(mockS3Service.deleteFile).toHaveBeenCalledWith(
          `${mockUUid}-0.svg`,
        );
      }
    });

    it('should throw BadRequestException when upload file failed', async () => {
      const mockError = new BadRequestException('Upload failed');
      mockS3Service.uploadFile.mockRejectedValue(mockError);
      mockContactImageService.getImageKey.mockResolvedValue(null);
      await expect(
        service.uploadFile({
          id: mockUUid,
          file: mockFile,
          service: uploadVariables.contacts.name,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return bad request when server instance not found', async () => {
      mockContactImageService.getImageKey.mockResolvedValue(null);
      await expect(
        service.uploadFile({
          id: mockUUid,
          file: mockFile,
          service: 'not-found',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('uploadFiles', () => {
    it('should upload multiple files successfully', async () => {
      const serversMock = [
        {
          name: uploadVariables.profile.name,
          server: mockProfileImageService,
        },
        {
          name: uploadVariables.projects.name,
          server: mockProjectsImageService,
        },
      ];
      for (const serverMock of serversMock) {
        serverMock.server.getImageKeys.mockResolvedValue(null);
        mockS3Service.uploadFiles.mockResolvedValue([mockLink]);
        serverMock.server.uploadImages.mockResolvedValue({
          id: mockUUid,
          images: [mockLink],
        });
        const result = await service.uploadFiles({
          id: mockUUid,
          files: [mockFile],
          service: serverMock.name,
        });
        expect(result).toEqual({
          id: mockUUid,
          images: [mockLink],
        });
        expect(serverMock.server.getImageKeys).toHaveBeenCalledWith(mockUUid);
        expect(serverMock.server.uploadImages).toHaveBeenCalledWith({
          id: mockUUid,
          images: [mockLink],
        });
        expect(mockS3Service.uploadFiles).toHaveBeenCalledWith(
          [mockFile],
          mockUUid,
        );
        expect(mockS3Service.deleteFiles).not.toHaveBeenCalled();
      }
    });

    it('should throw BadRequestException when upload file failed', async () => {
      const mockError = new BadRequestException('Upload failed');
      mockS3Service.uploadFiles.mockRejectedValue(mockError);
      mockProfileImageService.getImageKeys.mockResolvedValue(null);
      await expect(
        service.uploadFiles({
          id: mockUUid,
          files: [mockFile],
          service: uploadVariables.profile.name,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should upload multiple images if they exist', async () => {
      const serversMock = [
        {
          name: uploadVariables.profile.name,
          server: mockProfileImageService,
        },
        {
          name: uploadVariables.projects.name,
          server: mockProjectsImageService,
        },
      ];
      for (const serverMock of serversMock) {
        serverMock.server.getImageKeys.mockResolvedValue([`${mockUUid}-0.svg`]);
        mockS3Service.uploadFiles.mockResolvedValue([mockLink]);
        serverMock.server.uploadImages.mockResolvedValue({
          id: mockUUid,
          images: [mockLink],
        });
        const result = await service.uploadFiles({
          id: mockUUid,
          files: [mockFile],
          service: serverMock.name,
        });
        expect(result).toEqual({
          id: mockUUid,
          images: [mockLink],
        });
        expect(serverMock.server.getImageKeys).toHaveBeenCalledWith(mockUUid);
        expect(serverMock.server.uploadImages).toHaveBeenCalledWith({
          id: mockUUid,
          images: [mockLink],
        });
        expect(mockS3Service.uploadFiles).toHaveBeenCalledWith(
          [mockFile],
          mockUUid,
        );
        expect(mockS3Service.deleteFiles).toHaveBeenCalledWith([
          `${mockUUid}-0.svg`,
        ]);
      }
    });

    it('should return bad request when server instance not found', async () => {
      mockProfileImageService.getImageKeys.mockResolvedValue(null);
      await expect(
        service.uploadFiles({
          id: mockUUid,
          files: [mockFile],
          service: 'not-found',
        }),
      ).rejects.toThrow(BadRequestException);
    })
  });
});
