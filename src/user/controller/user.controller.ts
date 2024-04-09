import { UserService } from './../service/user.service';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUserList(@Res() res: Response) {
    return res.status(HttpStatus.OK).send(await this.userService.getUserList());
  }
}
