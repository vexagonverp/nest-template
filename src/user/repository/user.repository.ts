import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/model/user.entity';
import { TypeOrmRepository } from '../../database/typeorm.repository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserRepository extends TypeOrmRepository<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }
}
