import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';
export class CreateUserDto {
  @ApiProperty({ description: 'Full name', example: 'Thanh' })
  fullName: string;
  @ApiProperty({ description: 'User name', example: 'baothanh' })
  userName: string;
}

export const vCreateUserDto = joi.object<CreateUserDto>({
  fullName: joi.string().required(),
  userName: joi.string().required(),
});
