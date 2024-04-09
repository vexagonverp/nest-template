import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Full name', example: 'Thanh' })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User name', example: 'baothanh' })
  userName: string;
}
