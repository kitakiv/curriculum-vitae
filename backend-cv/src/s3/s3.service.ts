import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(
    private configService: ConfigService,
    public logger: Logger = new Logger(S3Service.name),
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = this.configService.get('AWS_S3_BUCKET');
  }
  async uploadFile(
    file: { buffer: Buffer<ArrayBufferLike>; mimetype: string },
    key: string,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    try {
      await this.s3Client.send(command);
      return this.createUrl(key);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Upload failed');
    }
  }

  async uploadFiles(
    files: { buffer: Buffer<ArrayBufferLike>; mimetype: string }[],
    key: string,
  ): Promise<string[]> {
    const uploadedKeys: string[] = [];
    const urls: string[] = [];
    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const fileKey = `${key}-${index}.${file.mimetype.split('/')[1]}`;
        const url = await this.uploadFile(file, fileKey);
        uploadedKeys.push(fileKey);
        urls.push(url);
      }
      return urls;
    } catch (error) {
      if (uploadedKeys.length > 0) {
        await this.deleteFiles(uploadedKeys);
      }
      this.logger.error(error);
      throw new BadRequestException('Upload failed');
    }
  }


  async deleteFiles(keys: string[]) {
    await Promise.all(
      keys.map(async (key) => {
        await this.deleteFile(key);
      }),
    );
  }

  async createUrl(key: string) {
    return `https://${this.bucketName}.s3.${this.configService.get(
      'AWS_REGION',
    )}.amazonaws.com/${encodeURIComponent(key)}`;
  }

  async deleteFile(key: string) {
    const exist = await this.getFile(key);
    if (!exist) return 'File not found';
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    try {
      await this.s3Client.send(command);
      return {
        success: true,
        message: 'File deleted successfully',
      };
    } catch (error) {
      this.logger.error(error);
      return error.message;
    }
  }

  async getFile(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    try {
      await this.s3Client.send(command);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
