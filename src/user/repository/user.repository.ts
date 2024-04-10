import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/model/user.entity';
import { TypeOrmRepository } from '../../database/typeorm.repository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PageDto } from '../../database/dto/page.dtos';
import { PageMetaDto } from '../../database/dto/page-meta.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UserType } from '../../core/enum/enum';
@Injectable()
export class UserRepository extends TypeOrmRepository<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  public async getUsersPagination(
    pageOptionsDto: FindUserDto,
  ): Promise<PageDto<User>> {
    const tags = Array.from(new Set(pageOptionsDto.tag));
    const queryBuilder = this.repository.createQueryBuilder('user');
    queryBuilder
      .orderBy('user.createdAt', pageOptionsDto.order)
      .andWhere('user.userTypes @> CAST(:editor AS user_usertypes_enum[])', {
        editor: [UserType.EDITOR],
      })
      // .andWhere('user.userTypes && CAST(:editor AS user_usertypes_enum[])', {
      //   editor: [UserType.EDITOR, UserType.ADMIN],
      // })
      .innerJoin(`user.tags`, `tags`)
      .andWhere(`tags.name IN (:...tagArr)`, {
        tagArr: tags,
      });

    //Strict
    // .groupBy('user.id')
    // .having('COUNT(user.id) = :count', { count: tags.length });

    queryBuilder.skip(pageOptionsDto.skip).take(pageOptionsDto.take);
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
