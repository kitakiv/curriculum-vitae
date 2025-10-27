import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import uploadVariables from 'src/variables/upload.variables';

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
