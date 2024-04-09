import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('user')
export class UserController {
  @Get()
  getUser(@Res() res: Response) {
    return res.status(HttpStatus.OK).send('OK');
  }
}
