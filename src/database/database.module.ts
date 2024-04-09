import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(TypeOrmConfigService)],
})
export class DatabaseModule {}
