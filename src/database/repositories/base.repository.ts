import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { IReponsePaginated } from '../../common/interfaces/response-paginated.interface';

export interface FindAllOptions<T> {
  page?: number;
  limit?: number;
  relations?: string[];
  filters?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  order?: FindManyOptions<T>['order'];
}

export abstract class BaseRepository<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(
    options: FindAllOptions<T> = {},
  ): Promise<IReponsePaginated<T>> {
    const { page = 1, limit = 10, relations = [], filters, order } = options;

    const [data, total] = await this.repository.findAndCount({
      where: filters,
      relations,
      skip: (page - 1) * limit,
      take: limit,
      order,
    });

    return { data, total, page, limit };
  }

  async findById(id: number, relations: string[] = []): Promise<T | null> {
    return await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
      relations,
    });
  }

  create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);

    return this.repository.save(entity);
  }

  async updateOneById(id: number, data: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(id, data as any);

    return await this.findById(id);
  }

  async softDelete(id: number): Promise<DeleteResult> {
    return await this.repository.softDelete(id);
  }

  async restore(id: number): Promise<void> {
    await this.repository.restore(id);
  }

  async hardDelete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
