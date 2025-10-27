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
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Resource } from 'src/roles/enums/resource.enum';
import { Action } from 'src/roles/enums/action.enum';
import { PermissionGuard } from 'src/decorators/permission.decorator';
import { MaxIndexPipe } from 'src/upload/pipe/maxindex.pipe';
import { Public } from 'src/decorators/public.decorator';

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
  // @PermissionGuard([
  //   {
  //     resource: Resource.IMAGE,
  //     actions: [Action.CREATE, Action.UPDATE, Action.DELETE],
  //   },
  // ])
  @Public()
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
