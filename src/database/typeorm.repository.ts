import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

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
}
