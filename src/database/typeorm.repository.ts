import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class TypeOrmRepository<Entity> {
  constructor(public repository: Repository<Entity>) {}
  async findById(
    id: string,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity | null> {
    const result = await this.repository.findOne({
      ...options,
      where: { id } as any,
    });

    return result;
  }

  async findOne(
    where: FindOptionsWhere<Entity>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity | null> {
    const result = await this.repository.findOne({
      ...options,
      where,
    });

    return result;
  }

  async find(
    where?: FindOptionsWhere<Entity>,
    options?: FindManyOptions<Entity>,
  ): Promise<Entity[]> {
    const results = await this.repository.find({
      ...options,
      where,
    });

    return results;
  }

  async update(
    where: FindOptionsWhere<Entity>,
    update: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    const result = await this.repository.update(where, update as any);

    return result;
  }

  async save(entity: DeepPartial<Entity>): Promise<DeepPartial<Entity>[]> {
    const result = await this.repository.save([entity]);

    return result;
  }

  async insert(
    entity: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[],
  ): Promise<InsertResult> {
    const result = await this.repository.insert(entity);

    return result;
  }
}
