import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import uploadVariables from 'src/variables/upload.variables';
import { MAX_FILE_IMAGES } from 'src/common/constants';

@Injectable()
export class OneFilePipe implements PipeTransform {
  transform(value: any) {
    if (uploadVariables[value].multiFile) {
      throw new BadRequestException(
        'This service does not support multiple files',
      );
    }
    return value;
  }
}
