import { ArrayNotEmpty, IsOptional } from 'class-validator';
import { PageOptionsDto } from '../../database/dto/page-option.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindUserDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Tag', example: ['User', 'Male'] })
  @ArrayNotEmpty()
  @IsOptional()
  @Transform(({ value }) => value.filter((tag: string) => tag.trim() !== ''))
  readonly tag?: string[];
}
