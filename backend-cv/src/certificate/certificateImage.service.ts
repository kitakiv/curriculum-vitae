import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from '../variables/upload.variables';
import { errors } from '../errors/errors.config';
@Injectable()
export class CertificateImageService {
  public name: string;
  constructor(
    @InjectRepository(Certificate)
    private readonly certificatesRepository: Repository<Certificate>,
    private readonly logger: Logger = new Logger(CertificateImageService.name),
  ) {
    this.name = uploadVariables.certificate.name;
  }
  async uploadImage({ id, image }: { id: string; image: string }) {
    const exist = await this.certificatesRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Certificate'));
    try {
      await this.certificatesRepository.update(id, { certificateImage: image });
      return { id, certificateImage: image };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Certificate'));
    }
  }

  async getImageKey(id: string) {
    const exist = await this.certificatesRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Certificate'));
    const certificate = await this.certificatesRepository.findOneBy({ id });
    if (certificate.certificateImage) {
      return decodeURIComponent(certificate.certificateImage.split(`/`).at(-1));
    }
    return null;
  }
}
