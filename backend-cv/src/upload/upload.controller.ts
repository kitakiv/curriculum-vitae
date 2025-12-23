import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseUUIDPipe,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './pipe/upload.pipe';
import { UploadService } from './upload.service';
import { MultiFilePipe } from './pipe/multifile.pipe';
import { ServerExistPipe } from './pipe/serverexist.pipe';
import { OneFilePipe } from './pipe/onefile.pipe';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { Resource } from '../roles/enums/resource.enum';
import { Action } from '../roles/enums/action.enum';
import { PermissionGuard } from '../decorators/permission.decorator';
import { MaxIndexPipe } from '../upload/pipe/maxindex.pipe';

@UseGuards(AuthorizationGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @PermissionGuard([
    {
      resource: Resource.IMAGE,
      actions: [Action.CREATE, Action.UPDATE, Action.DELETE],
    },
  ])
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

  @PermissionGuard([
    {
      resource: Resource.IMAGE,
      actions: [Action.CREATE, Action.UPDATE, Action.DELETE],
    },
  ])

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

  // todo add permission guard
  @PermissionGuard([
    {
      resource: Resource.IMAGE,
      actions: [Action.CREATE, Action.UPDATE, Action.DELETE],
    },
  ])
  @Post('file/:service/:id/:index')
  @UseInterceptors(FileInterceptor('File'))
  async updateFile(
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
    @Param('service', MultiFilePipe, ServerExistPipe) service: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Param('index', MaxIndexPipe) index: string,
  ) {
    return await this.uploadService.uploadFile({
      file,
      service,
      id,
      index: parseInt(index),
    });
  }
}
