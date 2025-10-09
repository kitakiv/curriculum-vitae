import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any) {
    const oneKb = 1000;
    const oneMb = oneKb * 1000;
    const validFileExtensions = {
      image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
    };

    return (
      value.size < oneMb &&
      validFileExtensions.image.includes(value.type.split('/')[1])
    );
  }
}
