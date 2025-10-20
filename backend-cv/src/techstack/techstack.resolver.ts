import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TechStackService } from './techstack.service';
import { TechStack } from './entities/techstack.entity';
import { CreateTechStackInput } from './dto/create-techstack.input';
import { UpdateTechStackInput } from './dto/update-techstack.input';
import { S3Service } from 'src/s3/s3.service';
import { TechStackImageService } from './tachstackImage.service';
import { BadRequestException } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';

@Resolver(() => TechStack)
export class TechStackResolver {
  constructor(
    private readonly techStackService: TechStackService,
    private readonly s3Service: S3Service,
    private readonly techStackImageService: TechStackImageService,
  ) {}

  @Mutation(() => TechStack)
  async createTechStack(
    @Args('CreateTechStackInput', { type: () => CreateTechStackInput })
    createTechStackInput: CreateTechStackInput,
  ) {
    return await this.techStackService.create(createTechStackInput);
  }

  @Public()
  @Query(() => [TechStack], { name: 'techstacks' })
  async findAll() {
    return await this.techStackService.findAll();
  }

  @Public()
  @Query(() => TechStack, { name: 'techstack' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.techStackService.findOne(id);
  }

  @Mutation(() => TechStack)
  async updateTechStack(
    @Args('UpdateTechStackInput', { type: () => UpdateTechStackInput })
    updateTechStackInput: UpdateTechStackInput,
  ) {
    return await this.techStackService.update(
      updateTechStackInput.id,
      updateTechStackInput,
    );
  }

  @Mutation(() => TechStack)
  async removeTechStack(@Args('id', { type: () => ID }) id: string) {
    try {
      const key = await this.techStackImageService.getImageKey(id);
      await this.techStackService.remove(id);
      if (key) await this.s3Service.deleteFile(key);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
    return `TechStack ${id} deleted`;
  }
}
