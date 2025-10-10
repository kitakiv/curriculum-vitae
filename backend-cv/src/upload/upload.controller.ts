import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './pipe/upload.pipe';
import { S3Service } from 'src/s3/s3.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('File'))
  async uploadFileAndValidate(
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
  ) {
    try {
      const url = await this.s3Service.uploadFile(
        { buffer: file.buffer, mimetype: file.mimetype },
        file.originalname,
      );
      console.log(url);
      return {
        success: true,
        message: 'File uploaded successfully',
        url: url,
        filename: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'File upload failed',
      };
    }
  }

  @Post('files')
  @UseInterceptors(FilesInterceptor('Files'))
  uploadFile(
    @UploadedFiles(new FileValidationPipe())
    files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return {
      success: true,
      message: 'Files uploaded successfully',
      files: files.map((file) => ({
        filename: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      })),
    };
  }
}
