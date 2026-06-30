import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import uploadVariables from '../../variables/upload.variables';

@Injectable()
export class ServerExistPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      metadata.type === 'param' &&
      typeof value === 'string' &&
      uploadVariables[value]
    ) {
      return value;
    }
    throw new BadRequestException(`Server ${value} does not exist servers list [${Object.keys(uploadVariables).join(', ')}]`);
  }
}
