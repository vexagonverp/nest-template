import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserList() {
    const result = await this.userRepository.find();
    return result;
  }

  async createUser(user: CreateUserDto) {
    return await this.userRepository.save(user);
  }
}
