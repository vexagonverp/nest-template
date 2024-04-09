import { UserService } from './../service/user.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto, vCreateUserDto } from '../dto/create-user.dto';
import { ValidatorJoiPipe } from '../../core/validateJoi';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUserList(@Res() res: Response) {
    return res.status(HttpStatus.OK).send(await this.userService.getUserList());
  }

  @Post()
  @UsePipes(new ValidatorJoiPipe<CreateUserDto>(vCreateUserDto))
  async createUser(@Res() res: Response, @Body() body: CreateUserDto) {
    return res
      .status(HttpStatus.OK)
      .send(await this.userService.createUser(body));
  }

  @Patch()
  async editUser(@Res() res: Response) {
    return res.status(HttpStatus.OK).send(await this.userService.getUserList());
  }
}
