import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { MAX_FILE_IMAGES } from '../../common/constants';

@Injectable()
export class MaxIndexPipe implements PipeTransform {
  transform(value: any) {
    const numValue = Number(value);
    if (typeof numValue !== 'number' || isNaN(numValue)) {
      throw new BadRequestException('The maxIndex parameter must be a number');
    }
    if (numValue >= MAX_FILE_IMAGES || numValue < 0) {
      throw new BadRequestException(
        'The maxIndex parameter must be between 0 and ' + (MAX_FILE_IMAGES - 1),
      );
    }
    return value;
  }
}
