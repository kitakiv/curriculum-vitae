import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from './pipe/upload.pipe';
import { S3Service } from 'src/s3/s3.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('File'))
  async uploadFileAndValidate(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log(file);
    const url = await this.s3Service.uploadFile(
      { buffer: file.buffer, mimetype: file.mimetype },
      file.originalname,
    );
    return {
      success: true,
      message: 'File uploaded successfully',
      url: url,
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    };
  }
}
