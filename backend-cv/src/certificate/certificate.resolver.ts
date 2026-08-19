import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CertificateService } from './certificate.service';
import { Certificate } from './entities/certificate.entity';
import { CreateCertificateInput } from './dto/create-certificate.input';
import { UpdateCertificateInput } from './dto/update-certificate.input';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { PermissionGuard } from '../decorators/permission.decorator';
import { Resource } from '../roles/enums/resource.enum';
import { Action } from '../roles/enums/action.enum';
import { Public } from '../decorators/public.decorator';
import { S3Service } from '../s3/s3.service';
import { CertificateImageService } from './certificateImage.service';
import { errors } from 'src/errors/errors.config';
import uploadVariables from 'src/variables/upload.variables';


@UseGuards(AuthorizationGuard)
@Resolver(() => Certificate)
export class CertificateResolver {

  private readonly serviceName = uploadVariables.certificate.name
  constructor(
    private readonly certificateService: CertificateService,
    private readonly certificateImageService: CertificateImageService,
    private readonly s3Service: S3Service,
  ) { }

  @PermissionGuard([
    { resource: Resource.CERTIFICATE, actions: [Action.CREATE] },
  ])
  @Mutation(() => Certificate)
  createCertificate(
    @Args('createCertificateInput')
    createCertificateInput: CreateCertificateInput,
  ) {
    return this.certificateService.create(createCertificateInput);
  }

  @Public()
  @Query(() => [Certificate], { name: 'certificates' })
  findAll() {
    return this.certificateService.findAll();
  }

  @Public()
  @Query(() => Certificate, { name: 'certificate' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.certificateService.findOne(id);
  }

  @PermissionGuard([
    { resource: Resource.CERTIFICATE, actions: [Action.UPDATE] },
  ])
  @Mutation(() => Certificate)
  updateCertificate(
    @Args('updateCertificateInput')
    updateCertificateInput: UpdateCertificateInput,
  ) {
    return this.certificateService.update(
      updateCertificateInput.id,
      updateCertificateInput,
    );
  }

  @PermissionGuard([
    { resource: Resource.CERTIFICATE, actions: [Action.DELETE] },
  ])
  @Mutation(() => ID)
  async removeCertificate(@Args('id', { type: () => ID }) id: string) {
    try {
      const url = await this.certificateImageService.getImageKey(id);
      await this.certificateService.remove(id);
      if (url) await this.s3Service.deleteFile(url, this.serviceName, id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_DELETED('Certificate'), {
        cause: error,
      });
    }
    return id;
  }

  @PermissionGuard([
    { resource: Resource.CERTIFICATE, actions: [Action.DELETE] },
  ])
  @Mutation(() => [ID])
  async removeCertificates(@Args('ids', { type: () => [ID] }) ids: string[]) {
    try {
      const urls = await this.certificateImageService.getImageKeys(ids);
      await this.certificateService.removeMany(ids);
      await this.s3Service.deleteFileFromIds(this.serviceName, urls);
    } catch (error) {
      throw new BadRequestException(errors.NOT_DELETED('Certificates'), {
        cause: error,
      });
    }
    return ids;
  }

}
