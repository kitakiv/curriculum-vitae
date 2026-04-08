import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCertificateInput } from './dto/create-certificate.input';
import { UpdateCertificateInput } from './dto/update-certificate.input';
import uploadVariables from '../variables/upload.variables';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from './entities/certificate.entity';
import { DataSource, Repository } from 'typeorm';
import { RedisCacheService } from '../cache/cache.service';
import { errors } from 'src/errors/errors.config';

@Injectable()
export class CertificateService {

  private readonly CERTIFICATE_CACHE_KEY = uploadVariables.certificate.cacheKey;
  private readonly CERTIFICATE_CACHE_TIME =
    uploadVariables.certificate.cacheTime;

  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
    private readonly redisCacheService: RedisCacheService,
    private readonly dataSource: DataSource,
    private readonly logger: Logger = new Logger(CertificateService.name),
  ) {}

  async deleteCache() {
    await this.redisCacheService.del(this.CERTIFICATE_CACHE_KEY);
  }
  async create(createCertificateInput: CreateCertificateInput) {
    const certificate = new Certificate(createCertificateInput);
    try {
      const createdCertificate = await this.dataSource.transaction(async (manager) => {
        const createdCertificate = await manager.create(
          Certificate,
          certificate,
        );
        await manager.save(Certificate, createdCertificate);
        return createdCertificate;
      });
      await this.deleteCache();
      return createdCertificate;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_CREATED('Certificate'));
    }
  }


  async findAll() {
    const certificates = await this.redisCacheService.get(
      this.CERTIFICATE_CACHE_KEY,
    );
    if (certificates) return JSON.parse(certificates);
    const newCertificates = await this.certificateRepository.find();
    await this.redisCacheService.set(
      this.CERTIFICATE_CACHE_KEY,
      JSON.stringify(newCertificates),
      this.CERTIFICATE_CACHE_TIME,
    );
    return newCertificates;
  }

  async findOne(id: string) {
    const certificate = await this.certificateRepository.findOneBy({ id });
    if (!certificate)
      throw new NotFoundException(errors.NOT_FOUND('Certificate'));
    return certificate;
  }

  async update(id: string, updateCertificateInput: UpdateCertificateInput) {
    const exist = await this.certificateRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Certificate'));
    try {
      await this.certificateRepository.update(id, updateCertificateInput);
      await this.deleteCache();
      return await this.findOne(id);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Certificate'));
    }
  }

  async remove(id: string) {
    const certificate = await this.findOne(id);
    try {
      const deletedId = await this.dataSource.transaction(async (manager) => {
        await manager.remove(Certificate, certificate);
        return { id };
      });
      await this.deleteCache();
      return deletedId;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('Certificate'));
    }
  }
}
