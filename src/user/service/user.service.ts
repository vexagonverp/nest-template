import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { EditUserDto } from '../dto/edit-user.dto copy';
import { UserError } from '../../core/enum/enum';
import { UserDto } from '../dto/user.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { FindUserDto } from '../dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOneById(id: number) {
    const user = await this.userRepository.findById(id, { withDeleted: false });
    if (!user) {
      throw new HttpException(UserError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return plainToClass(UserDto, user);
  }
  async getUserList(pageOptionsDto: FindUserDto) {
    const result = await this.userRepository.getUsersPagination(pageOptionsDto);
    return {
      ...result,
      data: plainToInstance(UserDto, result.data, {
        excludeExtraneousValues: true,
      }),
    };
  }

  async createUser(user: CreateUserDto) {
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, user: EditUserDto) {
    await this.findOneById(id);
    return await this.userRepository.update({ id }, user);
  }
}
