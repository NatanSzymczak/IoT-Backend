import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { CreateReadingDto } from './dtos/create-reading.dto';

@Controller('readings')
export class ReadingsController {
  constructor(private readingsService: ReadingsService) {}

  @Get()
  getReadings() {
    return this.readingsService.getAll();
  }

  @Post()
  addReading(@Body() body: CreateReadingDto) {
    return this.readingsService.add();
  }
}
