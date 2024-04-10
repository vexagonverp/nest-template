import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/model/user.entity';
import { TypeOrmRepository } from '../../database/typeorm.repository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PageDto } from '../../database/dto/page.dtos';
import { PageMetaDto } from '../../database/dto/page-meta.dto';
import { FindUserDto } from '../dto/find-user.dto';
@Injectable()
export class UserRepository extends TypeOrmRepository<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  public async getUsersPagination(
    pageOptionsDto: FindUserDto,
  ): Promise<PageDto<User>> {
    const queryBuilder = this.repository.createQueryBuilder('user');
    queryBuilder
      .orderBy('user.createdAt', pageOptionsDto.order)
      .innerJoin(`user.tags`, `tags`)
      .andWhere(`tags.name IN (:...tagArr)`, {
        tagArr: pageOptionsDto.tag,
      });
    //Strict
    // .groupBy('user.id')
    // .having('COUNT(user.id) = :count', { count: pageOptionsDto.tag.length });

    queryBuilder.skip(pageOptionsDto.skip).take(pageOptionsDto.take);
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
