import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import uploadVariables from '../../variables/upload.variables';

@Injectable()
export class OneFilePipe implements PipeTransform {
  transform(value: any) {
    if (
      uploadVariables[value].multiFile ||
      typeof uploadVariables[value].multiFile !== 'boolean'
    ) {
      throw new BadRequestException(
        'This service does not support multiple files',
      );
    }
    return value;
  }
}
