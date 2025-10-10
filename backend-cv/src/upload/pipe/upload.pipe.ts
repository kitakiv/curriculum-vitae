import {
  PipeTransform,
  Injectable,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { FileErrors } from '../../errors/fileErrors';

@Injectable()
export class FileValidationPipe implements PipeTransform {

  private readonly logger = new Logger(FileValidationPipe.name);
  transform(value: Express.Multer.File | Express.Multer.File[]) {
    const oneKb = 1000;
    const oneMb = oneKb * 1000;
    const validFileExtensions = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'];

    if (Array.isArray(value)) {
      for (const file of value) {
        this.validateFile(file, oneMb, validFileExtensions);
      }
      return value;
    }

    this.validateFile(value, oneMb, validFileExtensions);
    return value;
  }

  private validateFile(
    file: Express.Multer.File,
    maxSize: number,
    validExtensions: string[],
  ) {
    if (!file) {
      this.logError(FileErrors.FILE_NOT_UPLOADED, file);
    }

    if (file.size > maxSize) {
      this.logError(FileErrors.FILE_SIZE(maxSize), {
        size: file.size,
        maxSize,
        filename: file.originalname,
      });
    }

    const fileExtension = file.mimetype.split('/')[1];
    if (!validExtensions.includes(fileExtension.toLowerCase())) {
      this.logError(FileErrors.FILE_TYPE(validExtensions), {
        fileExtension,
        validExtensions,
      });
    }
  }

  private logError(message: string, value: any) {
    this.logger.error(message, value);
    throw new BadRequestException(message);
  }
}
