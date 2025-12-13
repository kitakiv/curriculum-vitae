import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import uploadVariables from '../../variables/upload.variables';

@Injectable()
export class MultiFilePipe implements PipeTransform {
  transform(value: any) {
    if (!uploadVariables[value].multiFile) {
      throw new BadRequestException(
        'This service does not support one file pass file with [file]',
      );
    }
    return value;
  }
}
