import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingsController } from './readings.controller';
import { ReadingsService } from './readings.service';
import { Reading } from './readings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reading])],
  controllers: [ReadingsController],
  providers: [ReadingsService],
})
export class ReadingsModule {}
