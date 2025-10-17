import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseUUIDPipe,
  Param,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './pipe/upload.pipe';
import { UploadService } from './upload.service';
import { MultiFilePipe } from './pipe/multifile.pipe';
import { ServerExistPipe } from './pipe/serverexist.pipe';
import { OneFilePipe } from './pipe/onefile.pipe';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('file/:service/:id')
  @UseInterceptors(FileInterceptor('File'))
  async uploadFile(
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
    @Param('service', OneFilePipe, ServerExistPipe) service: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.uploadService.uploadFile({ file, service, id });
  }

  @Post('files/:service/:id')
  @UseInterceptors(FilesInterceptor('Files'))
  async uploadFiles(
    @UploadedFiles(new FileValidationPipe())
    files: Array<Express.Multer.File>,
    @Param('service', MultiFilePipe, ServerExistPipe)
    service: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.uploadService.uploadFiles({ files, service, id });
  }
}
