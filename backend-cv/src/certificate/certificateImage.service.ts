import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from '../variables/upload.variables';
import { errors } from '../errors/errors.config';
import { SingleImage, SingleImageBaseClass } from 'src/upload/interface/singleImage.abstract';
import { SingleImagesFromIds } from '../upload/interface/singleImage.abstract';
@Injectable()
export class CertificateImageService extends SingleImageBaseClass {
  public name: string;
  constructor(
    @InjectRepository(Certificate)
    private readonly certificatesRepository: Repository<Certificate>,
    private readonly logger: Logger = new Logger(CertificateImageService.name),
  ) {
    super();
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
    const certificate = await this.certificatesRepository.findOneBy({ id });
    if (!certificate) throw new NotFoundException(errors.NOT_FOUND('Certificate'));
    if (certificate.certificateImage) {
      return certificate.certificateImage;
    }
    return null;
  }

  async getImageKeys(ids: string[]): Promise<(SingleImagesFromIds)[]> {
    const certificates = await this.certificatesRepository.findBy({ id: In(ids) });
    if (certificates.length === 0) throw new NotFoundException(errors.NOT_FOUND('Certificates'));
    const imageKeys = certificates.reduce((acc: (SingleImagesFromIds)[], certificate) => {
      if (certificate.certificateImage) {
        acc.push({ resourceId: certificate.id, imageKey: certificate.certificateImage });
      }
      return acc;
    }, []);
    return imageKeys;
  }
}
