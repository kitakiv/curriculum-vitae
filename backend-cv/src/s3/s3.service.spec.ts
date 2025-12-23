import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3.service';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

// Mock AWS SDK
jest.mock('@aws-sdk/client-s3');
const mockS3Client = {
  send: jest.fn(),
};
const mockLogger = {
  error: jest.fn(),
};
const MockedS3Client = S3Client as jest.MockedClass<typeof S3Client>;
const mockConfigService = {
  get: jest.fn(),
} as any;

mockConfigService.get.mockImplementation((key: string) => {
  const config = {
    AWS_REGION: 'us-east-1',
    AWS_ACCESS_KEY_ID: 'test-access-key',
    AWS_SECRET_ACCESS_KEY: 'test-secret-key',
    AWS_S3_BUCKET: 'test-bucket',
  };
  return config[key];
});

describe('S3Service', () => {
  let service: S3Service;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Service,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: Logger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<S3Service>(S3Service);
    MockedS3Client.mockImplementation(() => mockS3Client as any);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadFile', () => {
    const mockFile = {
      buffer: Buffer.from('test file content'),
      mimetype: 'image/jpeg',
    };
    const key = 'test-key.jpg';

    it('should upload file successfully', async () => {
      mockS3Client.send.mockResolvedValue({});
      const createUrlSpy = jest.spyOn(service, 'createUrl');
      const result = await service.uploadFile(mockFile, key);

      expect(mockS3Client.send).toHaveBeenCalledWith(
        expect.any(PutObjectCommand),
      );
      expect(createUrlSpy).toHaveBeenCalledWith(key);
      expect(result).toBe(
        'https://test-bucket.s3.us-east-1.amazonaws.com/test-key.jpg',
      );
    });

    it('should return error message when upload fails', async () => {
      const error = new Error('Upload failed');
      mockS3Client.send.mockRejectedValue(error);

      await expect(service.uploadFile(mockFile, key)).rejects.toThrow(
        'Upload failed',
      );
    });
  });

  describe('uploadFiles', () => {
    const mockFiles = [
      { buffer: Buffer.from('file1'), mimetype: 'image/jpeg' },
      { buffer: Buffer.from('file2'), mimetype: 'image/png' },
    ];
    const key = 'test-files';

    it('should upload multiple files successfully', async () => {
      mockS3Client.send.mockResolvedValue({});

      const result = await service.uploadFiles(mockFiles, key);

      expect(mockS3Client.send).toHaveBeenCalledTimes(2);
      expect(result).toEqual([
        'https://test-bucket.s3.us-east-1.amazonaws.com/test-files-0.jpeg',
        'https://test-bucket.s3.us-east-1.amazonaws.com/test-files-1.png',
      ]);
    });

    it('should throw error when upload fails', async () => {
      mockS3Client.send.mockRejectedValue(new Error('Upload failed'));

      await expect(service.uploadFiles(mockFiles, key)).rejects.toThrow(
        'Upload failed',
      );
    });
  });

  describe('deleteFile', () => {
    const key = 'test-key.jpg';

    it('should delete file successfully', async () => {
      // Mock getFile to return true (file exists)
      mockS3Client.send
        .mockResolvedValueOnce({}) // getFile call
        .mockResolvedValueOnce({}); // deleteFile call

      const result = await service.deleteFile(key);

      expect(mockS3Client.send).toHaveBeenCalledTimes(2);
      expect(mockS3Client.send).toHaveBeenCalledWith(
        expect.any(GetObjectCommand),
      );
      expect(mockS3Client.send).toHaveBeenCalledWith(
        expect.any(DeleteObjectCommand),
      );
      expect(result).toEqual({
        success: true,
        message: 'File deleted successfully',
      });
    });

    it('should return "File not found" when file does not exist', async () => {
      // Mock getFile to return false (file doesn't exist)
      mockS3Client.send.mockRejectedValue(new Error('NoSuchKey'));

      const result = await service.deleteFile(key);

      expect(result).toBe('File not found');
    });

    it('should return error message when delete fails', async () => {
      mockS3Client.send
        .mockResolvedValueOnce({}) // getFile succeeds
        .mockRejectedValue(new Error('Delete failed')); // deleteFile fails

      const result = await service.deleteFile(key);

      expect(result).toBe('Delete failed');
    });
  });

  describe('deleteFiles', () => {
    const keys = ['file1.jpg', 'file2.png'];

    it('should delete multiple files', async () => {
      mockS3Client.send.mockResolvedValue({});

      await service.deleteFiles(keys);

      expect(mockS3Client.send).toHaveBeenCalledTimes(4); // 2 getFile + 2 deleteFile calls
    });
  });

  describe('getFile', () => {
    const key = 'test-key.jpg';

    it('should return true when file exists', async () => {
      mockS3Client.send.mockResolvedValue({});

      const result = await service.getFile(key);

      expect(mockS3Client.send).toHaveBeenCalledWith(
        expect.any(GetObjectCommand),
      );
      expect(result).toBe(true);
    });

    it('should return false when file does not exist', async () => {
      mockS3Client.send.mockRejectedValue(new Error('NoSuchKey'));

      const result = await service.getFile(key);

      expect(result).toBe(false);
    });
  });

  describe('createUrl', () => {
    it('should create correct S3 URL', async () => {
      const key = 'test file with spaces.jpg';

      const result = await service.createUrl(key);

      expect(result).toBe(
        'https://test-bucket.s3.us-east-1.amazonaws.com/test%20file%20with%20spaces.jpg',
      );
    });
  });
});
