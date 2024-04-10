import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/model/user.entity';
import { TypeOrmRepository } from '../../database/typeorm.repository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PageDto } from '../../database/dto/page.dtos';
import { PageOptionsDto } from '../../database/dto/page-option.dto';
import { PageMetaDto } from '../../database/dto/page-meta.dto';
@Injectable()
export class UserRepository extends TypeOrmRepository<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  public async getUsersPagination(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    const queryBuilder = this.repository.createQueryBuilder('user');

    queryBuilder
      .orderBy('user.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
