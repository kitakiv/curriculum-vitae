import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import {v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(
    private configService: ConfigService,
    public logger: Logger = new Logger(S3Service.name),
  ) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = this.configService.getOrThrow('AWS_S3_BUCKET');
  }
  async uploadFileToS3(
    file: { buffer: Buffer<ArrayBufferLike>; mimetype: string },
    key: string,
  ): Promise<string> {
    console.log('Uploading file with key:', {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
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

  async uploadFile(
    file: { buffer: Buffer<ArrayBufferLike>; mimetype: string },
    service: string,
    id: string,
  ): Promise<string> {
    const fileKey = `${this.createKey(id, service)}.${this.getFileExtension(file.mimetype)}`; // .jpg or .png
    try {
      return await this.uploadFileToS3(file, fileKey);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Upload failed');
    }
  }

  async uploadFiles(
    files: { buffer: Buffer<ArrayBufferLike>; mimetype: string }[],
    service: string,
    id: string,
  ): Promise<string[]> {
    const urls: string[] = [];
    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const fileKey = `${this.createKey(id, service)}.${this.getFileExtension(file.mimetype)}`;
        const url = await this.uploadFileToS3(file, fileKey);
        urls.push(url);
      }
      return urls;
    } catch (error) {
      if (urls.length > 0) {
        await this.deleteFiles(urls, service, id);
      }
      this.logger.error(error);
      throw new BadRequestException('Upload failed');
    }
  }


  async deleteFiles(urls: string[], service: string, id: string) {
    if (!Array.isArray(urls)) {
      await this.deleteFile(urls, service, id);
    }
    if(Array.isArray(urls)) {
      await Promise.all(
      urls.map(async (url) => {
        await this.deleteFile(url, service, id);
      }),
    );
    }
  }

  async createUrl(key: string) {
    const keys = key.split('/');
    keys[keys.length - 1] = encodeURIComponent(keys.at(-1) || '');
    return `https://${this.bucketName}.s3.${this.configService.get(
      'AWS_REGION',
    )}.amazonaws.com/${keys.join('/')}`;
  }

  async deleteFile(url: string, service: string, id: string) {
    // create key of image form url
    const key = this.getImageKey(url, service, id);
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

  private getImageKey(url: string, service: string, id: string): string {
    const urlParts = url.split('/');
    const filename = decodeURIComponent(urlParts[urlParts.length - 1]);
    return `${service}/${id}/${filename}`;
  }


   private createKey(id: string, service: string): string {
      const uuidOfImage = uuid();
      return `${service}/${id}/${uuidOfImage}`;
    }
  
  
    private getFileExtension(mimetype: string): string {
      const extension = mimetype.split('/')[1];
      return extension;
    }
}
