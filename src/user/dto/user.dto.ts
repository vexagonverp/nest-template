import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class UserDto {
  @Expose()
  @ApiProperty()
  fullName: string;

  @Expose()
  @ApiProperty()
  userName: string;
}
