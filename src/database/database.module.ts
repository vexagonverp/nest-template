import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './typeorm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(TypeOrmConfig)],
})
export class DatabaseModule {}
