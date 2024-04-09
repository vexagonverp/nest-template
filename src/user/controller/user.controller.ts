import { UserService } from './../service/user.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { EditUserDto } from '../dto/edit-user.dto copy';
import { ApiBody } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUserList(@Res() res: Response) {
    return res.status(HttpStatus.OK).send(await this.userService.getUserList());
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  async createUser(@Res() res: Response, @Body() body: CreateUserDto) {
    return res
      .status(HttpStatus.OK)
      .send(await this.userService.createUser(body));
  }

  @Patch(':id')
  @ApiBody({ type: EditUserDto })
  async editUser(
    @Param('id') id: number,
    @Res() res: Response,
    @Body() body: EditUserDto,
  ) {
    return res
      .status(HttpStatus.OK)
      .send(await this.userService.updateUser(id, body));
  }
}
