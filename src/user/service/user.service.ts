import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { EditUserDto } from '../dto/edit-user.dto copy';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserList() {
    const result = await this.userRepository.find({ deletedAt: null });
    return result;
  }

  async createUser(user: CreateUserDto) {
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, user: EditUserDto) {
    return await this.userRepository.update({ id }, user);
  }
}
