import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTechCategoryInput } from './dto/create-tech-category.input';
import { UpdateTechCategoryInput } from './dto/update-tech-category.input';
import uploadVariables from '../variables/upload.variables';
import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
import { TechCategory } from './entities/tech-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TechStack } from '../techstack/entities/techstack.entity';
import { RedisCacheService } from 'src/cache/cache.service';
import { errors } from 'src/errors/errors.config';


@Injectable()
export class TechCategoryService {

  private readonly TECH_CATEGORY_CACHE_KEY =
    uploadVariables.techCategory.cacheKey;
  private readonly TECH_CATEGORY_CACHE_TIME =
    uploadVariables.techCategory.cacheTime;

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(TechCategory)
    private readonly techCategoryRepository: Repository<TechCategory>,
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
    private readonly logger: Logger = new Logger(TechCategoryService.name),
    private readonly redisCacheService: RedisCacheService,
  ) { }

  private async deleteCache() {
    await this.redisCacheService.del(this.TECH_CATEGORY_CACHE_KEY);
  }
  async create(createTechCategoryInput: CreateTechCategoryInput) {
    // check if category with the same name already exists
    const existTechStack = await this.techCategoryRepository.findOne({
      where: {
        categoryName: createTechCategoryInput.categoryName,
      },
    });
    if (existTechStack) {
      throw new BadRequestException(
        errors.ALREADY_EXISTS('Tech category with this name'),
      );
    }
    const techCategoryEntity = await this.checkEntitiesExistence(
      this.techStackRepository,
      createTechCategoryInput.techStacks,
      'Tech stacks',
    )
    try {
      const createdTechCategory = await this.dataSource.transaction(async (manager) => {
        const techCategory = await manager.create(TechCategory, {
          ...createTechCategoryInput,
          techStacks: techCategoryEntity,
        });
        await manager.save(TechCategory, techCategory);
        return techCategory;
      });
      await this.deleteCache();
      return createdTechCategory;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_CREATED('Tech category'));
    }
  }


  private async checkEntitiesExistence<T extends { id: string }>(
    repository: Repository<T>,
    ids: string[] = [],
    name: string,
  ): Promise<T[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    const { entities, notFoundIds } = await this.getEntitesByIds(
      repository,
      ids,
    );
    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        errors.NOT_FOUND(`${name} (${notFoundIds.join(', ')})`),
      );
    }
    return entities;
  }

  private async getEntitesByIds<T extends { id: string }>(
    repository: Repository<T>,
    ids: string[],
  ): Promise<{ entities: T[]; notFoundIds: string[] }> {
    const uniqueIds = [...new Set(ids)];
    const entities = await repository.find({
      where: {
        id: In(uniqueIds),
      } as FindOptionsWhere<T>,
    });
    const notFoundIds = ids.filter(
      (id) => !entities.find((entity: T) => entity.id === id),
    );
    return { entities, notFoundIds };
  }

  async findAll() {
    const techCategories = await this.redisCacheService.get(
      this.TECH_CATEGORY_CACHE_KEY,
    );
    if (techCategories) {
      return JSON.parse(techCategories);
    }
    const categories = await this.techCategoryRepository.find({
      relations: {
        techStacks: true,
      },
    });
    await this.redisCacheService.set(
      this.TECH_CATEGORY_CACHE_KEY,
      JSON.stringify(categories),
      this.TECH_CATEGORY_CACHE_TIME,
    );
    return categories;
  }

  async findOne(id: string) {
    const techCategory = await this.techCategoryRepository.findOne({
      where: { id },
      relations: {
        techStacks: true,
      }
    });
    if (!techCategory) {
      throw new NotFoundException(errors.NOT_FOUND('Tech category'));
    }
    return techCategory;
  }

  async findAllTechStacks(id: string): Promise<TechStack[]> {
    return this.techStackRepository.find({
      where: {
        techCategories: {
          id,
        },
      },
    });
  }

  async update(id: string, updateTechCategoryInput: UpdateTechCategoryInput) {
    const techCategory = await this.findOne(id);
    if (!techCategory)
      throw new NotFoundException(errors.NOT_FOUND(`TechCategory ${id}`));
    if (updateTechCategoryInput.categoryName) {
      const existTechStack = await this.techCategoryRepository.findOne({
        where: {
          categoryName: updateTechCategoryInput.categoryName,
        },
      });
      if (existTechStack) {
        throw new BadRequestException(
          errors.ALREADY_EXISTS('Tech category with this name'),
        );
      }
    }
    const techStackEntity = (Array.isArray(updateTechCategoryInput.techStacks)
      ? await this.checkEntitiesExistence(
        this.techStackRepository,
        updateTechCategoryInput.techStacks,
        'Tech stacks',
      )
      : techCategory.techStacks)
    try {
      const updatedTechCategory = await this.dataSource.transaction(async (manager) => {
        const preloadedTechCategory = await manager.preload(TechCategory, {
          id,
          ...updateTechCategoryInput,
          techStacks: techStackEntity
        });
        await manager.save(TechCategory, preloadedTechCategory);
        return preloadedTechCategory;
      });
      await this.deleteCache();
      return updatedTechCategory;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Tech category'));
    }

  }

  async remove(id: string) {
    const exist = await this.techCategoryRepository.findOneBy({ id });
    if (!exist) {
      throw new NotFoundException(errors.NOT_FOUND('Tech category'));
    }
    try {
      await this.dataSource.transaction(async (manager) => {
        await manager
          .createQueryBuilder()
          .delete()
          .from('tech_stack_tech_categories_tech_category')
          .where('techCategoryId = :id', { id })
          .execute();
        await manager.delete(TechCategory, id);
      });
      await this.deleteCache();
      return id;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('Tech category'));
    }
  }

  async removeMany(ids: string[]): Promise<string[]> {
    const categories = await this.techCategoryRepository.findBy({ id: In(ids) });
    if (categories.length === 0)
      throw new NotFoundException(errors.NOT_FOUND('Tech categories'));
    if (categories.length !== ids.length) {
      const foundIds = categories.map((c) => c.id);
      const notFoundIds = ids.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(errors.NOT_FOUND('Tech category with id: ' + notFoundIds.join(', ')));
    }
    try {
      await this.dataSource.transaction(async (manager) => {
        await manager
          .createQueryBuilder()
          .delete()
          .from('tech_stack_tech_categories_tech_category')
          .where('techCategoryId IN (:...ids)', { ids })
          .execute();
        await manager.delete(TechCategory, ids);
      });
      await this.deleteCache();
      return ids;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('Tech categories with ids: ' + ids.join(', ')));
    }
  }
}
